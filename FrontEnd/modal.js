
// Récupérer la modale et le bouton "modifier"
const btn = document.querySelector(".change");
const modal = document.getElementById("myModal");


// Récupérer l'élément <span> qui permet de fermer la modale
const span = document.querySelector(".close");

// Ajouter un événement click sur le bouton "modifier" pour afficher la modale
btn.addEventListener("click", () => {
  modal.style.display = "block";
});

// Ajouter un événement click sur l'élément <span> pour fermer la modale
span.addEventListener("click", () => {
  modal.style.display = "none";
});

// Ajouter un événement click sur la fenêtre pour fermer la modale si l'utilisateur clique en dehors de la modale
window.addEventListener("click", (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});



// Fonction pour supprimer tous les nœuds enfants d'un élément HTML
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
// Récupération des travaux
function displayWorksInModal() {
  fetch("http://localhost:5678/api/works")
    .then(res => res.json())
    .then(data => {
      const modalContent = document.querySelector(".modalpicture");
        
      
      // Ajouter chaque travail dans la modale s'il n'est pas déjà présent
      data.forEach(work => {
        const workHtml = addOneWorkToModal(work);
        if (!isWorkAlreadyInModal(workHtml, modalContent)) {
          modalContent.appendChild(workHtml);
        }
      });
    })
    .catch(err => {
      console.log("dans le catch")
      console.log(err)
    });
}
// Fonction pour créer le HTML pour un travail spécifique
function addOneWorkToModal(work) {
  const figure = document.createElement('figure');// On créé la figure
  const img = document.createElement('img');// On créé l'image
  img.src = work.imageUrl;// On lie le lien vers l'image à son attribut src
  img.crossOrigin = "";// on lie l'image via la même origine que l'image chargée
  img.alt = work.title; // on lie l'attribue alt de l'image
  const figCaption = document.createElement('figcaption');// On créé le figcaption
  figCaption.textContent = "éditer";
  const icon = document.createElement('span'); // On créé un span pour l'icône poubelle
  icon.innerHTML = '<i class="fa-solid fa-trash-can"></i>'; // On ajoute l'icône à l'intérieur du span
  icon.classList.add('icon'); // On ajoute une classe "delete" au span pour pouvoir le styliser
  // On créé un span pour l'icône "fa-arrows-up-down-left-right"
  const icon1 = document.createElement('span');
  icon1.innerHTML = '<i class="fa-solid fa-arrows-up-down-left-right"></i>';
  icon1.classList.add('icon1');
  figure.appendChild(icon1);// On ajoute l'icône "fa-arrows-up-down-left-right" à la figure
  figure.appendChild(icon); // On ajoute l'icône poubelle à la figure
  figure.appendChild(figCaption);// On met le figcaption dans la figure
  figure.appendChild(img);// On met l'image dans la figure
  figure.classList.add('picture'); // Ajouter la classe 'picture'
  return figure; // et on retourne le HTML de la figure
}

const openModalButton = document.querySelector('#change');
openModalButton.addEventListener('click', function() {
  displayWorksInModal();
  // Code pour ouvrir la modale ici
});

// Vérifie si un travail est déjà présent dans la modale
function isWorkAlreadyInModal(workHtml, modalContent) {
  const figures = modalContent.querySelectorAll('figure');
  for (let i = 0; i < figures.length; i++) {
    if (figures[i].outerHTML === workHtml.outerHTML) {
      return true;
    }
  }
  return false;
}



