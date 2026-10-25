import { formatoCLP, hayConflicto, generarId, siguienteEstado, calcularTotal } from '../utils/eventos.js';

describe('Funciones utilitarias de eventos', () => {
  it('formatoCLP formatea correctamente', () => {
    expect(formatoCLP(1200000)).toBe('$1.200.000');
    expect(formatoCLP(0)).toBe('$0');
  });

  it('generarId genera el siguiente ID correctamente', () => {
    const eventos = [{ id: 'EV-101' }, { id: 'EV-104' }];
    expect(generarId(eventos)).toBe('EV-105');
  });

  it('siguienteEstado avanza correctamente', () => {
    expect(siguienteEstado('Consultado')).toBe('Reservado');
    expect(siguienteEstado('En planificación')).toBe('En ejecución');
    expect(siguienteEstado('Finalizado')).toBe('Finalizado');
  });

  it('hayConflicto detecta doble reserva', () => {
    const eventos = [
      { id: 'EV-101', salonCodigo: 'SL001', fecha: '2026-10-15', estado: 'Reservado' }
    ];
    expect(hayConflicto(eventos, 'SL001', '2026-10-15')).toBeTrue();
    expect(hayConflicto(eventos, 'SL001', '2026-10-16')).toBeFalse();
    expect(hayConflicto(eventos, 'SL002', '2026-10-15')).toBeFalse();
  });

  it('calcularTotal calcula correctamente con servicios', () => {
    const total = calcularTotal('SL002', '40', ['SE002']);
    expect(total).toBe(450000);
  });
});
