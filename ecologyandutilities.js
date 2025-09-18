const togleButton = document.querySelector(".toggle-btn");
const secondColumn = document.querySelector(".secondColumn");
togleButton.addEventListener("click", () => {
secondColumn.classList.toggle("show");
togleButton.textContent = secondColumn.classList.contains("show")? "⬇" : "⬆";
});
document.addEventListener( "DOMContentLoaded", () =>{
const loggdin = localStorage.getItem("isLoggedIn");

if(!loggdin){
alert("საჭიროა რეგისტრაცია");
window.location.href = "Registration.html";
}
});
document.addEventListener( "DOMContentLoaded",()=>{
    setTimeout(() =>{
        const notifications = document.querySelectorAll(".notificationsDiv");
        notifications.forEach((note, index) => {
            setTimeout(() =>{
                note.style.opacity = 1;

            },index * 500);
        });
    }, 5000);
});
