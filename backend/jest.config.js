module.exports = {
    testEnvironment: 'node', // Entorno de ejecución de las pruebas. 'node' es adecuado para backends.
    preset: '@shelf/jest-mongodb', // Si usas MongoDB en memoria para pruebas
    testPathIgnorePatterns: ['/node_modules/'], // Ignorar la carpeta node_modules
    coverageDirectory: 'coverage', // Directorio donde se guardarán los informes de cobertura
    collectCoverageFrom: ['**/*.{js,jsx}', '!**/node_modules/**', '!**/vendor/**'], // Archivos para cobertura
  };
  