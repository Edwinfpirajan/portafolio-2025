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

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_KEY}`,
      },
      body: JSON.stringify({
        model: chosenModel,
        messages,
        temperature: 0.7,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      return new Response(JSON.stringify({ error: "Upstream error", details: err }), { status: res.status });
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
