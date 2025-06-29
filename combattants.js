
document.addEventListener('DOMContentLoaded', async () => {
    const fighterSearchInput = document.getElementById('fighterSearch');
    const clearSearchButton = document.getElementById('clearSearch');
    const fighterProfilesGrid = document.getElementById('fighterProfilesGrid'); // Votre conteneur de cartes
    let allCombattants = []; // Pour stocker tous les combattants une fois

    // Fonction pour charger les données (réutilisez celle que vous avez déjà)
    async function loadCombattants() {
        const response = await fetch('data/combattants.json');
        return response.json();
    }

    // Fonction pour afficher les combattants
    function displayCombattants(combattantsToDisplay) {
        fighterProfilesGrid.innerHTML = ''; // Vide le conteneur actuel
        if (combattantsToDisplay.length === 0) {
            fighterProfilesGrid.innerHTML = '<p style="color: #ccc; text-align: center;">Aucun combattant ne correspond à votre recherche.</p>';
            return;
        }

        combattantsToDisplay.forEach(combattant => {
            const fighterCardHtml = `
                <div class="fighter-card">
                    <img src="images/${combattant.image}" alt="${combattant.nom}" class="fighter-profile-pic" onerror="this.onerror=null;this.src='images/placeholder.jpg';">
                    <h3>${combattant.nom} (${combattant.surnom})</h3>
                    <p><strong>Nationalité:</strong> ${combattant.nationalite}</p>
                    <p><strong>Styles:</strong> ${combattant.styles.join(', ')}</p>
                    <p><strong>Record:</strong> ${combattant.records}</p>
                    <p>${combattant.description}</p>
                </div>
            `;
            fighterProfilesGrid.innerHTML += fighterCardHtml;
        });
    }

    // Charger tous les combattants au démarrage
    allCombattants = await loadCombattants();
    displayCombattants(allCombattants); // Affiche tout au début

    // Fonction de filtrage
    function filterCombattants() {
        const searchTerm = fighterSearchInput.value.toLowerCase();
        const filteredCombattants = allCombattants.filter(combattant => {
            // Recherche dans le nom, surnom, nationalité, et styles
            return (
                combattant.nom.toLowerCase().includes(searchTerm) ||
                combattant.surnom.toLowerCase().includes(searchTerm) ||
                combattant.nationalite.toLowerCase().includes(searchTerm) ||
                combattant.styles.some(style => style.toLowerCase().includes(searchTerm))
            );
        });
        displayCombattants(filteredCombattants);
    }

    // Écouter les événements de saisie dans le champ de recherche
    fighterSearchInput.addEventListener('input', filterCombattants);

    // Écouter le clic sur le bouton "X" pour vider la recherche
    clearSearchButton.addEventListener('click', () => {
        fighterSearchInput.value = ''; // Vide le champ
        filterCombattants(); // Réaffiche tous les combattants
    });
});


