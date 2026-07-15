// ==========================
// KDK Core - Main Script
// ==========================

const chatArea = document.querySelector(".chat-area");
const input = document.querySelector(".input-area input");
const sendBtn = document.getElementById("sendBtn");

// Send when button is clicked
sendBtn.addEventListener("click", sendMessage);

// Send when Enter is pressed
input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        sendMessage();
    }
});

function sendMessage() {

    const text = input.value.trim();

    if (text === "") return;

    // Create user message
    const userMessage = document.createElement("div");
    userMessage.className = "bot-message";

    userMessage.innerHTML = `
        <img src="assets/user.png" class="avatar">

        <div class="message">
            <h3>You</h3>
            <p>${escapeHTML(text)}</p>
        </div>
    `;

    chatArea.appendChild(userMessage);

    input.value = "";

    // Scroll to bottom
    chatArea.scrollTop = chatArea.scrollHeight;

    // AI typing...
    showTyping();

}

// Typing animation
function showTyping(){

    const typing = document.createElement("div");

    typing.className = "bot-message typing";

    typing.innerHTML = `
        <img src="assets/bot.png" class="avatar">

        <div class="message">

            <h3>KDK Core</h3>

            <p>Typing...</p>

        </div>
    `;

    chatArea.appendChild(typing);

    chatArea.scrollTop = chatArea.scrollHeight;

    setTimeout(() => {

        typing.remove();

        fakeAI();

    },1500);

}

// Temporary AI response
function fakeAI(){

    const replies = [

        "Hello! I'm KDK Core.",

        "I'm still under development.",

        "Soon I'll be powered by a real AI model.",

        "Thanks for testing me!",

        "Ask me anything once I'm connected to an AI API."

    ];

    const reply = replies[Math.floor(Math.random()*replies.length)];

    const bot = document.createElement("div");

    bot.className = "bot-message";

    bot.innerHTML = `
        <img src="assets/bot.png" class="avatar">

        <div class="message">

            <h3>KDK Core</h3>

            <p>${reply}</p>

        </div>
    `;

    chatArea.appendChild(bot);

    chatArea.scrollTop = chatArea.scrollHeight;

}

// Prevent HTML injection
function escapeHTML(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}
