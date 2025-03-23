import requests
from mistralai import Mistral

def generate_story(prompt):
    api_key = "53jeC5zHjDAJsOPKz4yE93Z1D55PjFOZ"
    model = "mistral-large-latest"
    client = Mistral(api_key=api_key)
    
    
    
    chat_response = client.chat.complete(
        model=model,
        temperature=0.7,
        max_tokens=5000,
        messages=[{"role": "user", "content": prompt}]
    )
    return chat_response.choices[0].message.content


def generate_koh_lanta(prompt_word, characters):
    character_descriptions = "\n".join(
        [f"- **{name} ({info['age']} ans)** : {info['description']}" for name, info in characters.items()]
    )

    return generate_story(f"""
        Tu es un auteur talentueux, et ton rôle est de créer une histoire captivante d'une aventure dans l'univers de Koh-Lanta.
        L'histoire doit comporter environ {prompt_word} mots, détaillant tous les aspects de l'aventure : les épreuves physiques et mentales,
        les relations entre les candidats, la survie dans la nature, et les différents retournements de situation. Tu dois raconter
        l'histoire comme si tu étais l'auteur de cette aventure, donnant à chaque personnage une personnalité distincte et explorant 
        les dynamiques qui se créent entre eux.

        Les personnages principaux sont :
        {character_descriptions}

        L'histoire se déroulera sur plusieurs jours, où chaque jour, tu dépeindras :
        - Les épreuves physiques et mentales auxquelles les candidats font face.
        - Les relations qui se tissent entre les personnages principaux (alliances, rivalités, conflits, etc.).
        - Les moments de survie, où les personnages doivent travailler ensemble pour trouver de la nourriture, construire un abri, etc.
        - Les moments de tension et de complot, où certains candidats cherchent à manipuler ou à trahir les autres.
        - Les plot twists potentiels : des alliances qui se brisent, des retournements de situation dans les épreuves, des découvertes 
        surprenantes sur le camp ou les personnalités des candidats.

        L'histoire doit être immersive et détaillée, chaque personnage ayant des hauts et des bas qui influencent l'évolution de l'aventure.
        Sois créatif et n'hésite pas à ajouter des éléments inattendus pour rendre l'intrigue encore plus palpitante.
        """)        
    

def generate_casa_de_papel(prompt_word, characters):
    character_descriptions = "\n".join(
        [f"- **{name} ({info['age']} ans)** : {info['description']}" for name, info in characters.items()]
    )

    return generate_story(f"""
        Tu es un auteur de thriller et d'action, et ton rôle est de créer une histoire captivante dans l'univers de La Casa de Papel.
        L'histoire doit comporter environ {prompt_word} mots, détaillant un braquage d'une ampleur jamais vue, avec des retournements de situation,
        des relations complexes entre les personnages, et des moments de tension intense. Chaque personnage doit avoir une personnalité
        distincte qui influence le déroulement de l'intrigue, et tu dois explorer les dynamiques qui se créent entre eux au fur et à mesure
        de l'aventure.

        Les personnages principaux sont :
        {character_descriptions}

        L'histoire se déroule sur plusieurs jours, durant lesquels l'équipe met en place et réalise un braquage audacieux dans un endroit
        hautement sécurisé. Chaque jour, tu dépeindras :

        - **La préparation du braquage** : L'élaboration du plan, les tensions entre les membres de l'équipe, et les obstacles imprévus qui se dressent
        sur leur chemin. Les personnages devront surmonter des défis personnels et des conflits internes tout en préparant le braquage.
        
        - **L'exécution du braquage** : Les différents aspects de l'attaque, y compris les confrontations avec les forces de sécurité, les imprévus,
        et les moments de frayeur. Les personnages devront travailler ensemble pour faire face à des obstacles physiques et mentaux.
        
        - **Les relations entre les membres de l'équipe** : Alliances qui se forment, trahisons, rivalités, et moments de complicité qui renforcent ou
        fragilisent l'équipe. Les relations sont mises à l'épreuve tout au long de l'opération, et chaque personnage devra affronter ses propres
        démons.
        
        - **Les plot twists** : Des retournements de situation qui bouleversent l'issue du braquage. Peut-être qu'un membre de l'équipe trahit les autres,
        un élément du plan échoue de manière spectaculaire, ou des révélations sur les intentions des personnages sont faites au dernier moment.
        Ces twists doivent maintenir l'intrigue haletante et pleine de suspense.
        
        L'histoire doit être immersive et pleine de suspense, chaque personnage ayant des hauts et des bas qui influencent l'évolution du braquage.
        Sois créatif et n'hésite pas à ajouter des éléments inattendus pour rendre l'intrigue encore plus palpitante. Les émotions, les conflits,
        et les décisions morales des personnages doivent être au cœur de l'intrigue.
        """)    

