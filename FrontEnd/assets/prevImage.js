function setupImagePreview() {
    let input = document.getElementById('pix');
    let uploadDiv = document.querySelector('.upload');

    input.addEventListener('change', function () {
        const file = input.files[0];

    picture = document.getElementById("pix").value;

        if (file) {
            // Effacer le contenu actuel de la div "upload"
            uploadDiv.innerHTML = '';

            // Créer un nouvel élément img pour la prévisualisation
            const imagePreview = document.createElement('img');
            imagePreview.id = 'image-preview';
            imagePreview.alt = 'Aperçu de l\'image';

            // Ajouter l'élément img à la div "upload"
            uploadDiv.appendChild(imagePreview);

            // Lire et afficher l'image sélectionnée
            const reader = new FileReader();
            reader.onload = function (e) {
                imagePreview.src = e.target.result;
            };
            reader.readAsDataURL(file);
        } else {
            // Si aucun fichier n'est sélectionné, rétablir le contenu initial de la div "upload"
            uploadDiv.innerHTML = `
                <i class="fa-regular fa-image fa-4x"></i>
                <label for="pix" class="browse button black">+ Ajouter photo</label>
                <input type="file" id="pix" name="pix" accept="image/png, image/jpeg" class="browse" multiple />
                <p class="imgComm">jpg, png : 4mo max</p>
            `;
        }
    });

    const effacerImageBtn = document.getElementById('effacerImage');
    effacerImageBtn.addEventListener('click', function () {
        // Effacer l'image prévisualisée
        const imagePreview = document.getElementById('image-preview');
        if (imagePreview) {
            imagePreview.parentNode.removeChild(imagePreview);
        }

        // Rétablir le contenu initial de la div "upload"
        uploadDiv.innerHTML = `
            <i class="fa-regular fa-image fa-4x"></i>
            <label for="pix" class="browse button black">+ Ajouter photo</label>
            <input type="file" id="pix" name="pix" accept="image/png, image/jpeg" class="browse" multiple />
            <p class="imgComm">jpg, png : 4mo max</p>
        `;

        // Appeler la fonction pour réinitialiser le script
        setupImagePreview();
    });
}

// Appeler la fonction au chargement de la page pour initialiser le script
setupImagePreview();
