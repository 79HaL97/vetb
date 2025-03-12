# vetb

Este proyecto es un dashboard de seguimiento de casos de tuberculosis desarrollado con Next.js y Tailwind CSS. Se basa en datos provenientes de un archivo CSV y ofrece visualizaciones interactivas (gráficas de barras y de línea) junto con filtros para explorar la información.

## Características
- **Carga y filtrado de datos**: Procesa un CSV con información de casos, filtrando registros de Coahuila y permitiendo la selección por jurisdicción e institución.
- **Visualización de datos**:
    - Gráfica de barras para mostrar registros por jurisdicción.
    - Gráfica de línea (línea de tiempo) para mostrar casos por semana epidemiológica.
- **Interfaz responsiva**: Uso de Tailwind CSS para un diseño adaptable y moderno.
- **Despliegue en Vercel**: Configurado para utilizar rewrites (por ejemplo, en haroldozuna.com/vetb).

## Estructura del Proyecto
- `pages/` : Contiene las páginas de Next.js, incluyendo `index.js` con el dashboard.
- `components/` : Componentes reutilizables como `AnimatedWaves` y otros que conforman la interfaz.
- `public/data/` : Ubicación del archivo CSV (`TUBERCULOSIS_DX_clean.csv`).
- `vercel.json` : Archivo de configuración para los rewrites (por ejemplo, para servir la aplicación desde una subruta como `/vetb`).
- `tailwind.config.js` : Configuración extendida de Tailwind con los colores y fuentes personalizados.

## Despliegue en Vercel
El proyecto está preparado para desplegarse en Vercel. Para ello:
- Si deseas que la aplicación se sirva desde una subruta (por ejemplo, haroldozuna.com/vetb), utiliza el archivo `vercel.json` con las reglas de rewrite.
- Realiza un commit de tus cambios y despliega con:
    ```sh
    vercel –prod
    ```

## Personalización
- **Estilos**: Los colores, fuentes y otros estilos se definen en `tailwind.config.js`.
- **Lógica de datos**: La carga y filtrado del CSV se encuentra en `pages/index.js`. Puedes modificar la lógica de filtrado o visualización según tus necesidades.

## Notas
Este proyecto es una versión en desarrollo. Se pueden agregar o modificar funcionalidades y estilos según se requiera.

## Licencia
Este proyecto está licenciado bajo la Licencia MIT.
