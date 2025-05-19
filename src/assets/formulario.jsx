import React from 'react';
import { useState } from 'react';

function Formulario({ alAgregar, alModificar, productoSeleccionado }){
    const [productos, setProd] = useState([]);
    const [nombre, setNombre] = useState('');
    const [preciounit, setPrecioU] = useState('');
    const [descuento, setDescuento] = useState('');
    const [stock, setStock] = useState('');
    const [idContador, setIdCounter] = useState(1);
    const [estado, setEstado] = useState(true);

    useEffect(() => {
        // cuando cambia el prod seleccionado actualiza el formulario para modificar
        if (productoSeleccionado) {
            setId(productoSeleccionado.id);
            setNombre(productoSeleccionado.nombre);
            setPrecioUnit(productoSeleccionado.precioUnit);
            setDescuento(productoSeleccionado.descuento || 0);
            setStock(productoSeleccionado.stock);
        } else {
            // limpia formulario cuando no hay producto seleccionado
            setId(null);
            setNombre("");
            setPrecioUnit("");
            setDescuento("");
            setStock("");
        }
    }, [productoSeleccionado]);

    const manejarSubmit = (evento)=> {
        evento.preventDefault();

        const precio = parseFloat(preciounit);
        const descuento = parseFloat(descuento);
        const precioDescuento = precio - (precio * descuento / 100);

        const nuevoProd = {
            id: idContador,
            nombre,
            preciounit,
            descuento,
            precioFinal: precioDescuento,
            stock,
            estado // si esta en true el producto se meustra, si esta en false se hace la eliminacion logica que pide la indicacion
        };

        setProd([...productos, nuevoProd]);
        setIdCounter(idContador + 1);
        setNombre('');
        setPrecioU('');
        setDescuento('');
        setStock('');
        setEstado(true);
    }

    return (
        <div>
            <h1> Agregar Nuevo Producto </h1>
            <form onSubmit={manejarSubmit}>
                <div>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        value={nombre}
                        onChange={(evento) => setNombre(evento.target.value)}
                        required/>
                </div>
                <div>
                    <label>Precio Unitario:</label>
                    <input
                        type="number"
                        value={preciounit}
                        onChange={(evento) => setPrecioU(evento.target.value)}
                        required/>
                </div>
                <div>
                    <label>Descuento:</label>
                    <input
                        type="number"
                        value={descuento}
                        onChange={(evento) => setDescuento(evento.target.value)}
                        required/>
                </div>
                {preciounit && descuento && !isNaN(preciounit) && !isNaN(descuento) && (
                    <div>
                        <label>Precio con Descuento:</label>
                        <p>
                            ${(
                                preciounit - (preciounit * descuento) / 100

                            )}
                        </p>
                    </div>
                )}
                <div>
                    <label>Stock:</label>
                    <input
                        type="number"
                        value={stock}
                        onChange={(evento) => setStock(evento.target.value)}
                        required/>
                </div>
                <button type="submit">Agregar Producto</button>
            </form>

        </div>
    )

}

export default Formulario;