var tabPaysFrontaliers = [];

function afficherFrontiere(NomPaysAleatoire){
    document.getElementById('inputText').value = "";
    if (tabPaysFrontaliers.length > 1) {
        document.getElementById('inputText').placeholder = "Quelle sont les pays frontaliers de " + NomPaysAleatoire + "?";
    }
    else {
        document.getElementById('inputText').placeholder = "Quelle est le pays frontalier de " + NomPaysAleatoire + "?";
    }
    document.getElementById("NomDuPays").innerHTML = NomPaysAleatoire;
}

function validerFrontiere() {
    userRep = document.getElementById("inputText").value;

    var correct = false;

    for (element of tabPaysFrontaliers){
        console.log(element);
        if(BonneReponse(userRep, element)){
            correct = true;
            console.log("correct ! ");
            tabPaysFrontaliers.splice(tabPaysFrontaliers.indexOf(element), 1); // on enlève l'élément trouvé du tableau
            if (tabPaysFrontaliers.length > 0) {
                document.getElementById('inputText').placeholder = "Quelle sont les pays frontaliers de " + NomPaysAleatoire + "?";
                document.getElementById('inputText').value = "";
                document.getElementById('messageContainer').textContent = "Réponse correcte ! Il reste " + tabPaysFrontaliers.length + " pays frontaliers à trouver !";
                score++;
                if (score == 1) {
                    document.getElementById("score").innerHTML = score + " bonne réponse";
                } else {
                    document.getElementById("score").innerHTML = score + " bonnes réponses";
                }
                var listeReponses = document.getElementById("listeReponses");
                var reponseExistante = Array.from(listeReponses.getElementsByTagName("li")).find(function (item) {
                    return item.innerText === (NomPaysAleatoire);
                });

                if (!reponseExistante) {
                    var reponseElement = document.createElement("li");
                    reponseElement.innerText = element;

                    listeReponses.appendChild(reponseElement);
                }
                document.getElementById("inputText").style.transform = "";
            }
            else if(tabPaysFrontaliers.length == 0){
                score++;
                document.getElementById("score").innerHTML = score + " bonnes réponses";
                document.getElementById('messageContainer').textContent = "Réponse correcte ! Vous avez trouvé tous les pays frontaliers bravo !";
                //on met un timer 
                score = 0;
                setTimeout(function () {
                    document.getElementById('messageContainer').textContent = "";
                    document.getElementById('inputText').value = "";
                    document.getElementById("listeReponses").innerHTML = "";
                    document.getElementById("score").innerHTML = score + " bonnes réponse";
                    paysAleatoire(1);
                }, 3000);

            }
        }
        else if (!correct) {
            document.getElementById("messageContainer").innerHTML = "Réponse incorrecte!";
        }
    }
}

function passerFrontiere(){
    if (tabPaysFrontaliers.length > 1){
        document.getElementById("messageContainer").innerHTML = "Vous avez abandonné ! Les pays frontaliers de " + NomPaysAleatoire + " étaient " + tabPaysFrontaliers + " ! ";
    }    
    else{
        document.getElementById("messageContainer").innerHTML = "Vous avez abandonné ! Le pays frontalier de " + NomPaysAleatoire + " était " + tabPaysFrontaliers + " ! ";
    }
    document.getElementById("listeReponses").innerHTML = "";
        document.getElementById("inputText").value = "";
        score = 0;
        document.getElementById("score").innerHTML = score + " bonne réponse";
        paysAleatoire(1);
}

// rajouter des indices en cas de difficultés (trop de mvaises rep) ?  nb lettre ? 1ere lettre du pays frontalier ? 
//"joker" à exemple soit avoir la superficie d'un pays frontalier soit le nb hab..