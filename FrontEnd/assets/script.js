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






