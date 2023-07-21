var nbPaysTrouves = 0;
var chrono = 480;
var h2paysTrouves; // Déclarer la variable globale ici
var tabPaysTrouve = [];

document.addEventListener("DOMContentLoaded", function () {
    startCountdown();
    h2paysTrouves = document.getElementById("paysTrouves"); // Affecter la valeur à la variable globale
    var h2Chrono = document.getElementById("tempsRestant");
    h2paysTrouves.innerHTML = 'Pays : ' + nbPaysTrouves;
    h2Chrono.innerHTML = '8:00';
    btn = document.getElementById('btn');
    if (nbPaysTrouves >= 175) {
        h2paysTrouves.innerHTML = 'Félicitations, vous avez trouvé tous les pays !';
        document.getElementById('input-country').setAttribute('disabled', 'disabled');
        return;
    }
    btn.addEventListener('click', function () {
        var userCountry = document.getElementById('input-country').value;
        var codeAuserCountry = getCodeAlpha2(userCountry);
        console.log(getCodeAlpha2(userCountry));


        if (codeAuserCountry && tabPaysTrouve.indexOf(codeAuserCountry) === -1) {
            tabPaysTrouve.push(codeAuserCountry);
            nbPaysTrouves++;
            h2paysTrouves.innerHTML = 'Pays : ' + nbPaysTrouves;

            const bonneRep = document.getElementById("bonneRep");
            bonneRep.play();

            var path = document.querySelector('.' + codeAuserCountry);

            // on met la couleur du path en rouge
            // path.classList.add('active');
            path.style.fill = 'blue';
            document.getElementById('input-country').value = '';
        }

        else{
            mauvaiseRep.play();
            document.getElementById('input-country').value = '';
        }
    });

    // code pour valider input quand touche entrer
    var input = document.getElementById("input-country");
    input.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("btn").click();
        }
    });
});

function startCountdown() {
    var countdownElement = document.getElementById('tempsRestant');
    var countdownInterval = setInterval(function () {
        chrono--;
        var minutes = Math.floor(chrono / 60);
        var seconds = chrono % 60;
        var formattedCountdown = ('0' + minutes).slice(-2) + ':' + ('0' + seconds).slice(-2);
        countdownElement.textContent = formattedCountdown;
        if (chrono <= 0) {
            clearInterval(countdownInterval);
            countdownElement.textContent = "Temps écoulé";
            h2paysTrouves.innerHTML = 'Partie terminée, vous avez trouvé ' + nbPaysTrouves + ' pays.';
            document.getElementById('input-country').setAttribute('disabled', 'disabled');
        }
    }, 1000);
}
