let picture;

let baliseFormAdd = document.getElementById("formAdd");
baliseFormAdd.addEventListener("submit", (event) => {
    event.preventDefault();

    
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
        "image": "http://localhost:5678/images/5bf3ea6ba727a1694542996910.jpg",
        "title": sendTitre,
        "category": finalCat,
    };

    // Récupérez le token d'authentification depuis le local storage
    const authToken = token;

 console.log("TEST FINAL : image: " + sendPix + 
 " | title: " + sendTitre + 
 " | category: " + finalCat + 
 " | authToken " + authToken);

 var myHeaders = new Headers();
 myHeaders.append("accept", "application/json");
 myHeaders.append("Content-Type", "multipart/form-data");
myHeaders.append('Authorization', `Bearer ${authToken}`);

var formdata = new FormData();
formdata.append("image", sendPix);
formdata.append("title", sendTitre);
formdata.append("category", finalCat);

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: JSON.stringify(formdata),
  redirect: 'follow'
};

fetch("http://localhost:5678/api/works", requestOptions)
  .then(response => response.json())
  .then(data => {/*window.location.href="index.html"*/})
  //.then(data => {windows.location.href="index.html"})
  .catch(error => console.log('error', error));
}