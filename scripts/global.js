var score = 0;
var PaysAleatoire;
var NomPaysAleatoire;
var selectedNiveau;

function paysAleatoire(niveau) {
    fetch('../data/data.json')
        .then(response => response.json())
        .then(data => {
            selectedNiveau = niveau;
            var i = Math.floor(Math.random() * data.pays.length);
            PaysAleatoire = data.pays[i];// objet pays

            // on vérifie que le pays a la bonne difficulté
            while (getDifficulty(PaysAleatoire) !== niveau) {
                console.log("ici essai niveau");
                var i = Math.floor(Math.random() * data.pays.length);
                PaysAleatoire = data.pays[i];
            }
            console.log(getDifficulty(PaysAleatoire));

            NomPaysAleatoire = PaysAleatoire.nom;

            console.log(NomPaysAleatoire)
            console.log(PaysAleatoire.capitale);

            if (document.body.id === "capitales") {
                afficherCapitale(NomPaysAleatoire);
            }

            if (document.body.id === "drapeaux") {
                generateFlagUrl(NomPaysAleatoire);
            }

            if (document.body.id == "frontieres") {
                // si le pays n'a pas de pays frontaliers on le retire
                while (PaysAleatoire.pays_frontaliers.length == 0) {
                    paysAleatoire(1);
                }

                console.log(PaysAleatoire.pays_frontaliers);

                tabPaysFrontaliers = PaysAleatoire.pays_frontaliers;

                generateFlagUrl(NomPaysAleatoire);

                afficherFrontiere(NomPaysAleatoire);
            }

            if (document.body.id == "formes") {
                generateShapeUrl(NomPaysAleatoire);
            }

        })
        .catch(error => {
            console.log('Une erreur s\'est produite :', error.message);
        });
}

// Le but de la méthode c'est d'éviter les fausses mauvaises réponses si on oublie un accent par exemple
// utilise les expressions régulières pour supprimer les accents, les espaces, les apostrophes et les tirets et mettre tout en minuscule
function BonneReponse(RepJoueur, RepAttendue) {
    RepJoueur = RepJoueur.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f\s'-]/g, "");
    RepAttendue = RepAttendue.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f\s'-]/g, "");
    var similarity = calculateJaroWinklerSimilarity(RepJoueur, RepAttendue);
    var threshold = 0.8; // 20% de marge d'erreur
    return similarity >= threshold;
}

// fait par chatGPT pour permettre d'avoir une marge d'erreur (~autocorrection)
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

// fonction qui compte le nombre de pays dans ./data/data.json 
function compterPays() {
    fetch('../data/data.json')
        .then(response => response.json())
        .then(data => {
            var nbPays = data.pays.length;
            console.log(nbPays);
        })
        .catch(error => {
            console.log('Une erreur s\'est produite :', error.message);
        });
}

//méthode getDifficulty - basée sur des critères (très subjectifs), il se peut que ce ne soit pas très fiable
//donne quand même + ou - une idée et permet de trier les pays par difficulté (à améliorer par la suite)
function getDifficulty(country) {
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


// function compterPaysParNiveau(niveau) {
//     fetch('../data/data.json')
//         .then(response => response.json())
//         .then(data => {
//             var nbPays = 0;
//             for (var i = 0; i < data.pays.length; i++) {
//                 if (getDifficulty(data.pays[i]) == niveau) {
//                     nbPays++;
//                 }
//             }
//             console.log(nbPays);
//         })
//         .catch(error => {
//             console.log('Une erreur s\'est produite :', error.message);
//         });
// }

// compterPaysParNiveau(1); //46
// compterPaysParNiveau(2); //52 
// compterPaysParNiveau(3); //149


// fonction qui donne le continent du pays lorsque bouton donnerIndice est cliqué
function donnerIndiceContinent() {
    fetch('../data/data.json')
        .then(response => response.json())
        .then(data => {
            var continent = "";
            data.pays.forEach(element => {
                if (element.nom === NomPaysAleatoire) {
                    continent = element.continent;
                }
            });

            document.getElementById("messageContainer").innerHTML = "Ce pays se trouve en " + continent + " !";
        });
}

function donnerIndiceHabitants() {
    fetch('../data/data.json')
        .then(response => response.json())
        .then(data => {
            var habitants = "";
            data.pays.forEach(element => {
                if (element.nom === NomPaysAleatoire) {
                    habitants = element.habitants;
                }
            });
            habitants = habitants.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            document.getElementById("messageContainer").innerHTML = "Ce pays contient " + habitants + " habitants !";
        });
}

function donnerIndicePaysFrontaliers() {
    fetch('../data/data.json')
        .then(response => response.json())
        .then(data => {
            var tabPaysFrontaliers = [];
            data.pays.forEach(element => {
                if (element.nom === NomPaysAleatoire) {
                    tabPaysFrontaliers = element.pays_frontaliers;
                }
            });
            if (tabPaysFrontaliers.length == 0) {
                document.getElementById("messageContainer").textContent = "Ce pays n'a pas de pays frontaliers !";
            }
            else {
                document.getElementById("messageContainer").textContent = "Un pays frontalier " + tabPaysFrontaliers[0] + " !";
            }
        });
}

//fonction qui va afficher la premiere lettre de la capitale
function donnerIndiceCapitale() {
    var capitale = PaysAleatoire.capitale;
    var premiereLettre = capitale.charAt(0);
    document.getElementById("messageContainer").innerHTML = "La première lettre de la capitale est " + premiereLettre + " !";
}

function afficherIndice() {
    var elements = document.getElementsByClassName("btn");
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = "block";
    }
}

function cacherIndice() {
    var elements = document.getElementsByClassName("indice");
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = "none";
    }

}

