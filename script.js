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
    const apiUrl = 'https://llama-3-3-70b-instruct.p.rapidapi.com/chat_completions'; // Use the Llama 3.3 70B API URL
    const apiKey = '80227b24fcmsh83e89e880d2f6afp1229bdjsn6567d73b9c6c'; // Your RapidAPI key

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-RapidAPI-Key': '80227b24fcmsh83e89e880d2f6afp1229bdjsn6567d73b9c6c',
                'X-RapidAPI-Host': 'llama-3-3-70b-instruct.p.rapidapi.com', // Correct API Host
            },
            body: JSON.stringify({
                prompt: userMessage,  // Send user input as a prompt
                max_tokens: 150,      // You can adjust this depending on how long the response should be
                temperature: 0.7,     // Control response randomness
                top_p: 1.0,          // You can add additional parameters like top_p
                n: 1,                // Number of responses you want to receive
            })
        });

        const data = await response.json();

        if (data && data.choices && data.choices.length > 0) {
            const botResponse = data.choices[0].text.trim(); // Parse the response
            addMessage(botResponse, 'bot');
        } else {
            addMessage('Sorry, I did not get a response. Please try again.', 'bot');
        }
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
