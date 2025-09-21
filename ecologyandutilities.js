const togleButton = document.querySelector(".toggle-btn");
const secondColumn = document.querySelector(".secondColumn");
togleButton.addEventListener("click", () => {
secondColumn.classList.toggle("show");
togleButton.textContent = secondColumn.classList.contains("show")? "⬇" : "⬆";
});





document.addEventListener("DOMContentLoaded", () => {
  const user = localStorage.getItem("user");          
  const loggedIn = sessionStorage.getItem("isLoggedIn"); 

 
  if (!user) {
    alert("საჭიროა რეგისტრაცია!");
    window.location.href = "Registration.html";
    return; 
  }

  
  if (loggedIn !== "true") {
    alert("საჭიროა ავტორიზაცია!");
    window.location.href = "authorization.html";
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".notificationsDiv");
  items.forEach((item, index) => {
    setTimeout(() => {
      item.classList.add("show");
    }, index * 500); 
  });
});