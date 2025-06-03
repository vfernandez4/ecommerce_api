import React, { useEffect, useState } from "react";
import styles from "./profile.module.css";
import HistoryCard from "./components/HistoryCard";

const Profile = () => {
    const [usuarioData, setUsuarioData] = useState(null);
    const [comprados, setComprados] = useState([]);
    const [vendidos, setVendidos] = useState([]);

    useEffect(() => {
        const cargarPerfil = async () => {
          try {
            const { email } = JSON.parse(localStorage.getItem("user"));
      
            const resU = await fetch(`http://localhost:4000/usuarios?email=${encodeURIComponent(email)}`);
            if (!resU.ok) throw new Error("Error al conectar con usuarios");
            const [user] = await resU.json();
            setUsuarioData(user);
      
            const compradosTmp = [];
            for (const id of user.productosComprados) {
              const resP = await fetch(`http://localhost:4000/productos?id=${encodeURIComponent(id)}`);
              if (!resP.ok) throw new Error(`No se pudo cargar producto ${id}`);
              const arrayProductos = await resP.json();      
              const prod = arrayProductos[0];
              compradosTmp.push(prod);
            }
            setComprados(compradosTmp);
      
            const vendidosTmp = [];
            for (const id of user.productosVendidos) {
              const resP = await fetch(`http://localhost:4000/productos?id=${encodeURIComponent(id)}`);
              if (!resP.ok) throw new Error(`No se pudo cargar producto ${id}`);
              const arrayProductos = await resP.json();
              const prod = arrayProductos[0];
              vendidosTmp.push(prod);
            }
            setVendidos(vendidosTmp);
      
          } catch (e) {
            console.error(e);
          } 
        };
      
        cargarPerfil();
      }, []);

    if (!usuarioData) {
        return <p className={styles.body}>Cargando perfil</p>;
    }

    const {
        nombreCompleto,
        direccion,
        telefono,
        email,
        fechaNacimiento,
        avatar
    } = usuarioData;

    return (
        <div className={styles["body"]}>
            <div className={styles["page_container"]}>
                <nav className={styles["profile"]}>
                    <img className={styles["profile_img"]} src={avatar} alt="imagen" />
                </nav>
                <div className={styles["data"]}>
                    <section className={styles["data_section"]}>
                        <h1>Nombre</h1>
                        <p>{nombreCompleto}</p>
                    </section>
                    <section className={styles["data_section"]}>
                        <h1>Direccion</h1>
                        <p>{direccion}</p>
                    </section>
                    <section className={styles["data_section"]}>
                        <h1>Telefono</h1>
                        <p>{telefono}</p>
                    </section>
                    <section className={styles["data_section"]}>
                        <h1>Email</h1>
                        <p>{email}</p>
                    </section>
                    <section className={styles["data_section"]}>
                        <h2>Fecha de nacimiento</h2>
                        <p>{fechaNacimiento}</p>
                    </section>
                </div>
            </div>
            <section className={styles["history"]}>
                <div className={styles["child_history"]}>
                    <h2>Historial de compras</h2>
                    {comprados.map((producto) => (
                        <HistoryCard
                            key={producto.id}
                            nombre={producto.nombre}
                            precio={producto.precio}
                            fecha={producto.fecha}
                            imagen={producto.imagen}
                        />
                    ))}
                </div>
                <div className={styles["child_history"]}>
                    <h2>Historial de ventas</h2>
                    {vendidos.map((producto) => (
                        <HistoryCard
                            key={producto.id}
                            nombre={producto.nombre}
                            precio={producto.precio}
                            fecha={producto.fecha}
                            imagen={producto.imagen}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Profile;