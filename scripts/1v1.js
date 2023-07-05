var countdownSeconds = 61;

function startCountdown() {
  var countdownElement = document.getElementById('rebours');
  var countdownInterval = setInterval(function() {
    countdownSeconds--;
    var minutes = Math.floor(countdownSeconds / 60);
    var seconds = countdownSeconds % 60;
    var formattedCountdown = ('0' + minutes).slice(-2) + ':' + ('0' + seconds).slice(-2);
    countdownElement.textContent = formattedCountdown;
    if (countdownSeconds <= 0) {
      clearInterval(countdownInterval);
      countdownElement.textContent = "Temps écoulé";
    }
  }, 1000);
}

function modeAleatoireChrono() {
  document.getElementsByClassName("info-multi")[0].style.display = "none";
  startCountdown();

//   var modes = ["capitales", "drapeaux", "frontieres", "formes"];
//   var index = 0;
//   var interval = setInterval(function() {
//     if (countdownSeconds <= 0 || index >= modes.length) {
//       clearInterval(interval);
//       return;
//     }

//     var mode = modes[index];
//     paysAleatoire(1, mode);
//     index++;
//   }, 1000);
}
