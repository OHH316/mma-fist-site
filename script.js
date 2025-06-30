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

document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const themeIcon = themeToggle.querySelector('.theme-icon');

    // Charger le thème préféré de l'utilisateur depuis le stockage local (LocalStorage)
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.add(savedTheme);
        if (savedTheme === 'light-theme') {
            themeIcon.src = 'images/icon-sun.svg';
            themeIcon.alt = 'Light theme icon';
        } else {
            themeIcon.src = 'images/icon-moon.svg';
            themeIcon.alt = 'Dark theme icon';
        }
    } else {
        // Si aucun thème n'est enregistré, définir le thème par défaut (dark-theme)
        body.classList.add('dark-theme');
        themeIcon.src = 'images/icon-moon.svg';
        themeIcon.alt = 'Dark theme icon';
        localStorage.setItem('theme', 'dark-theme');
    }

    // Ajouter l'écouteur d'événements pour le bouton de bascule
    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-theme')) {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            themeIcon.src = 'images/icon-sun.svg';
            themeIcon.alt = 'Light theme icon';
            localStorage.setItem('theme', 'light-theme');
        } else {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            themeIcon.src = 'images/icon-moon.svg';
            themeIcon.alt = 'Dark theme icon';
            localStorage.setItem('theme', 'dark-theme');
        }
    });
});
