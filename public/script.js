// /public/script.js (VERSIÓN FINAL CON LÓGICA DE MODIFICACIÓN ITERATIVA)

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
const MOBILE_BREAKPOINT = 800;

// --- Inicialización ---
document.addEventListener('DOMContentLoaded', () => {
    loadFromLocalStorage();
    setupEventListeners();
    startNewChat(false);
});

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
    chatResponse.innerHTML = `<div class="welcome-message"><p>¡Hola! Soy tu asistente de desarrollo. ¿En qué puedo ayudarte hoy?</p></div>`;
    promptStatsEl.textContent = '-';
    completionStatsEl.textContent = '-';
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
    
    // *** PASO CLAVE 1: Encontrar la última respuesta de la IA en la pantalla (si existe) ***
    const lastAiMessageElement = chatResponse.querySelector('.ai-message:last-of-type');

    // Añade el prompt del usuario al estado y a la pantalla
    const userMessage = { role: 'user', content: userPrompt };
    state.currentConversation.push(userMessage);
    renderMessage(userMessage.content, 'user');
    promptInput.value = '';
    autoExpandTextarea();
    
    // Muestra el indicador de carga
    const loadingIndicator = renderLoadingIndicator();

    try {
        const response = await fetchMistralAPI(state.currentConversation);
        const { reply, usage } = response;
        
        // *** PASO CLAVE 2: Eliminar la última respuesta de la IA (del estado y de la pantalla) ***
        if (lastAiMessageElement) {
            // Elimina la burbuja de la respuesta anterior de la pantalla
            lastAiMessageElement.remove();
            // Elimina el último mensaje del asistente del array de la conversación
            const lastAssistantIndex = state.currentConversation.findLastIndex(m => m.role === 'assistant');
            if(lastAssistantIndex > -1) {
                state.currentConversation.splice(lastAssistantIndex, 1);
            }
        }
        
        // Añade la nueva respuesta UNIFICADA al estado
        const newAssistantMessage = { role: 'assistant', content: reply };
        state.currentConversation.push(newAssistantMessage);
        
        // *** PASO CLAVE 3: Renderizar la nueva respuesta completa ***
        loadingIndicator.remove();
        renderMessage(reply, 'ai', true);

        // Actualizar todo lo demás
        updateTurnStats(usage);
        updateSessionTotals(usage);
        updateSessionStatsUI();
        saveCurrentConversationToHistory();
        saveToLocalStorage();

    } catch (error) {
        console.error('Error en la comunicación con la API:', error);
        loadingIndicator.remove();
        renderMessage(`Error: ${error.message}`, 'error', true);
        state.currentConversation.pop();
    } finally {
        setLoading(false);
    }
}

// ... (El resto de las funciones son idénticas al script anterior, las incluyo para que sea completo)

async function fetchMistralAPI(messages) {
    const response = await fetch('/api/consulta', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages }),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Fallo al obtener respuesta de la API.');
    }
    return response.json();
}

