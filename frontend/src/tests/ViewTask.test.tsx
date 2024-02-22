// ViewTask.test.tsx
import { describe, it, expect,  } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ViewTask from '../pages/ViewTask'; // Ajusta la ruta al archivo del componente

describe('ViewTask', () => {
  it('debe mostrar el título, descripción y tag cuando el mouse pasa sobre la imagen', async () => {
    const state = {
      title: 'Test Task',
      description: 'This is a test description',
      image: 'test-image.jpg',
      quantityUser: 5,
      tag: 'Urgent'
    };

    render(
      <MemoryRouter initialEntries={[{ pathname: '/view-task', state }]}>
        <Routes>
          <Route path='/view-task' element={<ViewTask />} />
        </Routes>
      </MemoryRouter>
    );

    // Verifica si el título y la descripción son renderizados correctamente
    expect(screen.getByText(state.title)).toBeInTheDocument();
    expect(screen.getByText(state.description)).toBeInTheDocument();
    
    // Simula el evento de pasar el mouse sobre la imagen
    const image = screen.getByAltText(state.title);
    await userEvent.hover(image);

    // Verifica si el tag es mostrado cuando el mouse pasa sobre la imagen
    expect(screen.getByText(state.tag)).toBeInTheDocument();

    // Simula el evento de quitar el mouse de la imagen
    await userEvent.unhover(image);

    // Verifica si el tag se oculta cuando el mouse deja la imagen (opcional, dependiendo del comportamiento esperado)
    expect(screen.queryByText(state.tag)).toBeNull();
  });
});
