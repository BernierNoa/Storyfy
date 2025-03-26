import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

const auth = getAuth();

const accountLink = document.getElementById("account-link");

onAuthStateChanged(auth, (user) => {
    if (user) {
        accountLink.textContent = "Mon Compte";
        accountLink.href = "/FrontEnd/compte.html"; // Redirige vers la page compte
    } else {
        // Aucun utilisateur connecté → affiche "Se Connecter"
        accountLink.textContent = "Se Connecter";
        accountLink.href = "/FrontEnd/compte/login.html"; // Redirige vers la page de login
    }
});