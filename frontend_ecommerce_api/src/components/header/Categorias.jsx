import { useState } from "react";
import { Link } from "react-router-dom";
import { useCategorias } from "../../context/CategoriaContext";
import styles from "./Categorias.module.css";

export default function Categorias() {
  const { categorias } = useCategorias();
  const [abierto, setAbierto] = useState(false);

  return (
    <div className={styles.dropdown} onMouseLeave={() => setAbierto(false)}>
      <button onClick={() => setAbierto(!abierto)} className={styles.boton}>
        Categorías ▾
      </button>
      {abierto && (
        <ul className={styles.menu}>
          {categorias.map((cat) => (
            <li key={cat.id}>
              <Link
                to={`/producto/categoria/${cat.nombre}`}
                onClick={() => setAbierto(false)}
              >
                {cat.nombre}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
