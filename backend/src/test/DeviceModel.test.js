import { connect, clearDatabase, closeDatabase } from './setup';
import User from '../models/user.model'; // Ajusta la ruta según sea necesario
import Device from '../models/device.model'; // Asegúrate de que la ruta sea correcta y el nombre coincida

beforeAll(async () => await connect());

afterEach(async () => await clearDatabase());

// Opcional: Si decides cerrar la base de datos después de todos los tests
// afterAll(async () => await closeDatabase(), 30000);

describe('Device Model Test', () => {
  it('create & save device successfully', async () => {
    // Primero, crea un User para usar en Device
    const user = new User({
      username: 'deviceUser',
      password: 'devicePassword',
      email: 'deviceuser@example.com',
    });
    const savedUser = await user.save();

    // Ahora, crea un Device asociado al User creado
    const deviceData = {
      endpoint: 'https://example.com/device-endpoint',
      keys: {
        p256dh: 'p256dhKey',
        auth: 'authKey',
      },
      user_id: savedUser._id,
    };

    const validDevice = new Device(deviceData);
    const savedDevice = await validDevice.save();

    // Verificaciones
    expect(savedDevice._id).toBeDefined();
    expect(savedDevice.endpoint).toBe(deviceData.endpoint);
    expect(savedDevice.keys.p256dh).toBe(deviceData.keys.p256dh);
    expect(savedDevice.keys.auth).toBe(deviceData.keys.auth);
    expect(savedDevice.user_id.toString()).toBe(savedUser._id.toString());
  });
});
