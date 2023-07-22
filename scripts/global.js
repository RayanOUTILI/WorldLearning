var score = 0;
var PaysAleatoire;
var NomPaysAleatoire;
var selectedNiveau;

function paysAleatoire(niveau, mode = "pas de multi") { /*2eme param par défaut (inutile sauf pour 1v1) */
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

            if (document.body.id === "capitales") { //|| mode === "capitales"
                afficherCapitale(NomPaysAleatoire);
            }

            if (document.body.id === "drapeaux") { // || mode === "drapeaux"
                generateFlagUrl(NomPaysAleatoire);
            }

            if (document.body.id == "frontieres") { //  || mode === "frontieres"
                // si le pays n'a pas de pays frontaliers on le retire
                if (PaysAleatoire.pays_frontaliers.length == 0) {
                    paysAleatoire(1);
                }

                console.log(PaysAleatoire.pays_frontaliers);

                tabPaysFrontaliers = PaysAleatoire.pays_frontaliers;

                generateFlagUrl(NomPaysAleatoire);

                afficherFrontiere(NomPaysAleatoire);
            }

            if (document.body.id == "formes") { //  || mode === "formes"
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
    var threshold = 0.85; // 15% de marge d'erreur
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

//méthode getDifficulty - basée sur des critères (très subjectifs), il se peut que ce ne soit pas très fiable
//donne quand même + ou - une idée et permet de trier les pays par difficulté (à améliorer par la suite)
function getDifficulty(countryName) {
    const correspondance = {
        'Afghanistan': 2,
        'Afrique du Sud': 2,
        'Akrotiri': 2,
        'Albanie': 1,
        'Algérie': 1,
        'Allemagne': 1,
        'Andorre': 2,
        'Angola': 2,
        'Anguilla': 2,
        'Antarctique': 3,
        'Antigua-et-Barbuda': 3,
        'Antilles néerlandaises': 3,
        'Arabie saoudite': 2,
        'Arctique': 3,
        'Argentine': 1,
        'Arménie': 2,
        'Aruba': 3,
        'Ashmore and Cartier Islands': 3,
        'Atoll de Johnston': 3,
        'Atoll de Palmyra': 3,
        'Australie': 1,
        'Autriche': 1,
        'Azerbaïdjan': 2,
        'Bahamas': 2,
        'Bahreïn': 2,
        'Bangladesh': 2,
        'Barbade': 3,
        'Belgique': 1,
        'Belize': 3,
        'Bénin': 2,
        'Bermudes': 2,
        'Bhoutan': 2,
        'Biélorussie': 2,
        'Birmanie': 2,
        'Bolivie': 2,
        'Bosnie-Herzégovine': 2,
        'Botswana': 2,
        'Brésil': 1,
        'Brunei': 2,
        'Bulgarie': 1,
        'Burkina Faso': 2,
        'Burundi': 3,
        'Cambodge': 2,
        'Cameroun': 1,
        'Canada': 1,
        'Cap-Vert': 2,
        'Chili': 2,
        'Chine': 1,
        'Chypre': 1,
        'Colombie': 2,
        'Comores': 2,
        'Congo-Brazzaville': 2,
        'Congo-Kinshasa': 2,
        'Corée du Nord': 2,
        'Corée du Sud': 1,
        'Costa Rica': 2,
        'Côte d\'Ivoire': 2,
        'Croatie': 2,
        'Cuba': 2,
        'Curaçao': 2,
        'Danemark': 1,
        'Dhekelia': 2,
        'Djibouti': 2,
        'Dominique': 2,
        'Égypte': 2,
        'Émirats arabes unis': 2,
        'Équateur': 2,
        'Érythrée': 2,
        'Espagne': 1,
        'Eswatini': 3,
        'États-Unis': 1,
        'Éthiopie': 2,
        'Falkland Islands': 3,
        'Fidji': 2,
        'Finlande': 1,
        'France': 1,
        'Gabon': 2,
        'Gambie': 2,
        'Gaza Strip': 3,
        'Géorgie': 2,
        'Ghana': 2,
        'Gibraltar': 3,
        'Grèce': 1,
        'Grenade': 3,
        'Groenland': 3,
        'Guadeloupe': 2,
        'Guam': 3,
        'Guatemala': 2,
        'Guernesey': 3,
        'Guinée': 2,
        'Guinée équatoriale': 3,
        'Guinée-Bissau': 3,
        'Guyana': 2,
        'Haïti': 2,
        'Honduras': 2,
        'Hong Kong': 2,
        'Hongrie': 1,
        'Île Bouvet': 3,
        'Île Christmas': 3,
        'Île Clipperton': 3,
        'Île de Man': 3,
        'Île Europa': 3,
        'Île Heard et îles McDonald': 3,
        'Île Jan Mayen': 3,
        'Île Juan de Nova': 3,
        'Île Norfolk': 3,
        'Île Tromelin': 3,
        'Îles Ashmore et Cartier': 3,
        'Îles Caïmans': 3,
        'Îles Cocos': 3,
        'Îles Cook': 3,
        'Îles de la mer de Corail': 3,
        'Îles Féroé': 3,
        'Îles Glorieuses': 3,
        'Îles Malouines': 3,
        'Îles Mariannes du Nord': 3,
        'Îles Marshall': 3,
        'Îles Pitcairn': 3,
        'Îles Salomon': 3,
        'Îles Sandwich du Sud': 3,
        'Îles Spratly': 3,
        'Îles Turques-et-Caïques': 3,
        'Îles Vierges américaines': 3,
        'Îles Vierges britanniques': 3,
        'Inde': 1,
        'Indonésie': 2,
        'Iran': 2,
        'Iraq': 2,
        'Irlande': 2,
        'Islande': 2,
        'Israël': 2,
        'Italie': 1,
        'Jamaïque': 2,
        'Japon': 1,
        'Jersey': 2,
        'Jordanie': 2,
        'Kazakhstan': 2,
        'Kenya': 2,
        'Kirghizistan': 2,
        'Kiribati': 3,
        'Koweït': 2,
        'Laos': 2,
        'Lesotho': 2,
        'Lettonie': 1,
        'Liban': 2,
        'Libéria': 2,
        'Libye': 2,
        'Liechtenstein': 3,
        'Lituanie': 1,
        'Luxembourg': 1,
        'Macao': 3,
        'Madagascar': 2,
        'Malaisie': 2,
        'Malawi': 3,
        'Maldives': 3,
        'Mali': 2,
        'Malte': 2,
        'Maroc': 1,
        'Martinique': 2,
        'Maurice': 2,
        'Mauritanie': 2,
        'Mayotte': 2,
        'Mexique': 2,
        'Micronésie': 2,
        'Moldavie': 2,
        'Monaco': 1,
        'Mongolie': 2,
        'Monténégro': 2,
        'Montserrat': 2,
        'Mozambique': 2,
        'Namibie': 2,
        'Nauru': 2,
        'Navassa Island': 3,
        'Népal': 2,
        'Nicaragua': 3,
        'Niger': 2,
        'Nigeria': 2,
        'Nioué': 2,
        'Norvège': 1,
        'Nouvelle-Calédonie': 2,
        'Nouvelle-Zélande': 2,
        'Oman': 2,
        'Ouganda': 2,
        'Ouzbékistan': 2,
        'Pakistan': 2,
        'Palaos': 2,
        'Panama': 2,
        'Papouasie-Nouvelle-Guinée': 3,
        'Paraguay': 2,
        'Pays-Bas': 1,
        'Pérou': 2,
        'Philippines': 2,
        'Pologne': 1,
        'Polynésie française': 2,
        'Porto Rico': 2,
        'Portugal': 1,
        'Qatar': 2,
        'République centrafricaine': 2,
        'République dominicaine': 2,
        'République tchèque': 2,
        'Réunion': 2,
        'Roumanie': 1,
        'Royaume-Uni': 1,
        'Russie': 2,
        'Rwanda': 2,
        'Sahara occidental': 2,
        'Saint-Christophe-et-Niévès': 3,
        'Sainte-Hélène': 3,
        'Sainte-Lucie': 3,
        'Saint-Marin': 3,
        'Saint-Pierre-et-Miquelon': 3,
        'Saint-Vincent-et-les Grenadines': 3,
        'Salvador': 2,
        'Samoa': 3,
        'Samoa américaines': 3,
        'São Tomé-et-Príncipe': 3,
        'Sénégal': 2,
        'Serbie': 2,
        'Seychelles': 2,
        'Sierra Leone': 3,
        'Singapour': 2,
        'Slovaquie': 2,
        'Slovénie': 2,
        'Somalie': 2,
        'Soudan': 2,
        'Soudan du Sud': 2,
        'Sri Lanka': 2,
        'Suède': 1,
        'Suisse': 1,
        'Suriname': 3,
        'Svalbard': 3,
        'Syrie': 2,
        'Tadjikistan': 2,
        'Taïwan': 2,
        'Tanzanie': 3,
        'Tchad': 2,
        'Terres australes et antarctiques françaises': 3,
        'Territoire britannique de l\'océan Indien': 3,
        'Territoire des îles Cocos (Keeling)': 3,
        'Thaïlande': 2,
        'Timor oriental': 2,
        'Togo': 2,
        'Tokelau': 3,
        'Tonga': 2,
        'Trinité-et-Tobago': 2,
        'Tunisie': 1,
        'Turkménistan': 2,
        'Turquie': 2,
        'Tuvalu': 3,
        'Ukraine': 2,
        'Uruguay': 2,
        'Vanuatu': 2,
        'Vatican': 3,
        'Venezuela': 2,
        'Viêt Nam': 2,
        'Wallis-et-Futuna': 3,
        'Yémen': 2,
        'Zambie': 2,
        'Zimbabwe': 2,
    };

    // normalisation (testé sans --> marche aussi donc fac)
    const normalizedCountryName = countryName.nom.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f\s'-]/g, "");

    for (let pays in correspondance) {
        //idem
        const normalizedPays = pays.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f\s'-]/g, "");

        if (normalizedPays === normalizedCountryName) {
            return correspondance[pays];
        }
    }
}

//méthode getDifficulty - basée sur des critères (très subjectifs), il se peut que ce ne soit pas très fiable
//donne quand même + ou - une idée et permet de trier les pays par difficulté (à améliorer par la suite)
// function getDifficulty(country) {
//     var totalDifficulty = 1;

//     if (country.habitants > 10000000) {
//         totalDifficulty -= 1;
//     }
//     else {
//         totalDifficulty += 1;
//     }

//     if (country.superficie > 500000) {
//         totalDifficulty -= 1;
//     }
//     else {
//         totalDifficulty += 1;
//     }

//     if (country.pib > 5000000) {
//         totalDifficulty -= 1;
//     } else {
//         totalDifficulty += 1;
//     }

//     // Limiter la difficulté entre 1 et 3
//     totalDifficulty = Math.min(Math.max(totalDifficulty, 1), 3);

//     return totalDifficulty;
// }