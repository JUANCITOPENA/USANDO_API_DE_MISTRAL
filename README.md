# 🧠 Asistente de Desarrollo AI con Mistral



Un cliente de chat avanzado y de código abierto, diseñado para funcionar como un **lienzo de trabajo iterativo** con la API de Mistral AI. A diferencia de un chat convencional, este asistente permite mantener un contexto conversacional para modificar, mejorar y expandir las respuestas anteriores, creando un resultado unificado y coherente.

Desplegado fácilmente en Vercel con una arquitectura serverless, este proyecto es la herramienta perfecta para desarrolladores que buscan una experiencia de IA conversacional potente y personalizable.

---

## 🚀 Características Principales

*   🗣️ **Chat Contextual Iterativo:** Modifica y mejora las respuestas de la IA sin perder el hilo. La IA refina su trabajo anterior en lugar de simplemente añadir una nueva respuesta.
*   🔐 **Arquitectura Serverless Segura:** La clave de la API de Mistral se gestiona de forma segura en el backend (Vercel Serverless Function), nunca se expone al cliente.
*   ✨ **Interfaz de 3 Paneles:**
    *   **Historial:** Guarda y recupera conversaciones completas.
    *   **Chat:** El lienzo principal de interacción.
    *   **Estadísticas:** Monitoriza el uso de tokens y caracteres en tiempo real.
*   📱 **Diseño Totalmente Responsive:** Experiencia de usuario impecable tanto en escritorio como en dispositivos móviles.
*   🎨 **UX Premium:**
    *   Renderizado de Markdown con resaltado de sintaxis para múltiples lenguajes de programación.
    *   Botones para copiar bloques de código con un solo clic.
    *   Área de texto auto-expandible.
    *   Envío con la tecla `Enter`.
*   📊 **Persistencia de Datos:** El historial de conversaciones y las estadísticas de la sesión se guardan localmente en el navegador (`localStorage`).

---

## 🛠️ Pila Tecnológica

### Frontend (Cliente Estático)
*   **HTML5**
*   **CSS3** (con diseño responsive mobile-first)
*   **JavaScript Moderno (ESM)**
*   Librerías vía CDN:
    *   [Marked.js](https://marked.js.org/) para renderizar Markdown.
    *   [Prism.js](https://prismjs.com/) para el resaltado de sintaxis.
    *   [Font Awesome](https://fontawesome.com/) para los iconos.

### Backend (Función Serverless)
*   **Node.js**
*   **Vercel Serverless Functions**
*   `node-fetch` para realizar peticiones a la API de Mistral.

---

## 📁 Estructura del Proyecto
PROYECTO_ASISTENTE_AI/
├── api/
│ └── consulta.js # Función serverless para la API
├── public/
│ ├── index.html # Estructura de la aplicación
│ ├── style.css # Estilos visuales
│ └── script.js # Lógica del cliente
├── .gitignore # Archivos a ignorar por Git
├── package.json # Dependencias y configuración
└── vercel.json # Configuración de despliegue en Vercel
code
Code
---

## ⚙️ Guía de Instalación y Despliegue

Sigue estos pasos para tener tu propia instancia del Asistente AI funcionando en minutos.

### ✅ Prerrequisitos

1.  **Node.js y npm:** [Instálalos desde nodejs.org](https://nodejs.org/).
2.  **Cuenta de Vercel:** [Regístrate gratis en Vercel](https://vercel.com/signup).
3.  **Clave de API de Mistral:** [Obtén tu clave desde la consola de Mistral AI](https://console.mistral.ai/api-keys/).
4.  **Git:** [Instala Git](https://git-scm.com/downloads).

### 📋 Pasos Detallados

#### 1. Clonar el Repositorio
Abre tu terminal y clona este proyecto en tu máquina local.
```bash
git clone https://github.com/tu-usuario/tu-repositorio.git
cd tu-repositorio
Reemplaza tu-usuario/tu-repositorio con la URL de tu repositorio en GitHub.
2. Instalar Dependencias
Instala la única dependencia necesaria para el backend.
code
Bash
npm install
3. Desplegar en Vercel
Usa la CLI de Vercel para un despliegue rápido e interactivo.
Instala la CLI de Vercel:
code
Bash
npm install -g vercel
Inicia sesión en Vercel:
code
Bash
vercel login
Esto abrirá tu navegador para que autorices la conexión.
Inicia el despliegue:
code
Bash
vercel
Vercel te hará algunas preguntas. Responde de la siguiente manera:
Set up and deploy? Y
Which scope? Enter (para tu cuenta personal)
Link to existing project? N
What's your project's name? Enter (o escribe un nombre personalizado)
In which directory is your code located? Enter (para ./)
Vercel detectará la configuración automáticamente y realizará un primer despliegue.
4. 🔑 Configurar la Clave de API de Mistral
Este es el paso más importante. Añade tu clave de API como una variable de entorno secreta en Vercel.
code
Bash
vercel env add MISTRAL_API_KEY
La terminal te pedirá que pegues tu clave secreta.
Luego, te preguntará a qué entornos aplicarla. Presiona la barra espaciadora para seleccionar Production y luego presiona Enter.
5. 🚀 Despliegue Final a Producción
Para que la variable de entorno se aplique, realiza un último despliegue en el entorno de producción.
code
Bash
vercel --prod
¡Listo! La terminal te proporcionará la URL de producción de tu asistente. ¡Ahora puedes usarlo y compartirlo!
🤝 Contribuciones
Las contribuciones son bienvenidas. Si deseas mejorar este proyecto, por favor sigue estos pasos:
Haz un Fork del proyecto.
Crea tu propia rama (git checkout -b feature/MejoraIncreible).
Haz Commit de tus cambios (git commit -m 'Añade una MejoraIncreible').
Haz Push a la rama (git push origin feature/MejoraIncreible).
Abre un Pull Request.
📜 Licencia
Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.
