document.addEventListener('DOMContentLoaded', () => {
    const orientationForm = document.getElementById('orientationForm');
    const recommendationsResult = document.getElementById('recommendationsResult');

    // Fonction pour charger les données (vous l'avez déjà utilisée)
    async function loadData(filePath) {
        const response = await fetch(filePath);
        return response.json();
    }

    orientationForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Empêche le rechargement de la page

        const formData = new FormData(orientationForm);
        const experience = formData.get('experience'); // 'debutant', 'intermediaire', 'avance'
        const objectives = formData.get('objective'); // 'fitness', 'competition', etc.
        const selectedStyles = formData.getAll('styles'); // Tableau des styles cochés ['Boxe', 'Lutte']

        // Charger les données des combattants et matériels
        const combattants = await loadData('data/combattants.json');
        const materiels = await loadData('data/materiels.json');

        let recommendedCombattants = [];
        let recommendedMateriels = [];

        // --- Logique de recommandation simple (à développer !) ---
        if (experience === 'debutant') {
            if (selectedStyles.includes('Boxe')) {
                recommendedCombattants = combattants.filter(c => c.nom === 'Conor McGregor');
                recommendedMateriels = materiels.filter(m => m.categorie === 'Gants' && m.marque === 'Venom');
            } else if (selectedStyles.includes('Lutte')) {
                recommendedCombattants = combattants.filter(c => c.nom === 'Khabib Nurmagomedov');
                recommendedMateriels = materiels.filter(m => m.nom === 'mannequin d\'entrainement');
            } else {
                // Recommandations générales pour débutants
                recommendedCombattants = combattants.filter(c => c.nom === 'Conor McGregor'); // Exemple
                recommendedMateriels = materiels.filter(m => m.categorie === 'Protection'); // Protège-dents, tibias
            }
        } else if (experience === 'avance' && objectives === 'competition') {
            if (selectedStyles.includes('JJB')) {
                recommendedCombattants = combattants.filter(c => c.nom === 'Charles Oliveira'); // Exemple
                recommendedMateriels = materiels.filter(m => m.categorie === 'Vêtements'); // Kimono
            }
            // Ajoutez d'autres conditions complexes ici
        }
        // --- Fin de la logique de recommandation ---

        // Afficher les résultats
        let resultHtml = '<h3>Vos Recommandations :</h3>';

        if (recommendedCombattants.length > 0) {
            resultHtml += '<h4>Combattants Suggérés :</h4><ul>';
            recommendedCombattants.forEach(c => {
                resultHtml += `<li>${c.nom} (${c.surnom}) - ${c.description}</li>`;
            });
            resultHtml += '</ul>';
        }

        if (recommendedMateriels.length > 0) {
            resultHtml += '<h4>Matériel Suggéré :</h4><ul>';
            recommendedMateriels.forEach(m => {
                resultHtml += `<li>${m.nom} (${m.marque}) - ${m.prix}</li>`;
            });
            resultHtml += '</ul>';
        }

        if (recommendedCombattants.length === 0 && recommendedMateriels.length === 0) {
            resultHtml += '<p>Aucune recommandation spécifique pour ces critères. Essayez d\'autres options !</p>';
        }

        recommendationsResult.innerHTML = resultHtml;
    });
});
