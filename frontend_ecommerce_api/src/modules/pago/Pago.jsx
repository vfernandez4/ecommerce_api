import { useState } from "react";
import styles from "./pago.module.css";
import { useNavigate } from "react-router-dom";
import { useCarrito } from "../../context/CarritoContext";

const Pago = () => {
  const { vaciarCarrito } = useCarrito();
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

  function calcularTotal(items) {
    let total = 0;
    items.forEach(item => {
      total += item.precio * item.cantidad;
    });
    return total;
  }
  const total = calcularTotal(cartItems);

  const envio = 7000;
  const totalConEnvio = total + envio;

  const navigate = useNavigate();

  const agregarAlHistorial = async () => {
    try {
      const token = localStorage.getItem("token");
  
      // Enviar cada item por separado
      for (const item of cartItems) {
        const resSet = await fetch("http://localhost:8082/api/carrito", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            productoId: item.id,
            cantidad: item.cantidad,
          }),
        });
  
        if (!resSet.ok) throw new Error("No se pudo guardar un producto en el carrito");
      }
  
      // Luego finalizar la compra
      const resFinalizar = await fetch("http://localhost:8082/api/carrito/finalizar", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!resFinalizar.ok) throw new Error("No se pudo finalizar la compra");
  
      const json = await resFinalizar.json();
      const success = json.success;
  
      if (success) {
        alert("Gracias por tu compra!");
        vaciarCarrito();
        navigate("/");
      } else {
        alert("Hubo un problema al finalizar la compra.");
      }
  
    } catch (err) {
      console.error("Error en el proceso de compra:", err);
      alert("Error al finalizar la compra. Intente nuevamente.");
    }
  };
  
  
  

  return (
    <div className={styles["body"]}>
      <div className={styles["page-container"]}>
        <div className={styles["purchase-details"]}>
          <h3 className={styles["title"]}>Direccion de entrega</h3>
          <form className={styles["forms"]} action="">
            <section>
              <label>Calle</label>
              <br />
              <input type="text" value={calle} onChange={(e) => setCalle(e.target.value)} />
            </section>
            
            <section>
              <label>Numero</label>
              <br />
              <input type="number" value={numero} onChange={(e) => setNumero(e.target.value)} />
            </section>
            
            <section>
              <label>Piso</label>
              <br />
              <input type="number" value={piso} onChange={(e) => setPiso(e.target.value)} />
            </section>
            
            <section>
              <label>Dpto</label>
              <br />
              <input type="" value={depto} onChange={(e) => setDepto(e.target.value)} />
            </section>

            <section>
              <label>Codigo Postal</label>
              <br />
              <input type="number" value={codigoPostal} onChange={(e) => setCodigoPostal(e.target.value)} />
            </section>
          </form>

          <hr />

          <h3 className={styles["title"]}>Forma de pago</h3>

          <label>
            <input type="radio" name="metodoPago" value="credito" checked={metodoPago === "credito"} onChange={(e) => setMetodoPago(e.target.value)} />
            Tarjeta de crédito
          </label>

          <br />

          <label>
            <input type="radio" name="metodoPago" value="debito" checked={metodoPago === "debito"} onChange={(e) => setMetodoPago(e.target.value)} />
            Tarjeta de débito
          </label>

          <form className={styles["forms"]} action="">
            <section>
              <label>Numero</label>
              <br />
              <input type="number" value={numeroTarjeta} onChange={(e) => setNumeroTarjeta(e.target.value)} />
            </section>

            <section>
              <label>Fecha de vencimiento</label>
              <br />
              <input type="date" value={fechaVencimiento} onChange={(e) => setFechaVencimiento(e.target.value)} />
            </section>

            <section>
              <label>CVV</label>
              <br />
              <input type="number" value={cvv} onChange={(e) => setCvv(e.target.value)} />
            </section>

            <section>
              <label>Nombre en la tarjeta</label>
              <br />
              <input type="text" value={nombreTarjeta} onChange={(e) => setNombreTarjeta(e.target.value)} />
            </section>
          </form>
        </div>

        <aside className={styles["buy-resume"]}>
          <h3 className={styles["title"]}>Resumen de compra</h3>
          <hr />
          <section className={styles["buy_details"]}>
            <p className={styles["detail"]}>Producto</p>
            <p className={styles["price"]}>${total.toLocaleString()}</p>
          </section>
          <section className={styles["buy_details"]}>
            <p className={styles["detail"]}>Envio</p>
            <p className={styles["price"]}>${envio.toLocaleString()}</p>
          </section>
          <hr />
          <section className={styles["buy_details"]}>
            <p className={styles["detail"]}>Total</p>
            <p className={styles["price"]}>${totalConEnvio.toLocaleString()}</p>
          </section>

          <button className={styles["buy_button"]} onClick={agregarAlHistorial}>Confirmar compra</button>
        </aside>
      </div>
    </div>
  );
};

export default Pago;