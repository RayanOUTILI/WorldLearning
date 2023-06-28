var PaysAleatoire;
var NomPaysAleatoire;

function recupPays() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            var i = Math.floor(Math.random() * data.pays.length);

            // objet pays
            PaysAleatoire = data.pays[i];

            NomPaysAleatoire = PaysAleatoire.nom;

            console.log(PaysAleatoire.capitale);

            document.getElementById('inputText').value = "";
            document.getElementById('inputText').placeholder = "Quelle est la capitale de " + NomPaysAleatoire + "?";
            document.getElementById("NomDuPays").innerHTML = NomPaysAleatoire;
        })
        .catch(error => {
            console.log('Une erreur s\'est produite :', error.message);
        });
}

