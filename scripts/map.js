document.addEventListener("DOMContentLoaded", function () {
    btn = document.getElementById('btn');
    btn.addEventListener('click', function () {
        var userCountry = document.getElementById('input-country').value;
        var codeAuserCountry = getCodeAlpha2(userCountry);
        console.log(getCodeAlpha2(userCountry));

        if (codeAuserCountry) {

            const bonneRep = document.getElementById("bonneRep");
            bonneRep.play();

            var path = document.querySelector('.' + codeAuserCountry);

            // on met la couleur du path en rouge
            path.style.fill = 'blue';
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