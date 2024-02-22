import { connect, clearDatabase, closeDatabase } from './setup';
import User from '../models/user.model'; // Ajusta la ruta según sea necesario
import Task from '../models/task.model'; // Ajusta la ruta según sea necesario
import UserTask from '../models/userTask.model'; // Ajusta la ruta según sea necesario

beforeAll(async () => await connect());

afterEach(async () => await clearDatabase());

// Opcional: Si decides cerrar la base de datos después de todos los tests
// afterAll(async () => await closeDatabase(), 30000);

describe('UserTask Model Test', () => {
  it('create & save userTask successfully', async () => {
    // Primero, crea un User y un Task para usar en UserTask
    const user = new User({
      username: 'testUser',
      password: 'testPassword',
      email: 'user@example.com',
    });
    const savedUser = await user.save();

    const task = new Task({
      title: 'Test Task',
      description: 'Test Description',
      limit_day: '2023-01-01',
      tag: 'Test Tag',
      task_image: 'test-image.jpg',
    });
    const savedTask = await task.save();

    // Ahora, crea un UserTask con las referencias a User y Task
    const userTaskData = {
      user_id: savedUser._id,
      task_id: savedTask._id,
      rol: 'collaborator',
    };

    const validUserTask = new UserTask(userTaskData);
    const savedUserTask = await validUserTask.save();

    // Verificaciones
    expect(savedUserTask._id).toBeDefined();
    expect(savedUserTask.user_id.toString()).toBe(savedUser._id.toString());
    expect(savedUserTask.task_id.toString()).toBe(savedTask._id.toString());
    expect(savedUserTask.rol).toBe(userTaskData.rol);
  });
});
