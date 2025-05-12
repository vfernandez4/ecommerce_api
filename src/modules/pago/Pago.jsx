import { useState } from "react"; // Importa el hook useState de React
import styles from "./pago.module.css"; // Importa los estilos CSS del componente Pago

const Pago = () => { // Componente funcional Pago
  const [calle, setCalle] = useState(""); // Estado para almacenar la calle
  const [numero, setNumero] = useState(""); // Estado para almacenar el número
  const [piso, setPiso] = useState(""); // Estado para almacenar el piso
  const [depto, setDepto] = useState(""); // Estado para almacenar el departamento
  const [codigoPostal, setCodigoPostal] = useState(""); // Estado para almacenar el código postal

  const [metodoPago, setMetodoPago] = useState(""); // Estado para almacenar el método de pago seleccionado

  const [numeroTarjeta, setNumeroTarjeta] = useState(""); // Estado para almacenar el número de la tarjeta
  const [fechaVencimiento, setFechaVencimiento] = useState(""); // Estado para almacenar la fecha de vencimiento
  const [cvv, setCvv] = useState(""); // Estado para almacenar el CVV
  const [nombreTarjeta, setNombreTarjeta] = useState(""); // Estado para almacenar el nombre en la tarjeta

  const [cartItems, setCartItems] = useState(() => { // Estado para almacenar los productos del carrito
    const carritoGuardado = localStorage.getItem("carrito"); // Obtiene el carrito guardado en localStorage
    return carritoGuardado ? JSON.parse(carritoGuardado) : []; // Si existe, lo parsea; si no, inicializa como un array vacío
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

          <button className={styles["buy_button"]}>Confirmar compra</button> {/* Botón para confirmar la compra */}
        </aside>
      </div>
    </div>
  );
};

export default Pago; // Exporta el componente Pago como predeterminado