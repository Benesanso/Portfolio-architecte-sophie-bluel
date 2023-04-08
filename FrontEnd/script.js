// On passe en paramètre un seul objet et la fonction nous retourne le HTML pour cet objet
function addOneWorkToGallery(elt) {
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
  
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
}
}

// Récupération des catégories via l'API
fetch("http://localhost:5678/api/categories")
  .then(res => res.json())
  .then(data => { 
   createButton ("Tous", 0);
    data.forEach(category => {
        const { id, name } = category;
     
       createButton(name, id);
    });
})
  .catch(err => {
    console.log("dans le catch");
    console.log(err);
    });

//Création boutton
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

//Par default la catégorie Tous s'affiche
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

//Récupération des travaux 
function displayWorks (category){
    fetch ("http://localhost:5678/api/works")
    .then(res => res.json())
    .then(data => {
      const gallery = document.querySelector(".gallery");
      removeAllChildNodes(gallery);//supprimer tous les nœuds enfants
        // Si Elément est 0 tous les travaux s'affichent
        if (category == 0){
          data.forEach(function(item){
            let produit = addOneWorkToGallery(item);
            gallery.appendChild(produit);
        });//Sinon filtrage par id par catégorie
        } else{
        let filteredWorks = data.filter(work => work.category.id == category); 
        filteredWorks.forEach(function(item){
          let produit = addOneWorkToGallery(item);
          gallery.appendChild(produit);      
      }); 
    }
}); 
}
   
// Création de mon footer
const footer = document.createElement("footer");
const nav = document.createElement("nav");
const ul = document.createElement("ul");
const li = document.createElement("li");

li.textContent = "Mentions Légales";
ul.appendChild(li);
nav.appendChild(ul);
footer.appendChild(nav);

document.body.appendChild(footer);


// Vérifier si l'utilisateur est connecté
if (localStorage.getItem('token')) {
  // Afficher le lien de déconnexion
  const logoutLink = document.querySelector('.logout');
  logoutLink.classList.remove('hidden');
  
  // Masquer le lien de connexion
  const loginLink = document.querySelector('.active');
  loginLink.classList.add('hidden');
}


// Récupérer l'élément HTML pour le lien de déconnexion
const logoutLink = document.querySelector('.logout');

// Ajouter un écouteur d'événement au lien de déconnexion
logoutLink.addEventListener('click', (event) => {
  // Empêcher le lien de se comporter comme un lien normal
  event.preventDefault();

  // Supprimer le jeton de connexion du stockage local
  localStorage.removeItem('token');

  // Rediriger vers la page de connexion
  window.location.href = "login.html";
});


//Apparition de Homepage_edit
const token = localStorage.getItem('token');

if (token) {
  // L'utilisateur est connecté, afficher le contenu de #banner et les boutons
  document.getElementById('banner').style.display = 'block';
  document.getElementById('modifie').style.display = 'block';
  document.getElementById('modif').style.display = 'block';
  document.getElementById('change').style.display = 'block';
} else {
  // L'utilisateur n'est pas connecté, cacher le contenu de #banner et les boutons
  document.getElementById('banner').style.display = 'none';
  document.getElementById('modifie').style.display = 'none';
  document.getElementById('modif').style.display = 'none';
  document.getElementById('change').style.display = 'none';
}
