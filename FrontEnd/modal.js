
// Récupérer la modale et le bouton "modifier"
const btn = document.querySelector(".change");
const modal = document.getElementById("myModal");

// Récupérer l'élément <span> qui permet de fermer la modale
const span = document.querySelector(".close");

//Toutes les const du site
const modalBody = document.getElementById("modal-header");
const galleryTitle = document.createElement("h3");

// Récupérer la div "modal-footer"
const modalFooter = document.getElementById('modal-footer');

//Bouton ajouter une photo
const ajouterBtn = document.createElement('button');

//Bouton supprimer gallery
const supprimerBtn = document.createElement('button');

//Bouton valider
const validerBtn = document.createElement('button');

//Ajouter le header , Récupérer la div "modal-header"
const modalHeader = document.getElementById('modal-header');

//Créer la flèche
const arrow = document.createElement('span');

//titre deuxième vue modal
const ajoutTitle = document.createElement("h3");
//const modalBody2 = document.getElementById('modal-body');

// Récupérer la div qui contient le contenu de la modal
//const modalContent = document.getElementById("modal-content");

//icon à la place de la photo
const icon = document.createElement('span'); 

//Emplacement nouvelle photo
const photo = document.createElement("img");
const label = document.createElement("label");

//Bouton choisir fichier
const input = document.createElement("input");

//bouton pour + ajout photo
const button = document.createElement("button");

// Ajouter un événement click sur le bouton "modifier" pour afficher la modale
btn.addEventListener("click", () => {
  modal.style.display = "block";
  displayWorksInModal(); // Appeler la fonction pour afficher les travaux dans la modale
  validerBtn.style.display = 'none';
  ajouterBtn.style.display = 'block';
  supprimerBtn.style.display = 'block';
  // ajout du titre h3
  galleryTitle.textContent = "Galerie photo";
  modalBody.appendChild(galleryTitle);
  ajoutTitle.innerHTML = '';
});

// Ajouter un événement click sur l'élément <span> pour fermer la modale
span.addEventListener("click", () => {
  modal.style.display = "none";
});

// Ajouter un événement fermer la modale si l'utilisateur clique en dehors de la modale
window.addEventListener("click", (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});

// ajout du titre h3
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

// Créer le bouton "Ajouter une photo"
ajouterBtn.className = 'ajout';
ajouterBtn.textContent = 'Ajouter une photo';

// Créer le bouton "Supprimer la Galerie"
supprimerBtn.className = 'supprimer';
supprimerBtn.textContent = 'Supprimer la Galerie';

// Créer le bouton "Valider"
validerBtn.className = 'valider';
validerBtn.textContent = 'Valider';
validerBtn.style.display = 'none';

// Ajouter les boutons à la fin de la div "modal-footer"
modalFooter.appendChild(ajouterBtn);
modalFooter.appendChild(supprimerBtn);
modalFooter.appendChild(validerBtn);

//Créer le bouton flèche
arrow.textContent = '←';
arrow.className = 'arrow arrow-hidden'; // Ajouter la classe "arrow-hidden"';
// Ajouter la flèche à  la div "modal-header"
modalHeader.appendChild(arrow);

arrow.addEventListener("click", function() {
  validerBtn.style.display = 'none';
  ajouterBtn.style.display = 'block';
  supprimerBtn.style.display = 'block';
  galleryTitle.textContent = "Galerie photo";
  modalBody.replaceChild(galleryTitle, ajoutTitle);
  displayWorksInModal();
});

// Ajouter un écouteur d'événements sur le bouton
ajouterBtn.addEventListener('click', function() {
  // Changer le contenu de la modal
  ajoutTitle.textContent = "Ajout photo";
  modalBody.replaceChild(ajoutTitle, galleryTitle); // remplacer le titre "Galerie photo" par "Ajout photo" dans la modal
  // Afficher la flèche dans la deuxième vue
  arrow.classList.remove('arrow-hidden');
  ajouterBtn.style.display = 'none'; // Cacher le bouton "Ajouter une photo"
  supprimerBtn.style.display = 'none'; // Cacher le bouton "Supprimer la Galerie"
  validerBtn.style.display = 'block'; // Afficher le bouton "Valider"
  photo.style.display = "none";
});

