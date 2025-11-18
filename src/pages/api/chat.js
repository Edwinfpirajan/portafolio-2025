export async function POST({ request }) {
  try {
    const { messages, model } = await request.json();

    const allowedModels = [
      "gpt-4o-mini",
      "gpt-4o",
      "gpt-4.1-mini",
      "gpt-4.1",
      "o3-mini",
      "o1-mini"
    ];

    const chosenModel = allowedModels.includes(model) ? model : "gpt-4o-mini";

    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: "Invalid messages" }), { status: 400 });
    }

    // Resolve API key from environment (Railway provides process.env at runtime).
    // Support multiple common names to reduce deployment friction.
    const API_KEY =
      process.env.OPENAI_API_KEY ||
      process.env.OPENAI_KEY ||
      (typeof import.meta !== 'undefined' && import.meta.env && (import.meta.env.OPENAI_API_KEY || import.meta.env.OPENAI_KEY));

    // Demo fallback when no API key is configured
    if (!API_KEY) {
      const lastUser = Array.isArray(messages) ? [...messages].reverse().find(m => m.role === 'user')?.content : '';
      const demo = `Modo demo activo: configura OPENAI_API_KEY (o OPENAI_KEY) en Railway para respuestas reales.\n\nEco breve: ${lastUser ? '“' + String(lastUser).slice(0, 240) + (String(lastUser).length > 240 ? '…' : '') + '”' : '(sin mensaje)'}.`;
      return new Response(
        JSON.stringify({ reply: demo, model: 'demo', missingKey: true }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: chosenModel,
        messages,
        temperature: 0.7,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      let short = errText;
      try {
        const j = JSON.parse(errText);
        short = j?.error?.message || j?.error || errText;
      } catch {}
      return new Response(
        JSON.stringify({ error: "Upstream error", details: short }),
        { status: res.status, headers: { "Content-Type": "application/json" } }
      );
    }

    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content ?? "";

    return new Response(
      JSON.stringify({ reply, model: chosenModel, usage: data.usage ?? null }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (e) {
    return new Response(JSON.stringify({ error: e?.message ?? "Unknown error" }), { status: 500 });
  }
}
