// https://staging.teuteuf-assets.pages.dev/data/worldle/countries/fr/vector.svg !!!!

function generateShapeUrl(NomPaysAleatoire) {
    var shapeUrl = "https://staging.teuteuf-assets.pages.dev/data/worldle/countries/" + getCodeAlpha2(NomPaysAleatoire).toLowerCase() + "/vector.svg";
    console.log(shapeUrl);
    document.getElementById("formeImage").src = shapeUrl;
}

function validerTerritoire() {
    var RepShape = document.getElementById("inputText").value;

    if (BonneReponse(RepShape, NomPaysAleatoire)) {
        document.getElementById("messageContainer").innerHTML = "Réponse correcte!";
        score++;
        if (score == 1) {
            document.getElementById("score").innerHTML = score + " bonne réponse";
        }
        else {
            document.getElementById("score").innerHTML = score + " bonnes réponses";
        }
        var listeReponses = document.getElementById("listeReponses");
        document.getElementById("inputText").value = "";
        var reponseExistante = Array.from(listeReponses.getElementsByTagName("li")).find(function (item) {
            return item.innerText === (NomPaysAleatoire);
        }
        );

        if (!reponseExistante) {
            var reponseElement = document.createElement("li");
            reponseElement.innerText = NomPaysAleatoire;

            listeReponses.appendChild(reponseElement);
        }
        document.getElementById("inputText").style.transform = "";
        paysAleatoire(selectedNiveau);

    }
    else {
        document.getElementById("messageContainer").innerHTML = "Réponse incorrecte!";
        document.getElementById("listeReponses").innerHTML = "";
        document.getElementById("inputText").value = "";
        score = 0;
        document.getElementById("score").innerHTML = score + " bonne réponse";
    }
}

function passerTerritoire() {
    document.getElementById("messageContainer").innerHTML = "Vous n'avez pas la réponse ! C'était " + NomPaysAleatoire + " ! ";
    //on supprime en cas de mauvaise réponse 
    document.getElementById("listeReponses").innerHTML = "";
    document.getElementById("inputText").value = "";
    score = 0;
    document.getElementById("score").innerHTML = score + " bonne réponse";
    paysAleatoire(selectedNiveau);
}

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

function donnerIndiceHabitants(){
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

function donnerIndicePaysFrontaliers(){
    fetch('../data/data.json')
        .then(response => response.json())
        .then(data => {
            var tabPaysFrontaliers = [];
            data.pays.forEach(element => {
                if (element.nom === NomPaysAleatoire) {
                    tabPaysFrontaliers = element.pays_frontaliers;
                }
            });
            
            document.getElementById("messageContainer").textContent = "Voici un pays frontalier " + tabPaysFrontaliers[0] + " !";
        });
}

function afficherIndice(){
    var elements = document.getElementsByClassName("btn");
    for (var i = 0; i < elements.length; i++) {
      elements[i].style.display = "block";
    }    
}