function generateFlagUrl(NomPaysAleatoire) {
    if (NomPaysAleatoire === "Union Européenne") {
        var drapeauUrl = "https://upload.wikimedia.org/wikipedia/commons/b/b7/Flag_of_Europe.svg";
    }
    else {
        var drapeauUrl = "https://img.geonames.org/flags/x/" + getCodeAlpha2(NomPaysAleatoire).toLowerCase() + ".gif";
    }
    console.log(drapeauUrl);
    // document.getElementById("DrapeauDuPays").style.backgroundImage = "url(" + drapeauUrl + ")";
    document.getElementById("drapeauImage").src = drapeauUrl;
}

function validerDrapeau() {
    var RepDrapeau = document.getElementById("inputText").value;

    if (BonneReponse(RepDrapeau, NomPaysAleatoire)) {
        document.getElementById("messageContainer").innerHTML = "Réponse correcte!";
        score++;
        if (score == 1) {
            document.getElementById("score").innerHTML = score + " bonne réponse";
        }
        else {
            document.getElementById("score").innerHTML = score + " bonnes réponses";
        }
        var listeReponses = document.getElementById("listeReponses");
        document.getElementById("inputText").value = "";
        var reponseExistante = Array.from(listeReponses.getElementsByTagName("li")).find(function (item) {
            return item.innerText === (NomPaysAleatoire);
        }
        );

        if (!reponseExistante) {
            var reponseElement = document.createElement("li");
            reponseElement.innerText = NomPaysAleatoire;

            listeReponses.appendChild(reponseElement);
        }
        document.getElementById("inputText").style.transform = "";
        paysAleatoire(selectedNiveau);

    }
    else {
        document.getElementById("messageContainer").innerHTML = "Réponse incorrecte!";
        //on supprime en cas de mauvaise réponse 
        document.getElementById("listeReponses").innerHTML = "";
        document.getElementById("inputText").value = "";
        score = 0;
        document.getElementById("score").innerHTML = score + " bonne réponse";
    }
}




