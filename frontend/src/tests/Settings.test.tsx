// Setting.test.tsx
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Setting from '../pages/Setting'; // Asegúrate de ajustar esta ruta
import * as globalFunctions from '../utils/shared/globalFunctions'; // Ajusta esta ruta

describe('Setting Component', () => {
  beforeEach(() => {
    // Mockea `decodeToken` para que siempre devuelva un objeto de usuario específico
    vi.spyOn(globalFunctions, 'decodeToken').mockReturnValue({
        id: 'user-id',
        username: ''
    });
  });

  it('debe renderizar el componente correctamente', () => {
    render(
      <MemoryRouter>
        <Setting />
      </MemoryRouter>
    );

    // Verifica si el texto "Ajustes" está en el documento
    expect(screen.getByText('Ajustes')).toBeInTheDocument();

    // Aquí puedes añadir más verificaciones según sea necesario,
    // como verificar la presencia de switches, botones, etc.
    expect(screen.getByText('Modo oscuro:')).toBeInTheDocument();
    expect(screen.getByText('Modo lista:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Permitir notificaciones' })).toBeInTheDocument();
  });

  afterEach(() => {
    // Restaura los mocks después de cada test para evitar contaminación entre tests
    vi.restoreAllMocks();
  });
});
