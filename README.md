# Estación 927 - Tienda Saludable 🌿

¡Buenas! Bienvenidos al repositorio de **Estación 927**, un trabajo profesional de diseño y desarrollo web para la dietética y tienda saludable homónima ubicada en la ciudad de **Rosario, Santa Fe, Argentina**.

> [!TIP]
> Podés ver el resultado final en producción ingresando a [estacion927.com.ar](https://estacion927.com.ar).

Este proyecto fue concebido y desarrollado desde cero con un enfoque de alto nivel, buscando fusionar una estética visual limpia y premium con una experiencia de usuario interactiva y fluida para todos los clientes que buscan una alimentación consciente y saludable. Todo el diseño y la maquetación fueron pensados y estructurados bajo una filosofía **Mobile First**, priorizando una experiencia óptima y responsiva en dispositivos móviles.

---

## 🌟 ¿Qué vas a encontrar en este proyecto?

El desarrollo está estructurado como una Single Page Application para el sitio principal, complementada con un módulo dinámico e interactivo de catálogo y carrito de compras.

### 1. Landing Page Principal (`index.html`)
Diseñada con una estructura limpia y moderna, cuenta con las siguientes secciones estratégicas:
- **Cabecera Dinámica (`Header`):** Navegación fluida y adaptada a dispositivos móviles con un menú lateral responsivo y elegante.
- **Hero Section:** Una presentación de alto impacto que establece la identidad visual de la marca.
- **Nosotros / Filosofía:** Espacio donde se destaca la propuesta humana y personalizada de Estación 927 en su local de Necochea 1823.
- **Local / Galería:** Sección visual interactiva para conocer la disposición de los productos en la tienda física.
- **Contacto & Ubicación:** 
  - Integración interactiva de la ubicación física en Rosario mediante la API de **Google Maps** (a través de un iframe optimizado).
  - Vías rápidas de comunicación directa.
- **Botón Flotante de WhatsApp:** Acceso rápido y persistente en toda la navegación para que los clientes puedan enviar un mensaje directo de consulta al local con un solo clic.

### 2. Catálogo Dinámico e Interactivo (`catalogo.html`)
Es el corazón operativo del sitio. Permite a los clientes interactuar de forma directa y autónoma con el inventario del negocio:
- **Visualización de Productos:** Lista completa de los productos disponibles. Las consultas en tiempo real se realizan consumiendo la API de **Stockeado**, otro proyecto propio desarrollado a medida para la gestión de stock y catálogos.
- **Carrito de Pedidos Inteligente:** El usuario puede seleccionar productos, ajustar cantidades, visualizar subtotales y gestionar su pedido en tiempo real.
- **Finalización de Compra por WhatsApp:** Al confirmar el pedido, el sistema genera de forma automática un mensaje detallado y formato listo para ser enviado directamente al WhatsApp del negocio. ¡Ideal para agilizar la toma de pedidos!

### 3. Animaciones Sutiles y Micro-interacciones
Para elevar la experiencia visual del usuario (sin sobrecargar el rendimiento de la página), implementamos animaciones nativas a medida en JavaScript:
- **Efecto Parallax en Hero:** El fondo del banner principal se desplaza suavemente a diferente velocidad que el scroll general del sitio.
- **Scroll Reveal (Intersection Observer):** Las secciones y tarjetas clave aparecen de manera fluida (fade-in y translate) a medida que el usuario se desplaza por la pantalla.
- **Efecto de Header Scrolled:** La barra de navegación se contrae y gana opacidad al hacer scroll para no interrumpir la lectura del contenido.
- **Botón Flotante de WhatsApp:** Un punto de contacto rápido siempre accesible y animado sutilmente.

---

## ⚙️ Configuración del Proyecto

Si querés probar la aplicación de manera local o conectarla con tu propio backend, el sistema requiere un archivo de configuración.

### Paso a paso para configurar tu entorno:

1. **Localizar el archivo de configuración:**
   En la raíz del proyecto vas a encontrar un archivo llamado `config.example.js`.

2. **Crear tu archivo original de configuración:**
   Copia el archivo `config.example.js` y colócalo en el directorio de assets de JavaScript con el nombre `config.js`:
   
   ```bash
   # Copiar el archivo de configuración de ejemplo al directorio correspondiente
   cp config.example.js assets/js/config.js
   ```

   > [!IMPORTANT]
   > Para que la aplicación funcione correctamente, el archivo de configuración final **DEBE** estar ubicado exactamente en:
   > `assets/js/config.js`

3. **Modificar las credenciales:**
   Abre tu nuevo archivo `assets/js/config.js` y configura los parámetros según las necesidades de tu entorno:

   ```javascript
   const CONFIG = {
       API_URL: 'http://127.0.0.1:8000/api/v1', // URL base de la API de tu servidor backend
       BUSINESS_ID: 'tu-business-id-uuid',    // UUID del negocio correspondiente en la base de datos
       API_KEY: 'tu-api-key-de-acceso',        // API Key para autorizar las peticiones al backend
       PUBLIC_ONLY: true                       // Cambiar a false si querés listar productos privados durante pruebas
   };
   ```

---

## 🛠️ Tecnologías y Estructura

- **Frontend:** HTML5, CSS3 vanilla (sin dependencias ni frameworks pesados para garantizar una carga ultrarrápida), JavaScript ES6.
- **Iconografía:** Font Awesome 6.
- **Fuentes:** Google Fonts (Montserrat y Playfair Display).
- **Control de Versiones:** Git & GitHub.

Diseñado y desarrollado profesionalmente por [Sebastian Perez](https://sebastianperez.com.ar).
