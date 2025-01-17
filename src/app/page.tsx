

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800">Bienvenido</h1>
        <p className="mt-4 text-lg text-gray-600">
          Parece que terminaste en la página de inicio por accidente. Por favor, navega a las secciones correspondientes.
        </p>
        <div className="mt-6">
          <a
            href="/login"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Ir al Login
          </a>
        </div>
      </div>
    </div>
  );
}
