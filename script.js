const chatWindow = document.getElementById('chat-window');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// Function to add messages to the chat window
function addMessage(text, sender) {
    const message = document.createElement('div');
    message.classList.add('message');
    message.classList.add(sender);
    message.textContent = text;
    chatWindow.appendChild(message);
    chatWindow.scrollTop = chatWindow.scrollHeight; // Scroll to the latest message
}

// Function to send user input to Llama API
async function getBotResponse(userMessage) {
    const apiUrl = 'https://rapidapi.com/Glavier/api/llama-3-3-70b-instruct'; // Replace with the actual API URL for Llama
    const apiKey = '80227b24fcmsh83e89e880d2f6afp1229bdjsn6567d73b9c6c'; // Your RapidAPI key

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-RapidAPI-Key': '80227b24fcmsh83e89e880d2f6afp1229bdjsn6567d73b9c6c',
                'X-RapidAPI-Host': 'llama3-3-70b.p.rapidapi.com', // Make sure the host matches your API
            },
            body: JSON.stringify({
                prompt: userMessage,
                max_tokens: 150, // Set token length as needed
                temperature: 0.7, // Control randomness (lower = more deterministic)
            })
        });

        const data = await response.json();
        const botResponse = data.text || 'I did not get that. Can you try again?';
        addMessage(botResponse, 'bot');
    } catch (error) {
        console.error('Error fetching API:', error);
        addMessage('Sorry, there was an error. Please try again later.', 'bot');
    }
}

// Handle sending a message when the send button is clicked
sendBtn.addEventListener('click', () => {
    const message = userInput.value.trim();
    if (message) {
        addMessage(message, 'user');
        getBotResponse(message);
        userInput.value = ''; // Clear input field
    }
});

// Handle sending a message when the Enter key is pressed
userInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendBtn.click();
    }
});
