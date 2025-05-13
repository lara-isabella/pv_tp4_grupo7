import { useState, useEffect } from "react";

function Formulario({ alAgregar, alModificar, productoSeleccionado }) {
  const [descripcion, setDescripcion] = useState("");
  const [precioUnitario, setPrecioUnitario] = useState("");
  const [stock, setStock] = useState("");
  const [modoEdicion, setModoEdicion] = useState(false);

  // Si hay un producto seleccionado, cargar sus datos en el formulario
  useEffect(() => {
    if (productoSeleccionado) {
      setDescripcion(productoSeleccionado.descripcion);
      setPrecioUnitario(productoSeleccionado.precioUnitario);
      setStock(productoSeleccionado.stock);
      setModoEdicion(true);
    } else {
      setDescripcion("");
      setPrecioUnitario("");
      setStock("");
      setModoEdicion(false);
    }
  }, [productoSeleccionado]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevoProducto = {
      id: modoEdicion ? productoSeleccionado.id : Date.now(),
      descripcion,
      precioUnitario: parseFloat(precioUnitario),
      stock: parseInt(stock),
    };

    if (modoEdicion) {
      alModificar(nuevoProducto);
    } else {
      alAgregar(nuevoProducto);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        className="mb-2"
      />
      <input
        type="number"
        placeholder="Precio Unitario"
        value={precioUnitario}
        onChange={(e) => setPrecioUnitario(e.target.value)}
        className="mb-2"
      />
      <input
        type="number"
        placeholder="Stock"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        className="mb-2"
      />
      <button type="submit" className="bg-blue-500 text-white px-2 py-1 rounded">
        {modoEdicion ? "Modificar Producto" : "Agregar Producto"}
      </button>
    </form>
  );
}

export default Formulario;
