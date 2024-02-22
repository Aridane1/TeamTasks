import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CardList } from '../components/CardList'; // Ajusta la ruta al componente CardList
import '@testing-library/jest-dom';


// Mock para useNavigate y taskService.deleteTaskUser
vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));
vi.mock('../services/TaskService', () => ({
  deleteTaskUser: vi.fn(() => Promise.resolve()),
}));

describe('CardList Component', () => {
  const mockGetAllTasksOfTheUser = vi.fn();

  beforeEach(() => {
    // Limpia mocks antes de cada prueba
    vi.clearAllMocks();
  });

  it('renders correctly', () => {
    render(
      <CardList
        id="1"
        title="Test Task"
        description="This is a test"
        image="test.jpg"
        rol="admin"
        tag="Urgent"
        quantityUser="1"
        getAllTasksOfTheUser={mockGetAllTasksOfTheUser}
      />
    );
    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('This is a test')).toBeInTheDocument();
    expect(screen.getByAltText('Test Task')).toBeInTheDocument();
  });
  });