def generate_squid_game(prompt_word, characters):
    character_descriptions = "\n".join(
        [f"- **{name} ({info['age']} ans)** : {info['description']}" for name, info in characters.items()]
    )

    return generate_story(f"""
        Tu es un auteur de suspense et de drame, et ton rôle est de créer une nouvelle émission dans l'univers de Squid Game.
        L'histoire doit comporter environ {prompt_word} mots, détaillant des jeux inédits, des retournements de situation choquants,
        des alliances inattendues, des trahisons, et des moments de tension insoutenables. Les personnages doivent avoir des personnalités
        distinctes qui influencent l'évolution des événements. Tu devras décrire en détail les jeux auxquels les participants sont confrontés,
        les relations entre les personnages et les multiples retournements de situation qui surviennent au fur et à mesure de l'aventure.

        Les personnages principaux sont :
        {character_descriptions}

        L'histoire se déroule sur plusieurs jours, et chaque jour, tu dépeindras les événements suivants :
        
        - **Les jeux** : Des jeux inédits et dangereux dans le style de Squid Game. Chaque épreuve sera un défi de survie, alliant stratégie, chance, 
          et parfois des choix moraux difficiles. Certains jeux auront des règles étranges, des surprises inattendues ou des mécaniques qui mettent
          en question les capacités physiques ou mentales des participants. 
          
        - **Les relations entre les participants** : Des alliances qui se forment, des rivalités qui se développent, des trahisons qui secouent le jeu.
          Certains personnages tenteront de manipuler les autres, tandis que d'autres chercheront à faire équipe pour survivre ensemble. Les émotions
          et les relations évoluent de manière imprévisible au fur et à mesure des éliminations.

        - **La survie psychologique et émotionnelle** : Les participants sont poussés à leurs limites, à la fois mentalement et physiquement. Certains
          d'entre eux devront surmonter des dilemmes moraux ou faire face à des événements traumatisants.

        - **Les plot twists** : Des retournements de situation qui bouleversent le cours du jeu. Un participant pourrait révéler un secret choquant sur
          son passé, un jeu pourrait soudainement changer de règles, un membre de l'organisation pourrait se retourner contre les autres. Ces twists
          garderont l'histoire pleine de suspense et imprévisible, chaque décision influençant le déroulement des événements.

        L'histoire doit être pleine de suspense, avec des moments où l'incertitude et la tension sont palpables. Chaque personnage aura ses propres
        motivations et faiblesses, et ces éléments influenceront la manière dont l'intrigue se développe. Sois créatif et n'hésite pas à ajouter
        des éléments surprenants pour rendre l'émission encore plus captivante. Les enjeux moraux, les dilemmes personnels et les dynamiques
        entre les participants doivent être au cœur de l'intrigue.
    """)     
            



# Exemple d'utilisation :
characters = {
    "Léo": {"age": 20, "description": "Pas très sportif, mais intelligent et stratège."},
    "Sarah": {"age": 22, "description": "Très douée dans les épreuves, mais colérique."},
    "Lorenzo": {"age": 18, "description": "Très fort physiquement, mais désintéressé du jeu."}
}

story_casa = generate_squid_game("10000", characters)

print(story_casa)
