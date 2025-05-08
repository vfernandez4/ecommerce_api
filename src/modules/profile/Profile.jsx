import React, { useEffect, useState } from "react";
import styles from "./profile.module.css";
import HistoryCard from "./components/HistoryCard";

const Profile = () => {
    const [usuarioData, setUsuarioData] = useState(null);
    useEffect(() => {
        const { email } = JSON.parse(localStorage.getItem("user"));

        fetch(`http://localhost:4000/usuarios?email=${encodeURIComponent(email)}`)
            .then((res) => {
                if (!res.ok) throw new Error("Error al conectar con el servidor");
                console.log(usuarioData);
                return res.json();
            })
            .then((data) => {
                setUsuarioData(data[0]);
                if (data.length > 0) setUsuarioData(data[0]);
            })
            .catch((err) => console.error(err));
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
        avatar,
        productosComprados,
        productosVendidos,
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
                    {productosComprados.map((producto) => (
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
                    {productosVendidos.map((producto) => (
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