//////////////////////////////////////////////CATEGORIES////////////////////////////////////

// Récupération des catégories avec l'API
let categoriesStock;
// Appelez la fonction init pour commencer le chargement des catégories.
initCategories();

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

//////////////////////////////////////////////ARTICLES////////////////////////////////////


// Récupération des catégories avec l'API
let articlesStock;
let data;
// Appelez la fonction init pour commencer le chargement des articles.
initArticles()
// Récupération des articles avec l'API et lance la génèration
async function fetchArticles() {
  try {
    let result = await fetch("http://localhost:5678/api/works")
    data = await result.json()
      return data;
  } catch (error) {
      console.error("Erreur lors de la récupération des articles:", error);
      return null;
  }
}

async function initArticles() {
  articlesStock = await fetchArticles();
  if (articlesStock !== null) {
    affichageGallery(articlesStock)
  }
}

// Prepare le filtre et lance la fonction de génèration
async function affichageGallery(work){
    const galleryElement = document.querySelector(".gallery");

    // Efface le contenu de la balise gallery
    galleryElement.innerHTML = '';
    // Lance la génération des articles
    let i
    for(i=0; i< work.length; i++)
    {
          galleryLoad(work[i])
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


