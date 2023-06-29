function generateFlagUrl(NomPaysAleatoire) {
    var drapeauUrl = "https://img.geonames.org/flags/x/" + getCodeAlpha2(NomPaysAleatoire).toLowerCase() + ".gif";
    console.log(drapeauUrl);
    // document.getElementById("DrapeauDuPays").style.backgroundImage = "url(" + drapeauUrl + ")";
    document.getElementById("drapeauImage").src = drapeauUrl;
}

function validerDrapeau() {
    var RepDrapeau = document.getElementById("inputText").value;

    if (BonneReponse(RepDrapeau,NomPaysAleatoire)) {
        document.getElementById("messageContainer").innerHTML = "Réponse correcte!";
        score++;
        if (score == 1) {
            document.getElementById("score").innerHTML = score + " bonne réponse";
        }
        else {
            document.getElementById("score").innerHTML = score + " bonnes réponses";
        }
        var listeReponses = document.getElementById("listeReponses");
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
        paysAleatoire();

    }
    else {
        document.getElementById("messageContainer").innerHTML = "Réponse incorrecte!";
        //on supprime en cas de mauvaise réponse 
        document.getElementById("listeReponses").innerHTML = "";
        score = 0;
        document.getElementById("score").innerHTML = score + " bonne réponse";
    }
}




