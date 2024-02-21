import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Card } from '../components/Card'; // Asegúrate de que la ruta al componente Card sea correcta
import '@testing-library/jest-dom';
import { useNavigate } from 'react-router-dom';

// Mock para useNavigate y taskService.deleteTaskUser
vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));
vi.mock('../path/to/your/services/TaskService', () => ({
  deleteTaskUser: vi.fn(() => Promise.resolve()),
}));

describe('Card Component', () => {
  beforeEach(() => {
    vi.clearAllMocks(); // Limpia mocks antes de cada prueba
  });

  it('renders correctly', () => {
    render(<Card id="1" title="Test Task" description="This is a test" image="test.jpg" quantityUser="1" />);
    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('This is a test')).toBeInTheDocument();
  });

  it('navigates when the image is clicked', () => {
    const mockedNavigate = vi.fn();
    vi.mocked(useNavigate).mockImplementation(() => mockedNavigate); // Reemplaza la implementación de useNavigate con el mock

    render(<Card id="1" title="Test Task" description="This is a test" image="test.jpg" quantityUser="1" />);

    // Asegúrate de que el elemento que clicas tenga el texto alternativo (alt) correcto. Esto puede requerir ajustes.
    fireEvent.click(screen.getByAltText('Test Task'));

    // Verifica si useNavigate ha sido llamado con los argumentos correctos
    expect(mockedNavigate).toHaveBeenCalledWith('/viewTask', {
      state: {
        title: 'Test Task',
        description: 'This is a test',
        image: 'test.jpg',
        quantityUser: '1',
      },
    });
  });
});
