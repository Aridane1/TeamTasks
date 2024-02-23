require("dotenv").config({ path: ".env.test" });
const request = require('supertest');
import app from '../config/app'; // Ajusta esta ruta al archivo que exporta tu aplicación Express
const mongoose = require('mongoose');
const UserTask = require('../models/userTask.model');
const User = require('../models/user.model');
const Task = require('../models/task.model');



describe("POST /userTasks", () => {
  let userId, taskId;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true });

    // Crear un usuario de prueba para referenciar en UserTask
    const user = new User({
      username: "testUser",
      password: "testPassword", // Asegúrate de aplicar cualquier hashing necesario en producción
      email: "test@example.com"
    });
    const savedUser = await user.save();
    userId = savedUser._id;

    // Crear una tarea de prueba para referenciar en UserTask
    const task = new Task({
      title: "Test Task",
      description: "This is a test task",
      limit_day: "2023-01-01",
      tag: "Test Tag",
      task_image: "path/to/image.jpg"
    });
    const savedTask = await task.save();
    taskId = savedTask._id;
  });

  afterAll(async () => {
    // Limpieza de la base de datos
    await UserTask.deleteMany({});
    await User.deleteMany({});
    await Task.deleteMany({});
    await mongoose.connection.close();
  });

  test("debería agregar una nueva UserTask y devolver un mensaje", async () => {
    const response = await request(app)
      .post('/userTasks') // Ajusta esta ruta según sea necesario
      .send({
        user_id: userId.toString(),
        task_id: taskId.toString(),
        rol: "algún rol"
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toHaveProperty('_id'); // Asegurándose de que se crea una UserTask

    // Verifica que la UserTask se haya agregado a la base de datos
    const userTaskInDb = await UserTask.findOne({ _id: response.body.message._id });
    expect(userTaskInDb).toBeTruthy();
    expect(userTaskInDb.user_id.equals(userId)).toBe(true);
    expect(userTaskInDb.task_id.equals(taskId)).toBe(true);
  });
});
describe("GET /userTasks", () => {
    beforeAll(async () => {
      await mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true });
  
      // Opcional: limpiar las colecciones antes de ejecutar las pruebas
      await UserTask.deleteMany({});
      await User.deleteMany({});
      await Task.deleteMany({});
    });
  
    test("debería devolver un arreglo vacío cuando no hay tareas de usuarios registradas", async () => {
      const response = await request(app).get('/userTasks'); // Ajusta esta ruta según sea necesario
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual([]); // Verifica que la respuesta sea un arreglo vacío
    });
  
    test("debería devolver todas las tareas de usuarios registradas", async () => {
      // Crear usuarios y tareas de prueba para referenciar en UserTask
      const user = new User({ username: "testUser", password: "testPassword", email: "test@example.com" });
      const savedUser = await user.save();
  
      const task = new Task({ title: "Test Task", description: "This is a test task", limit_day: "2023-01-01", tag: "Test Tag" });
      const savedTask = await task.save();
  
      const userTask = new UserTask({ user_id: savedUser._id, task_id: savedTask._id, rol: "testRole" });
      await userTask.save();
  
      const response = await request(app).get('/userTasks'); // Ajusta esta ruta según sea necesario
      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBe(1); // Verifica que se devuelve al menos una UserTask
      expect(response.body[0]).toHaveProperty('_id');
      expect(response.body[0].user_id).toEqual(savedUser._id.toString());
      expect(response.body[0].task_id).toEqual(savedTask._id.toString());
    });
  
    afterAll(async () => {
      // Limpieza de la base de datos después de las pruebas
      await UserTask.deleteMany({});
      await User.deleteMany({});
      await Task.deleteMany({});
      await mongoose.connection.close();
    });
  });   