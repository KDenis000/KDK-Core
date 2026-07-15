// =================================
// KDK Core - Theme System
// =================================


// Theme button

const themeButton = document.querySelector(".fa-moon");


// Start theme

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadTheme();

        if(themeButton){

            themeButton.addEventListener(
                "click",
                toggleTheme
            );

        }

    }
);



// ===============================
// Toggle Theme
// ===============================

function toggleTheme(){

    document.body.classList.toggle(
        "light-mode"
    );


    saveTheme();


}



// ===============================
// Save Theme
// ===============================

function saveTheme(){

    let theme =
    document.body.classList.contains(
        "light-mode"
    )
    ? "light"
    : "dark";


    localStorage.setItem(

        "kdk_theme",

        theme

    );

}



// ===============================
// Load Theme
// ===============================

function loadTheme(){

    let theme =
    localStorage.getItem(
        "kdk_theme"
    );


    if(theme === "light"){

        document.body.classList.add(
            "light-mode"
        );

    }

}
