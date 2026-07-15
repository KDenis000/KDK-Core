// =================================
// KDK Core - AI API Connection
// =================================


// AI Configuration

const AI_CONFIG = {

    provider: "none",

    model: "KDK-Core",

    status: "Development"

};



// ===============================
// Send Request To AI
// ===============================

async function askAI(message){


    try{


        /*
        Later we will connect
        a real AI API here.

        Example:

        const response = await fetch(
            "YOUR_AI_ENDPOINT",
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    message:message
                })
            }
        );

        const data = await response.json();

        return data.reply;

        */


        return createLocalResponse(message);


    }


    catch(error){


        console.error(
            "AI Error:",
            error
        );


        return "Sorry, I encountered an error.";

    }


}



// ===============================
// Temporary Brain
// ===============================

function createLocalResponse(message){


    let text =
    message.toLowerCase();



    if(text.includes("hello")
    || text.includes("hi")){


        return "Hello 👋 I am KDK Core. How can I help you today?";

    }



    if(text.includes("name")){


        return "My name is KDK Core, created by KDK JAJAWO MEDIA.";

    }



    if(text.includes("help")){


        return "I can help you with information, coding, learning and many other tasks.";

    }



    if(text.includes("who created you")){


        return "I was created as a project by Denis under KDK JAJAWO MEDIA.";

    }



    return "I am still developing my intelligence. My AI engine will be connected soon.";

}



// ===============================
// AI Status
// ===============================

function getAIStatus(){


    return AI_CONFIG;

}
