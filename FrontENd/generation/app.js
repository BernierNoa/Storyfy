import { auth,db } from "../firebaseconfig.js";
import { getFirestore, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";


document.addEventListener("DOMContentLoaded", () => {
    let selectedUniverse = "";
    let selectedLength = "";
    const characters = [];

    auth.onAuthStateChanged((user) => {
        if (!user) {
            // L'utilisateur N'EST PAS connecté → Afficher la pop-up
            showLoginPopup();
        }
    });

    async function isPremium(){
        return new Promise(async (resolve, reject) => {
            const user = auth.currentUser; // Récupère l'utilisateur connecté
            
            if (!user) {
                resolve(false); // Pas d'utilisateur connecté → Pas Premium
                return;
            }

            const userRef = doc(db, "Utilisateurs", user.email);
            const userDoc = await getDoc(userRef);
            if (userDoc != null) {
                const userData = userDoc.data();
                resolve(userData.Prenium)
            }
        });
    }
    function showPremiumPopup() {
        const popup = document.createElement("div");
        popup.innerHTML = `
            <div class="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center">
                <div class="bg-gray-800 p-6 rounded-lg text-white w-80 text-center shadow-lg">
                    <h2 class="text-xl font-bold mb-4">🔒 Fonctionnalité Premium</h2>
                    <p class="mb-4">Cette option est réservée aux membres premium.</p>
                    <a href="../prenium.html">
                        <button class="bg-yellow-500 px-4 py-2 rounded-lg font-bold text-black hover:bg-yellow-400">Passer Premium</button>
                    </a>
                    <button id="close-premium-popup" class="block mt-4 text-gray-300 hover:text-white">Fermer</button>
                </div>
            </div>
        `;
        document.body.appendChild(popup);

        // Fermer la pop-up
        document.getElementById("close-premium-popup").addEventListener("click", () => {
            popup.remove();
        });
    }

    // Bloque Squid Game si non-premium
    document.querySelector('.universe[data-universe="Squid Game"]').addEventListener("click", async (event) => {
        const prenium = await isPremium()
        if (!prenium) {
            document.querySelectorAll(".universe").forEach(univ => univ.classList.remove("bg-blue-500", "border-4", "border-[#4a5aa7]0"));
            selectedUniverse = "";
            showPremiumPopup();
        }
    });

    document.querySelector('.universe[data-universe="Avengers"]').addEventListener("click", async (event) => {
        const prenium = await isPremium()
        if (!prenium) {
            document.querySelectorAll(".universe").forEach(univ => univ.classList.remove("bg-blue-500", "border-4", "border-[#4a5aa7]0"));
            selectedUniverse = "";
            showPremiumPopup();
        }
    });

    // Bloque les longueurs "Longue" et "Géante" si non-premium
    document.querySelectorAll('.length[data-length="longue"], .length[data-length="geante"]').forEach( button => {
        button.addEventListener("click", async (event) => {
            const prenium = await isPremium()
            if (!prenium) {
                document.querySelectorAll(".length").forEach(btn => btn.classList.remove("bg-blue-500", "border-4", "border-[#4a5aa7]"));
                selectedLength = "";
                showPremiumPopup();
            }
        });
    });
    
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

function showLoginPopup() {
    // Création de l'overlay
    const overlay = document.createElement("div");
    overlay.classList.add("fixed", "inset-0", "bg-black", "bg-opacity-80", "flex", "justify-center", "items-center");

    // Création du conteneur de la pop-up
    const popup = document.createElement("div");
    popup.classList.add("bg-gray-800", "p-6", "rounded-lg", "text-white", "shadow-lg", "w-96", "text-center");

    // Titre
    const title = document.createElement("h2");
    title.classList.add("text-2xl", "font-bold", "mb-4");
    title.innerText = "🔒 Vous devez être connecté";

    // Texte
    const message = document.createElement("p");
    message.classList.add("mb-6");
    message.innerText = "Connectez-vous pour accéder à cette fonctionnalité.";

    // Bouton Connexion
    const loginBtn = document.createElement("button");
    loginBtn.classList.add("px-4", "py-2", "bg-blue-500", "rounded-lg", "hover:bg-blue-600", "transition", "mr-2");
    loginBtn.innerText = "Connexion";
    loginBtn.addEventListener("click", () => {
        window.location.href = "./login.html"; // Redirige vers la page de connexion
    });

    // Bouton Accueil
    const homeBtn = document.createElement("button");
    homeBtn.classList.add("px-4", "py-2", "bg-gray-500", "rounded-lg", "hover:bg-gray-600", "transition");
    homeBtn.innerText = "Accueil";
    homeBtn.addEventListener("click", () => {
        window.location.href = "./index.html"; // Redirige vers l'accueil
    });

    // Ajout des éléments à la pop-up
    popup.appendChild(title);
    popup.appendChild(message);
    popup.appendChild(loginBtn);
    popup.appendChild(homeBtn);
    
    // Ajout de la pop-up à l'overlay
    overlay.appendChild(popup);
    
    // Ajout de l'overlay au corps du document
    document.body.appendChild(overlay);
}