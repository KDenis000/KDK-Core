// =================================
// KDK Core - File Upload System
// =================================


// Create hidden file input

const fileInput = document.createElement("input");

fileInput.type = "file";

fileInput.accept = 
"image/*,.pdf,.txt,.doc,.docx";

fileInput.style.display = "none";


document.body.appendChild(fileInput);



// Attachment button

document.addEventListener(
"DOMContentLoaded",
()=>{


    const attachment =
    document.querySelector(
        ".fa-paperclip"
    );


    if(attachment){

        attachment.parentElement.onclick =
        openFilePicker;

    }


});



// ===============================
// Open File Picker
// ===============================

function openFilePicker(){

    fileInput.click();

}



// ===============================
// File Selected
// ===============================

fileInput.addEventListener(
"change",
function(){

    const file =
    this.files[0];


    if(!file) return;


    showFilePreview(file);


});



// ===============================
// Preview File
// ===============================

function showFilePreview(file){


    const inputArea =
    document.querySelector(
        ".input-area"
    );


    const preview =
    document.createElement(
        "div"
    );


    preview.className =
    "file-preview";


    preview.innerHTML = `

        <i class="fa-solid fa-file"></i>

        <span>${file.name}</span>

        <button onclick="removeFile(this)">
        ❌
        </button>

    `;


    inputArea.prepend(preview);


}



// ===============================
// Remove File
// ===============================

function removeFile(button){

    button.parentElement.remove();

    fileInput.value="";

}



// ===============================
// File Information
// ===============================

function getFileInfo(){

    if(fileInput.files[0]){

        return fileInput.files[0];

    }

    return null;

}
