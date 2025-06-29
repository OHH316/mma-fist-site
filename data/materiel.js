
document.addEventListener('DOMContentLoaded', async () => {
    const materialSearchInput = document.getElementById('materialSearch');
    const clearMaterialSearchButton = document.getElementById('clearMaterialSearch');
    const materialCardsContainer = document.getElementById('materialCardsContainer'); // Votre conteneur de cartes
    let allMateriels = []; // Pour stocker tous les matériels une fois

    // Fonction pour charger les données (réutilisez celle que vous avez déjà)
    async function loadMateriels() {
        const response = await fetch('data/materiels.json');
        return response.json();
    }

    // Fonction pour afficher les matériels
    function displayMateriels(materielsToDisplay) {
        materialCardsContainer.innerHTML = ''; // Vide le conteneur actuel
        if (materielsToDisplay.length === 0) {
            materialCardsContainer.innerHTML = '<p style="color: #ccc; text-align: center;">Aucun matériel ne correspond à votre recherche.</p>';
            return;
        }

        materielsToDisplay.forEach(materiel => {
            const materielCardHtml = `
                <article class="materiel-card orientation-card">
                    <h3>${materiel.nom} (${materiel.marque})</h3>
                    <img src="images/${materiel.image}" alt="${materiel.nom}" onerror="this.onerror=null;this.src='images/placeholder.png';">
                    <p><strong>Catégorie :</strong> ${materiel.categorie}</p>
                    <p><strong>Prix :</strong> ${materiel.prix}</p>
                    <p>${materiel.description}</p>
                    <a href="${materiel.lien_achat}" class="card-link" target="_blank">Acheter</a>
                </article>
            `;
            materialCardsContainer.innerHTML += materielCardHtml;
        });
    }

    // Charger tous les matériels au démarrage
    allMateriels = await loadMateriels();
    displayMateriels(allMateriels); // Affiche tout au début

    // Fonction de filtrage
    function filterMateriels() {
        const searchTerm = materialSearchInput.value.toLowerCase();
        const filteredMateriels = allMateriels.filter(materiel => {
            // Recherche dans le nom, marque, catégorie, et description
            return (
                materiel.nom.toLowerCase().includes(searchTerm) ||
                materiel.marque.toLowerCase().includes(searchTerm) ||
                materiel.categorie.toLowerCase().includes(searchTerm) ||
                materiel.description.toLowerCase().includes(searchTerm)
            );
        });
        displayMateriels(filteredMateriels);
    }

    // Écouter les événements de saisie dans le champ de recherche
    materialSearchInput.addEventListener('input', filterMateriels);

    // Écouter le clic sur le bouton "X" pour vider la recherche
    clearMaterialSearchButton.addEventListener('click', () => {
        materialSearchInput.value = ''; // Vide le champ
        filterMateriels(); // Réaffiche tous les matériels
    });
});

