// =================================
// KDK Core - Memory System
// =================================


// Storage name

const MEMORY_KEY = "kdk_chat_history";


// ===============================
// Save Message
// ===============================

function saveMessage(sender, text){

    let history = getMemory();


    history.push({

        sender: sender,

        message: text,

        time: new Date().toLocaleString()

    });


    localStorage.setItem(

        MEMORY_KEY,

        JSON.stringify(history)

    );

}



// ===============================
// Get Saved Messages
// ===============================

function getMemory(){

    let data =
    localStorage.getItem(
        MEMORY_KEY
    );


    if(data){

        return JSON.parse(data);

    }


    return [];

}



// ===============================
// Load Chat History
// ===============================

function loadMemory(){

    let history =
    getMemory();


    history.forEach(item => {


        addMessage(

            item.message,

            item.sender

        );


    });

}



// ===============================
// Clear Memory
// ===============================

function clearMemory(){

    localStorage.removeItem(

        MEMORY_KEY

    );


    console.log(
        "KDK Core memory cleared"
    );

}



// ===============================
// Export Memory
// ===============================

function exportMemory(){

    let data =
    JSON.stringify(
        getMemory(),
        null,
        2
    );


    console.log(data);

    return data;

}
