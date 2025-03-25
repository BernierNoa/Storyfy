document.addEventListener("DOMContentLoaded", () => {
    let selectedUniverse = "";
    let selectedLength = "";
    const characters = [];
    
    // Sélection d'un univers
    document.querySelectorAll(".universe").forEach(el => {
        el.addEventListener("click", () => {
            document.querySelectorAll(".universe").forEach(univ => univ.classList.remove("bg-blue-500", "border-4", "border-[#4a5aa7]0"));
            el.classList.add("bg-blue-500", "border-4", "border-[#4a5aa7]");
            selectedUniverse = el.dataset.universe;
        });
    });
    
    // Sélection de la longueur de l'histoire
    document.querySelectorAll(".length").forEach(el => {
        el.addEventListener("click", () => {
            document.querySelectorAll(".length").forEach(btn => btn.classList.remove("bg-blue-500", "border-4", "border-[#4a5aa7]"));
            el.classList.add("bg-blue-500", "border-4", "border-[#4a5aa7]");
            selectedLength = el.dataset.length;
        });
    });
    
    // Gestion de l'ajout de personnages
    document.getElementById("add-character").addEventListener("click", () => {
        document.getElementById("character-popup").classList.remove("hidden");
    });
    
    document.getElementById("close-popup").addEventListener("click", () => {
        document.getElementById("character-popup").classList.add("hidden");
    });
    
    document.getElementById("save-character").addEventListener("click", () => {
        const name = document.getElementById("char-name").value;
        const age = document.getElementById("char-age").value;
        const desc = document.getElementById("char-desc").value;
        
        if (name && age && desc) {
            characters.push({ name, age, desc });
            
            const li = document.createElement("li");
            li.textContent = `${name} (${age} ans) - ${desc}`;
            li.classList.add("p-2", "bg-gray-800", "rounded-lg", "text-white", "mb-2");
            document.getElementById("character-list").appendChild(li);
            
            document.getElementById("character-popup").classList.add("hidden");
            document.getElementById("char-name").value = "";
            document.getElementById("char-age").value = "";
            document.getElementById("char-desc").value = "";
        }
    });
    
    // Bouton de génération d'histoire
    document.getElementById("generate-story").addEventListener("click", async () => {
        const universe = selectedUniverse;
        const length = selectedLength;
        const character = characters;
        
    
        if (!universe || !length || character.length === 0) {
            alert(universe + " " + length + " " + character)
            //alert("Veuillez sélectionner un univers, une longueur et ajouter au moins un personnage.");
            return;
        }
    
        // Stocker les données dans le localStorage (pour les récupérer dans story.html)
        localStorage.setItem("storyData", JSON.stringify({ universe, length, characters }));
    
        // Ouvrir une nouvelle page pour afficher l'histoire
        window.location.href = "story.html";
    });
});