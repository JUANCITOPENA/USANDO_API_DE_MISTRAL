# 🧠 Asistente de Desarrollo AI con Mistral

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/tu-usuario/tu-repositorio)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
---

## 🎯 Concepto Clave

A diferencia de un chat tradicional donde las respuestas se apilan, este asistente permite **modificar, mejorar y expandir la respuesta anterior**. Cada nueva instrucción refina el trabajo existente, creando un resultado único y unificado, ideal para tareas de desarrollo complejas como la generación y refactorización de código.

## ✨ Características Principales

*   🔄 **Chat Contextual Iterativo:** La IA edita y mejora su propia respuesta basándose en tus nuevas peticiones.
*   🔐 **Arquitectura Serverless Segura:** Tu clave de API de Mistral está protegida en una función de Vercel y nunca se expone en el navegador.
*   🎨 **Interfaz Completa de 3 Paneles:**
    *   **Historial:** Guarda y recupera conversaciones completas con un clic.
    *   **Chat:** El lienzo principal donde ocurre la interacción y la magia iterativa.
    *   **Estadísticas:** Monitoriza el uso de tokens y caracteres en tiempo real.
*   ✨ **Experiencia de Usuario Premium:**
    *   Renderizado de Markdown con resaltado de sintaxis para múltiples lenguajes.
    *   Botones para copiar bloques de código con un solo clic.
    *   Área de texto auto-expandible y diseño 100% responsive.

*   **Deployment:** Vercel

 **Un cliente de chat avanzado y de código abierto que funciona como un lienzo de trabajo iterativo con la API de Mistral AI**

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

Sigue estos pasos para desplegar tu propia instancia en minutos.

### ✅ Prerrequisitos

