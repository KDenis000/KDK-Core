// =================================
// KDK Core - Utility Functions
// =================================



// ===============================
// Generate Unique ID
// ===============================

function generateID(){

    return Date.now().toString(36) +
    Math.random()
    .toString(36)
    .substring(2);

}



// ===============================
// Get Current Date
// ===============================

function getCurrentDate(){

    const date = new Date();


    return date.toLocaleDateString(
        "en-US",
        {
            year:"numeric",
            month:"long",
            day:"numeric"
        }
    );

}



// ===============================
// Get Current Time
// ===============================

function getCurrentTime(){

    return new Date()
    .toLocaleTimeString();

}



// ===============================
// Clean Text
// ===============================

function cleanText(text){

    return text
    .trim()
    .replace(/\s+/g," ");

}



// ===============================
// Detect Device
// ===============================

function getDevice(){

    const width =
    window.innerWidth;


    if(width < 600){

        return "Mobile";

    }


    if(width < 1000){

        return "Tablet";

    }


    return "Desktop";

}



// ===============================
// Browser Information
// ===============================

function getBrowser(){

    return navigator.userAgent;

}



// ===============================
// Delay Function
// ===============================

function wait(milliseconds){

    return new Promise(
        resolve =>
        setTimeout(
            resolve,
            milliseconds
        )
    );

}



// ===============================
// Loading Screen
// ===============================

function showLoading(){

    const loader =
    document.createElement(
        "div"
    );


    loader.id="kdk-loader";


    loader.innerHTML = `

        <div class="loader-box">

            <div class="spinner"></div>

            <p>
            Loading KDK Core...
            </p>

        </div>

    `;


    document.body.appendChild(loader);

}



// ===============================
// Remove Loading
// ===============================

function hideLoading(){

    const loader =
    document.getElementById(
        "kdk-loader"
    );


    if(loader){

        loader.remove();

    }

}



// ===============================
// Copy Text
// ===============================

function copyText(text){

    navigator.clipboard.writeText(
        text
    );


}



// ===============================
// Check Internet
// ===============================

function isOnline(){

    return navigator.onLine;

}
