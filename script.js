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
import { getFirestore, collection, getDocs, updateDoc, doc, onSnapshot } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

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

// Echtzeit Updates
const announcementsCol = collection(db, "announcements");
onSnapshot(announcementsCol, (snapshot) => {
  announcementsDiv.innerHTML = ""; // Box leeren
  snapshot.forEach(docSnap => {
    const data = docSnap.data();
    const id = docSnap.id;

    const ann = document.createElement("div");
    ann.className = "announcement";
    ann.innerHTML = `
      <p>${data.text}</p>
      <button class="like-btn" data-id="${id}">❤️ ${data.likes}</button>
    `;
    announcementsDiv.appendChild(ann);
  });

  // Like-Buttons aktivieren
  document.querySelectorAll(".like-btn").forEach(btn => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.id;
      const docRef = doc(db, "announcements", id);
      await updateDoc(docRef, { likes: data.likes + 1 });
    });
  });
});
