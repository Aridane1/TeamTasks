// userService.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import userService from '../services/UserService'; // Ajusta la ruta al archivo del servicio
import { backendAuthEnpoint } from '../constants/backendEndpoints';

const mock = new MockAdapter(axios);

describe('getAllUsers', () => {
  beforeEach(() => {
    mock.reset();
  });


  it('debe manejar un error', async () => {
    mock.onGet(`${backendAuthEnpoint}`).networkError();

    const result = await userService.getAllUsers();
    // Considerando que no se retorna nada en caso de error, puedes esperar un resultado indefinido
    expect(result).toBeUndefined();

    // Si ajustas la implementación para manejar errores de manera diferente, asegúrate de actualizar esta prueba acorde a esos cambios.
  });
});
