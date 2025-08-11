# 🧠 Asistente de Desarrollo AI con Mistral

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/tu-usuario/tu-repositorio)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)

> **Un cliente de chat avanzado y de código abierto que funciona como un lienzo de trabajo iterativo con la API de Mistral AI**

Este asistente permite mantener un contexto conversacional para modificar, mejorar y expandir las respuestas anteriores, creando un resultado unificado y coherente. A diferencia de un chat convencional, aquí cada interacción refina y mejora el trabajo anterior.

## 📸 Vista Previa

```
┌─────────────────────────────────────────────────────┐
│  📚 Historial  │  💬 Chat Principal  │  📊 Stats    │
├─────────────────────────────────────────────────────┤
│  • Conversación 1  │                    │  Tokens: 45K │
│  • Conversación 2  │     ¡Hola! ¿En     │  Caracteres:  │
│  • Conversación 3  │  qué puedo ayudarte │     245K     │
│                     │       hoy?          │              │
└─────────────────────────────────────────────────────┘
```

## ✨ Características Principales

### 🔄 **Chat Contextual Iterativo**
- Modifica y mejora respuestas previas sin perder el contexto
- La IA refina su trabajo anterior en lugar de añadir respuestas nuevas
- Mantiene coherencia a lo largo de toda la conversación

### 🛡️ **Arquitectura Serverless Segura**
- Clave API de Mistral protegida en el backend (Vercel Functions)
- Sin exposición de credenciales en el cliente
- Comunicación segura entre frontend y API

### 🎨 **Interfaz de Usuario Premium**
- **📚 Panel de Historial:** Guarda y recupera conversaciones completas
- **💬 Panel de Chat:** Área principal de interacción con IA
- **📊 Panel de Estadísticas:** Monitoreo en tiempo real de tokens y caracteres
- **📱 Diseño Responsive:** Experiencia fluida en escritorio y móvil

### 🚀 **Experiencia de Desarrollador**
- Renderizado de Markdown con syntax highlighting
- Soporte para múltiples lenguajes de programación
- Botones de copia con un clic para bloques de código
- Área de texto auto-expandible
- Envío rápido con `Enter`

### 💾 **Persistencia Inteligente**
- Historial guardado localmente (`localStorage`)
- Estadísticas de sesión persistentes
- Recuperación automática de conversaciones

## 🛠️ Stack Tecnológico

<div align="center">

| Capa | Tecnología | Propósito |
|------|------------|-----------|
| **Frontend** | HTML5 + CSS3 + JavaScript ES6+ | Interfaz de usuario responsive |
| **Renderizado** | Marked.js + Prism.js | Markdown y syntax highlighting |
| **Backend** | Node.js + Vercel Functions | API serverless segura |
| **Deployment** | Vercel | Hosting y CI/CD |

</div>

### 📦 Dependencias
```json
{
  "dependencies": {
    "node-fetch": "^2.6.7"
  },
  "devDependencies": {
    "vercel": "latest"
  }
}
```

## 📁 Estructura del Proyecto

```
PROYECTO_ASISTENTE_AI/
├── 📁 api/
│   └── 🟢 consulta.js          # Función serverless principal
├── 📁 public/
│   ├── 🌐 index.html           # Estructura HTML
│   ├── 🎨 style.css            # Estilos responsive
│   └── ⚡ script.js            # Lógica del cliente
├── ⚙️ package.json             # Configuración y dependencias
├── 🚀 vercel.json              # Configuración de Vercel
├── 📝 README.md                # Esta documentación
└── 🚫 .gitignore               # Archivos excluidos de Git
```

## 🚀 Guía de Instalación

### ✅ Prerrequisitos

Antes de comenzar, asegúrate de tener:

