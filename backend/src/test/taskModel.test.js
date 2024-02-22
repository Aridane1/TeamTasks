
const { connect, clearDatabase } = require('./setup');
import Task from '../models/task.model'; // Asegúrate de que la ruta sea correcta
/**
 * Conectar a una nueva base de datos antes de correr cualquier test.
 */
beforeAll(async () => await connect());

/**
 * Limpiar los datos después de cada test.
 */
afterEach(async () => await clearDatabase());

/**
 * Cerrar la base de datos después de todos los tests.
 */
// afterAll(async () => {
//   await closeDatabase();
// }, 30000); // Aumenta el tiempo de espera a 30 segundos


describe('Task Model Test', () => {
  /**
   * Test para verificar si la creación de una tarea funciona correctamente.
   */
  it('create & save task successfully', async () => {
    const taskData = {
      title: 'Test Task',
      description: 'Test Description',
      limit_day: '2023-01-01',
      tag: 'Test Tag',
      task_image: 'test-image.jpg',
    };

    const validTask = new Task(taskData);
    const savedTask = await validTask.save();

    // Verificar si los campos son correctamente guardados.
    expect(savedTask._id).toBeDefined();
    expect(savedTask.title).toBe(taskData.title);
    expect(savedTask.description).toBe(taskData.description);
    expect(savedTask.limit_day).toBe(taskData.limit_day);
    expect(savedTask.tag).toBe(taskData.tag);
    expect(savedTask.task_image).toBe(taskData.task_image);
  });
});
