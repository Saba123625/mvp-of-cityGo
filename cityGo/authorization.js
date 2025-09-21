const registrationForm = document.getElementById("registrationForm");
const message = document.getElementById("message");

registrationForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
const email = document.getElementById("email").value.trim();
  const storedUser = JSON.parse(localStorage.getItem("user"));
if(password.length < 6){
        message.textContent = "Password must be at least 6 characters!";
        message.style.color = "#ff6b6b";
        message.style.fontSize = "1.9rem";
        return;
    }
  if (!storedUser || storedUser.username !== username) {
    message.textContent = "Username is incorrect!";
    message.style.color = "#ff6b6b";
    message.style.fontSize = "1.9rem";
    return;
  }
  if(storedUser.email != email){
 message.textContent = "email is incorrect!";
    message.style.color = "#ff6b6b";
    message.style.fontSize = "1.9rem";
    return;
  }
  if(storedUser.password !== password){
    message.textContent = "Password is incorrect!";
    message.style.color = "#ff6b6b";
    message.style.fontSize = "1.9rem";
    return;
  }

  
  sessionStorage.setItem("isLoggedIn", "true");
  alert ("ავტორიზაცია წარმატებითაა გავლილი");

   window.location.href = "index.html";
  
   
});
  const togleButton = document.querySelector(".toggle-btn");
  const secondColumn = document.querySelector(".secondColumn");
togleButton.addEventListener("click", () => {
secondColumn.classList.toggle("show");
togleButton.textContent = secondColumn.classList.contains("show")? "⬇" : "⬆";
});