import React, { useState, useEffect, useMemo, useCallback } from "react";

function Formulario({ alAgregar, alModificar, productoSeleccionado }) {
    const [nombre, setNombre] = useState("");
    const [marca, setMarca] = useState("");
    const [precioUnit, setPrecioU] = useState("");
    const [descuento, setDescuento] = useState("");
    const [stock, setStock] = useState("");
    const [idContador, setIdCounter] = useState(1);
    const [estado, setEstado] = useState(true);

    useEffect(() => {
        if (productoSeleccionado) {
            setIdCounter(productoSeleccionado.id);
            setNombre(productoSeleccionado.nombre);
            setMarca(productoSeleccionado.marca);
            setPrecioU(productoSeleccionado.precioUnit);
            setDescuento(productoSeleccionado.descuento || 0);
            setStock(productoSeleccionado.stock);
        } else {
            setIdCounter(1);
            setNombre("");
            setMarca("");
            setPrecioU("");
            setDescuento("");
            setStock("");
        }
    }, [productoSeleccionado]);

    // Calcula el precio con descuento solo cuando precioUnit o descuento cambian
    const precioDescuento = useMemo(() => {
        const precio = parseFloat(precioUnit) || 0;
        const descuentoo = parseFloat(descuento) || 0;
        return precio - (precio * descuentoo / 100);
    }, [precioUnit, descuento]);

    // Agregar producto nuevo
    const manejarSubmit = useCallback((evento) => {
        evento.preventDefault();

        const nuevoProd = {
            id: idContador,
            nombre,
            marca,
            precioUnit: parseFloat(precioUnit),
            descuento: parseFloat(descuento),
            precioFinal: precioDescuento,
            stock,
            estado
        };

        alAgregar(nuevoProd);
        limpiarFormulario();
    }, [idContador, nombre, marca, precioUnit, descuento, precioDescuento, stock, estado, alAgregar]);

    // Modificar producto existente
    const manejarModificar = useCallback((evento) => {
        evento.preventDefault();

        if (!productoSeleccionado) return;

        const productoModificado = {
            id: productoSeleccionado.id,
            nombre,
            marca,
            precioUnit: parseFloat(precioUnit),
            descuento: parseFloat(descuento),
            precioFinal: precioDescuento,
            stock,
            estado
        };

        alModificar(productoModificado);
        limpiarFormulario();
    }, [productoSeleccionado, nombre, marca, precioUnit, descuento, precioDescuento, stock, estado, alModificar]);

    // Limpiar formulario después de agregar o modificar
    const limpiarFormulario = useCallback(() => {
        setIdCounter(idContador + 1);
        setNombre("");
        setMarca("");
        setPrecioU("");
        setDescuento("");
        setStock("");
        setEstado(true);
    }, [idContador]);

    return (
        <div>
            <h1>{productoSeleccionado ? "Modificar Producto" : "Agregar Nuevo Producto"}</h1>
            <form onSubmit={productoSeleccionado ? manejarModificar : manejarSubmit}>
                <div>
                    <label>Nombre:</label>
                    <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                </div>
                <div>
                    <label>Marca:</label>
                    <input type="text" value={marca} onChange={(e) => setMarca(e.target.value)} required />
                </div>
                <div>
                    <label>Precio Unitario:</label>
                    <input type="number" value={precioUnit} onChange={(e) => setPrecioU(e.target.value)} required />
                </div>
                <div>
                    <label>Descuento:</label>
                    <input type="number" value={descuento} onChange={(e) => setDescuento(e.target.value)} required />
                </div>
                {precioUnit !== "" && descuento !== "" && (
                    <div>
                        <label>Precio con Descuento:</label>
                        <p>${precioDescuento.toFixed(2)}</p>
                    </div>
                )}
                <div>
                    <label>Stock:</label>
                    <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} required />
                </div>

                <button type="submit">
                    {productoSeleccionado ? "Modificar Producto" : "Agregar Producto"}
                </button>
            </form>
        </div>
    );
}

export default Formulario;