- **Node.js 18+** - [Descargar aquí](https://nodejs.org/)
- **Cuenta Vercel** - [Registro gratuito](https://vercel.com/signup)
- **API Key Mistral** - [Obtener en Mistral Console](https://console.mistral.ai/api-keys/)
- **Git** - [Instalar Git](https://git-scm.com/downloads)

## Codigo HTML - archivo index.html:

Interfaz web para un asistente de IA que utiliza el modelo Mistral. Aplicación de chat completa con historial de conversaciones y estadísticas de uso en tiempo real.

✨ Características

💬 Chat interactivo con IA
📚 Historial de conversaciones
📊 Estadísticas de tokens y caracteres
📱 Diseño responsive
🎨 Soporte para Markdown y resaltado de código
🌙 Tema oscuro moderno

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <link rel="icon" type="image/png" href="https://cdn3d.iconscout.com/3d/premium/thumb/ai-chip-9254340-7577793.png">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Asistente de Desarrollo AI con Mistral</title>
    
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css">
</head>
<body>
    <div class="app-container">
        <aside id="history-panel" class="history-panel">
            <header>
                <button id="close-history-btn" class="mobile-only-btn" title="Cerrar Historial"><i class="fa-solid fa-xmark"></i></button>
                <h2><i class="fa-solid fa-clock-rotate-left"></i> Historial</h2>
                <div class="header-buttons">
                    <button id="new-chat-btn" title="Iniciar nueva conversación"><i class="fa-solid fa-plus"></i> Nuevo</button>
                    <button id="clear-history-btn" title="Limpiar todo el historial"><i class="fa-solid fa-trash-can"></i></button>
                </div>
            </header>
            <div id="history-list" class="history-list"></div>
        </aside>
        
        <main class="chat-panel">
            <header class="main-header">
                <button id="toggle-history-btn" class="mobile-only-btn" title="Ver Historial"><i class="fa-solid fa-clock-rotate-left"></i></button>
                <div class="main-header-title">
                    <h1>Asistente de Desarrollo AI</h1>
                    <p>Potenciado por Mistral</p>
                </div>
                <button id="toggle-stats-btn" class="mobile-only-btn" title="Ver Estadísticas"><i class="fa-solid fa-chart-simple"></i></button>
            </header>
            <div id="chat-response" class="chat-response">
                <div class="welcome-message"><p>¡Hola! Soy tu asistente de desarrollo. ¿En qué puedo ayudarte hoy?</p></div>
            </div>
            <div class="chat-input-area">
                <form id="chat-form">
                    <textarea id="prompt-input" placeholder="Escribe tu prompt aquí..." rows="1"></textarea>
                    <button type="submit" id="send-btn" title="Enviar Prompt"><i class="fa-solid fa-paper-plane"></i></button>
                </form>
            </div>
        </main>
        
        <aside id="stats-panel" class="stats-panel">
            <header>
                <button id="close-stats-btn" class="mobile-only-btn" title="Cerrar Estadísticas"><i class="fa-solid fa-xmark"></i></button>
                <h2><i class="fa-solid fa-chart-simple"></i> Estadísticas</h2>
            </header>
            <div class="stats-content">
                <div class="stats-section">
                    <h3>Última Interacción</h3>
                    <div class="stat-item">
                        <span><i class="fa-solid fa-arrow-up"></i> Prompt:</span>
                        <span id="prompt-stats">-</span>
                    </div>
                    <div class="stat-item">
                        <span><i class="fa-solid fa-arrow-down"></i> Respuesta:</span>
                        <span id="completion-stats">-</span>
                    </div>
                </div>
                <div class="stats-section">
                    <h3>Totales de la Sesión</h3>
                    <div class="stat-item">
                        <span><i class="fa-solid fa-hashtag"></i> Tokens Totales:</span>
                        <span id="session-total-tokens">-</span>
                    </div>
                    <div class="stat-item">
                        <span><i class="fa-solid fa-font"></i> Caracteres Totales:</span>
                        <span id="session-total-chars">-</span>
                    </div>
                </div>
            </div>
        </aside>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/marked/11.1.1/marked.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-core.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/autoloader/prism-autoloader.min.js"></script>
    <script src="script.js" type="module"></script>
</body>
</html>
---
🎯 Funcionalidad

✅ Chat interactivo con IA
✅ Historial de conversaciones
✅ Estadísticas de uso
✅ Interfaz responsive
✅ Soporte para código y markdown
✅ Diseño moderno con iconosReintentarClaude puede cometer errores. Por favor, verifique las respuestas.
### 📋 Instalación Paso a Paso

#### 1️⃣ Clonar el Repositorio

```bash
# Clona el proyecto
git clone https://github.com/tu-usuario/tu-repositorio.git
cd tu-repositorio

# Verifica la estructura
ls -la
```

#### 2️⃣ Instalar Dependencias

```bash
# Instala las dependencias del backend
npm install

# Opcional: Verifica la instalación
npm list
```

#### 3️⃣ Configuración Inicial de Vercel

```bash
# Instala Vercel CLI globalmente
npm install -g vercel

# Inicia sesión en Vercel
vercel login
```

#### 4️⃣ Primer Despliegue

```bash
# Ejecuta el comando de despliegue
vercel

# Responde a las preguntas:
# ✅ Set up and deploy? → Y
# ✅ Which scope? → [Enter] (cuenta personal)
# ✅ Link to existing project? → N
# ✅ Project name? → [Enter] o nombre personalizado
# ✅ Directory? → [Enter] (directorio actual)
```

#### 5️⃣ 🔑 Configurar Variable de Entorno

```bash
# Añade tu clave de API de Mistral
vercel env add MISTRAL_API_KEY

# Pega tu clave cuando se solicite
# Selecciona: Production, Preview, Development (spacebar + enter)
```

#### 6️⃣ Despliegue a Producción

```bash
# Despliegue final con la variable configurada
vercel --prod
```

## 🎯 Uso del Asistente

### Funcionalidades Principales

1. **💬 Chat Iterativo**
   ```
   Usuario: "Crea una función en Python"
   AI: [Genera función básica]
   Usuario: "Mejórala con manejo de errores"
   AI: [Refina la función anterior añadiendo try-catch]
   ```

2. **📚 Gestión de Historial**
   - Guarda automáticamente cada conversación
   - Recupera conversaciones anteriores con un clic
   - Elimina conversaciones no deseadas

3. **📊 Monitoreo de Uso**
   - Tokens consumidos en tiempo real
   - Caracteres procesados
   - Estadísticas de sesión

### Atajos de Teclado

| Atajo | Acción |
|-------|--------|
| `Enter` | Enviar mensaje |
| `Shift + Enter` | Nueva línea |
| `Ctrl + /` | Alternar panel lateral |

## ⚡ Desarrollo Local

Para desarrollo local, puedes usar el servidor de Vercel:

```bash
# Instala Vercel CLI si no lo tienes
npm i -g vercel

# Ejecuta el servidor de desarrollo
vercel dev

# La aplicación estará disponible en:
# http://localhost:3000
```

### Variables de Entorno para Desarrollo

Crea un archivo `.env.local`:

```env
MISTRAL_API_KEY=tu_clave_secreta_aqui
```

## 🔧 Personalización

### Cambiar el Modelo de Mistral

Edita `/api/consulta.js`:

```javascript
const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
  // ...
  body: JSON.stringify({
    model: 'mistral-large-latest', // Cambia aquí el modelo
    // ...
  })
});
```

### Personalizar Estilos

Modifica `/public/style.css` para cambiar:
- Colores del tema
- Tipografías
- Espaciado y layout
- Responsive breakpoints

## 🐛 Solución de Problemas

### Problemas Comunes

**❌ Error: "API Key not found"**
```bash
# Verifica que la variable esté configurada
vercel env ls

# Si no está, añádela:
vercel env add MISTRAL_API_KEY
```

**❌ Error: "Module not found"**
```bash
# Reinstala las dependencias
npm install
vercel --prod
```

**❌ Error: "Function timeout"**
- Verifica tu conexión a internet
- Comprueba que la API de Mistral esté disponible
- Reduce el tamaño de tu prompt

### Logs y Debugging

```bash
# Ver logs de la función
vercel logs

# Ver logs en tiempo real
vercel logs --follow
```

## 🤝 Contribuir al Proyecto

¡Las contribuciones son bienvenidas! Sigue estos pasos:

1. **Fork** el repositorio
2. **Crea** una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. **Commit** tus cambios (`git commit -m 'Añade nueva funcionalidad'`)
4. **Push** a la rama (`git push origin feature/nueva-funcionalidad`)
5. **Abre** un Pull Request

### Estilo de Código

- Usa **ESLint** y **Prettier** para formateo
- Comenta el código complejo
- Incluye tests cuando sea posible
- Actualiza la documentación

## 🗺️ Roadmap

- [ ] 🌐 Soporte multi-idioma
- [ ] 🎨 Editor de temas personalizado
- [ ] 📤 Exportación de conversaciones (PDF, Markdown)
- [ ] 🔌 Plugin system para extensiones
- [ ] 📱 App móvil nativa
- [ ] 🔊 Soporte de voz (speech-to-text)
- [ ] 📊 Dashboard analítico avanzado

## 📜 Licencia

Este proyecto está bajo la **Licencia MIT**. Consulta el archivo [LICENSE](LICENSE) para más detalles.

## 🙏 Agradecimientos

- **Mistral AI** por proporcionar la API
- **Vercel** por el hosting serverless
- **Marked.js** y **Prism.js** por el renderizado
- La comunidad de **código abierto**

---

<div align="center">

**¿Te gusta este proyecto?** ⭐ **¡Dale una estrella en GitHub!**

[🐛 Reportar Bug](https://github.com/tu-usuario/tu-repositorio/issues) • [✨ Solicitar Feature](https://github.com/tu-usuario/tu-repositorio/issues) • [📖 Documentación](https://github.com/tu-usuario/tu-repositorio/wiki)

</div>
