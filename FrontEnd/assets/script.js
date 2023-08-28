// Récupération des pièces depuis le fichier JSON
requeteWorks(0)//.then(data => {work = data})

async function requeteWorks(filterID){
   let result = await fetch("http://localhost:5678/api/works")
   let data = await result.json()
   //return data
   affichageGallery(data,filterID)
 }

//const reponse = await fetch("http://localhost:5678/api/works");
//const work = await reponse.json();

async function affichageGallery(work,filterNbr){


    const galleryElement = document.querySelector(".gallery");
    while (galleryElement.firstChild) {
        galleryElement.removeChild(galleryElement.firstChild);
    }


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






