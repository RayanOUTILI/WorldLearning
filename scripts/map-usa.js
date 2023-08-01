var nbPaysTrouves = 0;
var chrono = 240;
var h2paysTrouves;
var tabPaysTrouve = [];

let currScoreUSA = 0;
let maxScoreUSA = 0;

function init_cookie() {
    const cookieData = document.cookie;
    const cookies = cookieData.split(';');

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim().split('=');
        if (cookie[0] === 'maxScoreUSA') {
            maxScoreUSA = parseInt(cookie[1]);
        } else if (cookie[0] === 'currScore') {
            currScore = parseInt(cookie[1]);
        }
    }

    const max_score = document.getElementById('scoreMax');
    max_score.innerHTML = 'Record : ' + maxScoreUSA;
}

function updateMaxScore() {
    if (nbPaysTrouves > maxScoreUSA) {
        maxScoreUSA = nbPaysTrouves;

        const expirationDate = new Date();
        expirationDate.setFullYear(expirationDate.getFullYear() + 1);

        document.cookie = 'maxScoreUSA=' + maxScoreUSA + '; expires=' + expirationDate.toUTCString();
        const max_score = document.getElementById('scoreMax');
        max_score.innerHTML = 'Ton record : ' + maxScoreUSA;
    }
    document.cookie = 'currScore=' + nbPaysTrouves;
}


document.addEventListener("DOMContentLoaded", function () {
    startCountdown();
    init_cookie();
    h2paysTrouves = document.getElementById("paysTrouves"); // Affecter la valeur à la variable globale
    var h2Chrono = document.getElementById("tempsRestant");
    h2paysTrouves.innerHTML = 'Etats : ' + nbPaysTrouves;
    h2Chrono.innerHTML = '4:00';
    btn = document.getElementById('btn');
    if (nbPaysTrouves >= 50) {
        h2paysTrouves.innerHTML = 'Félicitations, vous avez trouvé tous les états !';
        document.getElementById('input-country').setAttribute('disabled', 'disabled');
        updateMaxScore();
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

            codeAuserCountry = codeAuserCountry.toLowerCase(); // !!!!!!!!
            var path = document.querySelector('.' + codeAuserCountry);

            updateMaxScore();
            console.log(maxScoreUSA);

            // on met la couleur du path en rouge
            // path.classList.add('active');
            path.style.fill = 'blue';
            document.getElementById('input-country').value = '';
        }

        else {
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
            updateMaxScore();
            h2paysTrouves.innerHTML = 'Partie terminée, vous avez trouvé ' + nbPaysTrouves + ' pays.';
            document.getElementById('input-country').setAttribute('disabled', 'disabled');
        }
    }, 1000);
}

function getCodeAlpha2(stateName) {
    const correspondanceEtatsAlpha2 = {
        'Alabama': 'AL',
        'Alaska': 'AK',
        'Arizona': 'AZ',
        'Arkansas': 'AR',
        'Californie': 'CA',
        'Caroline du Nord': 'NC',
        'Caroline du Sud': 'SC',
        'Colorado': 'CO',
        'Connecticut': 'CT',
        'Dakota du Nord': 'ND',
        'Dakota du Sud': 'SD',
        'Delaware': 'DE',
        'Floride': 'FL',
        'Géorgie': 'GA',
        'Hawaï': 'HI',
        'Idaho': 'ID',
        'Illinois': 'IL',
        'Indiana': 'IN',
        'Iowa': 'IA',
        'Kansas': 'KS',
        'Kentucky': 'KY',
        'Louisiane': 'LA',
        'Maine': 'ME',
        'Maryland': 'MD',
        'Massachusetts': 'MA',
        'Michigan': 'MI',
        'Minnesota': 'MN',
        'Mississippi': 'MS',
        'Missouri': 'MO',
        'Montana': 'MT',
        'Nebraska': 'NE',
        'Nevada': 'NV',
        'New Hampshire': 'NH',
        'New Jersey': 'NJ',
        'New York': 'NY',
        'Nouveau-Mexique': 'NM',
        'Ohio': 'OH',
        'Oklahoma': 'OK',
        'Oregon': 'OR',
        'Pennsylvanie': 'PA',
        'Rhode Island': 'RI',
        'Tennessee': 'TN',
        'Texas': 'TX',
        'Utah': 'UT',
        'Vermont': 'VT',
        'Virginie': 'VA',
        'Virginie-Occidentale': 'WV',
        'Washington': 'WA',
        'Wisconsin': 'WI',
        'Wyoming': 'WY',
    };
    const normalizedCountryName = stateName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f\s'-]/g, "");


    for (let pays in correspondanceEtatsAlpha2) {
        const normalizedPays = pays.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f\s'-]/g, "");

        if (BonneReponse(normalizedCountryName, normalizedPays)) {  //on permet une marge d'erreur
            return correspondanceEtatsAlpha2[pays];
        }
    }
    return correspondanceEtatsAlpha2[stateName] || '';
}