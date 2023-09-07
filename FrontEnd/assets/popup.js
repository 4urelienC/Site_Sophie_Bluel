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
    let newID = articlesStock.length + 1;
    let finalCat;
    
    let ic;
         for(ic=0; ic< categoriesStock.length; ic++)
         {
           if (sendCat === categoriesStock[ic].name) {
            finalCat = categoriesStock[ic].id;
           }
         }
         const idTokenF = window.localStorage.getItem("idToken");
         const token = window.localStorage.getItem("token");

    const url = "http://localhost:5678/api/works";

    const dataAdd = {
        "title": sendTitre,
        "image": sendPix,
        "category": finalCat,
        "userId": idTokenF
    };

    // Récupérez le token d'authentification depuis le local storage
    const authToken = token;
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            
            "Authorization": `Bearer ${authToken}`
        },
        body: JSON.stringify(dataAdd)
    })
    .then(response => response.json())
    .then(data => {
        if(!data.userId)
        {
            throw new Error("Echec de l'envoi.");
        }else{
            window.location.href = "index.html";
        }
    })
    .catch(error =>{
        console.error("Erreur lors de la requête :", error);
        alert(error);
    });
}