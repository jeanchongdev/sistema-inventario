"use client"

import "./App.css"
import { useState, useEffect } from "react"
import axios from "axios"
import Swal from "sweetalert2"

const API_URL = "http://localhost:3000/productos"

function App() {
  const [productos, setProductos] = useState([])
  const [formulario, setFormulario] = useState({
    nombre: "",
    precio: "",
    stock: "",
    fecha: "",
  })
  const [errores, setErrores] = useState({})
  const [modoEdicion, setModoEdicion] = useState(false)
  const [idEdicion, setIdEdicion] = useState(null)

  // Obtener los productos al cargar
  useEffect(() => {
    cargarProductos()
  }, [])

  const cargarProductos = async () => {
    try {
      const res = await axios.get(API_URL)
      setProductos(res.data)
    } catch (error) {
      mostrarAlerta("Error", "No se pudieron cargar los productos", "error")
    }
  }

  const crearProducto = async () => {
    // Validar todos los campos antes de enviar
    if (!validarFormulario()) {
      return
    }

    try {
      // Convertir precio y stock a números
      const productoParaEnviar = {
        ...formulario,
        precio: Number(formulario.precio),
        stock: Number(formulario.stock),
      }

      await axios.post(API_URL, productoParaEnviar)
      limpiarFormulario()
      cargarProductos()
      mostrarAlerta("Éxito", "Producto agregado correctamente", "success")
    } catch (error) {
      mostrarAlerta("Error", "No se pudo crear el producto", "error")
    }
  }

  const actualizarProducto = async () => {
    // Validar todos los campos antes de enviar
    if (!validarFormulario()) {
      return
    }

    try {
      // Convertir precio y stock a números
      const productoParaEnviar = {
        ...formulario,
        precio: Number(formulario.precio),
        stock: Number(formulario.stock),
      }

      await axios.put(`${API_URL}/${idEdicion}`, productoParaEnviar)
      limpiarFormulario()
      setModoEdicion(false)
      setIdEdicion(null)
      cargarProductos()
      mostrarAlerta("Éxito", "Producto actualizado correctamente", "success")
    } catch (error) {
      mostrarAlerta("Error", "No se pudo actualizar el producto", "error")
    }
  }

  const eliminarProducto = async (id) => {
    try {
      const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción no se puede revertir",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      })

      if (result.isConfirmed) {
        await axios.delete(`${API_URL}/${id}`)
        cargarProductos()
        mostrarAlerta("Eliminado", "El producto ha sido eliminado", "success")
      }
    } catch (error) {
      mostrarAlerta("Error", "No se pudo eliminar el producto", "error")
    }
  }

  const editarProducto = (producto) => {
    // Formatear la fecha para el input date
    const fecha = producto.fecha ? new Date(producto.fecha).toISOString().split("T")[0] : ""

    setFormulario({
      nombre: producto.nombre,
      precio: producto.precio,
      stock: producto.stock,
      fecha: fecha,
    })
    setModoEdicion(true)
    setIdEdicion(producto._id)
  }

  const limpiarFormulario = () => {
    setFormulario({
      nombre: "",
      precio: "",
      stock: "",
      fecha: "",
    })
    setErrores({})
  }

  const manejarCambio = (e) => {
    const { name, value } = e.target

    // Validaciones específicas para cada campo
    let error = ""

    if (name === "nombre") {
      // Validar que no contenga números ni caracteres especiales
      if (/[0-9!@#$%^&*(),.?":{}|<>]/.test(value)) {
        error = "El nombre no debe contener números ni caracteres especiales"
        mostrarAlerta("Error de validación", error, "error")
        return // No actualizar el estado si hay error
      }
    } else if (name === "precio") {
      // Validar que no sea negativo
      if (value < 0) {
        error = "El precio no puede ser negativo"
        mostrarAlerta("Error de validación", error, "error")
        return // No actualizar el estado si hay error
      }
    } else if (name === "stock") {
      // Validar que no sea negativo (pero puede ser 0)
      if (value < 0) {
        error = "El stock no puede ser negativo"
        mostrarAlerta("Error de validación", error, "error")
        return // No actualizar el estado si hay error
      }
    } else if (name === "fecha") {
      // Validar que la fecha no sea anterior a hoy
      const fechaSeleccionada = new Date(value + "T00:00:00")

      // Obtener la fecha actual sin la hora
      const hoy = new Date()
      const hoyString = hoy.toISOString().split("T")[0]
      const hoyComparar = new Date(hoyString + "T00:00:00")

      if (fechaSeleccionada < hoyComparar) {
        error = "La fecha no puede ser anterior a hoy"
        mostrarAlerta("Error de validación", error, "error")
        return // No actualizar el estado si hay error
      }
    }

    // Actualizar el estado del formulario
    setFormulario({
      ...formulario,
      [name]: value,
    })

    // Actualizar errores
    if (error) {
      setErrores({
        ...errores,
        [name]: error,
      })
    } else {
      // Eliminar el error si ya no existe
      const nuevosErrores = { ...errores }
      delete nuevosErrores[name]
      setErrores(nuevosErrores)
    }
  }

  const validarFormulario = () => {
    const nuevosErrores = {}

    // Validar que todos los campos estén completos
    if (!formulario.nombre.trim()) {
      nuevosErrores.nombre = "El nombre es requerido"
    }

    if (!formulario.precio) {
      nuevosErrores.precio = "El precio es requerido"
    }

    if (formulario.stock === "") {
      nuevosErrores.stock = "El stock es requerido"
    }

    if (!formulario.fecha) {
      nuevosErrores.fecha = "La fecha es requerida"
    }

    setErrores(nuevosErrores)

    // Si hay errores, mostrar alerta con el primer error
    if (Object.keys(nuevosErrores).length > 0) {
      const primerError = Object.values(nuevosErrores)[0]
      mostrarAlerta("Error de validación", primerError, "error")
      return false
    }

    return true
  }

  // Función para mostrar alertas con SweetAlert2
  const mostrarAlerta = (titulo, mensaje, tipo) => {
    Swal.fire({
      title: titulo,
      text: mensaje,
      icon: tipo,
      confirmButtonText: "Aceptar",
      customClass: {
        confirmButton: "btn-personalizado",
        popup: "popup-personalizado",
      },
    })
  }

  const formatearFecha = (fechaStr) => {
    if (!fechaStr) return "No disponible"
    const fecha = new Date(fechaStr)
    return fecha.toLocaleDateString("es-ES")
  }

  return (
    <div className="container">
      <h1 className="titulo-principal">Sistema de Inventario</h1>

      <div className="card formulario">
        <h2 className="titulo-seccion">{modoEdicion ? "Editar Producto" : "Agregar Producto"}</h2>

        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="nombre">Nombre del producto:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Ingrese el nombre del producto"
              value={formulario.nombre}
              onChange={manejarCambio}
              className={errores.nombre ? "input-error" : ""}
            />
            {errores.nombre && <span className="mensaje-error">{errores.nombre}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="precio">Precio:</label>
            <input
              type="number"
              id="precio"
              name="precio"
              placeholder="Ingrese el precio del producto"
              value={formulario.precio}
              onChange={manejarCambio}
              min="0"
              step="0.01"
              className={errores.precio ? "input-error" : ""}
            />
            {errores.precio && <span className="mensaje-error">{errores.precio}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="stock">Stock:</label>
            <input
              type="number"
              id="stock"
              name="stock"
              placeholder="Ingrese el stock del producto"
              value={formulario.stock}
              onChange={manejarCambio}
              min="0"
              className={errores.stock ? "input-error" : ""}
            />
            {errores.stock && <span className="mensaje-error">{errores.stock}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="fecha">Fecha de vencimiento:</label>
            <input
              type="date"
              id="fecha"
              name="fecha"
              value={formulario.fecha}
              onChange={manejarCambio}
              className={errores.fecha ? "input-error" : ""}
            />
            {errores.fecha && <span className="mensaje-error">{errores.fecha}</span>}
          </div>
        </div>

        <div className="botones">
          {modoEdicion ? (
            <>
              <button className="btn btn-actualizar" onClick={actualizarProducto}>
                Actualizar Producto
              </button>
              <button
                className="btn btn-cancelar"
                onClick={() => {
                  limpiarFormulario()
                  setModoEdicion(false)
                  setIdEdicion(null)
                }}
              >
                Cancelar
              </button>
            </>
          ) : (
            <button className="btn btn-agregar" onClick={crearProducto}>
              Agregar Producto
            </button>
          )}
        </div>
      </div>

      <div className="card tabla-productos">
        <h2 className="titulo-seccion">Lista de Productos</h2>

        {productos.length === 0 ? (
          <div className="mensaje-sin-productos">No hay productos registrados</div>
        ) : (
          <div className="tabla-responsive">
            <table className="tabla">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Fecha de Vencimiento</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((p) => (
                  <tr key={p._id}>
                    <td>{p.nombre}</td>
                    <td>S/ {p.precio.toFixed(2)}</td>
                    <td>{p.stock}</td>
                    <td>{formatearFecha(p.fecha)}</td>
                    <td className="acciones">
                      <button className="btn btn-editar" onClick={() => editarProducto(p)}>
                        Editar
                      </button>
                      <button className="btn btn-eliminar" onClick={() => eliminarProducto(p._id)}>
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
