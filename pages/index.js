/**
 * pages/index.js
 *
 * Página principal del dashboard de Tuberculosis.
 * Contiene:
 *  - Lógica para cargar y filtrar datos desde un CSV.
 *  - Renderizado de un sidebar de filtros.
 *  - Dos bloques de gráficos (barras y línea).
 *  - Tarjetas con conteo de casos por estado (statusCaso).
 */

import { useState, useEffect } from 'react';
import Head from 'next/head';           // Opcional: si quisieras modificar <title> o meta tags
import Papa from 'papaparse';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  Filler
} from 'chart.js';
import AnimatedWaves from '../components/AnimatedWaves';
import Footer from '../components/Footer';

// =============== 1. Registro de componentes Chart.js ===============
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  Filler
);

// =============== 2. Componente principal: Dashboard ===============
export default function Dashboard() {
  // -----------------------------------------------------------
  // 2.1. Estados de React (datos, loading, error, filtros, etc.)
  // -----------------------------------------------------------

  const [rawData, setRawData] = useState([]);    // CSV crudo
  const [loading, setLoading] = useState(true);   // Indicador de carga
  const [error, setError] = useState(null);       // Error en la carga

  // Filtros seleccionados por el usuario
  const [selectedJurisdiction, setSelectedJurisdiction] = useState(null);
  const [selectedInstitution, setSelectedInstitution] = useState(null);

  // Mostrar/ocultar el sidebar de filtros
  const [showFilters, setShowFilters] = useState(true);

  // -----------------------------------------------------------
  // 2.2. Efecto para cargar el CSV al montar el componente
  // -----------------------------------------------------------
  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch('/data/TUBERCULOSIS_DX_clean.csv');
        const csvText = await response.text();

        Papa.parse(csvText, {
          header: true,
          complete: (results) => {
            setRawData(results.data);
            setLoading(false);
          },
          error: (err) => {
            console.error('Error parsing CSV:', err);
            setError('Error al cargar los datos');
            setLoading(false);
          }
        });
      } catch (err) {
        console.error('Error fetching CSV:', err);
        setError('Error al cargar los datos');
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // -----------------------------------------------------------
  // 2.3. Filtrado de datos
  // -----------------------------------------------------------
  // 2.3.a. Solo Coahuila
  const baseData = rawData.filter(item => item.des_edo_not === 'Coahuila');

  // 2.3.b. Aplicar filtros de jurisdicción e institución
  const filteredData = baseData.filter(item => {
    let match = true;
    if (selectedJurisdiction) {
      match = match && (item.des_jur_not === selectedJurisdiction);
    }
    if (selectedInstitution) {
      match = match && (item.des_ins === selectedInstitution);
    }
    return match;
  });

  // -----------------------------------------------------------
  // 2.4. Definiciones para la gráfica de barras (Bloque 2)
  // -----------------------------------------------------------

  // Jurisdicciones y su orden deseado
  const desiredOrder = [
    { full: 'Piedras Negras', abbr: 'PN' },
    { full: 'Acuña', abbr: 'ACU' },
    { full: 'Sabinas', abbr: 'SAB' },
    { full: 'Monclova', abbr: 'MVA' },
    { full: 'Cuatro Ciénegas', abbr: 'CC' },
    { full: 'Torreón', abbr: 'TOR' },
    { full: 'Francisco I. Madero', abbr: 'FIM' },
    { full: 'Saltillo', abbr: 'SAL' }
  ];

  // Contar cuántos casos hay por jurisdicción en filteredData
  const counts = {};
  filteredData.forEach(item => {
    const jur = item.des_jur_not;
    counts[jur] = (counts[jur] || 0) + 1;
  });

  // Generar labels y valores en el orden definido
  const orderedLabels = desiredOrder.map(item => item.abbr);
  const orderedValues = desiredOrder.map(item => counts[item.full] || 0);

  // Data para la gráfica de barras
  const chartData = {
    labels: orderedLabels,
    datasets: [
      {
        label: 'Registros en plataforma',
        data: orderedValues,
        // Gradiente de color
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          // Si no está definido el chartArea, devolvemos un color fallback
          if (!chartArea) {
            return '#248277';
          }
          let gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, '#358f80');
          gradient.addColorStop(1, '#256058');
          return gradient;
        },
        hoverBackgroundColor: '#FFD700',
        borderWidth: 0,
        borderRadius: 8,
        barThickness: 'flex',   // Ajusta automáticamente el grosor
        maxBarThickness: 100,   // Máximo grosor de las barras
      },
    ],
  };

  // Opciones para la gráfica de barras
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: false },
      tooltip: {
        callbacks: {
          title: function(tooltipItems) {
            const index = tooltipItems[0].dataIndex;
            return desiredOrder[index].full; // Título con el nombre completo
          },
          label: function(context) {
            // Agrupamos por des_ins y contamos casos para la jurisdicción
            const index = context.dataIndex;
            const jurisdiction = desiredOrder[index].full;
            const itemsInJur = filteredData.filter(item => item.des_jur_not === jurisdiction);

            const insCounts = {};
            itemsInJur.forEach(item => {
              const ins = item.des_ins;
              insCounts[ins] = (insCounts[ins] || 0) + 1;
            });

            // Devolvemos un arreglo de strings, uno por institución
            const lines = [];
            for (const [ins, count] of Object.entries(insCounts)) {
              lines.push(`${ins}: ${count}`);
            }
            return lines;
          }
        },
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        titleFont: {
          size: 16,
          weight: 'bold',
        },
        bodyFont: {
          size: 14
        },
        padding: 10,
        displayColors: false
      },
      // Data labels encima de cada barra
      datalabels: {
        display: true,
        color: '#4b5563',
        anchor: 'end',
        align: 'top',
        offset: 4,
        font: {
          weight: 'bold',
          size: 14,
        },
        formatter: (value) => value.toLocaleString()
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#4b5563',
          font: {
            size: 16,
            weight: 'bold'
          }
        }
      },
      y: {
        display: false, // Ocultamos el eje Y
        beginAtZero: true,
        suggestedMax: Math.max(...orderedValues) * 1.02
      }
    },
    layout: {
      padding: { top: 20 }
    }
  };

  // Plugin para dibujar etiquetas personalizadas en las barras
  const customLabelsPlugin = {
    id: 'customLabels',
    afterDatasetsDraw: (chart) => {
      const ctx = chart.ctx;
      chart.data.datasets.forEach((dataset, datasetIndex) => {
        const meta = chart.getDatasetMeta(datasetIndex);
        if (!meta.hidden) {
          meta.data.forEach((element, index) => {
            const value = dataset.data[index];
            const position = element.getCenterPoint();
            if (value > 0) {
              ctx.fillStyle = '#4b5563';
              ctx.font = 'bold 18px Montserrat, sans-serif';
              ctx.textAlign = 'center';
              ctx.textBaseline = 'bottom';
              const yPos = element.y - 10;
              ctx.fillText(value.toLocaleString(), position.x, yPos);
            }
          });
        }
      });
    }
  };
  const plugins = [customLabelsPlugin];

  // -----------------------------------------------------------
  // 2.5. Tarjetas de statusCaso (Confirmado, Descartado, etc.)
  // -----------------------------------------------------------
  const statusCounts = {};
  filteredData.forEach(item => {
    const status = item.statusCaso;
    statusCounts[status] = (statusCounts[status] || 0) + 1;
  });

  // Lista única de instituciones (para el sidebar)
  const uniqueDesIns = Array.from(new Set(baseData.map(item => item.des_ins)));

  // -----------------------------------------------------------
  // 2.6. Definiciones para la gráfica de línea (Bloque 3)
  // -----------------------------------------------------------
  // Filtrar solo registros de 2025 y agrupar por sem_epi_not
  const semCounts = {};
  filteredData.forEach(item => {
    const sem = item.sem_epi_not;
    if (sem && sem.startsWith('2025')) { 
      semCounts[sem] = (semCounts[sem] || 0) + 1;
    }
  });

  // Encontrar la semana más alta para crear el rango
  const semanas2025 = Object.keys(semCounts);
  let maxWeekNumber = 1;
  semanas2025.forEach(sem => {
    const weekMatch = sem.match(/SE(\d+)/);
    if (weekMatch && weekMatch[1]) {
      const weekNum = parseInt(weekMatch[1]);
      if (weekNum > maxWeekNumber) {
        maxWeekNumber = weekNum;
      }
    }
  });

  // Crear array completo de semanas (SE01 ... SEmax)
  const allWeeks = [];
  const allWeekData = [];
  for (let i = 1; i <= maxWeekNumber; i++) {
    const weekStr = i < 10 ? `0${i}` : `${i}`;
    const fullWeekStr = `2025, SE${weekStr}`;
    allWeeks.push(fullWeekStr);
    allWeekData.push(semCounts[fullWeekStr] || 0);
  }

  // Dataset para la gráfica de línea
  const lineData = {
    labels: allWeeks,
    datasets: [
      {
        label: 'Casos por Semana Epidemiológica - 2025',
        data: allWeekData,
        borderColor: '#358f80',
        borderWidth: 3,
        tension: 0.3,
        fill: 'start', 
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) {
            return 'rgba(53, 143, 128, 0.2)';
          }
          const gradient = ctx.createLinearGradient(0, chartArea.top, 20, chartArea.bottom);
          gradient.addColorStop(0, 'rgba(53, 143, 128, 0.5)');
          gradient.addColorStop(1, 'rgba(53, 143, 128, 0.01)');
          return gradient;
        },
        pointBackgroundColor: '#358f80',
        pointRadius: 3,
        pointHoverRadius: 8,
      }
    ]
  };

  // Opciones para la gráfica de línea
  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: false },
      tooltip: {
        callbacks: {
          title: function(tooltipItems) {
            return tooltipItems[0].label;
          },
          label: function(context) {
            const value = context.parsed.y;
            return ` Casos: ${value.toLocaleString()}`;
          }
        },
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: 10
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#4b5563',
          font: { size: 16, weight: 'bold' },
          callback: function(value, index) {
            const semana = allWeeks[index];
            if (semana) {
              return semana.split(', ')[1]; // Mostrar solo SE##
            }
            return value;
          }
        },
        title: {
          display: true,
          text: 'Semana Epidemiológica - 2025'
        },
        grid: {
          display: false,
          color: 'rgba(0, 0, 0, 0.05)',
          lineWidth: 1
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: '#4b5563',
          font: { size: 14, weight: 300 },
          precision: 0
        },
        title: {
          display: true,
          text: 'Número de Casos'
        },
        grid: {
          display: false,
          color: 'rgba(0, 0, 0, 0.1)',
          lineWidth: 1
        }
      }
    }
  };

  // -----------------------------------------------------------
  // 3. Renderizado principal del componente
  // -----------------------------------------------------------
  return (
    <>
      <div className="flex bg-gray-200">
        {/* 
          3.1. Contenedor para el sidebar y el botón de toggle 
          Este bloque contiene el menú lateral con filtros y el botón que lo oculta/muestra.
        */}
        <div className="relative">
          {/* Sidebar de filtros */}
          <div 
            className={`
              fixed left-0 top-24 bg-gray-800 text-white overflow-y-auto z-10 rounded-lg 
              transition-all duration-300
              ${showFilters 
                ? 'w-[200px] p-4 opacity-100 visible' 
                : 'w-0 p-0 opacity-0 invisible pointer-events-none'}
            `}
          >
            <h3 className="font-heading text-white-800 font-bold mt-2 mb-2">Jurisdicción</h3>
            {desiredOrder.map((item) => (
              <button
                key={item.full}
                onClick={() => setSelectedJurisdiction(
                  selectedJurisdiction === item.full ? null : item.full
                )}
                className={`
                  mb-2 w-full py-2 rounded-lg text-white cursor-pointer
                  ${selectedJurisdiction === item.full ? 'bg-gray-600' : 'bg-gray-700'}
                `}
              >
                {item.full}
              </button>
            ))}

            <h3 className="font-heading text-white-800 font-bold mt-6 mb-2">Institución</h3>
            {uniqueDesIns.map((ins) => (
              <button
                key={ins}
                onClick={() => setSelectedInstitution(
                  selectedInstitution === ins ? null : ins
                )}
                className={`
                  mb-2 w-full py-2 rounded-lg text-white cursor-pointer
                  ${selectedInstitution === ins ? 'bg-gray-600' : 'bg-gray-700'}
                `}
              >
                {ins}
              </button>
            ))}
          </div>

          {/* Botón para ocultar/mostrar el sidebar */}
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`
              fixed left-0 top-28 z-10 bg-gray-700 text-white h-24 w-8 rounded-r-lg
              flex items-center justify-center shadow-lg
              transition-transform duration-300
              ${showFilters ? 'translate-x-[200px]' : 'translate-x-0'}
            `}
          >
            <span className="text-lg font-bold">
              {showFilters ? '‹' : '›'}
            </span>
          </button>
        </div>

        {/* 
          3.2. Área principal de contenido 
          Aquí van los bloques de gráficas y tarjetas.
        */}
        <div className="min-h-screen bg-gray-50/95 relative z-[2] rounded-lg 
                        transition-all duration-300 border-2 w-[1080px] mx-auto flex flex-col">

          {/* Bloque 1: Título y descripción */}
          <div className="p-8">
            <h1 className="font-heading text-4xl text-gray-800 font-bold">
              Vigilancia Epidemiológica de Tuberculosis
            </h1>
            <p className="font-sans">
              Selecciona los filtros para modificar las gráficas y tarjetas.
            </p>
          </div>

          {/* 
            Bloque 2: Tarjetas y gráfica de barras 
            - Título
            - Tarjetas con status (Confirmados, etc.)
            - Gráfica de barras (jurisdicciones)
          */}
          <div className="flex flex-col w-full p-8 relative z-[2] 
                          border-2 border-gray-200 rounded-lg mb-8">

            {/* Título para el bloque 2 */}
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
              Registros en Coahuila por Jurisdicción, 2024 - 2025
            </h2>
            
            <div className="flex flex-col md:flex-row items-center gap-8 w-full">
              {/* Tarjetas de statusCaso */}
              <div className="w-full md:w-[250px] md:flex-shrink-0">
                {Object.entries(statusCounts).map(([key, value]) => {
                  const pluralNames = {
                    'Confirmado': 'Confirmados',
                    'Descartado': 'Descartados',
                    'Probable': 'Probables'
                  };
                  const displayName = pluralNames[key] || key;
                  return (
                    <div
                      key={key}
                      className="bg-gray-800 p-4 rounded-lg mb-4 text-center"
                    >
                      <p className="m-0 text-4xl font-bold font-sans text-white">
                        {value.toLocaleString()}
                      </p>
                      <h4 className="font-sans text-base text-white">
                        {displayName}
                      </h4>
                    </div>
                  );
                })}
              </div>

              {/* Gráfica de barras */}
              <div className="flex-1 h-[500px] w-full">
                {loading ? (
                  <div className="flex justify-center items-center h-full">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                  </div>
                ) : error ? (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                  </div>
                ) : (
                  <Bar data={chartData} options={chartOptions} plugins={plugins} />
                )}
              </div>
            </div>
          </div>

          {/* 
            Bloque 3: Línea de tiempo (Casos por semana epidemiológica)
            - Título
            - Gráfica de línea
          */}
          <div className="w-full p-8 bg-white rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
              Casos por Semana Epidemiológica - 2025
            </h2>
            
            <div className="h-[400px]">
              {loading ? (
                <div className="flex justify-center items-center h-full">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : error ? (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              ) : (
                <Line data={lineData} options={lineOptions} />
              )}
            </div>
          </div>

          {/* Footer ahora va aquí */}
          <Footer />
          
          {/* Componente decorativo al final */}
          <AnimatedWaves />
        </div>
      </div>
    </>
  );
}