const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

/**
 * Conectar a la base de datos en memoria antes de iniciar las pruebas.
 */
exports.connect = async () => {
    // Verificar si ya existe una conexión activa.
    if (mongoose.connection.readyState === 1) {
      return;
    }
  
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
  
    await mongoose.connect(uri);
  };
  

/**
 * Elimina la base de datos, cierra la conexión y detiene mongoServer.
 */
exports.closeDatabase = async () => {
  if (mongoServer) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
  }
};

/**
 * Borra las colecciones de la base de datos.
 */
exports.clearDatabase = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
};
const { connect, clearDatabase, closeDatabase } = require('./setup'); // Ajusta la ruta según sea necesario

beforeAll(async () => await connect(), 60000); // Aumentar el timeout si es necesario
afterAll(async () => await closeDatabase(), 60000);

describe('Task Model Test', () => {
  it('create & save task successfully', async () => {
    // Tu código de prueba aquí
  });
});
