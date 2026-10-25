import { render, screen } from '@testing-library/react';
import { useState } from 'react';

function ComponenteFormulario() {
  const [nombre, setNombre] = useState('');
  return (
    <div>
      <label htmlFor="nombre">Nombre</label>
      <input id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
      <p data-testid="resultado">{nombre}</p>
    </div>
  );
}

describe('Pruebas de estado y eventos', () => {
  it('cambia el estado al escribir en el formulario', () => {
    render(<ComponenteFormulario />);
    const input = screen.getByLabelText('Nombre');
    input.value = 'Juan';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    expect(screen.getByTestId('resultado').textContent).toBe('Juan');
  });

  it('renderiza condicionalmente un mensaje de error', () => {
    function ComponenteConError({ error }) {
      return <div>{error && <p role="alert">Error: {error}</p>}</div>;
    }
    const { rerender } = render(<ComponenteConError error="" />);
    expect(screen.queryByRole('alert')).toBeNull();
    rerender(<ComponenteConError error="Campo requerido" />);
    expect(screen.getByRole('alert')).toBeTruthy();
    expect(screen.getByText(/Campo requerido/)).toBeTruthy();
  });
});
