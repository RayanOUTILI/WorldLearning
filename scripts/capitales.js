var capitale;


function afficherCapitale(NomPaysAleatoire) {
    document.getElementById('inputText').value = "";
    document.getElementById('inputText').placeholder = "Quelle est la capitale de " + NomPaysAleatoire + "?";
    document.getElementById("NomDuPays").innerHTML = NomPaysAleatoire;
}

function validerCapitale() {
    var userInput = document.getElementById("inputText").value;


    fetch('../data/data.json')
        .then(response => response.json())
        .then(data => {
            /*fonction fléchée pour trouver le pays correspondant au nom 
            (étant donné que le nom et la capitale sont au même niveau dans le fichier JSON) */
            capitale = data.pays.find(pays => pays.nom === NomPaysAleatoire).capitale;

            // on fait la vérification dans le fetch pour que les données soient bien chargées
            if (BonneReponse(userInput, capitale)) {
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
                    return item.innerText === (NomPaysAleatoire + " - " + capitale);
                });

                if (!reponseExistante) {
                    var reponseElement = document.createElement("li");
                    reponseElement.innerText = NomPaysAleatoire + " - " + capitale;

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

function passerCapitale(){
    document.getElementById("messageContainer").innerHTML = "La capitale de " + PaysAleatoire.nom  + " était " + PaysAleatoire.capitale + " ! ";
        document.getElementById("messageContainer").style.color = "red";
        //on supprime en cas de mauvaise réponse 
        document.getElementById("listeReponses").innerHTML = "";
        document.getElementById("inputText").value = "";
        score = 0;
        document.getElementById("score").innerHTML = score + " bonne réponse";
        paysAleatoire(selectedNiveau);
        cacherIndice();
}

// function autocomplete() {
//     const input = document.getElementById("inputText");
//     const ulresults = document.getElementById("listeReponses");

//     input.addEventListener('input', function() {
//         ulresults.innerHTML = "";
//         const value = this.value;
//         if (!value) {
//             return;
//         }

//         // on fait matcher avec les donnes du fichier JSON
//         const matches = capitale.filter(capitale => capitale.toLowerCase().includes(value.toLowerCase()));

//         if (matches.length === 0) {
//             return;
//         }

//         for (var i = 0; i < matches.length; ++i) {
//             const li = document.createElement('li');
//             li.innerText = matches[i];
//             li.innerText = li.innerText.replace(/_/g, " ");
//             li.addEventListener('click', function() {
//                 input.value = this.innerText;
//                 ulresults.innerHTML = "";
//             });
//             ulresults.appendChild(li);

//         }

//     });
// }
// autocomplete();