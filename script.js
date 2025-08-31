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
