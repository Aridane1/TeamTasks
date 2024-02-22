// Importa las dependencias necesarias
import request from 'supertest';
import app from '../config/app'; // Asegúrate de ajustar la ruta a tu archivo de aplicación Express
import Tag from '../models/tag.model'; // Asegúrate de que la ruta sea correcta

// Mock del modelo Tag para evitar operaciones de base de datos reales
jest.mock('../models/tag.model');

describe('GET /api/tag/:id', () => {
  it('should return 404 if no tag is found', async () => {
    // Configura el mock para simular que no se encontró la etiqueta
    Tag.findById.mockResolvedValue(null);

    const response = await request(app).get('/api/tag/someNonExistingId');

    expect(response.status).toBe(404);
    expect(response.text).toBe("No se encontró la etiqueta");
  });

  it('should return the tag if it is found', async () => {
    // Configura el mock para simular que se encontró la etiqueta
    const mockTag = { _id: 'someExistingId', title: 'Test Tag', createdAt: '2020-01-01', updatedAt: '2020-01-02' };
    Tag.findById.mockResolvedValue(mockTag);

    const response = await request(app).get(`/api/tag/${mockTag._id}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockTag);
  });
});

  