// =================================
// KDK Core - Voice Assistant
// =================================


// Check browser support

const SpeechRecognition =
window.SpeechRecognition ||
window.webkitSpeechRecognition;



let recognition;


// ===============================
// Voice Input
// ===============================

if(SpeechRecognition){

    recognition = new SpeechRecognition();

    recognition.continuous = false;

    recognition.lang = "en-US";

    recognition.interimResults = false;



    recognition.onstart = function(){

        console.log("Listening... 🎤");

    };



    recognition.onresult = function(event){

        let text =
        event.results[0][0].transcript;


        const input =
        document.querySelector("#messageInput");


        if(input){

            input.value = text;

        }


    };



    recognition.onerror = function(error){

        console.log(
            "Voice error:",
            error
        );

    };


}



// ===============================
// Start Microphone
// ===============================

function startVoice(){

    if(recognition){

        recognition.start();

    }

    else{

        alert(
            "Voice input is not supported on this browser."
        );

    }

}



// ===============================
// Text To Speech
// ===============================

function speak(text){


    if(
        "speechSynthesis" in window
    ){

        let speech =
        new SpeechSynthesisUtterance();


        speech.text = text;

        speech.lang = "en-US";

        speech.rate = 1;


        window.speechSynthesis.speak(
            speech
        );

    }

}



// ===============================
// Connect Microphone Button
// ===============================

document.addEventListener(
"DOMContentLoaded",
()=>{


    const mic =
    document.querySelector(
        ".fa-microphone"
    );


    if(mic){

        mic.parentElement.onclick =
        startVoice;

    }


});
