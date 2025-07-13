export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        pastel: {
          bg: '#f3e8ff',        // fondo lila claro
          primary: '#c9c9f5',   // morado pastel para barra y botones
          accent: '#ffe0f0',    // rosado pastel
          yellow: '#fff5cc',    // amarillo suave
          blue: '#cce0ff',      // azul suave
          green: '#d9fdd3',     // verde suave
        },
      },      
      fontFamily: {
        retro: ['"Press Start 2P"', 'monospace'],
      },
    },
  },
};
