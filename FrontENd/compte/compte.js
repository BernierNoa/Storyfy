import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getFirestore, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import { auth, db } from "../firebaseconfig.js";

const emailField = document.getElementById("email");
const creditField = document.getElementById("credit");
const storyField = document.getElementById("story");
const preniumField = document.getElementById("prenium");
const updateButton = document.getElementById("update-profile");
const logoutButton = document.getElementById("logout");

onAuthStateChanged(auth, async (user) => {
    if (user) {
        const userRef = doc(db, "Utilisateurs", user.email);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
            const userData = userDoc.data();
            emailField.value = user.email;
            creditField.value = userData.Credit || "";
            storyField.value = userData.StoryCreate || "0";
            if(userData.Prenium == false){
                preniumField.value = "Non";
            }else{
                preniumField.value = "Oui";
            }
        } else {
            console.error("Aucune donnée utilisateur trouvée.");
        }
    } else {
        window.location.href = "/login.html"; // Redirige si non connecté
    }
});


logoutButton.addEventListener("click", () => {
    signOut(auth).then(() => {
        window.location.href = "../index.html"; // Redirige après déconnexion
    });
});
