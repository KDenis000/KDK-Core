// =================================
// KDK Core - Settings System
// =================================


// Default Settings

const DEFAULT_SETTINGS = {

    theme:"dark",

    language:"English",

    username:"Denis",

    notifications:true,

    version:"1.0"

};



// ===============================
// Load Settings
// ===============================

function getSettings(){

    let settings =
    localStorage.getItem(
        "kdk_settings"
    );


    if(settings){

        return JSON.parse(settings);

    }


    saveSettings(DEFAULT_SETTINGS);

    return DEFAULT_SETTINGS;

}



// ===============================
// Save Settings
// ===============================

function saveSettings(settings){

    localStorage.setItem(

        "kdk_settings",

        JSON.stringify(settings)

    );

}



// ===============================
// Update Setting
// ===============================

function updateSetting(
    key,
    value
){

    let settings =
    getSettings();


    settings[key] = value;


    saveSettings(settings);

}



// ===============================
// Clear Chat Memory
// ===============================

function clearChatHistory(){

    localStorage.removeItem(
        "kdk_chat_history"
    );


    alert(
        "KDK Core chat history cleared."
    );

}



// ===============================
// Reset Application
// ===============================

function resetKDKCore(){

    localStorage.clear();


    location.reload();

}



// ===============================
// App Information
// ===============================

function getAppInfo(){

    return {

        name:"KDK Core",

        creator:"KDK JAJAWO MEDIA",

        version:"1.0",

        status:"Development"

    };

}
