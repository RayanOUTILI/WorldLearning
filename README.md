# WorlDLEarning 

Ce projet est un site web proposant de nombreux mini-jeux basés sur les pays du monde. Chaque mode mettra à l'épreuve vos connaissances sur les capitales, drapeaux, populations, frontières et formes des pays !

![image](https://github.com/RayanOUTILI/countries-project/assets/59539437/fa92a321-7109-469d-956b-4a0f5555e9a9)
 
## Motivation 
J'ai réalisé ce projet pour renforcer mes connaissances en JavaScript, et évidemment sur les pays du monde. Le but étant qu'un maximum de personnes puissent passer du bon temps sur un jeu "noble" intellectuellement parlant.

## Avant de commencer 

### Avertissement 
Les informations sur les pays utilisées dans ce jeu sont basées sur des sources publiques et peuvent contenir des erreurs ou des inexactitudes. 

### Objectivité
Je tiens par ailleurs insister sur le fait que je ne prends aucune prise de partie en ce qui concerne les éventuels conflits géopolitiques qui peuvent concerner certains pays ou territoires présents dans ce jeu.

## Fonctionnalités

* **Capitales** Devinez les capitales du monde (plusieurs niveaux de difficulté).
* **Drapeaux** : Devinez les drapeaux du monde (plusieurs niveaux de difficulté).
* **Habitants** : Choisissez le pays avec la population la plus élevée parmi deux pays.
* **Pays limitrophes** : Devinez les pays frontaliers d'un pays tiré aléatoirement.
* **Territoire** : Devinez le nom du pays à partir de la forme de celui-ci.
* **A venir**...

## Aspects techniques 
* **Stockage des données** : J'ai utilisé un fichier JSON pour stocker les informations relatives à chaque pays (nom, la capitale, la monnaie, la langue, la population...).
Les statistiques et informations ont été récupérées sur des sites d'organismes nationaux de statistiques et peuvent ne pas être à jour.

* **Récupération des drapeaux** : La récupération des drapeaux consitue le cœur du jeu. Il m'a été difficile de trouver un moyen pour les récupérer pour deux raisons principales : le fait que le site soit statique pose certaines contraintes, le fait également que cela aurait été fastidieux de récupérer les drapeaux un par un par pour chaque pays du globe. C'est pourquoi, après quelques recherches j'ai trouvé une banque d'images avec un lien se répétant : https://img.geonames.org/flags/x/ Ce lien étant suivi du codes ISO 3166-1 alpha-2 du pays. Il a donc fallu récupérer ce code pour chaque pays dans une table de correspondance pour ainsi faire une requête avec le lien complet.
  
* **Niveaux de difficultés** : Il est difficile d'estimer objectivement la difficulté d'un pays.
Pour ce faire, j'ai pris en compte quelques critères : la **population**, la **superficie** et le **PIB**.
Attention, je suis conscient que cette évaluation peut ne pas être très fiable et nécessite des améliorations ultérieures.
```function getDifficulty(country) {
    var totalDifficulty = 1;
    if (country.habitants > 10000000) {
        totalDifficulty -= 1;
    }
    else {
        totalDifficulty += 1;
    }
    if (country.superficie > 500000) {
        totalDifficulty -= 1;
    }
    else {
        totalDifficulty += 1;
    }
    if (country.pib > 5000000) {
        totalDifficulty -= 1;
    } else {
        totalDifficulty += 1;
    }
    // Limiter la difficulté entre 1 et 3
    totalDifficulty = Math.min(Math.max(totalDifficulty, 1), 3);
    return totalDifficulty;
}
```

* **Marge d'erreur** :
1. Pour éviter les fausses mauvaises réponses dues à des erreurs syntaxiques, j'ai mis en place une méthode de comparaison. Cette méthode utilise des expressions régulières pour supprimer les accents, les espaces, les apostrophes et les tirets, et met tout en minuscule, c'est une méthode de *normalisation*, en somme.
Cela permet d'obtenir une correspondance plus juste entre les réponses fournies par les joueurs et les réponses attendues.
De ce fait, Etat-Unis peut s'écrire etat unis.
```
function BonneReponse(RepJoueur, RepAttendue) {
    RepJoueur = RepJoueur.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f\s'-]/g, "");
    RepAttendue = RepAttendue.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f\s'-]/g, "");
    var similarity = calculateJaroWinklerSimilarity(RepJoueur, RepAttendue);
    var threshold = 0.8; // 20% de marge d'erreur
    return similarity >= threshold;
}
```

3. Pour rendre le jeu encore plus flexible et permettre une plus grande tolérance aux erreurs, j'ai mis en place une marge d'erreur de 20% lors de la comparaison des réponses fournies par les joueurs avec les réponses attendues.
Cet algorithme se base sur la méthode de similarité de [Jaro-Winkler]([https://example.com](https://fr.wikipedia.org/wiki/Distance_de_Jaro-Winkler)) ce qui permet d'appliquer une marge d'erreur de 20% qui est, je pense, un seuil acceptable.
```
function calculateJaroWinklerSimilarity(a, b) {
    var matchingChars = 0;
    var transpositions = 0;

    var maxLength = Math.max(a.length, b.length);
    var matchDistance = Math.floor(maxLength / 2) - 1;

    for (var i = 0; i < a.length; i++) {
        var start = Math.max(0, i - matchDistance);
        var end = Math.min(i + matchDistance + 1, b.length);

        for (var j = start; j < end; j++) {
            if (b.charAt(j) === a.charAt(i)) {
                matchingChars++;
                if (i !== j) {
                    transpositions++;
                }
                break;
            }
        }
    }
    if (matchingChars === 0) {
        return 0;
    }
    var jaroSimilarity = (matchingChars / a.length + matchingChars / b.length + (matchingChars - transpositions / 2) / matchingChars) / 3;
    return jaroSimilarity;
}
```

  
## Informations clés
Ce projet utilise des ressources tierces, telles que des images provenant de banques d'images ou des banques mondiales

## Contact
Pour toutes questions, suggestions ou corrections de bugs, veuillez s'il vous plaît me le signaler.

## Comment Jouer ?
Le site est assez intuitif, suivez ce lien et amusez-vous ! 
https://rayanoutili.github.io/countries-project/
