
// Récupérer la modale et le bouton "modifier"
const btn = document.querySelector(".change");
const modal = document.getElementById("myModal");

// Récupérer l'élément <span> qui permet de fermer la modale
const span = document.querySelector(".close");

// Ajouter un événement click sur le bouton "modifier" pour afficher la modale
btn.addEventListener("click", () => {
  modal.style.display = "block";
  displayWorksInModal(); // Appeler la fonction pour afficher les travaux dans la modale
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

// ajout du titre h3
const modalBody = document.getElementById("modal-header");
const galleryTitle = document.createElement("h3");
galleryTitle.textContent = "Galerie photo";
modalBody.appendChild(galleryTitle);

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
      const modalBody = document.querySelector("#modal-body");
      removeAllChildNodes(modalBody); // Supprimer tous les nœuds enfants de la modal body avant d'ajouter les nouveaux travaux
      // Ajouter chaque travail dans la modal body s'il n'est pas déjà présent
      data.forEach(work => {
        const workHtml = addOneWorkToModal(work);
        if (!isWorkAlreadyInModal(workHtml, modalBody)) {
          modalBody.appendChild(workHtml);
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
  // Ajouter l'événement de clic à l'icône de suppression
  icon.addEventListener('click', () => {
    const id = work.id; // On récupère l'identifiant de l'image
    deleteImage(id, figure); // On supprime l'image en passant la figure correspondante
  });
  return figure; // et on retourne le HTML de la figure
}

// Fonction pour vérifier si un travail est déjà présent dans la modal
function isWorkAlreadyInModal(workHtml, modalBody) {
  const existingWorks = modalBody.querySelectorAll('.picture');
  for (let i = 0; i < existingWorks.length; i++) {
    if (existingWorks[i].querySelector('img').src === workHtml.querySelector('img').src) {
      return true;
    }
  }
  return false;
}

// Récupérer la div "modal-footer"
const modalFooter = document.getElementById('modal-footer');

// Créer le bouton "Ajouter une photo"
const ajouterBtn = document.createElement('button');
ajouterBtn.className = 'ajout';
ajouterBtn.textContent = 'Ajouter une photo';

// Créer le bouton "Supprimer la Galerie"
const supprimerBtn = document.createElement('button');
supprimerBtn.className = 'supprimer';
supprimerBtn.textContent = 'Supprimer la Galerie';

// Créer le bouton "Valider"
const validerBtn = document.createElement('button');
validerBtn.className = 'valider';
validerBtn.textContent = 'Valider';
validerBtn.style.display = 'none';

// Ajouter les boutons à la fin de la div "modal-footer"
modalFooter.appendChild(ajouterBtn);
modalFooter.appendChild(supprimerBtn);
modalFooter.appendChild(validerBtn);

// Récupérer la div "modal-header"
const modalHeader = document.getElementById('modal-header');
//Créer le bouton flèche
const arrow = document.createElement('span');
arrow.textContent = '←';
arrow.className = 'arrow arrow-hidden'; // Ajouter la classe "arrow-hidden"';
// Ajouter la flèche à  la div "modal-header"
modalHeader.appendChild(arrow);

//evenement sur la flèche 
arrow.addEventListener("click", function() {
 
});

// Récupérer la div qui contient le contenu de la modal
const modalContent = document.getElementById("modal-content");

// Ajouter un écouteur d'événements sur le bouton
ajouterBtn.addEventListener('click', function() {
  // Changer le contenu de la modal
  const modalBody = document.getElementById("modal-header");
  const ajoutTitle = document.createElement("h3");
  ajoutTitle.textContent = "Ajout photo";
  modalBody.replaceChild(ajoutTitle, galleryTitle); // remplacer le titre "Galerie photo" par "Ajout photo" dans la modal
  // Afficher la flèche dans la deuxième vue
  arrow.classList.remove('arrow-hidden');
  ajouterBtn.style.display = 'none'; // Cacher le bouton "Ajouter une photo"
  supprimerBtn.style.display = 'none'; // Cacher le bouton "Supprimer la Galerie"
  validerBtn.style.display = 'block'; // Afficher le bouton "Valider"
});

// Sélectionner la modal-body
const modalBody1 = document.getElementById('modal-body');

// Ajouter un écouteur d'événements sur le bouton
ajouterBtn.addEventListener('click', () => {
  // Supprimer tous les nœuds enfants de la modal-body
  removeAllChildNodes(modalBody1);

    // Créer un formulaire
    const ajoutForm = document.createElement('form');
    ajoutForm.classList.add('ajout-form');
    ajoutForm.setAttribute('action', '/upload');
    ajoutForm.setAttribute('method', 'post');
    ajoutForm.setAttribute('enctype', 'multipart/form-data');
    const photoDiv = document.createElement("div");
    photoDiv.classList.add("photo-div");
    const icon = document.createElement("i");
    icon.classList.add("fa-regular", "fa-image");
    photoDiv.appendChild(icon);
    
    // Créer l'emplacement photo
    const photo = document.createElement("img");
    photo.setAttribute("id", "photo");
    photo.setAttribute("alt", "");
    photo.setAttribute("src", "");
    photoDiv.appendChild(photo);
    
    const label = document.createElement("label");
    label.setAttribute("for", "photo-upload");
    photoDiv.appendChild(label);
    
    // Créer un champ de fichier
    // Créer un bouton pour ajouter une photo
    const button = document.createElement("button");
    button.classList.add("ajout");
    button.className = 'addpicture';
    button.textContent = "+ Ajouter photo";
    label.appendChild(button);

    // Créer un champ de fichier caché lié au bouton
    const input = document.createElement("input");
    input.setAttribute("id", "photo-upload");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.style.display = "none"; // cacher l'input
    label.appendChild(input);

// Ajouter un écouteur d'événements sur le bouton pour déclencher l'input de fichier
button.addEventListener("click", (e) => {
  e.preventDefault();
  input.click(); // cliquer sur l'input caché
});

input.addEventListener("change", () => {
  const file = input.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    photo.setAttribute("src", reader.result);
    if (photo.getAttribute('src')) {
      icon.style.display = 'none';
      ajoutForm.style.marginBottom = '0px';
      photoDiv.style.margin ='0px';
      photo.style.display = "block";
    } else {
      icon.style.display = '';
      ajoutForm.style.marginBottom = '60px';
      photoDiv.style.marginBottom = '20px';
      photo.style.display = "none";
    }
  };

});

    // Texte image acceptées
    const span = document.createElement("span");
    span.classList.add("text");
    span.textContent = "jpg, png : 4mo max";
    photoDiv.appendChild(span);
    ajoutForm.appendChild(photoDiv);
    
    // Créer un champ texte
    const labelTitre = document.createElement("label");
    labelTitre.classList.add("title1");
    labelTitre.setAttribute("for", "text");
    labelTitre.textContent = "Titre";
    ajoutForm.appendChild(labelTitre);
    ajoutForm.appendChild(document.createElement("br"));
    ajoutForm.appendChild(document.createElement("br"));
    
    const inputTitre = document.createElement("input");
    inputTitre.classList.add("no-border");
    inputTitre.setAttribute("id", "text");
    inputTitre.setAttribute("type", "text");
    inputTitre.setAttribute("name", "title");
   
    inputTitre.setAttribute("maxlength", "50");
    ajoutForm.appendChild(inputTitre);
    ajoutForm.appendChild(document.createElement("br"));
    ajoutForm.appendChild(document.createElement("br"));
   
   // Ajouter un label et un menu déroulant pour la catégorie
   const labelCategorie = document.createElement("label");
   labelCategorie.classList.add("title1");
   labelCategorie.setAttribute("for", "choix");
   labelCategorie.textContent = "Catégorie";
   ajoutForm.appendChild(labelCategorie);
   ajoutForm.appendChild(document.createElement("br"));
   
 
   const select = document.createElement("select");
   select.setAttribute("id", "choix");
   select.setAttribute("name", "category");
   select.setAttribute("title", "Choix d'une option");
   ajoutForm.appendChild(select);
 
   // Ajouter une option vide en première position
   const emptyOption = document.createElement("option");
   emptyOption.setAttribute("value", "");
   emptyOption.textContent = "";
   select.appendChild(emptyOption);
   // Ajouter le formulaire à la modal-body
   modalBody1.appendChild(ajoutForm);


 // Récupération des catégories via l'API
 fetch("http://localhost:5678/api/categories")
 .then(res => res.json())
 .then(categories => {
   // Ajouter les options dans le menu déroulant
   categories.forEach(category => {
     const option = document.createElement("option");
     option.setAttribute("value", category.id);
     option.textContent = category.name;
     select.appendChild(option);
   });
 })
 .catch(err => {
   console.log("Erreur lors de la récupération des catégories :", err);
 });
});

//AJOUT image  VIA LE FORMULAIRE 
validerBtn.addEventListener('click', function() {
  // Récupération de l'élément input contenant le fichier sélectionné
  console.log(validerBtn)
  const input = document.querySelector('input[type="file"]');
  console.log("input:", input);
  const title = document.querySelector('#text').value;
  console.log("title:", title);
  const category = document.querySelector('#choix').value;
  console.log("category:", category);
  const photo = document.querySelector('#photo-upload').files[0];
  console.log("photo:", photo);
  if (!title || !category || !photo) {
    // Afficher un message d'erreur si le formulaire n'est pas correctement rempli
    alert('Veuillez remplir tous les champs du formulaire.');
    return;
  }

 
  // Récupération du contenu de l'image
  const file = input.files[0];
  console.log(file);
  const reader = new FileReader();
  reader.readAsArrayBuffer(file);
  

  reader.onload = function() {
    const imageData = reader.result;
    const imageBlob = new Blob([imageData], { type: file.type });

    // Ajout des données à envoyer avec l'objet FormData
    const formData = new FormData();
    formData.append('image', imageBlob);
    formData.append('title', title);
    formData.append('category', category);
    console.log(formData);
    const token = localStorage.getItem('token');
    console.log(localStorage);
    const headers = new Headers();
    headers.append('Authorization', 'Bearer ' + token);
    console.log("http://localhost:5678/api/works");
    // Envoi de la requête POST avec fetch
    fetch('http://localhost:5678/api/works', {
      method: 'POST',
      headers: headers,
      body: formData,
    })
    .then(response => response.json())
    .then(data => {
      console.log("Réponse de l'API:", data);
       // Ajouter l'image à la galerie
       const figure = addOneWorkToGallery(data);
       const gallery = document.querySelector('#gallery');
       gallery.appendChild(figure);
      
      // Ajouter l'image à la modal
      addOneWorkToModal(data);
      // Afficher la réponse de l'API si le formulaire est correctement envoyé
      console.log(data);
      // Recharger la page pour afficher le nouveau projet dans la galerie
      location.reload();
    })

  }
});

//FONCTION DELETE 
const icon = document.createElement('span'); 
const deleteImage = (id,figure) => {
  const token = localStorage.getItem('token');
  const headers = new Headers();
  headers.append('Authorization', 'Bearer ' + token);

  fetch(`http://localhost:5678/api/works/${id}`, {
    method: 'DELETE',
    headers: headers,
  })
  .then(response => response.json())
  .then(data => {
    console.log("Réponse de l'API:", data);
    // Supprimer l'image du DOM
    
  const gallery = document.querySelector('#gallery');
  gallery.removeChild(figure);
  })
}
// Ajouter l'événement de clic à l'icône de suppression
icon.addEventListener('click', () => {
  const id = 3; // Remplacez l'ID de l'image à supprimer
  deleteImage(id);
});
