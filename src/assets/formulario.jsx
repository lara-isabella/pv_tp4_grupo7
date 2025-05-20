import React, { useState, useEffect, useMemo, useCallback } from "react";

function Formulario({ alAgregar, alModificar, productoSeleccionado }) {
    const [nombre, setNombre] = useState("");
    const [marca, setMarca] = useState("");
    const [precioUnit, setPrecioU] = useState("");
    const [descuento, setDescuento] = useState("");
    const [stock, setStock] = useState("");
    const [idContador, setIdCounter] = useState(1);
    const [estado, setEstado] = useState(true);
    const [error, setError] = useState("");


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

    // Convertir a número para la validación
    const precio = parseFloat(precioUnit);
    const desc = parseFloat(descuento);

    // Si alguno de los valores es negativo, muestra un error y detén el envío
    if (precio < 0 || desc < 0) {
        setError("El precio unitario y el descuento no pueden ser valores negativos.");
        return;
    }

    // Si pasa la validación, limpiamos el error
    setError("");
    
    const nuevoProd = {
        id: idContador,
        nombre,
        marca,
        precioUnit: precio, // ya lo convertimos
        descuento: desc,
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

    const precio = parseFloat(precioUnit);
    const desc = parseFloat(descuento);

    if (precio < 0 || desc < 0) {
        setError("El precio unitario y el descuento no pueden ser valores negativos.");
        return;
    }

    setError("");

    const productoModificado = {
        id: productoSeleccionado.id,
        nombre,
        marca,
        precioUnit: precio,
        descuento: desc,
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
            {error && <p style={{ color: "red" }}>{error}</p>}
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
