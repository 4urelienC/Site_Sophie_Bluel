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

// Récupération des catégories avec l'API et lance la génèration
async function requeteCategories(event){
   let resultTest = await fetch("http://localhost:5678/api/categories")
   let dataTest = await resultTest.json()
   
   //return dataTest
   const listCategory = await dataTest

       let index
        for(index=0; index< listCategory.length; index++)
        {
          if (event.target.id === listCategory[index].name) {
            requeteWorks(listCategory[index].id);
          }
        }
}