import { auth,db } from "../firebaseconfig.js";
import { getFirestore, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

let chapters = [];

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

        let currentChapterIndex = 0;

        async function fetchStory() {
            const storyData = JSON.parse(localStorage.getItem("storyData"));
            if (!storyData) {
                document.getElementById("story-container").innerHTML = "<p class='text-red-500'>Aucune donnée trouvée.</p>";
                return;
            }

            try {
                const response = await fetch("http://127.0.0.1:5000/generate_story", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(storyData),
                });

                if (!response.ok) throw new Error("Erreur lors de la génération de l'histoire");

                const data = await response.json();
                document.getElementById("loading").style.display = "none";

                chapters = data.story.split("@").filter(ch => ch.trim() !== "");

                if (chapters.length > 0) {
                    document.getElementById("story-container").classList.remove("hidden");
                    document.getElementById("next-chapter").classList.remove("hidden");
                    showChapter(0);
                } else {
                    document.getElementById("story-container").innerHTML = "<p class='text-red-500'>Aucun chapitre trouvé.</p>";
                }

            } catch (error) {
                document.getElementById("story-container").innerHTML = "<p class='text-red-500'>Erreur lors de la récupération de l'histoire.</p>";
            }
        }

        function showChapter(index) {
            if (index < 0 || index >= chapters.length) return;

            const container = document.getElementById("story-container");
            container.innerHTML = ""; 

            const lines = chapters[index].trim().split("\n");
            const title = lines[0].trim(); 
            const content = lines.slice(1).join("\n").trim(); 

            const titleElement = document.createElement("h2");
            titleElement.classList.add("text-2xl", "font-bold", "mb-2", "text-yellow-400");
            titleElement.innerText = title;

            const contentElement = document.createElement("p");
            contentElement.classList.add("text-lg", "text-gray-300");
            contentElement.innerText = content;

            container.appendChild(titleElement);
            container.appendChild(contentElement);

            document.getElementById("prev-chapter").classList.toggle("hidden", index === 0);
            document.getElementById("next-chapter").classList.toggle("hidden", index === chapters.length - 1);
            
            // Gestion des boutons Premium
            document.getElementById("get-video").classList.toggle("hidden", index === 0);
            document.getElementById("download-pdf").classList.toggle("hidden", index !== chapters.length - 1);
        }

        document.getElementById("prev-chapter").addEventListener("click", function() {
            if (currentChapterIndex > 0) {
                currentChapterIndex--;
                showChapter(currentChapterIndex);
            }
        });

        document.getElementById("next-chapter").addEventListener("click", function() {
            if (currentChapterIndex < chapters.length - 1) {
                currentChapterIndex++;
                showChapter(currentChapterIndex);
            }
        });

        document.getElementById("download-pdf").addEventListener("click", function() {
            if (!isPremium()) {
                showPremiumPopup();
                return;
            }

            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();

            let y = 10;
            doc.setFont("helvetica", "bold");
            doc.setFontSize(18);
            doc.text("Votre Histoire Générée", 10, y);
            y += 10;

            doc.setFont("helvetica", "normal");
            doc.setFontSize(12);
            chapters.forEach(chapter => {
                const lines = chapter.trim().split("\n");
                const title = lines[0].trim();
                const content = lines.slice(1).join("\n").trim();

                doc.setFont("helvetica", "bold");
                doc.setFontSize(14);
                doc.text(title, 10, y);
                y += 7;

                doc.setFont("helvetica", "normal");
                doc.setFontSize(12);
                const splitText = doc.splitTextToSize(content, 180);
                splitText.forEach(line => {
                    if (y > 280) {
                        doc.addPage();
                        y = 10;
                    }
                    doc.text(line, 10, y);
                    y += 6;
                });
                y += 10;
            });

            doc.save("histoire.pdf");
        });

        fetchStory();
        