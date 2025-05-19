import React from 'react';
import { useState, useEffect } from 'react';

function Formulario({ alAgregar, alModificar, productoSeleccionado }){
    const [productos, setProd] = useState([]);
    const [nombre, setNombre] = useState('');
    const [marca, setMarca] = useState('');
    const [precioUnit, setPrecioU] = useState('');
    const [descuento, setDescuento] = useState('');
    const [stock, setStock] = useState('');
    const [idContador, setIdCounter] = useState(1);
    const [estado, setEstado] = useState(true);

    useEffect(() => {
        // cuando cambia el prod seleccionado actualiza el formulario para modificar
        if (productoSeleccionado) {
            setIdCounter(productoSeleccionado.id);
            setNombre(productoSeleccionado.nombre);
            setMarca(productoSeleccionado.marca);
            setPrecioU(productoSeleccionado.precioUnit);
            setDescuento(productoSeleccionado.descuento || 0);
            setStock(productoSeleccionado.stock);
        } else {
            // limpia formulario cuando no hay producto seleccionado
            setIdCounter(1);
            setNombre("");
            setMarca("");
            setPrecioU("");
            setDescuento("");
            setStock("");
        }
    }, [productoSeleccionado]);

    const manejarSubmit = (evento)=> {
        evento.preventDefault();

        const precio = parseFloat(precioUnit);
        const descuentoo = parseFloat(descuento);
        const precioDescuento = precio - (precio * descuento / 100);


        const nuevoProd = {
            id: idContador,
            nombre,
            marca,
            precioUnit: precio,
            descuento: descuentoo,
            precioFinal: precioDescuento,
            stock,
            estado // si esta en true el producto se meustra, si esta en false se hace la eliminacion logica que pide la indicacion
        };

        alAgregar(nuevoProd);
        setIdCounter(idContador + 1);
        setNombre('');
        setMarca('');
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
                    <label>Marca:</label>
                    <input
                        type="text"
                        value={marca}
                        onChange={(evento) => setMarca(evento.target.value)}
                        required/>
                </div>
                <div>
                    <label>Precio Unitario:</label>
                    <input
                        type="number"
                        value={precioUnit}
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
                {precioUnit !== '' && descuento !== '' && (
                    <div>
                        <label>Precio con Descuento:</label>
                        <p>
                            ${(
                                precioUnit - (precioUnit * descuento) / 100

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