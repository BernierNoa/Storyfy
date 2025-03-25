import requests

from mistralai import Mistral
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Clé API (remplace-la par la tienne)
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
    length = data.get("length")
    characters = data.get("characters")

    if not universe or not length or not characters:
        return jsonify({"error": "Données manquantes"}), 400

    # Convertir les personnages en texte
    character_descriptions = "\n".join(
        [f"- {c['name']} ({c['age']} ans) : {c['desc']}" for c in characters]
    )

    # Sélectionner le bon prompt en fonction de l’univers
    if universe == "Koh Lanta" or universe == "🏝️ Koh Lanta":
        prompt = f"""
        You are a talented writer, and your role is to create an engaging story in the universe of Koh-Lanta.
        The story should be approximately {length} words long and include physical challenges, alliances, strategies, and unexpected twists.
        
        The main characters are:
        {character_descriptions}

        The story should be immersive and full of surprises. Be creative and surprise me!
        Divide the story into chapters, and each chapter title should start with @ to recognize it.
        Make sure to write the entire story in French.
        """
    elif universe == "Casa de Papel" or universe == "💰 Casa de Papel":
        prompt = f"""
        You are an expert heist writer, and your role is to create an exciting story in the universe of La Casa de Papel.
        The story should be approximately {length} words long and include heist strategies, tensions, betrayals, and moments of intense suspense.

        The main characters are:
        {character_descriptions}

        Describe in detail the planning and execution of the heist with unexpected twists.
        Divide the story into chapters, and each chapter title should start with @ to recognize it.
        Make sure to write the entire story in French.
        """
    elif universe == "Squid Game" or universe == "🦑 Squid Game":
        prompt = f"""
        You are a thriller writer, and your role is to create a gripping story in the universe of Squid Game.
        The story should be approximately {length} words long and include deadly games, alliances, betrayals, and moments of extreme tension.

        The main characters are:
        {character_descriptions}

        Describe each game, the players' strategies, and moments of intense suspense.
        Divide the story into chapters, and each chapter title should start with @ to recognize it.
        Make sure to write the entire story in French.
        """
    else:
        return jsonify({"error": "Univers inconnu"}), 400

    # Générer l'histoire avec Mistral AI
    story = generate_story_with_ai(prompt)

    return jsonify({"story": story})

if __name__ == "__main__":
    app.run(debug=True)
