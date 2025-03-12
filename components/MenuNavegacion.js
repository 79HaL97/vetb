export default function MenuNavegacion({ seccionActiva, setSeccionActiva }) {
  const secciones = [
    { id: 'confirmados', nombre: 'Confirmados' },
    { id: 'probables', nombre: 'Probables' },
    { id: 'descartados', nombre: 'Descartados' },
    { id: 'nuevos', nombre: 'Casos Nuevos' },
    { id: 'sintomas', nombre: 'Síntomas' }
  ];

  return (
    <div className="flex space-x-4">
      {secciones.map((seccion) => (
        <button
          key={seccion.id}
          onClick={() => setSeccionActiva(seccion.id)}
          className={`px-4 py-2 rounded-md ${
            seccionActiva === seccion.id
              ? 'bg-blue-600 text-white'
              : 'bg-gray-300 hover:bg-gray-400'
          }`}
        >
          {seccion.nombre}
        </button>
      ))}
    </div>
  );
}