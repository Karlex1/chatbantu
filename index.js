document.addEventListener('DOMContentLoaded', () => {
const chatbot = document.getElementById("chat-bot");
const userinput = document.getElementById("user-input");
const URL = "http://localhost:5000/chat";
console.log(URL);
async function sendMessage() {
    const message = userinput.value;
    if (!message) return;
    chatbot.innerHTML += `<div class="user"><strong>You:</strong>${message}</div>`
    try {
        const response = await fetch(URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message })
        });
        const data = await response.json();
        chatbot.innerHTML += `<div class="bot"><strong>bantu:</strong>${data.response}</div>`
        userinput.value = '';
        chatbot.scrollTop = chatbot.scrollHeight;
    } catch (error) {
        console.error('Error:', error);
        chatbot.innerHTML += `<div class="bot"><strong>Error:</strong> Failed to connect</div>`;
    }
    };
    document.getElementById("send-btn").onclick = sendMessage;
});