import React, { useEffect, useState } from "react"; // Importa React y los hooks useEffect y useState
import styles from "./profile.module.css"; // Importa los estilos CSS del componente Profile
import HistoryCard from "./components/HistoryCard"; // Importa el componente HistoryCard para mostrar historial

const Profile = () => { // Componente funcional Profile
    const [usuarioData, setUsuarioData] = useState(null); // Estado para almacenar los datos del usuario
    const [comprados, setComprados] = useState([]); // Estado para almacenar los productos comprados
    const [vendidos, setVendidos] = useState([]); // Estado para almacenar los productos vendidos

    useEffect(() => { // Hook para ejecutar código al montar el componente
        const cargarPerfil = async () => { // Función asíncrona para cargar los datos del perfil
          try {
            const { email } = JSON.parse(localStorage.getItem("user")); // Obtiene el correo del usuario desde localStorage
      
            const resU = await fetch(`http://localhost:4000/usuarios?email=${encodeURIComponent(email)}`); // Solicita los datos del usuario
            if (!resU.ok) throw new Error("Error al conectar con usuarios"); // Lanza un error si la respuesta no es exitosa
            const [user] = await resU.json(); // Obtiene el usuario de la respuesta
            setUsuarioData(user); // Actualiza el estado con los datos del usuario
      
            const compradosTmp = []; // Array temporal para los productos comprados
            for (const id of user.productosComprados) { // Itera sobre los IDs de productos comprados
              const resP = await fetch(`http://localhost:4000/productos?id=${encodeURIComponent(id)}`); // Solicita los datos del producto
              if (!resP.ok) throw new Error(`No se pudo cargar producto ${id}`); // Lanza un error si no se puede cargar el producto
              const arrayProductos = await resP.json(); // Convierte la respuesta a JSON
              const prod = arrayProductos[0]; // Obtiene el primer producto del array
              compradosTmp.push(prod); // Agrega el producto al array temporal
            }
            setComprados(compradosTmp); // Actualiza el estado con los productos comprados
      
            const vendidosTmp = []; // Array temporal para los productos vendidos
            for (const id of user.productosVendidos) { // Itera sobre los IDs de productos vendidos
              const resP = await fetch(`http://localhost:4000/productos?id=${encodeURIComponent(id)}`); // Solicita los datos del producto
              if (!resP.ok) throw new Error(`No se pudo cargar producto ${id}`); // Lanza un error si no se puede cargar el producto
              const arrayProductos = await resP.json(); // Convierte la respuesta a JSON
              const prod = arrayProductos[0]; // Obtiene el primer producto del array
              vendidosTmp.push(prod); // Agrega el producto al array temporal
            }
            setVendidos(vendidosTmp); // Actualiza el estado con los productos vendidos
      
          } catch (e) { // Maneja errores en la solicitud
            console.error(e); // Imprime el error en la consola
          } 
        };
      
        cargarPerfil(); // Llama a la función para cargar el perfil
      }, []); // El array vacío asegura que el efecto se ejecute solo una vez al montar

    if (!usuarioData) { // Verifica si los datos del usuario aún no están cargados
        return <p className={styles.body}>Cargando perfil</p>; // Muestra un mensaje de carga
    }

    const {
        nombreCompleto, // Nombre completo del usuario
        direccion, // Dirección del usuario
        telefono, // Teléfono del usuario
        email, // Correo electrónico del usuario
        fechaNacimiento, // Fecha de nacimiento del usuario
        avatar // Avatar del usuario
    } = usuarioData; // Desestructura los datos del usuario

    return (
        <div className={styles["body"]}> {/* Contenedor principal del perfil */}
            <div className={styles["page_container"]}> {/* Contenedor de la página */}
                <nav className={styles["profile"]}> {/* Sección del perfil */}
                    <img className={styles["profile_img"]} src={avatar} alt="imagen" /> {/* Imagen del avatar */}
                </nav>
                <div className={styles["data"]}> {/* Contenedor de los datos del usuario */}
                    <section className={styles["data_section"]}> {/* Sección para el nombre */}
                        <h1>Nombre</h1>
                        <p>{nombreCompleto}</p> {/* Muestra el nombre completo */}
                    </section>
                    <section className={styles["data_section"]}> {/* Sección para la dirección */}
                        <h1>Direccion</h1>
                        <p>{direccion}</p> {/* Muestra la dirección */}
                    </section>
                    <section className={styles["data_section"]}> {/* Sección para el teléfono */}
                        <h1>Telefono</h1>
                        <p>{telefono}</p> {/* Muestra el teléfono */}
                    </section>
                    <section className={styles["data_section"]}> {/* Sección para el correo electrónico */}
                        <h1>Email</h1>
                        <p>{email}</p> {/* Muestra el correo electrónico */}
                    </section>
                    <section className={styles["data_section"]}> {/* Sección para la fecha de nacimiento */}
                        <h2>Fecha de nacimiento</h2>
                        <p>{fechaNacimiento}</p> {/* Muestra la fecha de nacimiento */}
                    </section>
                </div>
            </div>
            <section className={styles["history"]}> {/* Sección del historial */}
                <div className={styles["child_history"]}> {/* Historial de compras */}
                    <h2>Historial de compras</h2>
                    {comprados.map((producto) => ( // Itera sobre los productos comprados
                        <HistoryCard
                            key={producto.id} // Clave única para cada producto
                            nombre={producto.nombre} // Nombre del producto
                            precio={producto.precio} // Precio del producto
                            fecha={producto.fecha} // Fecha de compra
                            imagen={producto.imagen} // Imagen del producto
                        />
                    ))}
                </div>
                <div className={styles["child_history"]}> {/* Historial de ventas */}
                    <h2>Historial de ventas</h2>
                    {vendidos.map((producto) => ( // Itera sobre los productos vendidos
                        <HistoryCard
                            key={producto.id} // Clave única para cada producto
                            nombre={producto.nombre} // Nombre del producto
                            precio={producto.precio} // Precio del producto
                            fecha={producto.fecha} // Fecha de venta
                            imagen={producto.imagen} // Imagen del producto
                        />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Profile; // Exporta el componente Profile como predeterminado