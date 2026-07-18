// DOM Elements
const apiKeyModal = document.getElementById('apiKeyModal');
const apiKeyValue = document.getElementById('apiKeyValue');
const saveApiKeyBtn = document.getElementById('saveApiKeyBtn');
const apiKeyError = document.getElementById('apiKeyError');
const appContainer = document.getElementById('appContainer');
const clearApiKeyBtn = document.getElementById('clearApiKeyBtn');

const navBtns = document.querySelectorAll('.nav-btn');
const views = document.querySelectorAll('.view');

const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const sendChatBtn = document.getElementById('sendChatBtn');
const chatLanguage = document.getElementById('chatLanguage');
const quickPromptChips = document.querySelectorAll('.chip');

const generateInsightsBtn = document.getElementById('generateInsightsBtn');
const insightsFeed = document.getElementById('insightsFeed');

// App Initialization
function initApp() {
    const key = getApiKey();
    if (key) {
        apiKeyModal.classList.add('hidden');
        appContainer.classList.remove('hidden');
    } else {
        apiKeyModal.classList.remove('hidden');
        appContainer.classList.add('hidden');
    }
}

// Event Listeners
saveApiKeyBtn.addEventListener('click', () => {
    const key = apiKeyValue.value.trim();
    if (key) {
        setApiKey(key);
        apiKeyError.innerText = "";
        initApp();
    } else {
        apiKeyError.innerText = "Please enter a valid API Key.";
    }
});

clearApiKeyBtn.addEventListener('click', () => {
    clearApiKey();
    initApp();
});

// Navigation Logic
navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active nav
        navBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Update active view
        const targetId = btn.getAttribute('data-target');
        views.forEach(v => {
            if (v.id === targetId) {
                v.classList.add('active');
                v.classList.remove('hidden');
            } else {
                v.classList.remove('active');
                v.classList.add('hidden');
            }
        });
    });
});

// Chat Logic (Fan Experience)
function addMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${sender}`;
    
    // Parse simple markdown (bolding)
    const formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    msgDiv.innerHTML = `<p>${formattedText}</p>`;
    
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addLoadingMessage() {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ai message-loading`;
    msgDiv.id = 'loadingMessage';
    msgDiv.innerHTML = `
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
    `;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeLoadingMessage() {
    const loader = document.getElementById('loadingMessage');
    if (loader) {
        loader.remove();
    }
}

async function handleChat(promptText) {
    if (!promptText) return;

    // Add user message
    addMessage(promptText, 'user');
    chatInput.value = '';
    addLoadingMessage();

    const lang = chatLanguage.value;
    const systemInstruction = `You are the official FIFA World Cup 2026 AI Assistant. Provide helpful, enthusiastic, and concise answers to fans about stadium navigation, sustainability, match info, and transportation. You must answer in ${lang}. Ensure all responses are accessible and polite.`;

    try {
        const response = await generateContent(promptText, systemInstruction);
        removeLoadingMessage();
        addMessage(response, 'ai');
    } catch (error) {
        removeLoadingMessage();
        addMessage(`Sorry, I encountered an error: ${error.message}`, 'ai');
    }
}

sendChatBtn.addEventListener('click', () => {
    handleChat(chatInput.value.trim());
});

chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleChat(chatInput.value.trim());
    }
});

quickPromptChips.forEach(chip => {
    chip.addEventListener('click', () => {
        handleChat(chip.getAttribute('data-prompt'));
    });
});

// Staff Dashboard Logic
generateInsightsBtn.addEventListener('click', async () => {
    insightsFeed.innerHTML = `
        <div class="message-loading">
            <span class="dot"></span><span class="dot"></span><span class="dot"></span>
            <span style="margin-left: 10px; color: var(--text-muted)">GenAI is analyzing current sensor data...</span>
        </div>
    `;

    const mockSensorData = `
        Time: 14:30
        Gate A (North): 92% capacity (trending UP quickly).
        Gate B (East): 45% capacity (trending DOWN).
        Gate C (West - Accessible): 60% capacity (stable).
        Transport Hub (Subway): Stable, next train arriving in 5 mins.
        Weather: 32C, Sunny.
    `;

    const systemInstruction = `You are a Venue Operations AI for FIFA World Cup 2026. Analyze the provided real-time sensor data and generate 2-3 concise operational alerts or recommendations for the venue staff. Be highly specific. Format each recommendation as a short paragraph. Highlight critical issues.`;

    try {
        const response = await generateContent(`Current Data:\n${mockSensorData}`, systemInstruction);
        
        // Parse the response into stylized blocks
        const lines = response.split('\n').filter(line => line.trim().length > 0);
        insightsFeed.innerHTML = '';
        
        lines.forEach(line => {
            const item = document.createElement('div');
            // simple heuristic to mark critical items
            const isCritical = line.toLowerCase().includes('critical') || line.toLowerCase().includes('92%') || line.toLowerCase().includes('urgent');
            item.className = `insight-item ${isCritical ? 'critical' : ''}`;
            
            // Format bold text
            let htmlContent = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            // Remove markdown bullets if present
            htmlContent = htmlContent.replace(/^\*|-/, '').trim();

            item.innerHTML = `<p>${htmlContent}</p>`;
            insightsFeed.appendChild(item);
        });

    } catch (error) {
        insightsFeed.innerHTML = `<p class="error-msg">Error generating insights: ${error.message}</p>`;
    }
});

// Run Init
initApp();
