import React, { useState, useEffect } from "react";
import styles from "./vender.module.css";
import { useCategorias } from "../../context/CategoriaContext";
import { jwtDecode } from "jwt-decode";

export default function Vender() {
  const [nombre, setNombre] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [precio, setPrecio] = useState(0);
  const [cantidadStock, setCantidadStock] = useState(1);
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState(null);
  const [error, setError] = useState("");

  const [nuevaCategoria, setNuevaCategoria] = useState(false);
  const [nuevaCategoriaNombre, setNuevaCategoriaNombre] = useState("");

  const { categorias, fetchCategorias } = useCategorias();
  const [usuarioSolicitudVendedor, setUsuarioSolicitudVendedor] = useState(null);
  const [usuarioRol, setUsuarioRol] = useState(null);

  useEffect(() => {
    const cargarPerfil = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No hay token");

        const resUser = await fetch("http://localhost:8082/api/usuarios/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!resUser.ok) throw new Error("Error al obtener usuario");
        const user = await resUser.json();
        setUsuarioSolicitudVendedor(user.solicitudVendedor);
        const payload = jwtDecode(token);
        setUsuarioRol(payload.rol);
      } catch (e) {
        console.error("Error al cargar perfil:", e);
      }
    };
    cargarPerfil();
  }, []);

  const handleSolicitud = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No hay token");

      const res = await fetch("http://localhost:8082/api/usuarios/solicitudVendedor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Error al solicitar alta como vendedor");
      alert("Solicitud enviada. Espera la aprobación de un administrador.");
    } catch (err) {
      console.error(err);
      setError("No se pudo enviar la solicitud. Intenta de nuevo.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    let categoriaFinalId = categoriaId;

    if (nuevaCategoria) {
      if (!nuevaCategoriaNombre.trim()) {
        setError("Debe ingresar un nombre para la nueva categoría.");
        return;
      }

      const nombreNormalizado = nuevaCategoriaNombre.trim().toLowerCase();
      const existe = categorias.some(cat => cat.nombre.toLowerCase() === nombreNormalizado);

      if (existe) {
        setError("Esta categoría ya existe.");
        return;
      }

      try {
        const res = await fetch("http://localhost:8082/api/categorias", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ nombre: nuevaCategoriaNombre }),
        });

        if (!res.ok) throw new Error("Error al crear nueva categoría");
        const data = await res.json();
        categoriaFinalId = data.id;
        await fetchCategorias();
      } catch (err) {
        console.error(err);
        setError("No se pudo crear la nueva categoría.");
        return;
      }
    }

    const productoAVender = {
      nombre,
      descripcion,
      precio: Number(precio),
      categoriaId: Number(categoriaFinalId),
      stockInicial: Number(cantidadStock),
    };

    const formData = new FormData();
    formData.append("producto", new Blob([JSON.stringify(productoAVender)], { type: "application/json" }));
    formData.append("imagen", imagen);

    try {
      const res = await fetch("http://localhost:8082/api/productos", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Error al publicar el producto");

      alert("Producto publicado correctamente!");

      setNombre("");
      setDescripcion("");
      setPrecio(0);
      setCantidadStock(1);
      setCategoriaId("");
      setImagen(null);
      setNuevaCategoria(false);
      setNuevaCategoriaNombre("");
    } catch (err) {
      console.error(err);
      setError("No se pudo conectar con el servidor.");
    }
  };

  if (usuarioRol === "COMPRADOR" && usuarioSolicitudVendedor === false) {
    return (
      <div className={styles.contenedor}>
        <h1 className={styles.titulo}>¡Conviértete en vendedor!</h1>
        <form className={styles.form} onSubmit={handleSolicitud}>
          <p>Para vender productos, primero debes solicitar ser Vendedor.</p>
          <button type="submit" className={styles.botonPublicar}>
            Solicitar alta como vendedor
          </button>
          {error && <p className={styles.error}>{error}</p>}
        </form>
      </div>
    );
  }

  if (usuarioRol === "COMPRADOR" && usuarioSolicitudVendedor === true) {
    return (
      <div className={styles.contenedor}>
        <h1 className={styles.titulo}>¡Solicitud enviada!</h1>
        <p>Ya has solicitado ser vendedor. Un administrador te aprobará la solicitud en breve.</p>
      </div>
    );
  }

  return (
    <div className={styles.contenedor}>
      <h1 className={styles.titulo}>¡Vende tu producto!</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>Nombre:
          <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} required />
        </label>

        <label>Categoría:
          <select
            value={categoriaId}
            onChange={e => setCategoriaId(e.target.value)}
            required
            disabled={nuevaCategoria}
          >
            <option value="">Seleccione</option>
            {categorias
              .filter(cat => cat.nombre.toLowerCase() !== "originales clickco")
              .map(cat => (
                <option key={cat.id} value={cat.id}>{cat.nombre}</option>
              ))
            }
          </select>
        </label>

        <div className={styles.checkboxRow}>
          <label htmlFor="crearCategoria" className={styles.checkboxLabel}>
            Crear nueva categoría
          </label>
          <input
            id="crearCategoria"
            type="checkbox"
            checked={nuevaCategoria}
            onChange={e => setNuevaCategoria(e.target.checked)}
            className={styles.checkboxInput}
          />
        </div>

        {nuevaCategoria && (
          <label>Nombre de la nueva categoría:
            <input
              type="text"
              value={nuevaCategoriaNombre}
              onChange={e => setNuevaCategoriaNombre(e.target.value)}
              required
            />
          </label>
        )}

        <label>Precio:
          <input
            type="number"
            min="0"
            value={precio}
            onChange={e => setPrecio(e.target.value)}
            required
          />
        </label>

        <label>Cantidad de stock:
          <input
            type="number"
            min="1"
            value={cantidadStock}
            onChange={e => setCantidadStock(e.target.value)}
            required
          />
        </label>

        <label>Descripción:
          <textarea
            rows="6"
            value={descripcion}
            onChange={e => setDescripcion(e.target.value)}
            required
          />
        </label>

        <div className={styles.inputFileWrapper}>
		<label className={styles.inputFileLabel}>
  			📁 Seleccionar imagen
  			<input
    			type="file"
    			accept="image/*"
    			onChange={e => setImagen(e.target.files[0])}
    			className={styles.inputFile}
  			/>
			</label>
  			{imagen && <p className={styles.nombreArchivo}>Archivo seleccionado: {imagen.name}</p>}
		</div>


        <button type="submit" className={styles.botonPublicar}>
          Publicar producto
        </button>

        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
}