function renderMessage(content, role, parseMarkdown = false) {
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

function renderHistory() {
    historyList.innerHTML = '';
    if (state.history.length === 0) {
        historyList.innerHTML = '<p style="padding: 1rem; opacity: 0.6;">No hay historial aún.</p>';
        return;
    }
    [...state.history].reverse().forEach(item => {
        const div = document.createElement('div');
        div.className = 'history-item';
        div.textContent = item.title;
        div.dataset.id = item.id;
        if (item.id === state.currentConversationId) {
            div.classList.add('active');
        }
        historyList.appendChild(div);
    });
}

function handleHistoryClick(e) {
    if (e.target.classList.contains('history-item')) {
        const id = Number(e.target.dataset.id);
        if (id === state.currentConversationId) return;
        startNewChat(true);
        const conversation = state.history.find(item => item.id === id);
        if (conversation) {
            state.currentConversationId = conversation.id;
            state.currentConversation = [...conversation.messages];
            chatResponse.innerHTML = '';
            state.currentConversation.forEach(msg => renderMessage(msg.content, msg.role, msg.role === 'assistant'));
            promptStatsEl.textContent = '-';
            completionStatsEl.textContent = '-';
            renderHistory();
            if (window.innerWidth <= MOBILE_BREAKPOINT) {
                historyPanel.classList.remove('panel-visible');
            }
        }
    }
}

function setLoading(isLoading) { state.isLoading = isLoading; sendBtn.disabled = isLoading; promptInput.disabled = isLoading; }
function updateTurnStats(usage) { const promptTokens = usage.prompt_tokens; const replyTokens = usage.completion_tokens; const lastUserMessage = state.currentConversation.filter(m => m.role === 'user').pop()?.content || ''; const lastAssistantMessage = state.currentConversation.filter(m => m.role === 'assistant').pop()?.content || ''; promptStatsEl.textContent = `${promptTokens} tokens / ${lastUserMessage.length} chars`; completionStatsEl.textContent = `${replyTokens} tokens / ${lastAssistantMessage.length} chars`; }
function updateSessionTotals(usage) { state.sessionTotals.tokens += usage.total_tokens; const lastUserChars = state.currentConversation.filter(m => m.role === 'user').pop()?.content.length || 0; const lastAssistantChars = state.currentConversation.filter(m => m.role === 'assistant').pop()?.content.length || 0; state.sessionTotals.chars += lastUserChars + lastAssistantChars; }
function updateSessionStatsUI() { sessionTotalTokensEl.textContent = state.sessionTotals.tokens.toLocaleString(); sessionTotalCharsEl.textContent = state.sessionTotals.chars.toLocaleString(); }

function saveCurrentConversationToHistory() {
    if (!state.currentConversationId || state.currentConversation.length === 0) return;
    const existingIndex = state.history.findIndex(item => item.id === state.currentConversationId);
    const conversationData = { id: state.currentConversationId, title: state.currentConversation[0].content.substring(0, 40) + '...', messages: [...state.currentConversation] };
    if (existingIndex > -1) { state.history[existingIndex] = conversationData; } else { state.history.push(conversationData); }
    renderHistory();
}
function saveToLocalStorage() { const stateToSave = { history: state.history, sessionTotals: state.sessionTotals }; localStorage.setItem('aiDevAssistantState_v3', JSON.stringify(stateToSave)); }
function loadFromLocalStorage() { const savedState = localStorage.getItem('aiDevAssistantState_v3'); if (savedState) { const parsedState = JSON.parse(savedState); state.history = parsedState.history || []; state.sessionTotals = parsedState.sessionTotals || { tokens: 0, chars: 0 }; } updateSessionStatsUI(); }
function clearAllData() { if (confirm('¿Estás seguro de que quieres borrar todo el historial y las estadísticas?')) { localStorage.removeItem('aiDevAssistantState_v3'); state.history = []; state.sessionTotals = { tokens: 0, chars: 0 }; startNewChat(false); updateSessionStatsUI(); } }

function autoExpandTextarea() { promptInput.style.height = 'auto'; promptInput.style.height = `${promptInput.scrollHeight}px`; }
function handleTextareaKeydown(e) { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); chatForm.requestSubmit(); } }
function addCopyButtons(container) { container.querySelectorAll('pre').forEach(pre => { const copyBtn = document.createElement('button'); copyBtn.className = 'copy-btn'; copyBtn.innerHTML = '<i class="fa-solid fa-copy"></i> Copiar'; pre.appendChild(copyBtn); }); }
function handleChatResponseClick(e) { if (e.target.closest('.copy-btn')) { const btn = e.target.closest('.copy-btn'); const pre = btn.parentElement; const code = pre.querySelector('code').innerText; navigator.clipboard.writeText(code).then(() => { btn.innerHTML = '<i class="fa-solid fa-check"></i> Copiado'; setTimeout(() => btn.innerHTML = '<i class="fa-solid fa-copy"></i> Copiar', 2000); }); } }