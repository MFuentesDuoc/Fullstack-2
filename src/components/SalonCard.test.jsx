import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SalonCard from './SalonCard.jsx';
import { BrowserRouter } from 'react-router-dom';

const salonMock = {
  codigo: "SL001",
  nombre: "Salón Principal",
  capacidad: 500,
  precio: 1200000,
  descripcion: "Ideal para congresos",
  equipamiento: "Proyector, Sonido"
};

function renderWithRouter(ui) {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
}

describe('SalonCard', () => {
  it('renderiza correctamente los datos del salón', () => {
    renderWithRouter(<SalonCard salon={salonMock} />);
    expect(screen.getByText('SL001')).toBeInTheDocument();
    expect(screen.getByText('Salón Principal')).toBeInTheDocument();
    expect(screen.getByText(/Cap: 500/)).toBeInTheDocument();
  });

  it('muestra el botón para reservar', () => {
    renderWithRouter(<SalonCard salon={salonMock} />);
    const boton = screen.getByText(/Reservar Salón/i);
    expect(boton).toBeInTheDocument();
  });
});
