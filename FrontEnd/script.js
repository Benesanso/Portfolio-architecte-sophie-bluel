    
//Recupération de l'élément dans le document grâce au sélecteur
//document.querySelector(".gallery");

//Récupération de l'api et des données
//fetch("http://localhost:5678/api/works")
   // .then(res => res.json())
    // /.then(data => {
    //     console.log(data)
    //     data.forEach(function(item){
    //         let produit = templateHTML(item)
    //         document.querySelector(".gallery").appendChild(produit);
          
    //     })
    // })

    // .catch(err => {
    //     console.log("dans le catch")
    //     console.log(err)
    // })
    
// On créé le template pour un objet. On passe en paramètre un seul objet et la fonction nous retourne le HTML pour cet objet
function templateHTML(elt) {
    const figure = document.createElement('figure');// On créé la figure
    const img = document.createElement('img');// On créé l'image
    img.src =  elt.imageUrl;// On lie le lien vers l'image à son attribut src
    img.crossOrigin = "";// on lie l'image via la même origine que l'image chargée
    img.alt = document.createElement ('alt'); // on lie l'attribue alt de l'image
    const figCaption = document.createElement('figcaption');// On créé le figcaption
    figCaption.innerText = elt.title;// On lie le texte avec le figcaption
    figure.appendChild(img);// On met l'image dans la figure
    figure.appendChild(figCaption);// On met le figcaption dans la figure
    return figure; // et on retourne le HTML de la figure
}
  


// Récupération de l'API des catégories
fetch("http://localhost:5678/api/categories")
  .then(res => res.json())
  .then(data => {
    console.log(data);
    
   createButton ("Tous", 0);
    data.forEach(category => {
        const { id, name } = category
        console.log(id);
       createButton(name, id)
    });
})
    .catch(err => {
      console.log("dans le catch")
      console.log(err)
    });

function createButton(name, categoryId){
    const button = document.createElement("button");
    // Ajout du nom de la catégorie au bouton
    button.innerText = name;
    // Ajout de l'Id de la catégorie en tant qu'attribut pour le bouton
    button.setAttribute("data-category-id", categoryId);
    // Style du bouton selon la charte graphique
    button.style.backgroundColor = 'white';
    button.style.color = '#1D6154';
    button.style.fontWeight = '600';
    button.style.fontFamily = 'syne';
    button.style.borderRadius = '20px';
    button.style.border = "1px solid #1D6154";
    button.style.padding = '5px 15px';
    button.style.margin = '5px';
    button.style.cursor = 'pointer';

    if(categoryId == 0){
      button.style.backgroundColor = "#1D6154";
      button.style.color = "white";
      displayWorks(0);
    }
    
     // Ajout de l'événement clique
     button.addEventListener("click", function () {
        const buttons = document.querySelectorAll("button");
        const categoryId = this.getAttribute("data-category-id");
        
        buttons.forEach(btn => {
            btn.style.backgroundColor = "white";
            btn.style.color = "#1D6154";
          });

          // Mise en surbrillance du bouton cliqué
          this.style.backgroundColor = "#1D6154";
          this.style.color = "white";
         
          displayWorks(categoryId);
          console.log(categoryId);
        });
        // Récupération de la div des filtres
        const filters = document.querySelector("#filters"); 
        filters.appendChild(button);
      
       
    }

    function displayWorks (category){
        fetch ("http://localhost:5678/api/works")
        .then(res => res.json())
        .then(data => {
          const gallery = document.querySelector(".gallery")
          removeAllChildNodes(gallery)
            if (category == 0){
              data.forEach(function(item){
                let produit = templateHTML(item)
                gallery.appendChild(produit);
            })
            } else{
            let filteredWorks = data.filter(work => work.category.id == category)
      
           filteredWorks.forEach(function(item){
              let produit = templateHTML(item)
              gallery.appendChild(produit);
             
             
          })
          
        }

    }) 
    }

    function removeAllChildNodes(parent) {
      while (parent.firstChild) {
          parent.removeChild(parent.firstChild);
      }
  }