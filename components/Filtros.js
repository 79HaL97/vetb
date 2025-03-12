export default function Filtros() {
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Filtros</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Fecha</label>
          <input type="date" className="w-full rounded border p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Región</label>
          <select className="w-full rounded border p-2">
            <option>Todas</option>
            <option>Norte</option>
            <option>Sur</option>
            <option>Este</option>
            <option>Oeste</option>
          </select>
        </div>
        {/* Más filtros aquí */}
      </div>
    </div>
  );
}