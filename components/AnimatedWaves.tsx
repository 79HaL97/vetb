import React from 'react';

const AnimatedWaves = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        zIndex: -1,
        pointerEvents: 'none',
      }}
    >
      {/* Primera ola - movimiento izquierda */}
      <svg
        viewBox="0 0 1200 200"
        preserveAspectRatio="none"
        style={{
          position: 'absolute',
          bottom: -200,  // Cambiado de 0 a -100
          left: 0,
          width: '200%',
          height: '100%',
          fill: 'rgba(162, 174, 187, 0.1)', 
          animation: 'moveWavesLeft 15s ease-in-out infinite alternate',
        }}
      >
        <path d="M0,100 C300,200 900,0 1200,100 L1200,200 L0,200 Z" />
      </svg>

      {/* Segunda ola - movimiento derecha */}
      <svg
        viewBox="0 0 1200 200"
        preserveAspectRatio="none"
        style={{
          position: 'absolute',
          bottom: -100,  // Cambiado de 50 a -50
          left: 0,
          width: '200%',
          height: '90%',
          fill: 'rgba(162, 174, 187, 0.08)', 
          animation: 'moveWavesRight 12s ease-in-out infinite alternate',
        }}
      >
        <path d="M0,80 C400,150 800,50 1200,120 L1200,200 L0,200 Z" />
      </svg>
      
      <style jsx>{`
        @keyframes moveWavesLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes moveWavesRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default AnimatedWaves;