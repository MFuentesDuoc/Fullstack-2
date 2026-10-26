import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
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

function Contador() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Has hecho clic {count} veces</p>
      <button onClick={() => setCount(count + 1)}>Incrementar</button>
    </div>
  );
}

function BotonAccion({ onClick, label }) {
  return <button onClick={onClick}>{label}</button>;
}

describe('Pruebas de estado y eventos', () => {
  it('cambia el estado al escribir en el formulario', async () => {
    const user = userEvent.setup();
    render(<ComponenteFormulario />);
    const input = screen.getByLabelText('Nombre');
    await user.type(input, 'Juan');
    expect(screen.getByTestId('resultado')).toHaveTextContent('Juan');
  });

  it('renderiza condicionalmente un mensaje de error', () => {
    function ComponenteConError({ error }) {
      return <div>{error && <p role="alert">Error: {error}</p>}</div>;
    }
    const { rerender } = render(<ComponenteConError error="" />);
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    rerender(<ComponenteConError error="Campo requerido" />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText(/Campo requerido/)).toBeInTheDocument();
  });

  it('incrementa al hacer clic una vez', async () => {
    const user = userEvent.setup();
    render(<Contador />);
    expect(screen.getByText(/has hecho clic 0 veces/i)).toBeInTheDocument();
    const boton = screen.getByRole('button', { name: /incrementar/i });
    await user.click(boton);
    expect(screen.getByText(/has hecho clic 1 veces/i)).toBeInTheDocument();
  });

  it('llama a onClick al hacer clic', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<BotonAccion label="Guardar" onClick={handleClick} />);
    await user.click(screen.getByRole('button', { name: /guardar/i }));
    expect(handleClick).toHaveBeenCalledOnce();
  });
});
