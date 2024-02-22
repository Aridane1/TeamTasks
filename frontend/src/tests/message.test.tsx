import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Message } from '../components/Message'; // Asegúrate de usar la ruta correcta

describe('Message Component', () => {
  it('should render the message for the current user', () => {
    const messageText = 'Este es un mensaje de prueba';
    render(<Message username="user1" user="user1" index={0} message={messageText} />);
    
    const messageElement = screen.getByText(messageText);
    expect(messageElement).toBeInTheDocument();
    expect(messageElement.parentElement).toHaveClass('ml-auto'); // Verifica que se aplique la clase para el usuario actual
  });

  it('should render the message for other users', () => {
    const messageText = 'Este es un mensaje de otro usuario';
    render(<Message username="user2" user="user1" index={1} message={messageText} />);
    
    const messageElement = screen.getByText(messageText);
    expect(messageElement).toBeInTheDocument();
    expect(messageElement.parentElement).toHaveClass('mr-auto'); // Verifica que se aplique la clase para otros usuarios
  });
});
