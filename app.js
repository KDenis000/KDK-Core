// =================================
// KDK Core - App Controller
// =================================


// Start KDK Core

document.addEventListener("DOMContentLoaded", () => {

    console.log("KDK Core Started 🚀");


    loadSettings();

    setupTheme();

    setupSidebar();

});



// ===============================
// Load Saved Settings
// ===============================

function loadSettings(){

    const settings = localStorage.getItem("kdk_settings");


    if(settings){

        const data = JSON.parse(settings);

        console.log("Settings loaded:", data);

    }

    else{

        const defaultSettings = {

            theme:"dark",

            language:"English",

            version:"1.0"

        };


        localStorage.setItem(

            "kdk_settings",

            JSON.stringify(defaultSettings)

        );

    }

}



// ===============================
// Theme System
// ===============================

function setupTheme(){

    const themeButton = document.querySelector(
        ".fa-moon"
    );


    if(!themeButton) return;


    themeButton.addEventListener(
        "click",
        () => {


            document.body.classList.toggle(
                "light-mode"
            );


            saveTheme();


        }
    );

}



// Save Theme

function saveTheme(){

    let theme =
    document.body.classList.contains(
        "light-mode"
    )
    ? "light"
    : "dark";


    let settings =
    JSON.parse(
        localStorage.getItem(
            "kdk_settings"
        )
    );


    settings.theme = theme;


    localStorage.setItem(

        "kdk_settings",

        JSON.stringify(settings)

    );

}



// ===============================
// Mobile Sidebar
// ===============================

function setupSidebar(){


    const menuButton =
    document.querySelector(
        ".menu-btn"
    );


    const sidebar =
    document.querySelector(
        ".sidebar"
    );


    if(!menuButton || !sidebar)
    return;



    menuButton.onclick = () => {

        sidebar.classList.toggle(
            "active"
        );

    };


}



// ===============================
// Current App Info
// ===============================

const KDK_CORE = {


    name:"KDK Core",

    version:"1.0",

    creator:"KDK JAJAWO MEDIA",

    status:"Development"


};


console.log(KDK_CORE);
