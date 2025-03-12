export default function Grafica({ tipo }) {
  return (
    <div className="h-full border rounded-lg p-4 flex flex-col">
      <h3 className="text-lg font-bold mb-2">
        Visualización de {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
      </h3>
      
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        {/* Aquí irá tu gráfica real (puedes usar Chart.js, D3.js, etc.) */}
        <div className="text-center">
          <p className="text-gray-500 mb-4">Representación visual de datos para {tipo}</p>
          <div className="flex justify-center space-x-2">
            <div className="h-32 w-8 bg-blue-400 self-end"></div>
            <div className="h-48 w-8 bg-blue-500 self-end"></div>
            <div className="h-24 w-8 bg-blue-400 self-end"></div>
            <div className="h-64 w-8 bg-blue-600 self-end"></div>
            <div className="h-40 w-8 bg-blue-500 self-end"></div>
          </div>
        </div>
      </div>
    </div>
  );
}