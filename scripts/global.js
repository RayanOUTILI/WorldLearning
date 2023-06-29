var score = 0;
var PaysAleatoire;
var NomPaysAleatoire;

function paysAleatoire() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            var i = Math.floor(Math.random() * data.pays.length);

            // objet pays
            PaysAleatoire = data.pays[i];

            NomPaysAleatoire = PaysAleatoire.nom;

            console.log(NomPaysAleatoire)
            console.log(PaysAleatoire.capitale);

            if (document.body.id === "capitales") {
                afficherCapitale(NomPaysAleatoire);
            }

            if (document.body.id === "drapeaux") {
                generateFlagUrl(NomPaysAleatoire);
            }

        })
        .catch(error => {
            console.log('Une erreur s\'est produite :', error.message);
        });
}
