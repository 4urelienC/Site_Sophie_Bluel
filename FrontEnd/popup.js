let baliseFormAdd = document.getElementById("formAdd");
baliseFormAdd.addEventListener("submit", (event) => {
    event.preventDefault();

    const picture = document.getElementById("pix").value;
    const titre = document.getElementById("titre").value;
    const categorie = document.getElementById("categorie-select").value;

    if (validePix(picture) && valideTitle(titre) && valideCat(categorie)) {
        sendPostAdd(picture,titre,categorie)
    }
});

function validePix(picture) {
    try{
        if (picture === "")
            {
                throw new Error(`L'image est vide.`)
                return false;
            }
        return true;
    }catch(erreur)
    {
        afficherErreur(erreur.message)
    }
}

function valideTitle(titre) {
    try{
        if (titre === "")
            {
                throw new Error(`Le champ titre est vide.`)
                return false;
            }
        if (titre.length < 4)
            {
                throw new Error(`Le champ titre est trop court.`)
                return false;
            }
        return true;
    }catch(erreur)
    {
        afficherErreur(erreur.message)
    }
}

function valideCat(categorie) {
    try{
        if (categorie === "")
            {
                throw new Error(`Le champ catégorie est vide.`)
                return false;
            }
        return true;
    }catch(erreur)
    {
        afficherErreur(erreur.message)
    }
}

function afficherErreur(message)
{
    let spanErreurMessage = document.getElementById("erreurMessage")
    if(!spanErreurMessage){
        let form = document.getElementById("formAdd")
    spanErreurMessage = document.createElement("span")
    spanErreurMessage.id = "erreurMessage"
    spanErreurMessage.innerText = message
    spanErreurMessage.classList.add("errorMail");
    form.append(spanErreurMessage)
    }
    spanErreurMessage.innerText = message
}



async function sendPostAdd(sendPix,sendTitre,sendCat)
{
    const url = "http://localhost:5678/api/users/login";  // Remplacez l'URL par l'URL réelle de l'API
    const data = {
        "category": sendCat.XXX,
        "categoryId": sendCat.XXX,
        "Id": XXX,
        "imageUrl": sendPix,
        "title": sendTitre,
        "userId": window.localStorage.getItem("token")
    };







    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if(!data.userId)
        {
            throw new Error("Login ou mot de passe incorrect.");
        }else{
            console.log("Réponse du serveur :", data);
            const valeurToken = JSON.stringify(data.token);
            window.localStorage.setItem("token", valeurToken);
            window.location.href = "index.html";
        }
    })
    .catch(error =>{
        console.error("Erreur lors de la requête :", error);
        alert(error);
    });
}