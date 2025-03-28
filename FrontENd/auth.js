import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { auth } from "./firebaseconfig.js";

const accountLink = document.getElementById("account-link");

onAuthStateChanged(auth, (user) => {
    if (user) {
        accountLink.textContent = "Mon Compte";
        accountLink.className = "px-4 py-2 bg-[#5c6bc0] rounded-lg hover:bg-[#4a5aa7] transition"
        accountLink.href = "/FrontEnd/compte/compte.html";
    } else {
        // Aucun utilisateur connecté → affiche "Se Connecter"
        accountLink.textContent = "Se Connecter";
        accountLink.className = "px-4 py-2 bg-[#5c6bc0] rounded-lg hover:bg-[#4a5aa7] transition"
        accountLink.href = "/FrontEnd/compte/login.html"; // Redirige vers la page de login
    }
});