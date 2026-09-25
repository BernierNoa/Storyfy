# 📚 Storyfy - AI Powered Story Generator

![Python](https://img.shields.io/badge/Backend-Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![JavaScript](https://img.shields.io/badge/Frontend-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Firebase](https://img.shields.io/badge/Cloud-Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![Status](https://img.shields.io/badge/Status-Beta-blue?style=for-the-badge)

<p align="center">
  <img src="bannière.png" alt="Storyfy Banner" width="100%">
</p>

## 🚀 Overview

**Storyfy** is a web application designed to generate unique, personalized stories using Artificial Intelligence.
Whether for children's bedtime stories or creative inspiration, Storyfy allows users to input specific parameters (themes, characters, tone) and receive a custom-tailored narrative in seconds.

This project demonstrates a **Full Stack** implementation, combining a Python backend for AI processing with a responsive JavaScript frontend and Firebase for user authentication.

## ✨ Key Features

* **🤖 AI Story Generation:** Generates text based on user prompts via a Python backend.
* **🔐 User Authentication:** Secure Login and Sign-up system powered by **Google Firebase**.
* **🎨 Modern UI/UX:** Responsive design with a dedicated Landing Page and User Dashboard.
* **⚙️ Customization:** Users can define the style, length, and genre of the story.
* **📱 Account Management:** Personal profile section (`/compte`) to manage user data.

## 🏗️ Technical Architecture

The project is structured into two main components:

### 1. Frontend (`/FrontENd`)
* **Technologies:** HTML5, CSS3, Vanilla JavaScript.
* **Logic:** Handles user inputs, communicates with the backend APIs, and manages the Firebase Auth state (`auth.js`, `firebaseconfig.js`).

### 2. Backend (`/BackEnd`)
* **Technologies:** Python.
* **Role:** Processes requests from the frontend and acts as the bridge to the Generative AI model.
* **Dependencies:** Managed via `requirements.txt`.

## 🛠️ Installation & Setup

### Prerequisites
* Python 3.8+
* A Firebase Project (for API keys)

### 1. Clone the repository
```bash
git clone https://github.com/BernierNoa/Storyfy.git
cd storyfy
```

### 2. Run the backend
```bash
cd BackEnd
pip install -r requirements.txt
python app.py
```
The Flask API starts on `http://127.0.0.1:5000` and exposes the `/generate_story` endpoint used by the frontend.

### 3. Run the frontend
```bash
cd FrontENd
```
Open `index.html` in your browser (or serve the folder with a local server, e.g. `python -m http.server` or the VS Code "Live Server" extension). Make sure the backend is running first so the story generation requests succeed.

You can also try the landing page by opening `LandingPage/index.html`, and join the beta via the [sign-up form](https://forms.gle/g8g1FGDaou5iAg8r8) linked from it.
