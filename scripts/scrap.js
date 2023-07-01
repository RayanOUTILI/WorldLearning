fetch('https://restcountries.com/v3/all')
    .then(response => response.json())
    .then(data => {
        const jsonData = JSON.stringify(data);
        const blob = new Blob([jsonData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'countries.json';
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(url);
        console.log('Données des pays enregistrées avec succès.');
    })
    .catch(error => {
        console.log('Une erreur s\'est produite :', error);
    });