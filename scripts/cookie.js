// let currScore = 0;
// let maxScore = 0;

// function init_cookie() {
//     const cookieData = document.cookie;
//     const cookies = cookieData.split(';');

//     for (let i = 0; i < cookies.length; i++) {
//         const cookie = cookies[i].trim().split('=');
//         if (cookie[0] === 'maxScore') {
//             maxScore = parseInt(cookie[1]);
//         } else if (cookie[0] === 'currScore') {
//             currScore = parseInt(cookie[1]);
//         }
//     }

//     const max_score = document.getElementById('scoreMax');
//     max_score.innerHTML = 'Record : ' + maxScore;
// }

// function updateMaxScore() {
//     if (nbPaysTrouves > maxScore) {
//         maxScore = nbPaysTrouves;

//         const expirationDate = new Date();
//         expirationDate.setFullYear(expirationDate.getFullYear() + 1);

//         document.cookie = 'maxScore=' + maxScore + '; expires=' + expirationDate.toUTCString();
//         const max_score = document.getElementById('scoreMax');
//         max_score.innerHTML = 'Ton record : ' + maxScore;
//     }
//     document.cookie = 'currScore=' + nbPaysTrouves;
// }