// Sélectionner la modal-body pour  Ajouter un écouteur d'événements sur le bouton
ajouterBtn.addEventListener('click', () => {
  // Sélectionner la modal-body pour le formulaire
const modalBody1 = document.getElementById('modal-body');
const ajoutForm = document.createElement('form');
// Div pour placement icone, bouton et image
const photoDiv = document.createElement("div");
  // Supprimer tous les nœuds enfants de la modal-body
  removeAllChildNodes(modalBody1);
    // Créer un formulaire
    ajoutForm.classList.add('ajout-form');
    ajoutForm.setAttribute('action', '/upload');
    ajoutForm.setAttribute('method', 'post');
    ajoutForm.setAttribute('enctype', 'multipart/form-data');
    photoDiv.classList.add("photo-div");
    icon.classList.add("fa-regular", "fa-image");
    photoDiv.appendChild(icon);
  
    // Créer l'emplacement photo
    photo.setAttribute("id", "photo");
    photo.setAttribute("alt", "");
    photo.setAttribute("src", "");
    photoDiv.appendChild(photo);
    label.setAttribute("for", "photo-upload");
    photoDiv.appendChild(label);
    
    // Créer un champ de fichier
    // Créer un bouton pour ajouter une photo
    
    button.classList.add("ajout");
    button.className = 'addpicture';
    button.textContent = "+ Ajouter photo";
    label.appendChild(button);

    // Créer un champ de fichier caché lié au bouton
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
  console.log(input);
  const file = input.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    photo.setAttribute("src", reader.result);
    if (photo.getAttribute('src')) {
      icon.style.display = 'none';
      console.log(icon);
      span.style.display = 'none';
      button.style.display = 'none';
      validerBtn.style.backgroundColor = '#1D6154';
            console.log(button);
      ajoutForm.style.marginBottom = '0px';
      photoDiv.style.margin ='0px';
      photo.style.display = "block";
    } else {
      icon.style.display = '';
      console.log(icon);
      button.style.display = '';
      console.log(button);
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
  const input = document.querySelector('input[type="file"]');

  const title = document.querySelector('#text').value;
  
  const category = document.querySelector('#choix').value;

 // Créer dynamiquement l'élément "div" pour afficher le message d'erreur
 const errorMessage = document.createElement('div');
 errorMessage.classList.add('error-message'); // Ajouter une classe pour styliser l'élément

  const photo = document.querySelector('#photo-upload').files[0];
  if (!title || !category || !photo) {
    // Afficher un message d'erreur si le formulaire n'est pas correctement rempli
    errorMessage.innerText = 'Veuillez remplir tous les champs du formulaire.';
    validerBtn.parentNode.insertBefore(errorMessage, validerBtn);
    // Supprimer l'élément d'erreur au bout de 4 secondes
    setTimeout(function() {
      errorMessage.remove();
    }, 4000);
    return;
  }
  
  // Récupération du contenu de l'image
  const file = input.files[0];

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
    
    const token = localStorage.getItem('token');

    const headers = new Headers();
    headers.append('Authorization', 'Bearer ' + token);
  
    // Envoi de la requête POST avec fetch
    fetch('http://localhost:5678/api/works', {
      method: 'POST',
      headers: headers,
      body: formData,
    })
    .then(response => response.json())
    .then(data => {
      
       // Ajouter l'image à la galerie
       const figure = addOneWorkToGallery(data);
       const gallery = document.querySelector('#gallery');
       gallery.appendChild(figure);
      
      // Ajouter l'image à la modal
      addOneWorkToModal(data);

      // Afficher la réponse de l'API si le formulaire est correctement envoyé
      console.log(data);
    })
  }
});

//FONCTION DELETE 
const deleteImage = (id, figure) => {
  const token = localStorage.getItem('token');
  const headers = new Headers();
  headers.append('Authorization', 'Bearer ' + token);

  fetch(`http://localhost:5678/api/works/${id}`, {
    method: 'DELETE',
    headers: headers,
  })
  .then(response => {
    if (response.ok) {
      console.log("L'image a été supprimée avec succès.");
      // Supprimer l'image du DOM
      const gallery = document.querySelector('#gallery');
      gallery.removeChild(figure);
    } else {
      console.error("La suppression de l'image a échoué.");
    }
  })
  .catch(error => {
    console.error("Une erreur s'est produite lors de la suppression de l'image :", error);
  });
};

// Ajouter l'événement de clic à l'icône de suppression
icon.addEventListener('click', () => {
  const id = 3; // Remplacez l'ID de l'image à supprimer
  deleteImage(id, figure);
});

