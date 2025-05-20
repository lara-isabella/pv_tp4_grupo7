import { useState, useEffect, useMemo, useCallback } from "react";
import "./App.css";
import Formulario from "./assets/formulario.jsx";
import BarraBusqueda from "./assets/components/barraBusqueda.jsx";

function App() {
  const [productos, setProductos] = useState(() => {
  return JSON.parse(localStorage.getItem("productos")) || [];
});

const [terminoBusqueda, setTerminoBusqueda] = useState("");
const [productoSeleccionado, setProductoSeleccionado] = useState(null);

useEffect(() => {
  console.log(
    "%cProductos actualizados:",
    "color: green; font-size: 16px; font-weight: bold;"
  );
  console.table(productos);
  localStorage.setItem("productos", JSON.stringify(productos));
}, [productos]);

  const agregarProducto = useCallback((productoNuevo) => {
    setProductos((prevProductos) => [...prevProductos, productoNuevo]);
  }, []);

  const eliminarProducto = useCallback((id) => {
    setProductos((prevProductos) => prevProductos.filter((producto) => producto.id !== id));
    setProductoSeleccionado(null);
  }, []);

  const modificarProducto = useCallback((productoModificado) => {
    setProductos((prevProductos) =>
      prevProductos.map((producto) => 
        producto.id === productoModificado.id ? productoModificado : producto
      )
    );
    setProductoSeleccionado(null);
  }, []);

  const seleccionarProducto = useCallback((producto) => {
    setProductoSeleccionado(producto);
  }, []);

  const buscarProducto = useCallback((termino) => {
    setTerminoBusqueda(termino);
  }, []);

  const productosFiltrados = useMemo(() => {
  const termino = terminoBusqueda.trim().toLowerCase();
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
                  e.stopPropagation(); 
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
