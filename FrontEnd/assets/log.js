let baliseForm = document.querySelector("form");
baliseForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const mail = document.getElementById("email").value;
    const psw = document.getElementById("password").value;

    if (valideEmail(mail) && validePsw(psw)) {
        sendPost(mail,psw)
    }
});

function valideEmail(email) {
    try{
        let emailRegex = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\.[a-z0-9._-]+");
        if (emailRegex.test(email)) {
            afficherErreurMail("")
            return true;
        }
        if (email === "")
        {
            throw new Error(`Le champ email est vide.`)
        }
        throw new Error(`Le champ email est invalide.`)
        return false;
    }catch(erreur)
    {
        afficherErreurMail(erreur.message)
    }
}

function validePsw(mdp) {
    try{
        if (mdp === "")
            {
                throw new Error(`Le champ mot de passe est vide.`)
                return false;
            }
        return true;
    }catch(erreur)
    {
        afficherErreurMail(erreur.message)
    }
}

function afficherErreurMail(message)
{
    let spanErreurMessage = document.getElementById("erreurMessage")
    if(!spanErreurMessage){
        let form = document.getElementById("login")
    spanErreurMessage = document.createElement("span")
    spanErreurMessage.id = "erreurMessage"
    spanErreurMessage.innerText = message
    spanErreurMessage.classList.add("errorMail");
    form.append(spanErreurMessage)
    }
    spanErreurMessage.innerText = message
}



async function sendPost(sendMail,sendPsw)
{
    const url = "http://localhost:5678/api/users/login";  // Remplacez l'URL par l'URL réelle de l'API
    const data = {
        "email": sendMail,
        "password": sendPsw
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
            //  const valeurToken = JSON.stringify(data);
            //  window.localStorage.setItem("token", valeurToken);
              const valeurToken = data.token;
              window.localStorage.setItem("token", valeurToken);
             const valeurIdToken = data.userId;
             window.localStorage.setItem("idToken", valeurIdToken);
            window.location.href = "index.html";
        }
    })
    .catch(error =>{
        console.error("Erreur lors de la requête :", error);
        alert(error);
    });
}