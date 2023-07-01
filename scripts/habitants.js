var PaysAleatoire1;
var PaysAleatoire2;

function DeuxPaysAleatoire() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {

            var i = Math.floor(Math.random() * data.pays.length);
            PaysAleatoire1 = data.pays[i];

            var i = Math.floor(Math.random() * data.pays.length);
            PaysAleatoire2 = data.pays[i];

            NomPaysAleatoire1 = PaysAleatoire1.nom;
            NomPaysAleatoire2 = PaysAleatoire2.nom;

            console.log(NomPaysAleatoire1)
            console.log(PaysAleatoire1.habitants);

            console.log(NomPaysAleatoire2)
            console.log(PaysAleatoire2.habitants);

            afficherCapitale(NomPaysAleatoire1, NomPaysAleatoire2)
        })
        .catch(error => {
            console.log('Une erreur s\'est produite :', error.message);
        });
}

function validerHabitants(nb) {

    var nbHabitants1 = PaysAleatoire1.habitants;
    var nbHabitants2 = PaysAleatoire2.habitants;

    var bonneRep = Math.max(nbHabitants1, nbHabitants2);
    if (nb == 1) {
        var userRep = nbHabitants1;
    }
    else {
        var userRep = nbHabitants2;
    }

    if (userRep == bonneRep) {
        console.log("Bonne réponse");
        document.getElementById('h2Text').textContent = "Bonne réponse !";
        document.getElementById('h2Text').style.color = "green";
        document.getElementById('h2Text').style.color = "black";
        DeuxPaysAleatoire();
        score++;
        if (score == 1) {
            document.getElementById("score").innerHTML = score + " bonne réponse";
        } else {
            document.getElementById("score").innerHTML = score + " bonnes réponses";
        }
        var listeReponses = document.getElementById("listeReponses");
        var reponseExistante = Array.from(listeReponses.getElementsByTagName("li")).find(function (item) {
            return item.innerText === (PaysAleatoire1.nom + " - " + bonneRep);
        });

        if (!reponseExistante) {
            var reponseElement = document.createElement("li");
            reponseElement.innerText = PaysAleatoire1.nom + " : " + nbHabitants1 + " - " + PaysAleatoire2.nom + " : " + nbHabitants2;
            listeReponses.appendChild(reponseElement);
        }

    }

    else {
        console.log("Mauvaise réponse");
        document.getElementById('h2Text').textContent = "Mauvaise réponse !";
        document.getElementById('h2Text').style.color = "red";
        setTimeout(function () {
            document.getElementById('h2Text').style.color = "black";
            DeuxPaysAleatoire();
        }, 1500);
        document.getElementById("listeReponses").innerHTML = "";
        score = 0;
        document.getElementById("score").innerHTML = score + " bonne réponse";

    }
}


function afficherCapitale(NomPaysAleatoire1, NomPaysAleatoire2) {

    document.getElementById('h2Text').textContent = "Quel est le pays le plus peuplé entre " + NomPaysAleatoire1 + " et " + NomPaysAleatoire2 + " ?";

    document.getElementById('pays1').textContent = NomPaysAleatoire1;
    document.getElementById('pays2').textContent = NomPaysAleatoire2;

    var drapeauUrl1 = "https://img.geonames.org/flags/x/" + getCodeAlpha2(NomPaysAleatoire1).toLowerCase() + ".gif";
    console.log(drapeauUrl1);

    var drapeauUrl2 = "https://img.geonames.org/flags/x/" + getCodeAlpha2(NomPaysAleatoire2).toLowerCase() + ".gif";
    console.log(drapeauUrl2);

    document.getElementById('hab-btn1').style.backgroundImage = "url(" + drapeauUrl1 + ")";
    document.getElementById('hab-btn2').style.backgroundImage = "url(" + drapeauUrl2 + ")";
}
