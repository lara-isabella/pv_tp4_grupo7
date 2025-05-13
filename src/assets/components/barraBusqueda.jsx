import { useState } from 'react';

const BarraBusqueda = ({ alBuscar }) => {
  const [terminoBusqueda, setTerminoBusqueda] = useState('');

  const manejarCambio = (evento) => {
    const valor = evento.target.value;
    setTerminoBusqueda(valor);
    alBuscar(valor); 
  };

  return (
    <div className="p-2">
      <input
        type="text"
        placeholder="Buscar por ID o descripción"
        value={terminoBusqueda}
        onChange={manejarCambio}
        className="border rounded p-2 w-full"
      />
    </div>
  );
};

export default BarraBusqueda;
