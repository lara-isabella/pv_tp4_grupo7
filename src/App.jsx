import { useState, useEffect, useMemo, useCallback } from "react";
import "./App.css";
import Formulario from "./assets/formulario.jsx";
import BarraBusqueda from "./assets/components/barraBusqueda.jsx";

function App() { 
  const [productos, setProductos] = useState([]);
  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [ultimoId, setUltimoId] = useState(0);

  useEffect(() => {
    const productosGuardados = JSON.parse(localStorage.getItem("productos")) || [];
    setProductos(productosGuardados);

    const idGuardado = parseInt(localStorage.getItem("ultimoId")) || 0;
    setUltimoId(idGuardado);
  }, []);


useEffect(() => {
  console.log(
    "%cProductos actualizados:",
    "color: green; font-size: 16px; font-weight: bold;"
  );
  console.table(productos);
  localStorage.setItem("productos", JSON.stringify(productos));
}, [productos]);

  useEffect(() => {
    localStorage.setItem("ultimoId", ultimoId.toString());
  }, [ultimoId]);

  const agregarProducto = (productoNuevo) => {
    const nuevoProducto = { ...productoNuevo, id: ultimoId + 1 };
    setProductos([...productos, nuevoProducto]);
    setUltimoId(ultimoId + 1);
  };

  const eliminarProducto = (id) => {
    const productosActualizados = productos.map((producto) =>
      producto.id === id ? { ...producto, estado: false } : producto
    );
    setProductos(productosActualizados);
    setProductoSeleccionado(null);
  };

  const modificarProducto = (productoModificado) => {
    const productosActualizados = productos.map((producto) =>
      producto.id === productoModificado.id ? productoModificado : producto
    );
    setProductos(productosActualizados);
    setProductoSeleccionado(null);
  };

  const seleccionarProducto = (producto) => {
    setProductoSeleccionado(producto);
  };

  const buscarProducto = useCallback((termino) => {
    setTerminoBusqueda(termino);
  }, []);

  const productosFiltrados = useMemo(() => {

    const termino = terminoBusqueda.toLowerCase();

    return productos.filter((producto) => {
      const coincideBusqueda =
        producto.nombre.toLowerCase().includes(termino) ||
        producto.id.toString().includes(termino);

      if (termino === "") {
        return producto.estado !== false;
      } else {
        return coincideBusqueda;
      }
    });
  }, [productos, terminoBusqueda]);


  const productosEliminados = useMemo(() => {
    return productos.filter((producto) => producto.estado === false);
  }, [productos]);

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
              <div>
                ID: {producto.id} - Nombre: {producto.nombre} - Marca: {producto.marca} - Precio Unitario: ${producto.precioUnit} - Descuento: {producto.descuento}% - Precio Final: ${producto.precioFinal} - Stock: {producto.stock}
                {producto.estado === false && (
                  <span style={{ color: 'red', marginLeft: '10px' }}> (Producto eliminado)</span>
                )}
              </div>
              {producto.estado !== false && (
                <button
                  className="ml-2 px-2 py-1 bg-red-500 text-white rounded"
                  onClick={(e) => {
                    e.stopPropagation();
                    eliminarProducto(producto.id);
                  }}
                >
                  Eliminar
                </button>
              )}
            </li>
          ))}
        </ul>
      )}

      <h2>Papelera</h2>
      {productosEliminados.length === 0 ? (
        <p>No hay productos en la papelera.</p>
      ) : (
        <ul className="papelera">
          {productosEliminados.map((producto) => (
            <li key={producto.id}>
              ID: {producto.id} - Nombre: {producto.nombre} - Marca: {producto.marca}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
