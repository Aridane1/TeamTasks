import { connect, clearDatabase, closeDatabase } from './setup';
import User from '../models/user.model'; // Asegúrate de que la ruta sea correcta

beforeAll(async () => await connect());

afterEach(async () => await clearDatabase());

// Opcional: Si decides cerrar la base de datos después de todos los tests
// afterAll(async () => await closeDatabase(), 30000);

describe('User Model Test', () => {
  it('create & save user successfully', async () => {
    const userData = {
      username: 'testUser',
      password: 'testPass',
      email: 'test@example.com',
    };

    const validUser = new User(userData);
    const savedUser = await validUser.save();

    // Verificar si los campos son correctamente guardados.
    expect(savedUser._id).toBeDefined();
    expect(savedUser.username).toBe(userData.username);
    expect(savedUser.password).toBe(userData.password); // En un caso real, la contraseña debería estar hasheada
    expect(savedUser.email).toBe(userData.email);
  });
});
