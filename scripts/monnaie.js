var monnaie;

function afficherMonnaie(NomPaysAleatoire) {
    document.getElementById('inputText').value = "";
    document.getElementById('inputText').placeholder = "Quelle est la monnaie de " + NomPaysAleatoire + "?";
    document.getElementById("NomDuPays").innerHTML = NomPaysAleatoire;
}

function validerMonnaie() {
    var userInput = document.getElementById("inputText").value;

    fetch('../data/data.json')
        .then(response => response.json())
        .then(data => {
            monnaie = data.pays.find(pays => pays.nom === NomPaysAleatoire).monnaie;

            // on fait la vérification dans le fetch pour que les données soient bien chargées
            // si bonne reponse ou que le premier mot est égal au premier mot de la bonne reponse (ex couronne danoise, couronne suffit)
            if (BonneReponse(userInput, monnaie) || userInput.toLowerCase().split(" ")[0] === monnaie.toLowerCase().split(" ")[0]) {
                document.getElementById("messageContainer").innerHTML = "Réponse correcte !";
                document.getElementById("messageContainer").style.color = "yellowgreen";
                score++;
                if (score == 1) {
                    document.getElementById("score").innerHTML = score + " bonne réponse";
                } else {
                    document.getElementById("score").innerHTML = score + " bonnes réponses";
                }
                var listeReponses = document.getElementById("listeReponses");
                var reponseExistante = Array.from(listeReponses.getElementsByTagName("li")).find(function (item) {
                    return item.innerText === (NomPaysAleatoire + " - " + monnaie);
                });

                if (!reponseExistante) {
                    var reponseElement = document.createElement("li");
                    reponseElement.innerText = NomPaysAleatoire + " - " + monnaie;

                    listeReponses.appendChild(reponseElement);
                }
                document.getElementById("NomDuPays").style.transform = "";
                document.getElementById("inputText").style.transform = "";
                paysAleatoire(selectedNiveau);
                cacherIndice();
            } else {
                document.getElementById("messageContainer").innerHTML = "Réponse incorrecte!";
                document.getElementById("messageContainer").style.color = "red";
                //on supprime en cas de mauvaise réponse 
                document.getElementById("listeReponses").innerHTML = "";
                score = 0;
                document.getElementById("score").innerHTML = score + " bonne réponse";
            }
        })
        .catch(error => {
            console.log('Une erreur s\'est produite :', error.message);
        });
}

function passerMonnaie() {
    document.getElementById("messageContainer").innerHTML = "La monnaie de " + PaysAleatoire.nom + " est " + PaysAleatoire.monnaie + " ! ";
    document.getElementById("messageContainer").style.color = "red";
    //on supprime en cas de mauvaise réponse 
    document.getElementById("listeReponses").innerHTML = "";
    document.getElementById("inputText").value = "";
    score = 0;
    document.getElementById("score").innerHTML = score + " bonne réponse";
    paysAleatoire(selectedNiveau);
    cacherIndice();
}

