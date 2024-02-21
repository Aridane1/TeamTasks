import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ViewTask from '../pages/ViewTask'; // Asegúrate de que la ruta al componente ViewTask sea correcta
import { MemoryRouter } from 'react-router-dom';

// Asegúrate de que la importación de vi es correcta y que vi.mock se está utilizando correctamente
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom'); // Importa todo desde react-router-dom
  return {
    ...actual,
    useLocation: vi.fn(() => ({
      state: {
        title: "Test Task",
        description: "This is a test task description.",
        image: "test-image.jpg",
        quantityUser: "3",
      },
    })),
  };
});

describe('ViewTask Component', () => {
  it('renders correctly with provided location state', () => {
    // Asegúrate de que el componente se está renderizando dentro de un contexto de enrutador válido
    render(<ViewTask />, { wrapper: MemoryRouter });

    // Verificaciones
    expect(screen.getByText("Test Task")).toBeInTheDocument();
    expect(screen.getByText("This is a test task description.")).toBeInTheDocument();
    expect(screen.getByText("3 usuarios")).toBeInTheDocument();
    expect(screen.getByAltText("Test Task")).toHaveAttribute('src', expect.stringContaining("test-image.jpg"));
  });
});
