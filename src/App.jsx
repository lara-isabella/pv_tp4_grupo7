import { useState, useMemo } from 'react';
import './App.css';
import Formulario from './assets/components/formulario';
import BarraBusqueda from './assets/components/barraBusqueda';

function App() {
  const [productos, setProductos] = useState([]);
  const [terminoBusqueda, setTerminoBusqueda] = useState('');

  const agregarProducto = (productoNuevo) => {
    setProductos([...productos, productoNuevo]);
  };

  const productosFiltrados = useMemo(() => {
    return productos.filter((producto) => {
      const termino = terminoBusqueda.toLowerCase();
      return (
        producto.descripcion.toLowerCase().includes(termino) ||
        producto.id.toString().includes(termino)
      );
    });
  }, [productos, terminoBusqueda]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de Productos</h1>
      
      <Formulario alAgregar={agregarProducto} />
      
      <BarraBusqueda alBuscar={setTerminoBusqueda} />

      <h2 className="mt-4 text-xl font-semibold">Lista de Productos</h2>
      <ul className="mt-2 list-disc list-inside">
        {productosFiltrados.map((producto) => (
          <li key={producto.id}>
            ID: {producto.id} - {producto.descripcion} - ${producto.precioUnitario} - Stock: {producto.stock}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

/*import { useState } from 'react';
import './App.css' ;
import Formulario from './assets/components/formulario';

function App() {
  return (
    <div>
      <h1>Gestión de Productos</h1>
      <Formulario />
    </div>
  );
}

export default App;*/