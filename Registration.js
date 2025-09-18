

const togleButton = document.querySelector(".toggle-btn");
const secondColumn = document.querySelector(".secondColumn");
togleButton.addEventListener("click", () => {
secondColumn.classList.toggle("show");
togleButton.textContent = secondColumn.classList.contains("show")? "⬇" : "⬆";
});

const form = document.getElementById("registrationForm");
const message = document.getElementById("message");

form.addEventListener("submit", function(e){
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if(username === "" || email === "" || password === ""){
        message.textContent = "Please fill in all fields!";
        message.style.color = "#ff6b6b";
        return;
    }

    if(password.length < 6){
        message.textContent = "Password must be at least 6 characters!";
        message.style.color = "#ff6b6b";
        message.style.fontSize = "1.9rem";
        return;
    }
    const user = {
        username: username,
        password: password,
        email: email,
    };
    localStorage.setItem ("user", JSON.stringify(user));
    localStorage.setItem("isLoggedIn", "true");
    message.style.fontSize = "1.9rem";
    message.textContent = `Welcome, ${username}! Registration successful.`;
    message.style.color = "#22ad76ff";   
});

