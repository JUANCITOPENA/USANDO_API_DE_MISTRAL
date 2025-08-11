document.addEventListener('DOMContentLoaded', () => {
    // *** INICIO DEL CÓDIGO AÑADIDO PARA SOLUCIONAR EL PROBLEMA DEL TECLADO ***
    const appHeight = () => {
        const doc = document.documentElement;
        // Calcula la altura real del viewport y la establece como una variable CSS
        // que se usará en el CSS para ajustar la altura del contenedor principal.
        doc.style.setProperty('--app-height', `${window.innerHeight}px`);
    };
    // Llama a la función al cargar y cada vez que la ventana cambie de tamaño
    window.addEventListener('resize', appHeight);
    appHeight();

    const promptInputForFocus = document.getElementById('pregunta');
    // Cuando el usuario toca el input...
    promptInputForFocus.addEventListener('focus', () => {
        // ...espera un momento a que el teclado aparezca...
        setTimeout(() => {
            // ...y haz scroll para que el input quede visible.
            promptInputForFocus.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }, 150);
    });
    // *** FIN DEL CÓDIGO AÑADIDO ***


    // --- TU CÓDIGO ORIGINAL COMIENZA AQUÍ (SIN CAMBIOS) ---
    // --- ELEMENTOS DEL DOM ---
    const btnEnviar = document.getElementById("enviar");
    const preguntaInput = document.getElementById("pregunta");
    const respuestaContainer = document.getElementById("respuesta-container");
    const respuestaDiv = document.getElementById("respuesta");
    const historyList = document.getElementById("history-list");
    const btnClearHistory = document.getElementById("clear-history");
    const originalButtonHTML = btnEnviar.innerHTML;
    const totalPromptsCountEl = document.getElementById("total-prompts-count");

    // Elementos de estadísticas por prompt
    const promptTokensEl = document.getElementById("prompt-tokens");
    const completionTokensEl = document.getElementById("completion-tokens");
    const promptCharsEl = document.getElementById("prompt-chars");
    const completionCharsEl = document.getElementById("completion-chars");
    
    // Elementos de estadísticas totales de sesión
    const sessionTotalPromptsEl = document.getElementById("session-total-prompts");
    const sessionTotalTokensEl = document.getElementById("session-total-tokens");
    const sessionTotalCharsEl = document.getElementById("session-total-chars");

    // --- ESTADO DE LA APLICACIÓN ---
    let chatHistory = [];

    // --- FUNCIONES DE CÁLCULO ---
    const calculateTokens = (text) => !text ? 0 : Math.ceil(text.length / 4);
    const calculateChars = (text) => !text ? 0 : text.length;

    // --- LÓGICA DE HISTORIAL Y ESTADO PERSISTENTE ---
    const loadState = () => {
        const savedHistory = localStorage.getItem('mistralChatHistory');
        if (savedHistory) {
            try {
                chatHistory = JSON.parse(savedHistory);
            } catch (e) {
                console.error("Error al parsear el historial, reseteando.", e);
                chatHistory = [];
            }
        }
        renderHistory();
        updateSessionTotals();
    };

    const saveState = () => {
        localStorage.setItem('mistralChatHistory', JSON.stringify(chatHistory));
    };
    
    // --- LÓGICA DE RENDERIZADO ---
    const renderHistory = () => {
        historyList.innerHTML = '';
        chatHistory.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = item.question;
            li.dataset.index = index;
            li.addEventListener('click', (e) => {
                document.querySelectorAll('#history-list li').forEach(el => el.classList.remove('active'));
                e.currentTarget.classList.add('active');

                const selectedItem = chatHistory[index];
                preguntaInput.value = selectedItem.question;
                autoExpandTextarea(preguntaInput);
                renderResponse(selectedItem.answer);
                updateStatsPanel(selectedItem.stats);
            });
            historyList.appendChild(li);
        });
        totalPromptsCountEl.textContent = chatHistory.length;
    };

    const addToHistory = (question, answer, stats) => {
        chatHistory.unshift({ question, answer, stats });
        if (chatHistory.length > 50) chatHistory.pop();
        saveState();
        renderHistory();
        updateSessionTotals();
    };
    
    // --- FUNCIONES DE ACTUALIZACIÓN DE UI (CORREGIDAS) ---
    const updateStatsPanel = (stats) => {
        let currentStats = stats;
        // Si no hay 'stats', es un registro antiguo. Lo calculamos al vuelo.
        if (!currentStats) {
            currentStats = { promptTokens: 0, completionTokens: 0, promptChars: 0, completionChars: 0 };
        }
        
        promptTokensEl.textContent = (currentStats.promptTokens || 0).toLocaleString('es-ES');
        completionTokensEl.textContent = (currentStats.completionTokens || 0).toLocaleString('es-ES');
        promptCharsEl.textContent = (currentStats.promptChars || 0).toLocaleString('es-ES');
        completionCharsEl.textContent = (currentStats.completionChars || 0).toLocaleString('es-ES');
    };

    const updateSessionTotals = () => {
        const totalPrompts = chatHistory.length;

        // --- CORRECCIÓN CRÍTICA AQUÍ ---
        // Esta función ahora es a prueba de fallos. Si un 'item' no tiene 'stats', no se romperá.
        const sessionTotals = chatHistory.reduce((totals, item) => {
            if (item && item.stats) { // Verifica que el item y sus stats existan
                totals.tokens += (item.stats.promptTokens || 0) + (item.stats.completionTokens || 0);
                totals.chars += (item.stats.promptChars || 0) + (item.stats.completionChars || 0);
            }
            return totals;
        }, { tokens: 0, chars: 0 }); // Inicia el acumulador con un objeto

        sessionTotalPromptsEl.textContent = totalPrompts;
        sessionTotalTokensEl.textContent = sessionTotals.tokens.toLocaleString('es-ES');
        sessionTotalCharsEl.textContent = sessionTotals.chars.toLocaleString('es-ES');
    };

    btnClearHistory.addEventListener('click', () => {
        if (confirm('¿Estás seguro? Se borrará todo el historial y las estadísticas de la sesión.')) {
            chatHistory = [];
            saveState();
            renderHistory();
            updateSessionTotals();
            updateStatsPanel(null);
            respuestaContainer.classList.add('hidden');
            preguntaInput.value = '';
            autoExpandTextarea(preguntaInput);
        }
    });
    
    // --- EVENTO EN TIEMPO REAL MIENTRAS SE ESCRIBE ---
    preguntaInput.addEventListener('input', () => {
        autoExpandTextarea(preguntaInput);
        const promptText = preguntaInput.value;
        const stats = {
            promptTokens: calculateTokens(promptText),
            completionTokens: 0,
            promptChars: calculateChars(promptText),
            completionChars: 0
        };
        updateStatsPanel(stats);
    });

    // --- LÓGICA PRINCIPAL DE API ---
    const consultarAPI = async () => {
        const pregunta = preguntaInput.value.trim();
        if (!pregunta) return;

        setLoadingState(true);
        respuestaDiv.innerHTML = '';
        respuestaContainer.classList.remove('hidden');

        try {
            const res = await fetch("/api/consulta", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ pregunta }),
            });
            const data = await res.json();

            if (res.ok) {
                const stats = {
                    promptTokens: calculateTokens(pregunta),
                    completionTokens: calculateTokens(data.respuesta),
                    promptChars: calculateChars(pregunta),
                    completionChars: calculateChars(data.respuesta)
                };
                updateStatsPanel(stats);
                renderResponse(data.respuesta);
                addToHistory(pregunta, data.respuesta, stats);
            } else {
                renderResponse(`**Error:** ${data.error || "No se pudo obtener respuesta"}`);
            }
        } catch (error) {
            renderResponse(`**Error de conexión:** Revisa tu conexión o el estado del servidor.`);
        } finally {
            setLoadingState(false);
        }
    };
    
    // --- OTRAS FUNCIONES ---
    const autoExpandTextarea = (textarea) => {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
    };

    const renderResponse = (markdownText) => {
        const htmlResponse = marked.parse(markdownText);
        respuestaDiv.innerHTML = htmlResponse;
        addCodeEnhancements();
    };

    const addCodeEnhancements = () => {
        const langMap = { 'pitón': 'python', 'python': 'python', 'javascript': 'javascript', 'js': 'javascript', 'java': 'java', 'c#': 'csharp', 'do#': 'csharp', 'csharp': 'csharp', 'sql': 'sql', 'html': 'html', 'css': 'css', 'bash': 'bash', 'shell': 'shell' };
        const codeBlocks = respuestaDiv.querySelectorAll('pre');
        codeBlocks.forEach(block => {
            const code = block.querySelector('code');
            if (!code) return;
            let language = '';
            const languageClass = Array.from(code.classList).find(cls => cls.startsWith('language-'));
            if (languageClass) language = languageClass.replace('language-', '');
            if (!language) {
                const prevElement = block.previousElementSibling;
                if (prevElement && prevElement.innerText) {
                    const prevText = prevElement.innerText.toLowerCase().replace(/[:.]/g, '').trim().split(' ').pop();
                    if (langMap[prevText]) {
                        language = langMap[prevText];
                        code.classList.add(`language-${language}`);
                    }
                }
            }
            if (language) {
                block.dataset.lang = language;
                Prism.highlightElement(code);
                const btn = document.createElement('button');
                btn.className = 'copy-btn';
                btn.innerHTML = '<i class="fa-solid fa-copy"></i> Copiar';
                btn.addEventListener('click', () => {
                    navigator.clipboard.writeText(code.innerText).then(() => {
                        btn.innerHTML = '<i class="fa-solid fa-check"></i> Copiado!';
                        btn.classList.add('copied');
                        setTimeout(() => {
                            btn.innerHTML = '<i class="fa-solid fa-copy"></i> Copiar';
                            btn.classList.remove('copied');
                        }, 2000);
                    });
                });
                block.appendChild(btn);
            }
        });
    };

    const setLoadingState = (isLoading) => {
        btnEnviar.disabled = isLoading;
        btnEnviar.innerHTML = isLoading ? `<div class="spinner"></div><span>Enviando...</span>` : originalButtonHTML;
    };

    // --- EVENT LISTENERS ---
    btnEnviar.addEventListener("click", consultarAPI);
    preguntaInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            consultarAPI();
        }
    });

    // --- INICIALIZACIÓN DE LA APP ---
    loadState();
});