*   **Node.js** instalada.
*   Una cuenta gratuita de **[Vercel](https://vercel.com/signup)**.
*   Una **[clave de API de Mistral](https://console.mistral.ai/api-keys/)**.


### ✅ Prerrequisitos

#### Antes de comenzar, asegúrate de tener:

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


## 🎨 Estilos CSS (style.css)

### 📋 Descripción

Archivo de estilos que define el **tema oscuro moderno** para la interfaz del asistente AI. Utiliza una paleta de colores inspirada en **Tokyo Night** con diseño responsive completo.

### ✨ Características
- 🌙 **Tema oscuro** con paleta Tokyo Night
- 📱 **Diseño responsive** (móvil/tablet/desktop)
- 🎯 **Grid layout** de 3 paneles
- 🎨 **Scrollbars personalizadas**
- ⚡ **Animaciones suaves**
- 💻 **Resaltado de código** integrado

## 📁 Código del archivo style.css

```css
/* --- Variables y Estilos Globales --- */
:root {
    --bg-color: #1a1b26;
    --panel-bg-color: #24283b;
    --border-color: #414868;
    --text-color: #c0caf5;
    --highlight-color: #7aa2f7;
    --accent-color: #bb9af7;
    --green-color: #9ece6a;
    --red-color: #f7768e;
    --font-family: 'Segoe UI', 'Roboto', sans-serif;
}

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

html, body {
    height: 100%;
    font-family: var(--font-family);
    background-color: var(--bg-color);
    color: var(--text-color);
    overflow: hidden;
}

/* --- Estructura Principal --- */
.app-container {
    display: grid;
    grid-template-columns: 280px 1fr 280px;
    height: 100vh;
}

aside, main {
    background-color: var(--panel-bg-color);
    border-left: 1px solid var(--border-color);
    display: flex;
    flex-direction: column;
}

.history-panel {
    border-left: none;
}

header {
    padding: 1rem;
    border-bottom: 1px solid var(--border-color);
    background-color: rgba(0,0,0,0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
}

h1 { color: var(--highlight-color); font-size: 1.5rem; }
h2 { color: var(--accent-color); font-size: 1.2rem; }
h3 { color: var(--green-color); margin-bottom: 0.8rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem;}
i { margin-right: 0.5rem; }

/* --- Panel de Historial (Izquierda) --- */
.history-panel header .header-buttons {
    display: flex;
    gap: 0.5rem;
}
.history-list {
    flex-grow: 1;
    overflow-y: auto;
    padding: 0.5rem;
}
.history-item {
    padding: 0.8rem 1rem;
    margin-bottom: 0.5rem;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.2s;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.history-item:hover {
    background-color: var(--border-color);
}
.history-item.active {
    background-color: var(--highlight-color);
    color: var(--bg-color);
    font-weight: bold;
}
#new-chat-btn, #clear-history-btn {
    background: none;
    border: 1px solid;
    padding: 0.3rem 0.6rem;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
}
#new-chat-btn {
    border-color: var(--green-color);
    color: var(--green-color);
}
#new-chat-btn:hover {
    background-color: var(--green-color);
    color: var(--bg-color);
}
#clear-history-btn {
    border-color: var(--red-color);
    color: var(--red-color);
}
#clear-history-btn:hover {
    background-color: var(--red-color);
    color: var(--bg-color);
}


/* --- Panel de Chat (Central) --- */
.chat-panel {
    display: flex;
    flex-direction: column;
    height: 100vh;
}
.main-header .main-header-title { text-align: center; }
.main-header p {
    font-size: 0.9rem;
    color: var(--text-color);
    opacity: 0.7;
}
.chat-response {
    flex-grow: 1;
    padding: 1.5rem;
    overflow-y: auto;
    line-height: 1.7;
}
.welcome-message {
    text-align: center;
    color: var(--accent-color);
    font-size: 1.2rem;
    margin-top: 2rem;
}
.chat-input-area {
    padding: 1rem;
    border-top: 1px solid var(--border-color);
    background-color: rgba(0,0,0,0.1);
    flex-shrink: 0;
}
#chat-form {
    display: flex;
    align-items: flex-end;
}
#prompt-input {
    flex-grow: 1;
    background-color: #2e344e;
    color: var(--text-color);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    padding: 0.8rem;
    font-family: inherit;
    font-size: 1rem;
    resize: none;
    max-height: 200px;
    overflow-y: auto;
}
#prompt-input:focus {
    outline: none;
    border-color: var(--highlight-color);
    box-shadow: 0 0 5px var(--highlight-color);
}
#send-btn {
    background-color: var(--highlight-color);
    color: var(--bg-color);
    border: none;
    border-radius: 8px;
    padding: 0.8rem 1.2rem;
    margin-left: 0.5rem;
    cursor: pointer;
    font-size: 1.1rem;
    transition: background-color 0.2s;
}
#send-btn:hover {
    background-color: #9abeff;
}
#send-btn:disabled {
    background-color: var(--border-color);
    cursor: not-allowed;
}

/* --- Estilos de la Respuesta del Chat --- */
.message {
    margin-bottom: 2rem;
    padding: 1rem;
    border-radius: 8px;
}
.user-message {
    background-color: rgba(122, 162, 247, 0.1); /* Tono azulado */
    border-left: 3px solid var(--highlight-color);
}
.ai-message {
    background-color: rgba(187, 154, 247, 0.05); /* Tono morado */
}
.message-header {
    font-weight: bold;
    color: var(--accent-color);
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
}
.message-header.user {
    color: var(--highlight-color);
}
.message-content p {
    margin-bottom: 1em;
}
.message-content ul, .message-content ol {
    margin-left: 1.5em;
    margin-bottom: 1em;
}
.message-content a {
    color: var(--green-color);
    text-decoration: none;
}
.message-content a:hover {
    text-decoration: underline;
}

/* --- Bloques de Código y Prism.js --- */
pre[class*="language-"] {
    position: relative;
    margin: 1.5em 0 !important;
    border-radius: 8px !important;
    border: 1px solid var(--border-color);
    overflow: auto;
}
.copy-btn {
    position: absolute;
    top: 0.8em;
    right: 0.8em;
    background: #414868;
    border: none;
    color: var(--text-color);
    padding: 0.3rem 0.6rem;
    border-radius: 5px;
    cursor: pointer;
    opacity: 0.3;
    transition: opacity 0.2s;
}
pre[class*="language-"]:hover .copy-btn {
    opacity: 1;
}
.copy-btn:hover {
    background: var(--highlight-color);
    color: var(--bg-color);
}

/* --- Panel de Estadísticas (Derecha) --- */
.stats-content {
    padding: 1.5rem;
    flex-grow: 1;
    overflow-y: auto;
}
.stats-section {
    margin-bottom: 2rem;
}
.stat-item {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;
    font-size: 0.9rem;
}
.stat-item span:first-child {
    color: var(--text-color);
    opacity: 0.8;
}
.stat-item span:last-child {
    font-weight: bold;
    color: var(--green-color);
}

/* --- Scrollbars Personalizadas --- */
::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}
::-webkit-scrollbar-track {
    background: var(--bg-color);
}
::-webkit-scrollbar-thumb {
    background-color: var(--border-color);
    border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
    background-color: var(--highlight-color);
}

/* --- Estado de Carga --- */
.loading-indicator {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
}
.loading-indicator .fa-spinner {
    font-size: 2rem;
    color: var(--accent-color);
}

/* --- Botones solo para móvil (ocultos por defecto) --- */
.mobile-only-btn {
    display: none;
    background: none;
    border: none;
    color: var(--text-color);
    font-size: 1.5rem;
    cursor: pointer;
}
.mobile-only-btn i { margin: 0; }

/*
=====================================================
===               DISEÑO RESPONSIVE               ===
=====================================================
*/
@media (max-width: 800px) {
    .app-container {
        grid-template-columns: 1fr;
    }
    
    .history-panel, .stats-panel {
        display: none;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 100;
        border-left: none;
    }
    .panel-visible {
        display: flex;
    }
    .main-header .mobile-only-btn {
        display: block;
    }
    .history-panel header .mobile-only-btn,
    .stats-panel header .mobile-only-btn {
        display: block;
    }
    .main-header {
        justify-content: space-between;
    }
    .main-header-title h1 { font-size: 1.2rem; }
}
```

### 🎨 Paleta de Colores (Tokyo Night)
```css
--bg-color: #1a1b26        /* Fondo principal */
--panel-bg-color: #24283b   /* Fondo de paneles */
--text-color: #c0caf5       /* Texto principal */
--highlight-color: #7aa2f7  /* Azul (botones/enlaces) */
--accent-color: #bb9af7     /* Morado (títulos) */
--green-color: #9ece6a      /* Verde (éxito) */
--red-color: #f7768e        /* Rojo (eliminar) */
```


## ⚡ En la Carpeta API, crea el Archivo conultas.js

### 📋 Descripción

**Función serverless** que actúa como intermediario entre la interfaz web y la API de Mistral. Procesa las peticiones del chat y devuelve las respuestas de la IA con manejo de errores completo.

### ✨ Características
- 🔐 **Autenticación segura** con API Key
- 🛡️ **Validación de datos** de entrada
- 🎯 **System prompt** personalizado para desarrollo
- 📊 **Estadísticas de uso** (tokens)
- 🚨 **Manejo robusto de errores**
- 🌐 **Compatible** con Vercel/Netlify Functions

### 📁 Código  del archivo consulta.js en JavaScript

```javascript
import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { messages } = req.body;
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "El array 'messages' es requerido." });
  }

  const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY;

  const systemPrompt = `
    Eres un asistente de desarrollo de software experto.
    Proporcionas respuestas claras, concisas y técnicas.
    Hablas en español, pero usas inglés para términos técnicos.
    Formatea siempre el código en bloques Markdown con el lenguaje especificado.
  `;

  try {
    const apiResponse = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${MISTRAL_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "mistral-large-latest",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages
        ]
      })
    });

    if (!apiResponse.ok) {
        const errorBody = await apiResponse.json().catch(() => ({ message: 'Error desconocido en la API' }));
        console.error("Error desde la API de Mistral:", errorBody);
        return res.status(apiResponse.status).json({ error: errorBody.message });
    }

    const data = await apiResponse.json();
    
    return res.status(200).json({ 
        reply: data.choices[0].message.content,
        usage: data.usage 
    });

  } catch (error) {
    console.error("Error en la función serverless:", error);
    return res.status(500).json({ error: "Error interno del servidor en la función." });
  }
}
```

### 🔧 Configuración Requerida

#### Variables de Entorno
```bash
# .env.local (desarrollo) o Variables de Entorno (producción)
MISTRAL_API_KEY=tu_clave_api_mistral_aqui
```

#### Vercel.json:

```json
{
  "version": 2,
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/api/$1" },
    { "source": "/(.*)", "destination": "/$1" }
  ]
}

```

#### Packaje.json:
```package.json
{
  "type": "module",
  "dependencies": {
    "node-fetch": "^3.3.2"
  }
```

### 📱 Responsive Breakpoints
- **Desktop**: `> 800px` - Layout de 3 columnas
- **Móvil**: `≤ 800px` - Panel único con navegación por botones



## ⚙️ Codigo del archivo script.js:

### 📋 Descripción
**Motor principal de la aplicación** que maneja toda la interacción del usuario, comunicación con la API, gestión del historial y renderizado dinámico de mensajes con soporte completo para Markdown y resaltado de código.

### ✨ Funcionalidades
- 💬 **Chat en tiempo real** con Mistral AI
- 💾 **Persistencia** en localStorage
- 📚 **Historial** de conversaciones
- 📊 **Estadísticas** de tokens/caracteres
- 🎨 **Renderizado Markdown** con Prism.js
- 📋 **Botones de copiar** código automáticos

### 📁 Código JavaScript

```javascript
// --- Selección de Elementos del DOM ---
const chatForm = document.getElementById('chat-form');
const promptInput = document.getElementById('prompt-input');
const sendBtn = document.getElementById('send-btn');
const chatResponse = document.getElementById('chat-response');
const historyList = document.getElementById('history-list');
const newChatBtn = document.getElementById('new-chat-btn');
const clearHistoryBtn = document.getElementById('clear-history-btn');
const promptStatsEl = document.getElementById('prompt-stats');
const completionStatsEl = document.getElementById('completion-stats');
const sessionTotalTokensEl = document.getElementById('session-total-tokens');
const sessionTotalCharsEl = document.getElementById('session-total-chars');

// --- Estado de la Aplicación ---
let state = {
    history: [],
    currentConversationId: null,
    sessionTotals: { tokens: 0, chars: 0 },
    isLoading: false,
};

// --- INICIALIZACIÓN ---
document.addEventListener('DOMContentLoaded', () => {
    loadState();
    setupEventListeners();
    startNewChat(false);
});

// --- LÓGICA DE EVENTOS ---
function setupEventListeners() {
    chatForm.addEventListener('submit', handleFormSubmit);
    newChatBtn.addEventListener('click', () => startNewChat(true));
    clearHistoryBtn.addEventListener('click', clearAllData);
    historyList.addEventListener('click', handleHistoryClick);
    promptInput.addEventListener('input', autoExpandTextarea);
    promptInput.addEventListener('keydown', handleTextareaKeydown);
    chatResponse.addEventListener('click', handleChatResponseClick);
}

function startNewChat(savePrevious = true) {
    if (savePrevious && state.currentConversationId) {
        // La conversación ya se guarda en cada turno, así que no es necesario aquí.
    }
    state.currentConversationId = null;
    chatResponse.innerHTML = `<div class="welcome-message"><p>¡Hola! Soy tu asistente de desarrollo.</p></div>`;
    updateTurnStats(null); // Resetea estadísticas del turno
    renderHistory();
}

async function handleFormSubmit(e) {
    e.preventDefault();
    if (state.isLoading) return;

    const userPrompt = promptInput.value.trim();
    if (!userPrompt) return;

    setLoading(true);

    // Si es el inicio de un nuevo chat, borra el mensaje de bienvenida
    if (!state.currentConversationId) {
        chatResponse.innerHTML = '';
        state.currentConversationId = Date.now();
    }
    
    // Añade el mensaje del usuario a la pantalla
    renderMessage('user', userPrompt);

    // Recupera la conversación actual o empieza una nueva
    const currentConversation = findConversationById(state.currentConversationId) || { id: state.currentConversationId, messages: [] };
    currentConversation.messages.push({ role: 'user', content: userPrompt });

    promptInput.value = '';
    autoExpandTextarea();
    
    // Muestra el indicador de carga
    const loadingIndicator = renderLoadingIndicator();

    try {
        const response = await fetchMistralAPI(currentConversation.messages);
        const { reply, usage } = response;
        
        currentConversation.messages.push({ role: 'assistant', content: reply });
        
        loadingIndicator.remove();
        renderMessage('assistant', reply, true); // Renderiza la nueva respuesta

        updateTurnStats(usage, userPrompt, reply);
        updateSessionTotals(usage);
        saveConversation(currentConversation);

    } catch (error) {
        loadingIndicator.remove();
        renderMessage('error', `Error: ${error.message || 'Error desconocido'}`);
    } finally {
        setLoading(false);
    }
}

// --- LÓGICA DE DATOS Y ESTADO ---
function loadState() {
    const savedState = localStorage.getItem('mistralChatState_v5');
    if (savedState) {
        state = JSON.parse(savedState);
        state.isLoading = false; // Nunca cargar en estado de loading
    }
}

function saveState() {
    localStorage.setItem('mistralChatState_v5', JSON.stringify(state));
}

function findConversationById(id) {
    return state.history.find(conv => conv.id === id);
}

function saveConversation(conversation) {
    const index = state.history.findIndex(c => c.id === conversation.id);
    if (index > -1) {
        state.history[index] = conversation; // Actualiza
    } else {
        state.history.push(conversation); // Añade
    }
    renderHistory();
    saveState();
}

function clearAllData() {
    if (confirm('¿Estás seguro de que quieres borrar todo el historial?')) {
        state.history = [];
        state.sessionTotals = { tokens: 0, chars: 0 };
        startNewChat(false);
        updateSessionTotals();
        saveState();
    }
}

// --- LÓGICA DE RENDERIZADO Y UI ---
function renderHistory() {
    historyList.innerHTML = '';
    [...state.history].reverse().forEach(conv => {
        const firstUserMsg = conv.messages.find(m => m.role === 'user');
        if (!firstUserMsg) return;

        const li = document.createElement('div');
        li.className = 'history-item';
        li.textContent = firstUserMsg.content.substring(0, 40) + '...';
        li.dataset.id = conv.id;
        if (conv.id === state.currentConversationId) {
            li.classList.add('active');
        }
        historyList.appendChild(li);
    });
}

function handleHistoryClick(e) {
    if (e.target.closest('.history-item')) {
        const id = Number(e.target.closest('.history-item').dataset.id);
        const conversation = findConversationById(id);
        if (conversation) {
            state.currentConversationId = id;
            chatResponse.innerHTML = '';
            conversation.messages.forEach(msg => {
                renderMessage(msg.role, msg.content, msg.role === 'assistant');
            });
            updateTurnStats(null); // Limpia estadísticas de turno al cargar
            renderHistory();
        }
    }
}

function renderMessage(role, content, parseMarkdown = false) {
    const messageContainer = document.createElement('div');
    messageContainer.className = `message ${role}-message`;
    const header = document.createElement('div');
    header.className = `message-header ${role}`;
    header.innerHTML = `<i class="fa-solid ${role === 'user' ? 'fa-user' : 'fa-robot'}"></i> ${role === 'user' ? 'Tú' : 'Asistente AI'}`;
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';

    if (parseMarkdown) {
        contentDiv.innerHTML = marked.parse(content);
        setTimeout(() => Prism.highlightAllUnder(contentDiv), 0);
        addCopyButtons(contentDiv);
    } else if (role === 'error') {
        contentDiv.innerHTML = `<p style="color: var(--red-color);">${content}</p>`;
    } else {
        const p = document.createElement('p');
        p.textContent = content;
        contentDiv.appendChild(p);
    }
    messageContainer.appendChild(header);
    messageContainer.appendChild(contentDiv);
    chatResponse.appendChild(messageContainer);
    chatResponse.scrollTop = chatResponse.scrollHeight;
}

function renderLoadingIndicator() {
    const loadingContainer = document.createElement('div');
    loadingContainer.className = 'message ai-message loading-placeholder';
    loadingContainer.innerHTML = `<div class="message-header ai"><i class="fa-solid fa-robot"></i> Asistente AI</div><div class="message-content"><div class="loading-indicator"><i class="fa-solid fa-spinner fa-spin"></i></div></div>`;
    chatResponse.appendChild(loadingContainer);
    chatResponse.scrollTop = chatResponse.scrollHeight;
    return loadingContainer;
}

function setLoading(isLoading) { state.isLoading = isLoading; sendBtn.disabled = isLoading; promptInput.disabled = isLoading; }

// --- LÓGICA DE ESTADÍSTICAS ---
function updateTurnStats(usage, promptText = '', replyText = '') {
    promptStatsEl.textContent = `${usage?.prompt_tokens || 0} tokens / ${promptText.length} chars`;
    completionStatsEl.textContent = `${usage?.completion_tokens || 0} tokens / ${replyText.length} chars`;
}

function updateSessionTotals(usage = null) {
    if (usage) {
        state.sessionTotals.tokens += usage.total_tokens;
    }
    // Para recalcular todo
    let totalChars = 0;
    state.history.forEach(conv => {
        conv.messages.forEach(msg => totalChars += msg.content.length);
    });
    state.sessionTotals.chars = totalChars;

    sessionTotalTokensEl.textContent = state.sessionTotals.tokens.toLocaleString();
    sessionTotalCharsEl.textContent = state.sessionTotals.chars.toLocaleString();
}

// --- FUNCIONES DE UTILIDAD ---
async function fetchMistralAPI(messages) { const response = await fetch('/api/consulta', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages }) }); if (!response.ok) { const errorData = await response.json(); throw new Error(errorData.error); } return response.json(); }
function autoExpandTextarea() { promptInput.style.height = 'auto'; promptInput.style.height = `${promptInput.scrollHeight}px`; }
function handleTextareaKeydown(e) { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); chatForm.requestSubmit(); } }
function addCopyButtons(container) { container.querySelectorAll('pre').forEach(pre => { const copyBtn = document.createElement('button'); copyBtn.className = 'copy-btn'; copyBtn.innerHTML = '<i class="fa-solid fa-copy"></i> Copiar'; pre.appendChild(copyBtn); }); }
function handleChatResponseClick(e) { if (e.target.closest('.copy-btn')) { const btn = e.target.closest('.copy-btn'); const pre = btn.parentElement; const code = pre.querySelector('code').innerText; navigator.clipboard.writeText(code).then(() => { btn.innerHTML = '<i class="fa-solid fa-check"></i> Copiado'; setTimeout(() => { btn.innerHTML = '<i class="fa-solid fa-copy"></i> Copiar'; }, 2000); }); } }
```


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