// méthode qui associe chaque pays à son code alpha2 ce qui permet de récupérer une url pour afficher le drapeau
function getCodeAlpha2(countryName) {
    const correspondancePaysAlpha2 = {
        Afghanistan: 'AF',
        "Afrique du Sud": 'ZA',
        "Åland, Îles": 'AX',
        Albanie: 'AL',
        Algerie: 'DZ',
        Allemagne: 'DE',
        "Allemagne de l'EST": 'DD',
        Andorre: 'AD',
        Angola: 'AO',
        Anguilla: 'AI',
        Antarctique: 'AQ',
        "Antigua-et-Barbuda": 'AG',
        "Antilles néerlandaises": 'AN',
        "Arabie Saoudite": 'SA',
        Argentine: 'AR',
        Arménie: 'AM',
        Aruba: 'AW',
        Australie: 'AU',
        Autriche: 'AT',
        Azerbaïdjan: 'AZ',
        Bahamas: 'BS',
        Bahrein: 'BH',
        Bangladesh: 'BD',
        Barbade: 'BB',
        Biélorussie: 'BY',
        Belgique: 'BE',
        Bélize: 'BZ',
        Bénin: 'BJ',
        Bermudes: 'BM',
        Bhoutan: 'BT',
        "Bolivie": 'BO',
        "Bonaire, Saint-Eustache et Saba": 'BQ',
        "Bosnie-Herzégovine": 'BA',
        Botswana: 'BW',
        "Bouvet, Ile": 'BV',
        Brésil: 'BR',
        "Brunéi": 'BN',
        Bulgarie: 'BG',
        "Burkina Faso": 'BF',
        Burundi: 'BI',
        "Cabo Verde": 'CV',
        "Caïmans, Iles": 'KY',
        Cambodge: 'KH',
        Cameroun: 'CM',
        Canada: 'CA',
        Chili: 'CL',
        Chine: 'CN',
        "Christmas, île": 'CX',
        Chypre: 'CY',
        "Cocos/Keeling (Îles)": 'CC',
        Colombie: 'CO',
        Comores: 'KM',
        Congo: 'CG',
        "Congo, République démocratique du": 'CD',
        "Cook, Iles": 'CK',
        "Corée, République de": 'KR',
        "Corée, République populaire démocratique de": 'KP',
        "Costa Rica": 'CR',
        "Côte d'Ivoire": 'CI',
        Croatie: 'HR',
        Cuba: 'CU',
        Curaçao: 'CW',
        Danemark: 'DK',
        Djibouti: 'DJ',
        "Dominicaine, République": 'DO',
        Dominique: 'DM',
        Egypte: 'EG',
        "El Salvador": 'SV',
        "Emirats arabes unis": 'AE',
        Equateur: 'EC',
        Erythrée: 'ER',
        Espagne: 'ES',
        Estonie: 'EE',
        "Etats-Unis d'Amérique": 'US',
        Ethiopie: 'ET',
        "Falkland/Malouines (Îles)": 'FK',
        "Féroé, îles": 'FO',
        Fidji: 'FJ',
        Finlande: 'FI',
        France: 'FR',
        Gabon: 'GA',
        Gambie: 'GM',
        Géorgie: 'GE',
        "Géorgie du sud et les îles Sandwich du sud": 'GS',
        Ghana: 'GH',
        Gibraltar: 'GI',
        Grèce: 'GR',
        Grenade: 'GD',
        Groenland: 'GL',
        Guadeloupe: 'GP',
        Guam: 'GU',
        Guatemala: 'GT',
        Guernesey: 'GG',
        Guinée: 'GN',
        "Guinée-Bissau": 'GW',
        "Guinée équatoriale": 'GQ',
        Guyana: 'GY',
        "Guyane française": 'GF',
        Haïti: 'HT',
        "Heard, Ile et MacDonald, îles": 'HM',
        Honduras: 'HN',
        "Hong Kong": 'HK',
        Hongrie: 'HU',
        "Île de Man": 'IM',
        "Îles mineures éloignées des Etats-Unis": 'UM',
        "Îles vierges britanniques": 'VG',
        "Îles vierges des Etats-Unis": 'VI',
        Inde: 'IN',
        "Indien (Territoire britannique de l'océan)": 'IO',
        Indonésie: 'ID',
        "Iran, République islamique d'": 'IR',
        Iraq: 'IQ',
        Irlande: 'IE',
        Islande: 'IS',
        Israël: 'IL',
        Italie: 'IT',
        Jamaïque: 'JM',
        Japon: 'JP',
        Jersey: 'JE',
        Jordanie: 'JO',
        Kazakhstan: 'KZ',
        Kenya: 'KE',
        Kirghizistan: 'KG',
        Kiribati: 'KI',
        Koweït: 'KW',
        "Lao, République démocratique populaire": 'LA',
        Lesotho: 'LS',
        Lettonie: 'LV',
        Liban: 'LB',
        Libéria: 'LR',
        Libye: 'LY',
        Liechtenstein: 'LI',
        Lituanie: 'LT',
        Luxembourg: 'LU',
        Macao: 'MO',
        "Macédoine, l'ex-République yougoslave de": 'MK',
        Madagascar: 'MG',
        Malaisie: 'MY',
        Malawi: 'MW',
        Maldives: 'MV',
        Mali: 'ML',
        Malte: 'MT',
        "Mariannes du nord, Iles": 'MP',
        Maroc: 'MA',
        "Marshall, Iles": 'MH',
        Martinique: 'MQ',
        Maurice: 'MU',
        Mauritanie: 'MR',
        Mayotte: 'YT',
        Mexique: 'MX',
        "Micronésie, Etats Fédérés de": 'FM',
        "Moldova, République de": 'MD',
        Monaco: 'MC',
        Mongolie: 'MN',
        Monténégro: 'ME',
        Montserrat: 'MS',
        Mozambique: 'MZ',
        Myanmar: 'MM',
        Namibie: 'NA',
        Nauru: 'NR',
        Népal: 'NP',
        Nicaragua: 'NI',
        Niger: 'NE',
        Nigéria: 'NG',
        Niue: 'NU',
        "Norfolk, Ile": 'NF',
        Norvège: 'NO',
        "Nouvelle-Calédonie": 'NC',
        "Nouvelle-Zélande": 'NZ',
        Oman: 'OM',
        Ouganda: 'UG',
        Ouzbékistan: 'UZ',
        Pakistan: 'PK',
        Palaos: 'PW',
        "Palestine, Etat de": 'PS',
        Panama: 'PA',
        "Papouasie-Nouvelle-Guinée": 'PG',
        Paraguay: 'PY',
        "Pays-Bas": 'NL',
        "Pays inconnu": 'XX',
        "Pays multiples": 'ZZ',
        Pérou: 'PE',
        Philippines: 'PH',
        Pitcairn: 'PN',
        Pologne: 'PL',
        "Polynésie française": 'PF',
        "Porto Rico": 'PR',
        Portugal: 'PT',
        Qatar: 'QA',
        "République arabe syrienne": 'SY',
        "République centrafricaine": 'CF',
        Réunion: 'RE',
        Roumanie: 'RO',
        "Royaume-Uni de Grande-Bretagne et d'Irlande du Nord": 'GB',
        "Russie, Fédération de": 'RU',
        Rwanda: 'RW',
        "Sahara occidental": 'EH',
        "Saint-Barthélemy": 'BL',
        "Saint-Kitts-et-Nevis": 'KN',
        "Saint-Marin": 'SM',
        "Saint-Martin (partie française)": 'MF',
        "Saint-Martin (partie néerlandaise)": 'SX',
        "Saint-Pierre-et-Miquelon": 'PM',
        "Saint-Siège": 'VA',
        "Saint-Vincent-et-les-Grenadines": 'VC',
        "Sainte-Hélène, Ascension et Tristan da Cunha": 'SH',
        "Sainte-Lucie": 'LC',
        "Salomon, Iles": 'SB',
        Samoa: 'WS',
        "Samoa américaines": 'AS',
        "Sao Tomé-et-Principe": 'ST',
        Sénégal: 'SN',
        Serbie: 'RS',
        Seychelles: 'SC',
        "Sierra Leone": 'SL',
        Singapour: 'SG',
        Slovaquie: 'SK',
        Slovénie: 'SI',
        Somalie: 'SO',
        Soudan: 'SD',
        "Soudan du Sud": 'SS',
        "Sri Lanka": 'LK',
        Suède: 'SE',
        Suisse: 'CH',
        Suriname: 'SR',
        "Svalbard et île Jan Mayen": 'SJ',
        Swaziland: 'SZ',
        Tadjikistan: 'TJ',
        "Taïwan, Province de Chine": 'TW',
        "Tanzanie, République unie de": 'TZ',
        Tchad: 'TD',
        "Tchécoslovaquie": 'CS',
        "Tchèque, République": 'CZ',
        "Terres australes françaises": 'TF',
        Thaïlande: 'TH',
        "Timor-Leste": 'TL',
        Togo: 'TG',
        Tokelau: 'TK',
        Tonga: 'TO',
        "Trinité-et-Tobago": 'TT',
        Tunisie: 'TN',
        Turkménistan: 'TM',
        "Turks et Caïques, Iles": 'TC',
        Turquie: 'TR',
        Tuvalu: 'TV',
        Ukraine: 'UA',
        "Uruguay": 'UY',
        Vanuatu: 'VU',
        Venezuela: 'VE',
        "Vierges américaines, Îles": 'VI',
        "Viêt Nam": 'VN',
        "Wallis et Futuna": 'WF',
        Yémen: 'YE',
        Yougoslavie: 'YU',
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