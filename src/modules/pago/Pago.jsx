
import { useState } from "react";
import styles from "./pago.module.css";
import { useNavigate } from "react-router-dom";

const Pago = () => {
  const [calle, setCalle] = useState("");
  const [numero, setNumero] = useState("");
  const [piso, setPiso] = useState("");
  const [depto, setDepto] = useState("");
  const [codigoPostal, setCodigoPostal] = useState("");

  const [metodoPago, setMetodoPago] = useState("");

  const [numeroTarjeta, setNumeroTarjeta] = useState("");
  const [fechaVencimiento, setFechaVencimiento] = useState("");
  const [cvv, setCvv] = useState("");
  const [nombreTarjeta, setNombreTarjeta] = useState("");

  const [cartItems, setCartItems] = useState(() => {
    const carritoGuardado = localStorage.getItem("carrito");
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
  });

  function calcularTotal(items) { // Calcula el total de los productos en el carrito
    let total = 0; // Inicializa el total en 0
    items.forEach(item => { // Itera sobre los productos del carrito
      total += item.precio * item.cantidad; // Suma el precio total de cada producto
    });
    return total; // Retorna el total calculado
  }
  const total = calcularTotal(cartItems); // Calcula el total del carrito

  const envio = 7000; // Costo fijo del envío
  const totalConEnvio = total + envio; // Calcula el total con el costo de envío incluido

  const navigate = useNavigate();

  const agregarAlHistorial = async () => {
    try {
    const userData = JSON.parse(localStorage.getItem("user"));
    const carrito = JSON.parse(localStorage.getItem("carrito"));

    if (!userData || !userData.email || !Array.isArray(carrito)) {
      throw new Error("Datos de usuario o carrito inválidos");
    }

    const emailUsuario = userData.email;

    const nuevosIds = carrito.map(item => Number(item.id));

    const resUsuario = await fetch(`http://localhost:4000/usuarios?email=${emailUsuario}`);
    const data = await resUsuario.json();

    if (data.length === 0) throw new Error("Usuario no encontrado");

    const usuario = data[0];
    const idUsuario = usuario.id;

    const productosActualizados = [
      ...new Set([...(usuario.productosComprados || []), ...nuevosIds])
    ];

    const resPatch = await fetch(`http://localhost:4000/usuarios/${idUsuario}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ productosComprados: productosActualizados })
    });

    if (!resPatch.ok) throw new Error("Error al actualizar el usuario");
    }
    catch (error) {
      console.error("Error:", error);
    }

    alert("Gracias por tu compra!");

    localStorage.removeItem("carrito");
    navigate("/");
  }

  return (
    <div className={styles["body"]}> {/* Contenedor principal del componente */}
      <div className={styles["page-container"]}> {/* Contenedor de la página */}
        <div className={styles["purchase-details"]}> {/* Contenedor de los detalles de la compra */}
          <h3 className={styles["title"]}>Direccion de entrega</h3> {/* Título de la sección de dirección */}
          <form className={styles["forms"]} action=""> {/* Formulario para la dirección */}
            <section>
              <label>Calle</label> {/* Etiqueta para la calle */}
              <br />
              <input type="text" value={calle} onChange={(e) => setCalle(e.target.value)} /> {/* Campo para ingresar la calle */}
            </section>
            
            <section>
              <label>Numero</label> {/* Etiqueta para el número */}
              <br />
              <input type="number" value={numero} onChange={(e) => setNumero(e.target.value)} /> {/* Campo para ingresar el número */}
            </section>
            
            <section>
              <label>Piso</label> {/* Etiqueta para el piso */}
              <br />
              <input type="number" value={piso} onChange={(e) => setPiso(e.target.value)} /> {/* Campo para ingresar el piso */}
            </section>
            
            <section>
              <label>Dpto</label> {/* Etiqueta para el departamento */}
              <br />
              <input type="" value={depto} onChange={(e) => setDepto(e.target.value)} /> {/* Campo para ingresar el departamento */}
            </section>

            <section>
              <label>Codigo Postal</label> {/* Etiqueta para el código postal */}
              <br />
              <input type="number" value={codigoPostal} onChange={(e) => setCodigoPostal(e.target.value)} /> {/* Campo para ingresar el código postal */}
            </section>
          </form>

          <hr /> {/* Línea divisoria */}

          <h3 className={styles["title"]}>Forma de pago</h3> {/* Título de la sección de forma de pago */}

          <label>
            <input type="radio" name="metodoPago" value="credito" checked={metodoPago === "credito"} onChange={(e) => setMetodoPago(e.target.value)} /> {/* Opción para tarjeta de crédito */}
            Tarjeta de crédito
          </label>

          <br />

          <label>
            <input type="radio" name="metodoPago" value="debito" checked={metodoPago === "debito"} onChange={(e) => setMetodoPago(e.target.value)} /> {/* Opción para tarjeta de débito */}
            Tarjeta de débito
          </label>

          <form className={styles["forms"]} action=""> {/* Formulario para los datos de la tarjeta */}
            <section>
              <label>Numero</label> {/* Etiqueta para el número de la tarjeta */}
              <br />
              <input type="number" value={numeroTarjeta} onChange={(e) => setNumeroTarjeta(e.target.value)} /> {/* Campo para ingresar el número de la tarjeta */}
            </section>

            <section>
              <label>Fecha de vencimiento</label> {/* Etiqueta para la fecha de vencimiento */}
              <br />
              <input type="date" value={fechaVencimiento} onChange={(e) => setFechaVencimiento(e.target.value)} /> {/* Campo para ingresar la fecha de vencimiento */}
            </section>

            <section>
              <label>CVV</label> {/* Etiqueta para el CVV */}
              <br />
              <input type="number" value={cvv} onChange={(e) => setCvv(e.target.value)} /> {/* Campo para ingresar el CVV */}
            </section>

            <section>
              <label>Nombre en la tarjeta</label> {/* Etiqueta para el nombre en la tarjeta */}
              <br />
              <input type="text" value={nombreTarjeta} onChange={(e) => setNombreTarjeta(e.target.value)} /> {/* Campo para ingresar el nombre en la tarjeta */}
            </section>
          </form>
        </div>

        <aside className={styles["buy-resume"]}> {/* Contenedor del resumen de compra */}
          <h3 className={styles["title"]}>Resumen de compra</h3> {/* Título del resumen */}
          <hr /> {/* Línea divisoria */}
          <section className={styles["buy_details"]}>
            <p className={styles["detail"]}>Producto</p> {/* Detalle del producto */}
            <p className={styles["price"]}>${total.toLocaleString()}</p> {/* Precio total de los productos */}
          </section>
          <section className={styles["buy_details"]}>
            <p className={styles["detail"]}>Envio</p> {/* Detalle del envío */}
            <p className={styles["price"]}>${envio.toLocaleString()}</p> {/* Precio del envío */}
          </section>
          <hr /> {/* Línea divisoria */}
          <section className={styles["buy_details"]}>
            <p className={styles["detail"]}>Total</p> {/* Detalle del total */}
            <p className={styles["price"]}>${totalConEnvio.toLocaleString()}</p> {/* Precio total con envío */}
          </section>

          <button className={styles["buy_button"]} onClick={agregarAlHistorial}>Confirmar compra</button>
        </aside>
      </div>
    </div>
  );
};

export default Pago; // Exporta el componente Pago como predeterminado