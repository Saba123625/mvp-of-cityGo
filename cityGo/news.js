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
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDl3WMdGtTF3-sssh7GKrrJ-Hxjt306xZU",
  authDomain: "citygo-news.firebaseapp.com",
  projectId: "citygo-news",
  storageBucket: "citygo-news.firebasestorage.app",
  messagingSenderId: "702521431628",
  appId: "1:702521431628:web:8e34765ae86d68c15606e9",
  measurementId: "G-LD5XN6TWHB"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const newsContainer = document.getElementById("newsContainer");
const newsForm = document.getElementById("newsForm");


async function addNews(title, content) {
  try {
    await addDoc(collection(db, "news"), {
      title,
      content,
      timestamp: serverTimestamp()
    });
    console.log("News added!");
  } catch (error) {
    console.error("Error adding news:", error);
  }
}


async function fetchNews() {
  newsContainer.innerHTML = ""; 
  const querySnapshot = await getDocs(collection(db, "news"));

  querySnapshot.forEach((docSnap) => {        
    const data = docSnap.data();
    const div = document.createElement("div"); 
    div.classList.add("newsItem");
    div.innerHTML = `<h3>${data.title}</h3><p>${data.content}</p>
                     <button class="deleteBtn">წაშლა</button>`;

    const deleteBtn = div.querySelector(".deleteBtn");
    deleteBtn.addEventListener("click", async () => {
      if (confirm("გნებავთ წაშლა?")) {
        await deleteDoc(doc(db, "news", docSnap.id)); 
        div.remove();
      }
    });

    newsContainer.appendChild(div);
  });
}


document.addEventListener("DOMContentLoaded", () => {
  fetchNews();
});


newsForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("newsTitle").value.trim();
  const content = document.getElementById("newsContent").value.trim();

  if(title && content){
    await addNews(title, content);
    newsForm.reset();              
    fetchNews();
  }
});




    
   

  