// méthode qui associe chaque pays à son code alpha2 ce qui permet de récupérer une url pour afficher le drapeau
function getCodeAlpha2(countryName) {
    const correspondancePaysAlpha2 = {
        Afghanistan: 'AF',
        'Afrique du Sud': 'ZA',
        Akrotiri: 'XK',
        Albanie: 'AL',
        Algérie: 'DZ',
        Allemagne: 'DE',
        Andorre: 'AD',
        Angola: 'AO',
        Anguilla: 'AI',
        Antarctique: 'AQ',
        'Antigua-et-Barbuda': 'AG',
        'Arabie saoudite': 'SA',
        'Arctic Ocean': 'XQ',
        Argentine: 'AR',
        Arménie: 'AM',
        Aruba: 'AW',
        'Ashmore and Cartier Islands': 'XU',
        'Atlantic Ocean': 'XN',
        Australie: 'AU',
        Autriche: 'AT',
        Azerbaïdjan: 'AZ',
        Bahamas: 'BS',
        Bahreïn: 'BH',
        Bangladesh: 'BD',
        Barbade: 'BB',
        Belau: 'PW',
        Belgique: 'BE',
        Belize: 'BZ',
        Bénin: 'BJ',
        Bermudes: 'BM',
        Bhoutan: 'BT',
        Biélorussie: 'BY',
        Birmanie: 'MM',
        Bolivie: 'BO',
        'Bosnie-Herzégovine': 'BA',
        Botswana: 'BW',
        Brésil: 'BR',
        Brunei: 'BN',
        Bulgarie: 'BG',
        'Burkina Faso': 'BF',
        Burundi: 'BI',
        Cambodge: 'KH',
        Cameroun: 'CM',
        Canada: 'CA',
        'Cap-Vert': 'CV',
        Chili: 'CL',
        Chine: 'CN',
        Chypre: 'CY',
        'Clipperton Island': 'CP',//viré du json vu que c'est un territoire français (meme drapeau)
        Colombie: 'CO',
        Comores: 'KM',
        Congo: 'CG',
        'Coral Sea Islands': 'CR',
        'Corée du Nord': 'KP',
        'Corée du Sud': 'KR',
        'Costa Rica': 'CR',
        'Côte d\'Ivoire': 'CI',
        Croatie: 'HR',
        Cuba: 'CU',
        Curacao: 'CW',
        Danemark: 'DK',
        Dhekelia: 'DX',
        Djibouti: 'DJ',
        Dominique: 'DM',
        Égypte: 'EG',
        'Émirats arabes unis': 'AE',
        Équateur: 'EC',
        Érythrée: 'ER',
        Espagne: 'ES',
        Estonie: 'EE',
        'États-Unis': 'US',
        Éthiopie: 'ET',
        'ex-République yougoslave de Macédoine': 'XM', //ban
        Finlande: 'FI',
        France: 'FR',
        Gabon: 'GA',
        Gambie: 'GM',
        'Gaza Strip': 'GZ',
        Géorgie: 'GE',
        Ghana: 'GH',
        Gibraltar: 'GI',
        Grèce: 'GR',
        Grenade: 'GD',
        Groenland: 'GL',
        Guam: 'GU',
        Guatemala: 'GT',
        Guernsey: 'GG',
        Guinée: 'GN',
        'Guinée équatoriale': 'GQ',
        'Guinée-Bissao': 'GW',
        Guyana: 'GY',
        Haïti: 'HT',
        Honduras: 'HN',
        'Hong Kong': 'HK',
        Hongrie: 'HU',
        'Ile Bouvet': 'BV',
        'Ile Christmas': 'CX',
        'Ile Norfolk': 'NF',
        'Iles Cayman': 'KY',
        'Iles Cook': 'CK',
        'Iles des Cocos (Keeling)': 'CC',
        'Iles Falkland': 'FK',
        'Iles Féroé': 'FO',
        'Iles Fidji': 'FJ',
        'Iles Géorgie du Sud et Sandwich du Sud': 'GS',
        'Iles Heard et McDonald': 'HM',
        'Iles Marshall': 'MH',
        'Iles Pitcairn': 'PN',
        'Iles Salomon': 'SB',
        'Iles Svalbard et Jan Mayen': 'SJ',
        'Iles Turks-et-Caicos': 'TC',
        'Iles Vierges américaines': 'VI',
        'Iles Vierges britanniques': 'VG',
        Inde: 'IN',
        'Indian Ocean': 'IO',
        Indonésie: 'ID',
        Iran: 'IR',
        Irak: 'IQ',
        Irlande: 'IE',
        Islande: 'IS',
        Israël: 'IL',
        Italie: 'IT',
        Jamaïque: 'JM',
        'Jan Mayen': 'JN',
        Japon: 'JP',
        Jersey: 'JE',
        Jordanie: 'JO',
        Kazakhstan: 'KZ',
        Kenya: 'KE',
        Kirghizistan: 'KG',
        Kiribati: 'KI',
        Kosovo: 'XK',
        Koweït: 'KW',
        Laos: 'LA',
        Lesotho: 'LS',
        Lettonie: 'LV',
        Liban: 'LB',
        Liberia: 'LR',
        Libye: 'LY',
        Liechtenstein: 'LI',
        Lituanie: 'LT',
        Luxembourg: 'LU',
        Macao: 'MO',
        Madagascar: 'MG',
        Malaisie: 'MY',
        Malawi: 'MW',
        Maldives: 'MV',
        Mali: 'ML',
        Malte: 'MT',
        'Man, Isle of': 'IM',
        'Mariannes du Nord': 'MP',
        Maroc: 'MA',
        Maurice: 'MU',
        Mauritanie: 'MR',
        Mexique: 'MX',
        Micronésie: 'FM',
        Moldavie: 'MD',
        Monaco: 'MC',
        Monde: 'XW',
        Mongolie: 'MN',
        Monténégro: 'ME',
        Montserrat: 'MS',
        Mozambique: 'MZ',
        Namibie: 'NA',
        Nauru: 'NR',
        'Navassa Island': 'BQ',
        Népal: 'NP',
        Nicaragua: 'NI',
        Niger: 'NE',
        Nigeria: 'NG',
        Nioué: 'NU',
        Norvège: 'NO',
        'Nouvelle-Calédonie': 'NC',
        'Nouvelle-Zélande': 'NZ',
        Oman: 'OM',
        Ouganda: 'UG',
        Ouzbékistan: 'UZ',
        'Pacific Ocean': 'XP',
        Pakistan: 'PK',
        Panama: 'PA',
        'Papouasie-Nouvelle-Guinée': 'PG',
        'Paracel Islands': 'PF',
        Paraguay: 'PY',
        'Pays-Bas': 'NL',
        Pérou: 'PE',
        Philippines: 'PH',
        Pologne: 'PL',
        'Polynésie française': 'PF',
        'Porto Rico': 'PR',
        Portugal: 'PT',
        Qatar: 'QA',
        'République centrafricaine': 'CF',
        'République démocratique du Congo': 'CD',
        'République dominicaine': 'DO',
        Roumanie: 'RO',
        'Royaume-Uni': 'GB',
        Russie: 'RU',
        Rwanda: 'RW',
        'Sahara occidental': 'EH',
        'Saint-Barthélemy': 'BL',
        'Saint-Christophe-et-Niévès': 'KN',
        'Sainte-Hélène': 'SH',
        'Sainte-Lucie': 'LC',
        'Saint-Marin': 'SM',
        'Saint-Martin': 'MF',
        'Saint-Pierre-et-Miquelon': 'PM',
        'Saint-Siège': 'VA',
        'Saint-Vincent-et-les-Grenadines': 'VC',
        Salvador: 'SV',
        Samoa: 'WS',
        'Samoa américaines': 'AS',
        'Sao Tomé-et-Principe': 'ST',
        Sénégal: 'SN',
        Serbie: 'RS',
        Seychelles: 'SC',
        'Sierra Leone': 'SL',
        Singapour: 'SG',
        'Sint Maarten': 'SX',
        Slovaquie: 'SK',
        Slovénie: 'SI',
        Somalie: 'SO',
        Soudan: 'SD',
        'Soudan du Sud': 'SS',
        'Southern Ocean': 'XV',
        'Spratly Islands': 'PG',
        'Sri Lanka': 'LK',
        Suède: 'SE',
        Suisse: 'CH',
        Suriname: 'SR',
        Swaziland: 'SZ',
        Syrie: 'SY',
        Tadjikistan: 'TJ',
        Taïwan: 'TW',
        Tanzanie: 'TZ',
        Tchad: 'TD',
        'Terres australes françaises': 'TF',
        'Territoire britannique de l\'Océan Indien': 'IO',
        Thaïlande: 'TH',
        'Timor Oriental': 'TL',
        Togo: 'TG',
        Tokélaou: 'TK',
        Tonga: 'TO',
        'Trinité-et-Tobago': 'TT',
        Tunisie: 'TN',
        Turkménistan: 'TM',
        Turquie: 'TR',
        Tuvalu: 'TV',
        Ukraine: 'UA',
        'Union européenne': 'EU',
        Uruguay: 'UY',
        Vanuatu: 'VU',
        Venezuela: 'VE',
        'Viêt Nam': 'VN',
        'Wake Island': 'WQ',
        'Wallis-et-Futuna': 'WF',
        'West Bank': 'PS',
        Yémen: 'YE',
        Zambie: 'ZM',
        Zimbabwe: 'ZW'
    };
    const normalizedCountryName = countryName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f\s'-]/g, "");


    for (let pays in correspondancePaysAlpha2) {
        const normalizedPays = pays.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f\s'-]/g, "");

        if (normalizedPays === normalizedCountryName) {
            console.log("Pays non trouvé : " + normalizedPays);
            console.log("Pays normalisé : " + normalizedCountryName);
            return correspondancePaysAlpha2[pays];
        }
    }
    return correspondancePaysAlpha2[countryName] || '';
}


// pays de référence : https://www.indexmundi.com/fr/
