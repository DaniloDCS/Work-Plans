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

function valid(e) {
    let obj = document.querySelector(`#${e.id}-valid`);

    if (e.id === "name") {
        if (e.value.split(" ").length > 1 && e.value.split(" ")[1].length > 1) {
            obj.className = "min-alert alert-green";
            obj.innerHTML = "<i class='fas fa-check-circle'></i> This name is OK!";
        } else {
            obj.className = "min-alert alert-red";
            obj.innerHTML = "<i class='fas fa-times-circle'></i> This name is SMALL!";
        }
    } else if (e.id === "username" || e.id === "email" || e.id === "phone") {
        if (e.value.length >= 4) {
            fetch(`${location.origin}/account/check/${e.id}/${e.value.replace(/ /g, "").toLowerCase()}`)
                .then(response => {
                    return response.json();
                })
                .then(res => {
                    if (res.count === 0) {
                        obj.className = "min-alert alert-green";
                        obj.innerHTML = `<i class='fas fa-check-circle'></i> This ${e.id} is disponible!`;
                    } else {
                        obj.className = "min-alert alert-red";
                        obj.innerHTML = `<i class='fas fa-times-circle'></i> This ${e.id} is indisponible!`;
                    }
                })
        }
    } else if (e.id === "password") {
        if (e.value.length >= 8) {
            obj.className = "min-alert alert-green";
            obj.innerHTML = `<i class='fas fa-check-circle'></i> This password is ok!`;
        } else {
            obj.className = "min-alert alert-red";
            obj.innerHTML = `<i class='fas fa-times-circle'></i> This password is small!`;
        }
    } else if (e.id === "password-request") {
        if (e.value === document.querySelector("#password").value) {
            obj.className = "min-alert alert-green";
            obj.innerHTML = `<i class='fas fa-check-circle'></i> This password is match!`;
        } else {
            obj.className = "min-alert alert-red";
            obj.innerHTML = `<i class='fas fa-times-circle'></i> This password not is match!`;
        }
    }
}