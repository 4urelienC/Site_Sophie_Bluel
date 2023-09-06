// Récupération du token éventuellement stocké dans le localStorage
const token = window.localStorage.getItem("token");

logInOut(token);

function logInOut(token) {
    let logElement = document.querySelector(".inOut");

    if (token) {
        // L'utilisateur est connecté, afficher le lien de déconnexion
        logElement.innerHTML = `<li><a href="index.html">logout</a></li>`;
        const zoneEdit = document.querySelector(".zoneEdit");
        zoneEdit.innerHTML = `
        <div class = "editMode">
			<button id="buttonEdition"><i class="fa-regular fa-pen-to-square"></i> Mode édition</button>
		</div>
        `;
    } else {
        // L'utilisateur n'est pas connecté, afficher le lien de connexion
        logElement.innerHTML = '<li><a href="login.html">login</a></li>';
    }
}

// Référence au bouton de déconnexion
const logoutButton = document.querySelector(".inOut");

// Ajout d'un écouteur d'événement de clic sur le bouton de déconnexion
logoutButton.addEventListener("click", function () {
    // Supprimer le token du localStorage
    window.localStorage.removeItem("token");
});