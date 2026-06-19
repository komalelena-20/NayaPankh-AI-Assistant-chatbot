async function sendMessage() {

    let input = document.getElementById("userInput");
    let chatBox = document.getElementById("chat-box");

    let message = input.value.trim();

    if(message === ""){
        return;
    }

    chatBox.innerHTML += `
    <div class="user-message">
        <span>${message}</span>
    </div>
    `;

    input.value = "";

    chatBox.innerHTML += `
    <div class="typing" id="typing">
        AI is typing...
    </div>
    `;

    chatBox.scrollTop = chatBox.scrollHeight;

    try {

        const response = await fetch("/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: message
            })
        });

        const data = await response.json();

        document.getElementById("typing").remove();

        chatBox.innerHTML += `
        <div class="ai-message">
            <span>${data.reply}</span>
        </div>
        `;

        chatBox.scrollTop = chatBox.scrollHeight;

    } catch(error) {

        console.log(error);

        document.getElementById("typing").innerHTML =
        "❌ Error connecting to AI";

    }
}

document.getElementById("userInput")
.addEventListener("keydown", function(event){

    if(event.key === "Enter"){
        sendMessage();
    }

});

function toggleTheme(){
    document.body.classList.toggle("dark-mode");
}

function clearChat(){
    document.getElementById("chat-box").innerHTML = "";
}