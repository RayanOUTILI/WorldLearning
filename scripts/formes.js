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

function passerTerritoire(){
    document.getElementById("messageContainer").innerHTML = "Vous n'avez pas la réponse ! C'était " + NomPaysAleatoire + " ! ";
        //on supprime en cas de mauvaise réponse 
        document.getElementById("listeReponses").innerHTML = "";
        document.getElementById("inputText").value = "";
        score = 0;
        document.getElementById("score").innerHTML = score + " bonne réponse";
        paysAleatoire(selectedNiveau);
}