export default function About() {
  return (
    <div className="bg-white text-black font-serif p-4">
      {/* Logo Wikipedia */}
      <div className="flex justify-start mb-4">
        <img
          src="/icons/wiki.png"
          alt="Wikipedia Logo"
          className="h-12 w-auto"
        />
      </div>

      <div className="flex flex-col lg:flex-row-reverse max-w-6xl mx-auto">
        {/* Sidebar a la derecha */}
        <aside className="lg:w-1/3 w-full mb-6 lg:mb-0 lg:ml-6">
          <div className="border border-gray-300">
            <div className="bg-yellow-200 text-center py-2 font-bold">Edwin Fernando Pirajan</div>
            <img src="/tu-foto.png" alt="Edwin Fernando Pirajan" className="w-full object-cover" />

            {/* Información personal */}
            <div className="border-t border-gray-300 p-3">
              <h3 className="font-bold text-sm bg-gray-100 px-2 py-1 mb-2">Información personal</h3>
              <p><strong>Nombre de nacimiento:</strong> Edwin Fernando Pirajan Arevalo</p>
              <p><strong>Nacimiento:</strong> 16 de julio de 1998<br />Bogotá, Colombia (Hospital Kennedy)</p>
              <p><strong>Altura:</strong> 1.76 cm</p>
              <p><strong>Nacionalidad:</strong> Colombiana</p>
              <p><strong>Religión:</strong> Cristianismo</p>
              <p><strong>Educación:</strong><br />Universidad Distrital Francisco José de Caldas</p>
              <p><strong>Padres:</strong><br />Yeimi Alejandra Arévalo<br />Edwin Hernán Pirajan Moreno</p>
            </div>

            {/* Información profesional */}
            <div className="border-t border-gray-300 p-3">
              <h3 className="font-bold text-sm bg-gray-100 px-2 py-1 mb-2">Información profesional</h3>
              <p><strong>Ocupación:</strong><br />Desarrollador de Software</p>
              <p><strong>Áreas:</strong><br />FullStack Developer</p>
              <p><strong>Lenguajes:</strong><br />Go, PHP (Laravel), JS/TS</p>
              <p><strong>Frameworks:</strong><br />NodeJS, AstroJS, React, Next, Vue3, Angular</p>
              <p><strong>Bases de datos:</strong><br />PostgreSQL, MongoDB, Oracle</p>
              <p><strong>Infraestructura:</strong><br />Docker, Linux</p>
            </div>

            {/* Firma */}
            <div className="border-t border-gray-300 p-3 text-center">
              <h3 className="font-bold text-sm bg-gray-100 px-2 py-1 mb-2">Firma</h3>
              <img src="/firma.png" alt="Firma de Edwin" className="mx-auto h-16 object-contain" />
            </div>
          </div>
        </aside>

        {/* Contenido principal */}
        <main className="lg:w-2/3 w-full">
          <h1 className="text-3xl font-serif font-bold mb-4">Edwin Fernando Pirajan Arevalo</h1>
          <p className="mb-4">
            <strong>Edwin Fernando Pirajan Arevalo</strong> (Bogotá, 16 de julio de 1998) es un desarrollador de software colombiano especializado en desarrollo fullstack. Su experiencia incluye tecnologías modernas de backend y frontend, y ha participado en importantes procesos formativos como MincTic2022.
          </p>

          <h2 className="text-xl font-bold mb-2">Biografía</h2>

          <h3 className="font-semibold mt-3">Inicios</h3>
          <p className="mb-3">
            Edwin inició sus estudios como diseñador multimedial en 2017, terminando su formación en mayo de 2018. Trabajó como diseñador gráfico hasta 2021. Durante ese tiempo, se acercó al desarrollo web mediante herramientas como JavaScript, lo que despertó su interés por el desarrollo de software.
          </p>

          <h3 className="font-semibold mt-3">Carrera como Desarrollador</h3>
          <p className="mb-3">
            En agosto de 2022 ingresó como desarrollador a la empresa Cascoloco. Luego, en mayo de 2023, se vinculó a Smart Training como desarrollador fullstack, permaneciendo hasta febrero de 2024. Actualmente se desempeña como ingeniero desarrollador en la compañía Almacontact.
          </p>
        </main>
      </div>
    </div>
  );
}
