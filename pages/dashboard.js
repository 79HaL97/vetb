import { useState } from 'react';
import Head from 'next/head';

// Componentes para las diferentes secciones
import Filtros from '../components/Filtros';
import MenuNavegacion from '../components/MenuNavegacion';
import Confirmados from '../components/secciones/Confirmados';
import Probables from '../components/secciones/Probables';
import Descartados from '../components/secciones/Descartados';
import NuevosCasos from '../components/secciones/NuevosCasos';
import Sintomas from '../components/secciones/Sintomas';
import Grafica from '../components/Grafica';

export default function Dashboard() {
  // Estado para controlar qué sección se muestra
  const [seccionActiva, setSeccionActiva] = useState('confirmados');

  // Función para renderizar el contenido según la sección activa
  const renderizarContenido = () => {
    switch (seccionActiva) {
      case 'confirmados':
        return <Confirmados />;
      case 'probables':
        return <Probables />;
      case 'descartados':
        return <Descartados />;
      case 'nuevos':
        return <NuevosCasos />;
      case 'sintomas':
        return <Sintomas />;
      default:
        return <Confirmados />;
    }
  };

  return (
    <div>
      <Head>
        <title>Dashboard de Casos</title>
      </Head>

      <main>
        <div className="grid grid-cols-5 grid-rows-5 gap-4 h-screen">
          {/* Sección 1: Filtros (siempre visible) */}
          <div className="row-span-5 bg-gray-100 p-4">
            <Filtros />
          </div>

          {/* Sección 2: Título principal (siempre visible) */}
          <div className="col-span-4 bg-blue-100 p-4">
            <h1 className="text-2xl font-bold">Dashboard de Seguimiento de Casos</h1>
          </div>

          {/* Sección 3: Menú de navegación (siempre visible) */}
          <div className="col-span-4 col-start-2 row-start-2 bg-gray-200 p-4">
            <MenuNavegacion 
              seccionActiva={seccionActiva} 
              setSeccionActiva={setSeccionActiva} 
            />
          </div>

          {/* Secciones dinámicas (cambian según el menú seleccionado) */}
          <div className="col-start-2 row-start-3 p-4">
            {seccionActiva === 'confirmados' && <Confirmados />}
          </div>
          <div className="col-start-2 row-start-4 p-4">
            {seccionActiva === 'probables' && <Probables />}
          </div>
          <div className="col-start-2 row-start-5 p-4">
            {seccionActiva === 'descartados' && <Descartados />}
          </div>

          {/* Sección 8: Gráfica */}
          <div className="col-span-3 row-span-3 col-start-3 row-start-3 bg-white p-4">
            <Grafica seccionActiva={seccionActiva} />
          </div>
        </div>
      </main>
    </div>
  );
}