import requests
from mistralai import Mistral
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Clé API Mistral (remplace par la tienne)
API_KEY = "53jeC5zHjDAJsOPKz4yE93Z1D55PjFOZ"
MODEL_NAME = "mistral-large-latest"

def generate_story_with_ai(prompt):
    """Envoie une requête à l'IA Mistral pour générer une histoire."""
    client = Mistral(api_key=API_KEY)

    response = client.chat.complete(
        model=MODEL_NAME,
        temperature=0.7,
        max_tokens=5000,
        messages=[{"role": "user", "content": prompt}]
    )

    return response.choices[0].message.content

@app.route("/generate_story", methods=["POST"])
def generate_story():
    """Endpoint Flask pour générer une histoire avec l'IA Mistral."""
    data = request.get_json()

    universe = data.get("universe")
    length = data.get("length")  # "courte", "longue", "géante"
    characters = data.get("characters")

    if not universe or not length or not characters:
        return jsonify({"error": "Données manquantes"}), 400

    # Déterminer le nombre de chapitres et de mots par chapitre en fonction de la longueur
    length_mapping = {
        "courte": (5, 100),  # 4 chapitres, environ 300 mots par chapitre
        "longue": (7, 300),  # 7 chapitres, environ 500 mots par chapitre
        "geante": (10, 500)  # 10 chapitres, environ 800 mots par chapitre
    }

    if length not in length_mapping:
        return jsonify({"error": "Longueur invalide"}), 400

    num_chapters, words_per_chapter = length_mapping[length]

    # Convertir les personnages en texte
    character_descriptions = "\n".join(
        [f"- {c['name']} ({c['age']} years old): {c['desc']}" for c in characters]
    )

    # Base du prompt en anglais
    base_prompt = f"""
        You are an exceptionally talented storyteller, capable of crafting immersive and unpredictable stories. 
        Your job is to create a captivating adventure filled with unexpected twists, dramatic events, and breathtaking surprises. 
        The reader should be constantly engaged, never knowing what will happen next.

        The story must be divided into {num_chapters} chapters.
        Each chapter must have a unique and intriguing title that starts with "@", followed by an exciting narrative.
        Each chapter should be approximately {words_per_chapter} words long.

        Here are the main characters:
        {character_descriptions}

        The story must be rich in emotions, suspense, and dramatic tension. 
        Introduce plot twists, betrayals, shocking revelations, and situations where nothing is as it seems. 
        Keep the reader hooked until the very last sentence.

        Make sure the story is well-structured, dynamic, and maintains a high level of intensity.  
        The entire story must be written in **French**.
        """

    # Ajouter un contexte spécifique selon l’univers choisi
    if universe == "Koh Lanta" or universe == "🏝️ Koh Lanta":
        prompt = base_prompt + f"""
        The story takes place in a remote island survival competition, similar to the TV show Koh-Lanta.
        It should include physical challenges, alliances, betrayals, and unexpected twists.
        Describe the trials, the strategies of the competitors, and intense moments of survival.
        """

    elif universe == "Casa de Papel" or universe == "💰 Casa de Papel":
        prompt = base_prompt + f"""
        The story is set in the world of La Casa de Papel.
        It should feature a detailed heist plan, high-stakes strategies, conflicts between characters, and police interventions.
        Describe the execution of the heist, the emotional tensions, and the unpredictable turns of events.
        """

    elif universe == "Squid Game" or universe == "🦑 Squid Game":
        prompt = base_prompt + f"""
        The story takes place in a deadly survival game inspired by Squid Game.
        It should include various life-threatening challenges, unexpected betrayals, and tense alliances.
        Describe each game in detail, the psychological struggles of the participants, and the moral dilemmas they face.
        """

    elif universe == "Avengers" or universe == "🦸‍♂️ Avengers":
        prompt = base_prompt + f"""
        The story takes place in the Marvel Universe, where the main Avengers characters gain new, unprecedented powers and face unique adventures.
        It should explore their transformations, the challenges they face with their new abilities, and the unexpected consequences of these powers.
        Describe the villains they confront, the battles they must fight, and the struggles of adapting to their newfound strengths and responsibilities.
        """

    elif universe == "Sportif" or universe == "⚽️ Sportif Professionnel":
        prompt = base_prompt + f"""
        The story follows a group of athletes striving to make a name for themselves in the world of professional sports.
        Each character has their own discipline, challenges, and ambitions. 
        Describe intense training sessions, crucial competitions, and the physical and mental struggles they must overcome.
        Explore fierce rivalries, sacrifices made for success, and moments of triumph or heartbreaking failure.
        Add unexpected twists such as injuries, doping scandals, shocking betrayals, or life-changing opportunities.
        The world of sports is unpredictable—make sure every chapter is filled with excitement and suspense.
        """

    elif universe == "One Piece" or universe == "⛵️ One Piece":
        prompt = base_prompt + f"""
        The story takes place in the world of One Piece, where the characters embark on a grand adventure across the seas.
        They sail through the unpredictable waters of the Grand Line, facing powerful enemies, legendary treasures, and mysterious islands.
        Each character plays a crucial role in the crew, contributing their unique skills and ambitions.
        Describe epic naval battles, intense duels, and encounters with mythical creatures or powerful pirate factions.
        Introduce twists like betrayals, shocking revelations about the One Piece world, or unexpected alliances with other pirate crews.
        Keep the reader engaged with non-stop action, emotional depth, and a sense of wonder and discovery.
        """

    else:
        return jsonify({"error": "Unknown universe"}), 400

    # Générer l'histoire avec Mistral AI
    story = generate_story_with_ai(prompt)

    return jsonify({"story": story})

if __name__ == "__main__":
    app.run(debug=True)
