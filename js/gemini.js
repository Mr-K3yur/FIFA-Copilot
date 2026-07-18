/**
 * Gemini API Integration Module
 * Communicates with Google's Generative Language API
 */

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

let apiKey = "";

/**
 * Set the API Key
 */
function setApiKey(key) {
    apiKey = key;
    localStorage.setItem("gemini_api_key", key);
}

/**
 * Get the API Key
 */
function getApiKey() {
    if (!apiKey) {
        apiKey = localStorage.getItem("gemini_api_key") || "";
    }
    return apiKey;
}

/**
 * Clear the API Key
 */
function clearApiKey() {
    apiKey = "";
    localStorage.removeItem("gemini_api_key");
}

/**
 * Send a prompt to Gemini and return the response text
 */
async function generateContent(prompt, systemInstruction = "") {
    if (!getApiKey()) {
        throw new Error("API Key is not set.");
    }

    const payload = {
        contents: [{
            parts: [{ text: prompt }]
        }]
    };

    if (systemInstruction) {
        payload.system_instruction = {
            parts: [{ text: systemInstruction }]
        };
    }

    try {
        const response = await fetch(`${GEMINI_API_URL}?key=${getApiKey()}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errData = await response.json();
            throw new Error(errData.error?.message || "Failed to fetch from Gemini API");
        }

        const data = await response.json();
        
        if (data.candidates && data.candidates.length > 0) {
            return data.candidates[0].content.parts[0].text;
        } else {
            throw new Error("No response generated.");
        }
    } catch (error) {
        console.error("Gemini API Error:", error);
        throw error;
    }
}
