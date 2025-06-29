document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("fighter-form");

    if (form) { // On vérifie seulement si le formulaire existe, car resultDiv n'est plus utilisé
        form.addEventListener("submit", function(event) {
            event.preventDefault(); // Empêche l'envoi du formulaire par défaut (ce qui réinitialiserait la page)

            const nom = document.getElementById("fighter-name").value;
            const nationalite = document.getElementById("nationality").value;
            const poids = document.getElementById("weight").value;
            const taille = document.getElementById("height").value;

            // Récupère toutes les checkboxes cochées dans le fieldset 'style-choices'
            const checkboxes = document.querySelectorAll('.style-choices input[type="checkbox"]:checked');
            const styles = Array.from(checkboxes).map(cb => cb.value);

            // Encode les données pour les passer dans l'URL
            const encodedNom = encodeURIComponent(nom);
            const encodedNationalite = encodeURIComponent(nationalite);
            const encodedPoids = encodeURIComponent(poids);
            const encodedTaille = encodeURIComponent(taille);
            const encodedStyles = encodeURIComponent(styles.join(','));

            // Construit l'URL de redirection vers la page d'évaluation
            // Assure-toi que 'evaluation.html' est le nom exact de ta deuxième page
            const redirectURL = `evaluation.html?nom=${encodedNom}&nationalite=${encodedNationalite}&poids=${encodedPoids}&taille=${encodedTaille}&styles=${encodedStyles}`;

            // Effectue la redirection
            window.location.href = redirectURL;
        });
    } else {
        // Ce message d'erreur est très utile pour le débogage si le formulaire n'est pas trouvé
        console.error("Erreur JavaScript : Le formulaire avec l'ID 'fighter-form' est introuvable sur cette page.");
    }
});
