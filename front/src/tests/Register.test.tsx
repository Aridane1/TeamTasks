import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Register from '../pages/Register'; // Ajusta la ruta de importación según sea necesario
import { MemoryRouter } from 'react-router-dom';

// Mock authService y useNavigate
vi.mock('../services/AuthService', () => ({
  __esModule: true,
  default: {
    register: vi.fn(),
  },
}));

vi.mock('react-router-dom', async () => ({
  ...await vi.importActual('react-router-dom'),
  useNavigate: vi.fn(),
}));

beforeEach(() => {
  window.matchMedia = vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
});

describe('Register Component', () => {
  it('renders the registration form without crashing', () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    // En lugar de buscar por etiquetas, busca directamente el botón de registro
    const registerButton = screen.getByRole('button', { name: /registrarse/i });
    expect(registerButton).toBeInTheDocument();
    
    // O busca por texto visible que esperarías encontrar en el componente
    expect(screen.getByText(/registrarte/i)).toBeInTheDocument();
    expect(screen.getByText(/ya tienes una cuenta\?/i)).toBeInTheDocument();
  });
});
