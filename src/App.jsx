import { useState, useEffect, useMemo, useCallback } from "react";
import "./App.css";
import Formulario from "./assets/formulario.jsx";
import BarraBusqueda from "./assets/components/barraBusqueda.jsx";

function App() {
  const [productos, setProductos] = useState([]);
  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  // Cargar productos desde localStorage al iniciar
  useEffect(() => {
    const productosGuardados = JSON.parse(localStorage.getItem("productos")) || [];
    setProductos(productosGuardados);
  }, []);

  // Guardar productos en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem("productos", JSON.stringify(productos));
  }, [productos]);

  // Agregar producto
  const agregarProducto = (productoNuevo) => {
    setProductos([...productos, productoNuevo]);
  };

  // Eliminar producto
  const eliminarProducto = (id) => {
    const productosActualizados = productos.filter((producto) => producto.id !== id);
    setProductos(productosActualizados);
    setProductoSeleccionado(null); // Si se estaba editando, deseleccionar
  };

  // Modificar producto
  const modificarProducto = (productoModificado) => {
    const productosActualizados = productos.map((producto) =>
      producto.id === productoModificado.id ? productoModificado : producto
    );
    setProductos(productosActualizados);
    setProductoSeleccionado(null); // Termina la edición
  };

  // Seleccionar producto para editar
  const seleccionarProducto = (producto) => {
    setProductoSeleccionado(producto);
  };

  // Buscar producto (con useCallback)
  const buscarProducto = useCallback((termino) => {
    setTerminoBusqueda(termino);
  }, []);

  // Filtrar productos por búsqueda
  const productosFiltrados = useMemo(() => {
    const termino = terminoBusqueda.toLowerCase();
    return productos.filter((producto) =>
      producto.nombre.toLowerCase().includes(termino) ||
      producto.id.toString().includes(termino)
    );
  }, [productos, terminoBusqueda]);

  return (
    <div>
      <h1>Gestión de Productos</h1>

      <Formulario 
        alAgregar={agregarProducto} 
        alModificar={modificarProducto} 
        productoSeleccionado={productoSeleccionado}
      />

      <BarraBusqueda alBuscar={buscarProducto} />

      <h2>Lista de Productos</h2>

      {productosFiltrados.length === 0 ? (
        <p>No hay productos disponibles.</p>
      ) : (
        <ul>
          {productosFiltrados.map((producto) => (
            <li 
              key={producto.id} 
              className={`mb-2 cursor-pointer ${productoSeleccionado?.id === producto.id ? 'bg-yellow-300' : ''}`}
              onClick={() => seleccionarProducto(producto)}
            >
              ID: {producto.id} - Nombre: {producto.nombre} - Marca: {producto.marca} - Precio Unitario: ${producto.precioUnit} - Descuento: {producto.descuento}% - Precio Final: ${producto.precioFinal} - Stock: {producto.stock}
              <button
                className="ml-2 px-2 py-1 bg-red-500 text-white rounded"
                onClick={(e) => {
                  e.stopPropagation(); // Evita activar el seleccionar producto
                  eliminarProducto(producto.id);
                }}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;