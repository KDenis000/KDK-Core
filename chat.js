// =================================
// KDK Core - Chat System
// =================================


const chatArea = document.querySelector(".chat-area");
const messageInput = document.querySelector("#messageInput");
const sendButton = document.querySelector("#sendBtn");


// Start chat system

document.addEventListener(
    "DOMContentLoaded",
    () => {

        if(sendButton){

            sendButton.addEventListener(
                "click",
                sendMessage
            );

        }


        if(messageInput){

            messageInput.addEventListener(
                "keydown",
                function(event){

                    if(event.key === "Enter" && !event.shiftKey){

                        event.preventDefault();

                        sendMessage();

                    }

                }
            );

        }

    }
);



// ===============================
// Send Message
// ===============================

function sendMessage(){

    let text = messageInput.value.trim();


    if(text === "") return;



    addMessage(
        text,
        "user"
    );


    messageInput.value = "";


    showTyping();



    setTimeout(()=>{

        removeTyping();


        generateResponse(text);


    },1500);



}



// ===============================
// Add Message
// ===============================

function addMessage(
    text,
    sender
){


    let message = document.createElement(
        "div"
    );


    message.className =
    sender === "user"
    ? "user-message"
    : "bot-message";



    let avatar =
    sender === "user"
    ? "assets/user.png"
    : "assets/bot.png";



    let name =
    sender === "user"
    ? "You"
    : "KDK Core";



    message.innerHTML = `

        <img src="${avatar}" class="avatar">


        <div class="message">

            <h3>${name}</h3>

            <p>${escapeHTML(text)}</p>

            <small class="timestamp">
            ${getTime()}
            </small>

        </div>

    `;


    chatArea.appendChild(message);


    chatArea.scrollTop =
    chatArea.scrollHeight;


}



// ===============================
// Typing Animation
// ===============================

function showTyping(){


    let typing =
    document.createElement(
        "div"
    );


    typing.id="typing";


    typing.className=
    "bot-message";


    typing.innerHTML=`

        <img src="assets/bot.png"
        class="avatar">


        <div class="message typing">

            <span></span>

            <span></span>

            <span></span>

        </div>

    `;


    chatArea.appendChild(typing);


}



// Remove Typing

function removeTyping(){

    let typing =
    document.getElementById(
        "typing"
    );


    if(typing){

        typing.remove();

    }

}



// ===============================
// Temporary AI Response
// ===============================

function generateResponse(message){


    let response;



    if(message.toLowerCase().includes("hello")){


        response =
        "Hello 👋 I am KDK Core. How can I assist you?";


    }


    else if(message.toLowerCase().includes("who are you")){


        response =
        "I am KDK Core, an AI assistant created by KDK JAJAWO MEDIA.";


    }


    else{


        response =
        "I am still learning. Soon I will be connected to a powerful AI model.";

    }



    addMessage(
        response,
        "bot"
    );


}



// ===============================
// Utilities
// ===============================

function getTime(){

    let now =
    new Date();


    return now.toLocaleTimeString();

}



function escapeHTML(text){

    return text
    .replace(/&/g,"&amp;")
    .replace(/</g,"&lt;")
    .replace(/>/g,"&gt;");

}
