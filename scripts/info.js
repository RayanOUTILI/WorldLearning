function displayInfo() {
    fetch('../data/data.json')
        .then(response => response.json())
        .then(data => {
            var table = "<table>";
            table += "<tr><th>Nom</th><th>Capitale</th><th>Monnaie</th><th>Langue</th><th>Habitants</th><th>Drapeau</th><th>Continent</th><th>Superficie</th><th>Fuseau horaire</th><th>Sites célèbres</th><th>Sport national</th><th>Religion</th><th>Système politique</th><th>Pays frontaliers</th></tr>";

            data.pays.forEach(pays => {
                table += "<tr>";
                table += "<td>" + pays.nom + "</td>";
                table += "<td>" + pays.capitale + "</td>";
                table += "<td>" + pays.monnaie + "</td>";
                table += "<td>" + pays.langue + "</td>";
                table += "<td>" + pays.habitants + "</td>";
                table += "<td>" + generateFlagUrl(pays.nom) + "</td>";
                table += "<td>" + pays.continent + "</td>";
                table += "<td>" + pays.superficie + "</td>";
                table += "<td>" + pays.fuseau_horaire + "</td>";
                // table += "<td>" + pays.pib + "</td>";
                table += "<td>" + pays.sites_celebres.join(", ") + "</td>";
                table += "<td>" + pays.sport_national + "</td>";
                table += "<td>" + pays.religion + "</td>";
                table += "<td>" + pays.systeme_politique + "</td>";
                table += "<td>" + pays.pays_frontaliers.join(", ") + "</td>";
                table += "</tr>";
            });

            table += "</table>";

            var info = document.getElementById("info");
            info.innerHTML = table;
        });
}

displayInfo();

function generateFlagUrl(NomPaysAleatoire) {
    if (NomPaysAleatoire === "Union Européenne") {
        var drapeauUrl = "https://upload.wikimedia.org/wikipedia/commons/b/b7/Flag_of_Europe.svg";
    }
    else {
        var drapeauUrl = "https://img.geonames.org/flags/x/" + getCodeAlpha2(NomPaysAleatoire).toLowerCase() + ".gif";
    }
    return "<img src='" + drapeauUrl + "' alt='drapeau' width='80px' height='50px'>";
}