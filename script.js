// Elemente holen
const progressBar = document.getElementById("progress-bar");
const changelogList = document.getElementById("changelog-list");
const addButton = document.getElementById("add-change");

// Fortschritts-Daten
const changes = [
  { progress: 20, text: "Struktur erstellt" },
  { progress: 40, text: "Design im Dark Mode hinzugefügt" },
  { progress: 60, text: "Progress Bar integriert" },
  { progress: 80, text: "Change Log Funktion hinzugefügt" },
  { progress: 100, text: "Finales Coming Soon Layout" }
];

let i = 0;

// Funktion um Fortschritt manuell hinzuzufügen
function addChange() {
  if (i < changes.length) {
    const change = changes[i];
    progressBar.style.width = change.progress + "%";

    // Neues Log hinzufügen
    const li = document.createElement("li");
    li.textContent = change.text;
    changelogList.appendChild(li);

    i++;
  } else {
    alert("Alle Schritte sind schon eingetragen ✅");
  }
}

// Klick-Event
addButton.addEventListener("click", addChange);
// Placeholder for future animations
console.log("MyVent site loaded.");

// Firebase SDK importieren
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore, collection, doc, onSnapshot, updateDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyB8KYVMFvtcDkEJAdoMcPAH-iEq1rLj8G0",
  authDomain: "myvent-414b9.firebaseapp.com",
  projectId: "myvent-414b9",
  storageBucket: "myvent-414b9.firebasestorage.app",
  messagingSenderId: "214773201576",
  appId: "1:214773201576:web:825edbf35da88e647f609d"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const announcementsDiv = document.getElementById("announcements");

const announcementsCol = collection(db, "announcements");

// Echtzeit-Updates aus Firestore
onSnapshot(announcementsCol, (snapshot) => {
  announcementsDiv.innerHTML = ""; // Box leeren

  snapshot.forEach(docSnap => {
    const data = docSnap.data();
    const id = docSnap.id;

    // Stelle sicher, dass likes definiert ist
    const likes = data.likes || 0;

    const ann = document.createElement("div");
    ann.className = "announcement";
    ann.innerHTML = `
      <p>${data.text}</p>
      <button class="like-btn" data-id="${id}">❤️ <span class="like-count">${likes}</span></button>
    `;
    announcementsDiv.appendChild(ann);

    // Like-Button Event
    const likeBtn = ann.querySelector(".like-btn");
    const likeCountSpan = likeBtn.querySelector(".like-count");

    likeBtn.addEventListener("click", async () => {
      const docRef = doc(db, "announcements", id);

      // Nimm den aktuellen Wert aus dem Button selbst
      const currentLikes = parseInt(likeCountSpan.textContent);
      const newLikes = currentLikes + 1;

      // Firestore aktualisieren
      await updateDoc(docRef, { likes: newLikes });
    });
  });
});


// Alle Like-Buttons auswählen
document.querySelectorAll(".like-btn").forEach(btn => {
  const countSpan = btn.querySelector(".like-count");

  // lokalen Speicher prüfen
  const storedLikes = localStorage.getItem(btn.dataset.id);
  if (storedLikes) countSpan.textContent = storedLikes;

  btn.addEventListener("click", () => {
    let count = parseInt(countSpan.textContent);
    count++;
    countSpan.textContent = count;

    // in localStorage speichern
    localStorage.setItem(btn.dataset.id, count);

    // kleine Pop-Animation
    btn.style.transform = "scale(1.3)";
    setTimeout(() => { btn.style.transform = "scale(1)"; }, 150);
  });
});
