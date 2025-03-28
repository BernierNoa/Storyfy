import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyC0PMinhg5AJxIMFC2ZzsxGoz_LPsSG-PE",
    authDomain: "storyfy-bdeab.firebaseapp.com",
    projectId: "storyfy-bdeab",
    storageBucket: "storyfy-bdeab.firebasestorage.app",
    messagingSenderId: "381008287354",
    appId: "1:381008287354:web:8f4f753af839b0b6f64dc3",
    measurementId: "G-VY9P0E16DR"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();

export { auth };
export {db};
