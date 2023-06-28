var capitale;
var score = 0;

function validerCapitale() {
    var userInput = document.getElementById("inputText").value;


    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            /*fonction fléchée pour trouver le pays correspondant au nom 
            (étant donné que le nom et la capitale sont au même niveau dans le fichier JSON) */
            capitale = data.pays.find(pays => pays.nom === NomPaysAleatoire).capitale;

            // on fait la vérification dans le fetch pour que les données soient bien chargées
            if (userInput === capitale) {
                document.getElementById("messageContainer").innerHTML = "Réponse correcte!";
                score++;
                if (score == 1) {
                    document.getElementById("score").innerHTML = score + " bonne réponse";
                } else {
                    document.getElementById("score").innerHTML = score + " bonnes réponses";
                }
                var listeReponses = document.getElementById("listeReponses");
                var reponseExistante = Array.from(listeReponses.getElementsByTagName("li")).find(function (item) {
                    return item.innerText === (NomPaysAleatoire + " - " + capitale);
                });

                if (!reponseExistante) {
                    var reponseElement = document.createElement("li");
                    reponseElement.innerText = NomPaysAleatoire + " - " + capitale;

                    listeReponses.appendChild(reponseElement);
                }
                document.getElementById("NomDuPays").style.transform = "";
                document.getElementById("inputText").style.transform = "";
                recupPays();
            } else {
                document.getElementById("messageContainer").innerHTML = "Réponse incorrecte!";
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

