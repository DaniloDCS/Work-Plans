const div = document.querySelector(".col-1"),
    password = document.querySelector("#password"),
    filesNames = ["alvo", "group-2", "group", "icon", "man-desktop", "man", "woman", "woman-2", "woman-desktop", "woman-phone"];

let counter = Math.floor(Math.random() * (filesNames.length - 0));
div.style.backgroundImage = `url("/public/images/${filesNames[counter]}.png")`;

setInterval(() => {
    div.style.backgroundImage = `url("/public/images/${filesNames[counter]}.png")`;
    if (counter === filesNames.length) counter = 0
    counter++
}, 6000);

let passView = false;

function passwordView(e) {
    if (passView) {
        password.type = "password";
        passView = false;
        e.className = "text-green fas fa-eye";
    } else {
        password.type = "text";
        passView = true;
        e.className = "text-green fas fa-eye-slash";
    }
}