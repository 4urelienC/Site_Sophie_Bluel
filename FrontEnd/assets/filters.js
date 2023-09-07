// Récupération des boutons radios des filtres
const radioButtons = document.querySelectorAll("input[type=radio]");

// Event d'écoute des boutons radio filtres
radioButtons.forEach(radioButton => {
  radioButton.addEventListener('click', radioButtonClickHandler);
});

function radioButtonClickHandler(event) {
  if (event.target.checked) {
    console.log(`L'option sélectionnée est : ${event.target.id}`);
    if(event.target.id === "Tous")
    {
      requeteWorks(0)
    }else{
      requeteCategories(event)
    }
  }
}

// Récupération les catégories récuperer dans script.js et lance la génèration
async function requeteCategories(event){
  const listCategory = categoriesStock
       let index
        for(index=0; index< listCategory.length; index++)
        {
          if (event.target.id === listCategory[index].name) {
            requeteWorks(listCategory[index].id);
          }
        }
}