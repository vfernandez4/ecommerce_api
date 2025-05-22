import { StrictMode } from 'react'; // Importa StrictMode de React para detectar problemas potenciales en la aplicación
import { createRoot } from 'react-dom/client'; // Importa createRoot para renderizar la aplicación en el DOM
import './index.css'; // Importa los estilos globales de la aplicación
import App from './App.jsx'; // Importa el componente principal de la aplicación

createRoot(document.getElementById('root')).render( // Crea el punto de entrada de la aplicación y renderiza el contenido en el elemento con id "root"
	<StrictMode> {/* Envuelve la aplicación en StrictMode para habilitar comprobaciones adicionales */}
		<App /> {/* Renderiza el componente principal de la aplicación */}
	</StrictMode>,
);
