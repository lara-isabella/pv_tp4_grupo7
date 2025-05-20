//Barra para busqueda de productos
import React, { useCallback } from "react";

const BarraBusqueda = ({ alBuscar }) => {
  const manejarCambio = useCallback((e) => {
    alBuscar(e.target.value);
  }, [alBuscar]);

  return (
    <div>
      <input
        type="text"
        placeholder="Busca por nombre o ID"
        onChange={manejarCambio}
      />
    </div>
  );
};

export default BarraBusqueda;
