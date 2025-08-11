// --- Inicialización ---
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

    const promptInputForFocus = document.getElementById('prompt-input');
    // Cuando el usuario toca el input...
    promptInputForFocus.addEventListener('focus', () => {
        // ...espera un momento a que el teclado aparezca...
        setTimeout(() => {
            // ...y haz scroll para que el input quede visible.
            promptInputForFocus.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }, 150); // Un pequeño retardo para asegurar que el teclado se ha mostrado
    });
    // *** FIN DEL CÓDIGO AÑADIDO ***


    // --- TU CÓDIGO ORIGINAL COMIENZA AQUÍ ---
    // --- Selección de Elementos del DOM ---
    const chatForm = document.getElementById('chat-form');
    const promptInput = document.getElementById('prompt-input');
    const sendBtn = document.getElementById('send-btn');
    const chatResponse = document.getElementById('chat-response');
    const historyList = document.getElementById('history-list');
    const newChatBtn = document.getElementById('new-chat-btn');
    const clearHistoryBtn = document.getElementById('clear-history-btn');
    const historyPanel = document.getElementById('history-panel');
    const statsPanel = document.getElementById('stats-panel');
    const toggleHistoryBtn = document.getElementById('toggle-history-btn');
    const toggleStatsBtn = document.getElementById('toggle-stats-btn');
    const closeHistoryBtn = document.getElementById('close-history-btn');
    const closeStatsBtn = document.getElementById('close-stats-btn');
    const promptStatsEl = document.getElementById('prompt-stats');
    const completionStatsEl = document.getElementById('completion-stats');
    const sessionTotalTokensEl = document.getElementById('session-total-tokens');
    const sessionTotalCharsEl = document.getElementById('session-total-chars');

    // --- Estado de la Aplicación ---
    let state = {
        history: [],
        currentConversation: [],
        currentConversationId: null,
        sessionTotals: { tokens: 0, chars: 0 },
        isLoading: false,
    };

    // --- Constantes ---
    const MOBILE_BREAKPOINT = 900; // Ajustado para ser más inclusivo con tablets

    // El resto de la inicialización
    loadFromLocalStorage();
    setupEventListeners();
    startNewChat(false);


    // --- Lógica Principal de Eventos ---
    function setupEventListeners() {
        chatForm.addEventListener('submit', handleFormSubmit);
        newChatBtn.addEventListener('click', () => startNewChat(true));
        clearHistoryBtn.addEventListener('click', clearAllData);
        historyList.addEventListener('click', handleHistoryClick);
        promptInput.addEventListener('input', autoExpandTextarea);
        promptInput.addEventListener('keydown', handleTextareaKeydown);
        chatResponse.addEventListener('click', handleChatResponseClick);
        toggleHistoryBtn.addEventListener('click', () => historyPanel.classList.add('panel-visible'));
        toggleStatsBtn.addEventListener('click', () => statsPanel.classList.add('panel-visible'));
        closeHistoryBtn.addEventListener('click', () => historyPanel.classList.remove('panel-visible'));
        closeStatsBtn.addEventListener('click', () => statsPanel.classList.remove('panel-visible'));
    }

    function startNewChat(savePrevious = true) {
        if (savePrevious && state.currentConversation.length > 0) {
            saveCurrentConversationToHistory();
        }
        state.currentConversation = [];
        state.currentConversationId = null;
        chatResponse.innerHTML = `<div class="welcome-message"><p>¡Hola! Soy tu asistente de desarrollo.</p></div>`;
        updateTurnStats(); // Reset stats
        renderHistory();
    }

    async function handleFormSubmit(e) {
        e.preventDefault();
        if (state.isLoading) return;

        const userPrompt = promptInput.value.trim();
        if (!userPrompt) return;

        setLoading(true);

        if (state.currentConversation.length === 0) {
            chatResponse.innerHTML = '';
            state.currentConversationId = Date.now();
        }

        const userMessage = { role: 'user', content: userPrompt };
        state.currentConversation.push(userMessage);
        
        // El historial enviado a la API ahora es la conversación actual
        const messagesToSend = [...state.currentConversation];
        
        // Renderizamos la petición del usuario
        renderMessage(userMessage.content, 'user');
        promptInput.value = '';
        autoExpandTextarea();
        
        const loadingIndicator = renderLoadingIndicator();

        try {
            const response = await fetchMistralAPI(messagesToSend);
            const { reply, usage } = response;
            
            // Añadimos la respuesta del asistente al historial
            const newAssistantMessage = { role: 'assistant', content: reply, usage: usage };
            state.currentConversation.push(newAssistantMessage);
            
            // Renderizamos la respuesta de la IA
            loadingIndicator.remove();
            renderMessage(reply, 'ai', true);

            updateTurnStats(usage);
            updateSessionTotals(usage);
            updateSessionStatsUI();
            saveCurrentConversationToHistory();
            saveToLocalStorage();

        } catch (error) {
            console.error('Error en la comunicación con la API:', error);
            loadingIndicator.remove();
            renderMessage(`Error: ${error.message}`, 'error', true);
            state.currentConversation.pop(); // Quitamos el 'user' message que falló
        } finally {
            setLoading(false);
        }
    }

    async function fetchMistralAPI(messages) {
        const response = await fetch('/api/consulta', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages }),
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: 'Error desconocido' }));
            throw new Error(errorData.error);
        }
        return response.json();
    }

    function renderMessage(content, role, parseMarkdown = false) {
        const messageContainer = document.createElement('div');
        messageContainer.className = `message ${role}-message`;
        if (role === 'assistant' || role === 'error') {
            messageContainer.classList.add('ai-message');
        }
        
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

    function renderHistory() {
        historyList.innerHTML = '';
        if (state.history.length === 0) {
            historyList.innerHTML = '<p style="padding: 1rem; opacity: 0.6;">No hay historial.</p>';
            return;
        }
        [...state.history].reverse().forEach((item, revIndex) => {
            const index = state.history.length - 1 - revIndex;
            const div = document.createElement('div');
            div.className = 'history-item';
            div.textContent = item.title;
            div.dataset.id = item.id;
            if (item.id === state.currentConversationId) {
                div.classList.add('active');
            }
            div.addEventListener('click', () => handleHistoryClick(item.id));
            historyList.appendChild(div);
        });
    }

    function handleHistoryClick(id) {
        if (id === state.currentConversationId) return;
        startNewChat(true);
        const conversation = state.history.find(item => item.id === id);
        if (conversation) {
            state.currentConversationId = conversation.id;
            state.currentConversation = [...conversation.messages];
            chatResponse.innerHTML = '';
            
            conversation.messages.forEach(msg => {
                renderMessage(msg.content, msg.role, msg.role === 'assistant');
            });

            const lastUsage = conversation.messages.findLast(m => m.role === 'assistant')?.usage;
            updateTurnStats(lastUsage);
            renderHistory();
            if (window.innerWidth <= MOBILE_BREAKPOINT) {
                historyPanel.classList.remove('panel-visible');
            }
        }
    }

    function setLoading(isLoading) { state.isLoading = isLoading; sendBtn.disabled = isLoading; promptInput.disabled = isLoading; }
    
    function updateTurnStats(usage) { 
        const promptTokens = usage?.prompt_tokens || 0; 
        const replyTokens = usage?.completion_tokens || 0; 
        const lastUserMessage = state.currentConversation.findLast(m => m.role === 'user')?.content || ''; 
        const lastAssistantMessage = state.currentConversation.findLast(m => m.role === 'assistant')?.content || ''; 
        promptStatsEl.textContent = `${promptTokens} tokens / ${lastUserMessage.length} chars`; 
        completionStatsEl.textContent = `${replyTokens} tokens / ${lastAssistantMessage.length} chars`; 
    }
    
    function updateSessionTotals(usage) { 
        if (usage) {
            state.sessionTotals.tokens += usage.total_tokens || 0;
        }
        updateSessionStatsUI();
    }
    
    function updateSessionStatsUI() {
        let totalChars = 0;
        state.history.forEach(conv => {
            conv.messages.forEach(msg => totalChars += msg.content.length);
        });
        state.sessionTotals.chars = totalChars;

        sessionTotalTokensEl.textContent = state.sessionTotals.tokens.toLocaleString(); 
        sessionTotalCharsEl.textContent = state.sessionTotals.chars.toLocaleString();
    }

    function saveCurrentConversationToHistory() {
        if (!state.currentConversationId || state.currentConversation.length < 2) return;
        
        const firstUserPrompt = state.currentConversation.find(m => m.role === 'user');
        if (!firstUserPrompt) return;

        const existingIndex = state.history.findIndex(item => item.id === state.currentConversationId);
        const conversationData = { 
            id: state.currentConversationId, 
            title: firstUserPrompt.content.substring(0, 40) + '...', 
            messages: [...state.currentConversation] 
        };
        
        if (existingIndex > -1) { 
            state.history[existingIndex] = conversationData; 
        } else { 
            state.history.push(conversationData); 
        }
        renderHistory();
    }
    
    function saveToLocalStorage() { 
        const stateToSave = { history: state.history, sessionTotals: state.sessionTotals }; 
        localStorage.setItem('mistralFinalApp', JSON.stringify(stateToSave)); 
    }
    
    function loadFromLocalStorage() { 
        const savedState = localStorage.getItem('mistralFinalApp'); 
        if (savedState) { 
            const parsedState = JSON.parse(savedState); 
            state.history = parsedState.history || []; 
            state.sessionTotals = parsedState.sessionTotals || { tokens: 0, chars: 0 }; 
        } 
        updateSessionStatsUI(); 
    }
    
    function clearAllData() { 
        if (confirm('¿Estás seguro de que quieres borrar todo el historial?')) { 
            localStorage.removeItem('mistralFinalApp'); 
            state.history = []; 
            state.sessionTotals = { tokens: 0, chars: 0 }; 
            startNewChat(false); 
            updateSessionStatsUI(); 
        } 
    }

    function autoExpandTextarea() { promptInput.style.height = 'auto'; promptInput.style.height = `${promptInput.scrollHeight}px`; }
    function handleTextareaKeydown(e) { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); chatForm.requestSubmit(); } }
    function addCopyButtons(container) { container.querySelectorAll('pre').forEach(pre => { const copyBtn = document.createElement('button'); copyBtn.className = 'copy-btn'; copyBtn.innerHTML = '<i class="fa-solid fa-copy"></i> Copiar'; pre.appendChild(copyBtn); }); }
    function handleChatResponseClick(e) { if (e.target.closest('.copy-btn')) { const btn = e.target.closest('.copy-btn'); const pre = btn.parentElement; const code = pre.querySelector('code').innerText; navigator.clipboard.writeText(code).then(() => { btn.innerHTML = '<i class="fa-solid fa-check"></i> Copiado'; setTimeout(() => btn.innerHTML = '<i class="fa-solid fa-copy"></i> Copiar', 2000); }); } }
});
