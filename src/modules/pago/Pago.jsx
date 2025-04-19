import React from "react";
import styles from "./pago.module.css";

const Pago = () => {
  return (
    <body className={styles["body"]}>
      <header className={styles["main-header"]}>
        <div className={styles["logo"]}>
          <a href="#">MiTienda</a>
        </div>

        <div className={styles["user-actions"]}>
          <a href="#">Carrito (0)</a>
        </div>
      </header>

      <div className={styles["page-container"]}>
        <div className={styles["purchase-details"]}>
          <h3 className={styles["title"]}>Direccion de entrega</h3>
          <form className={styles["forms"]} action="">
            <section>
            <label htmlFor="calle">Calle</label>
            <br />
            <input type="text" id="calle" name="calle" required />
            </section>
            
            <section>
            <label htmlFor="numero_direccion">Numero</label>
            <br />
            <input type="text" id="numero_direccion" name="numero_direccion" required />
            </section>
            
            <section>
            <label htmlFor="piso">Piso</label>
            <br />
            <input type="text" id="piso" name="piso" required />
            </section>
            
            <section>
            <label htmlFor="dpto">Dpto</label>
            <br />
            <input type="text" id="dpto" name="dpto" required />
            </section>
          </form>

          <hr />

          <h3 className={styles["title"]}>Forma de pago</h3>

          <label>
          <input type="radio" name="metodoPago" value="credito" />Tarjeta de crédito </label>
          <br />
          <label>
          <input type="radio" name="metodoPago" value="debito" />Tarjeta de débito</label>

          <form className={styles["forms"]} action="">
            <section>
              <label htmlFor="numero_tarjeta">Numero</label>
              <br />
              <input type="text" id="numero_tarjeta" name="numero_tarjeta" required />
            </section>

            <section>
              <label htmlFor="vencimiento">Fecha de vencimiento</label>
              <br />
              <input type="date" id="vencimiento" name="vencimiento" required />
            </section>

            <section>
              <label htmlFor="cvv">CVV</label>
              <br />
              <input type="text" id="cvv" name="cvv" required />
            </section>

            <section>
              <label htmlFor="nombre">Nombre en la tarjeta</label>
              <br />
              <input type="text" id="nombre" name="nombre" required />
            </section>
          </form>
        </div>

        <aside className={styles["buy-resume"]}>
          <h3 className={styles["title"]}>Resumen de compra</h3>
          <hr />
          <section className={styles["buy_details"]}>
            <p className={styles["detail"]}>Producto</p>
            <p className={styles["price"]}>$20.000</p>
          </section>
          <section className={styles["buy_details"]}>
          <p className={styles["detail"]}>Envio</p>
          <p className={styles["price"]}>$2.000</p>
          </section>
          <hr />
          <section className={styles["buy_details"]}>
          <p className={styles["detail"]}>Total</p>
            <p className={styles["price"]}>$22.000</p>
          </section>

          <button className={styles["buy_button"]}>Confirmar compra</button>
        </aside>
      </div>
    </body>
  );
};

export default Pago;