document.getElementById('sendButton').addEventListener('click', sendMessage);
document.getElementById('messageInput').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const messageText = messageInput.value.trim();

    if (messageText) {
        displayMessage(messageText, 'sent');
        messageInput.value = '';
        
        const chatBox = document.getElementById('chatBox');
        chatBox.scrollTop = chatBox.scrollHeight;
    }
}

function displayMessage(message, type) {
    const chatBox = document.getElementById('chatBox');

    const messageBubble = document.createElement('div');
    messageBubble.classList.add('outgoing-chats');

    const messageContent = document.createElement('div');
    messageContent.classList.add('outgoing-chats-msg');
    messageContent.innerHTML = `
        <p>${message}</p>
        <span class="time">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
    `;

    messageBubble.appendChild(messageContent);
    
    chatBox.appendChild(messageBubble);
}
