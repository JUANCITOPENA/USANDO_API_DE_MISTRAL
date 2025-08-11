document.addEventListener('DOMContentLoaded', () => {
    // *** INICIO DEL CÓDIGO AÑADIDO PARA SOLUCIONAR EL PROBLEMA DEL TECLADO ***
    const appHeight = () => {
        const doc = document.documentElement;
        doc.style.setProperty('--app-height', `${window.innerHeight}px`);
    };
    window.addEventListener('resize', appHeight);
    appHeight();

    const promptInputForFocus = document.getElementById('prompt-input');
    promptInputForFocus.addEventListener('focus', () => {
        setTimeout(() => {
            promptInputForFocus.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }, 150);
    });
    // *** FIN DEL CÓDIGO AÑADIDO ***


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
