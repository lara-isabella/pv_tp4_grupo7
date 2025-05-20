//Barra para la búsqueda de productos
import { useState, useCallback } from "react";

function BarraBusqueda({ alBuscar }) {
  const [terminoLocal, setTerminoLocal] = useState("");

  const manejarCambio = (e) => {
    setTerminoLocal(e.target.value);
  };

  const manejarBusqueda = useCallback(
    (e) => {
      e.preventDefault(); // Evita que se recargue la página al enviar el formulario
      alBuscar(terminoLocal);
    },
    [terminoLocal, alBuscar]
  );

  return (
    <form onSubmit={manejarBusqueda}>
      <input
        type="text"
        placeholder="Busca por nombre o ID :)"
        value={terminoLocal}
        onChange={manejarCambio}
      />
      <button type="submit">Buscar</button>
    </form>
  );
}

export default BarraBusqueda;
