const mongoose = require('mongoose');
require("dotenv").config({ path: ".env.test" });
const { addConfiguration } = require('../controllers/configuration.controller'); // Ajusta esta ruta
const Configuration = require('../models/configuration.model');
const User = require('../models/user.model');

describe("addConfiguration Controller", () => {
  let userId;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true });

    // Crear un usuario de prueba para usar su ID en la configuración
    const user = new User({ username: "testUser", email: "test@example.com", password: "password" });
    const savedUser = await user.save();
    userId = savedUser._id;
  });

  afterAll(async () => {
    // Limpieza de la base de datos
    await Configuration.deleteMany({});
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  test("debería agregar una nueva configuración y devolver un mensaje", async () => {
    // Mock de req y res
    const req = {
      body: {
        night_mode: true,
        list_mode: false,
        user_image: "path/to/image.jpg",
        user_id: userId
      }
    };
    const res = {
      send: jest.fn(),
      status: jest.fn(() => res)
    };

    await addConfiguration(req, res);

    // Verificar que se envió la respuesta correcta
    expect(res.send).toHaveBeenCalledWith(expect.objectContaining({
      message: expect.anything()
    }));

    // Verificar que la configuración se haya agregado a la base de datos
    const configInDb = await Configuration.findOne({ user_id: userId });
    expect(configInDb).toBeTruthy();
    expect(configInDb.night_mode).toBe(true);
    expect(configInDb.list_mode).toBe(false);
    expect(configInDb.user_image).toBe("path/to/image.jpg");
  });
});
