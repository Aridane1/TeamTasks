import { connect, clearDatabase, closeDatabase } from './setup';
import User from '../models/user.model'; // Asegúrate de que la ruta sea correcta
import Configuration from '../models/configuration.model'; // Asegúrate de que la ruta sea correcta

beforeAll(async () => await connect());

afterEach(async () => await clearDatabase());

// Opcional: Si decides cerrar la base de datos después de todos los tests
// afterAll(async () => await closeDatabase(), 30000);

describe('Configuration Model Test', () => {
  it('create & save configuration successfully', async () => {
    // Primero, crea un User para usar en la configuración
    const user = new User({
      username: 'testUser',
      password: 'testPassword',
      email: 'user@example.com',
    });
    const savedUser = await user.save();

    // Ahora, crea una configuración asociada al usuario creado
    const configurationData = {
      night_mode: true,
      list_mode: false,
      user_image: 'https://example.com/user_image.jpg',
      user_id: savedUser._id,
    };

    const configuration = new Configuration(configurationData);
    const savedConfiguration = await configuration.save();

    // Verificaciones
    expect(savedConfiguration._id).toBeDefined();
    expect(savedConfiguration.night_mode).toBe(configurationData.night_mode);
    expect(savedConfiguration.list_mode).toBe(configurationData.list_mode);
    expect(savedConfiguration.user_image).toBe(configurationData.user_image);
    // Verificar que el user_id guardado corresponde al del usuario creado
    expect(savedConfiguration.user_id.toString()).toBe(savedUser._id.toString());
  });
});
