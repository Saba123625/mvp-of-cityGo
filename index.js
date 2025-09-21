  const togleButton = document.querySelector(".toggle-btn");
  const secondColumn = document.querySelector(".secondColumn");
togleButton.addEventListener("click", () => {
secondColumn.classList.toggle("show");
togleButton.textContent = secondColumn.classList.contains("show")? "⬇" : "⬆";
});
const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", () => {
  if (confirm("გნებავთ თქვენი ექაუნთიდან გასვლა?")) {
   
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("isLoggedIn"); 

 
    
  }
});