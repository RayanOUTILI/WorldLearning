var capitale;

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
                recupPays();
            } else {
                document.getElementById("messageContainer").innerHTML = "Réponse incorrecte!";
            }
        })
        .catch(error => {
            console.log('Une erreur s\'est produite :', error);
        });

}

