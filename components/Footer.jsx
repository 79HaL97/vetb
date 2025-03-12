import React from 'react';
import Image from 'next/image';

/**
 * Componente Footer para el dashboard de Tuberculosis
 * 
 * Muestra información del autor y enlaces de contacto
 */
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 px-8 mt-auto">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h3 className="text-xl font-bold">Dr. Harold Ozuna</h3>
          <p className="text-gray-300">Research, eHealth & Data Analysis</p>
        </div>
        
        <div className="flex items-center">
          <a 
            href="mailto:hola@haroldozuna.com"
            className="text-gray-300 hover:text-white transition-colors"
          >
            hola@haroldozuna.com
          </a>
          
          {/* Pipe bar separator */}
          <span className="text-gray-500 mx-3">|</span>
          
          <a 
            href="https://www.linkedin.com/in/harold-ozuna/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition-colors flex items-center"
            aria-label="LinkedIn Profile"
          >
            <Image 
              src="/assets/icons/linkedin.svg"
              alt="LinkedIn"
              width={24}
              height={24}
              className="text-gray-300 hover:text-white"
            />
          </a>
        </div>
      </div>
      
      <div className="text-center text-sm text-gray-500 mt-4">
        © {new Date().getFullYear()} - Dashboard de Vigilancia Epidemiológica de Tuberculosis
      </div>
    </footer>
  );
};

export default Footer;