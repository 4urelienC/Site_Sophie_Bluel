// Récupération des catégories avec l'API
let categoriesStock;

async function fetchCategories() {
    try {
        const resultCate = await fetch("http://localhost:5678/api/categories");
        const dataCate = await resultCate.json();
        return dataCate;
    } catch (error) {
        console.error("Erreur lors de la récupération des catégories:", error);
        return null;
    }
}

async function initCategories() {
    categoriesStock = await fetchCategories();
    if (categoriesStock !== null) {
        // Les catégories ont été chargées avec succès, vous pouvez effectuer des opérations avec categoriesStock ici.
        
        
            //Prépare la création de la liste des categorie de la Popup
        const formPopup = document.getElementById("categorie-select");
        //formPopup.innerHTML = "";
        let ix
        for(ix=0; ix< categoriesStock.length; ix++)
          {
            const optionFormPopup = document.createElement("option");
            optionFormPopup.value = categoriesStock[ix].name;
            optionFormPopup.innerText = categoriesStock[ix].name;
            formPopup.appendChild(optionFormPopup);
          }
        

    } else {
        // Une erreur s'est produite lors de la récupération des catégories.
        // Vous pouvez gérer l'erreur ici, par exemple, afficher un message à l'utilisateur.
    }
}

// Appelez la fonction init pour commencer le chargement des catégories.
initCategories();




// Envoi la première génération de la page
requeteWorks(0)

// Récupération des articles avec l'API et lance la génèration
async function requeteWorks(filterID){
   let result = await fetch("http://localhost:5678/api/works")
   let data = await result.json()
   //return data
   affichageGallery(data,filterID)
 }


// Prepare le filtre et lance la fonction de génèration
async function affichageGallery(work,filterNbr){


    const galleryElement = document.querySelector(".gallery");

    // Efface le contenu de la balise gallery
    galleryElement.innerHTML = '';

    // applique le filtre et lance la fonction
    let i
    for(i=0; i< work.length; i++)
    {
        const articleNbr = work[i];
        if(filterNbr === 0)
        {
          galleryLoad(articleNbr)
        }
        if(filterNbr === articleNbr.categoryId)
        {
          galleryLoad(articleNbr)
        }
    }
}

// Fonction qui génère la gallery
async function galleryLoad(article)
{
  const figureElement = document.createElement("figure");
            const imageElement = document.createElement("img");
            imageElement.src = article.imageUrl;
            imageElement.innerText = article.title;
            const figElement = document.createElement("figcaption");
            figElement.innerText = article.title;
            categorieElement = article.categoryId;

            figureElement.appendChild(imageElement);
            figureElement.appendChild(figElement);
            figureElement.classList.add(article.categoryId);

            const selectionFiches = document.querySelector(".gallery");
            selectionFiches.appendChild(figureElement);
}






