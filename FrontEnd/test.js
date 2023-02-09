  // Filtrer les produits par catégorie
  const filteredProducts = products.filter(product => product.categoryId === 11);
  console.log(filteredProducts);
  
  // Trier les produits par nom
  const sortedProducts = products.sort((a, b) => a.title.localeCompare(b.title));
  console.log(sortedProducts);


  
links.forEach(link => {
    link.addEventListener("click", function(event) {
      event.preventDefault();
      // Faire quelque chose lorsque le lien est cliqué
    });
  });


  for (let i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function(event) {
      event.preventDefault();
      // filtrer les produits en fonction de la classe du lien cliqué
      const selectedClass = event.target.className;
      // mettre à jour la visibilité des produits en fonction du filtre sélectionné
    });
  }
  Notez que ce code utilise la méthode filter pour filtrer les produits en fonction de la catégorie sélectionnée et la méthode localStorage.setItem pour enregistrer les produits filtrés dans le localStorage. La fonction updateProductDisplay est appelée pour mettre à jour l'affichage des produits filtrés. Vous pouvez implémenter cette fonction en fonction de votre propre implémentation de l'affichage des produits.
  
  
  
  
  
  for (let i = 0; i < links.length; i++) {
      links[i].addEventListener('click', function (event) {
        event.preventDefault();
        
        // récupérer le nom de la catégorie cliquée
        const categoryName = this.innerHTML;
    
        // filtrer les produits en fonction de la catégorie
        const filteredProducts = products.filter(function (product) {
          for (let j = 0; j < categories.length; j++) {
            if (categories[j].name === categoryName) {
              return categories[j].id.indexOf(product.categoryId) !== -1;
            }
          }
        });
    
        // enregistrer les produits filtrés dans le localStorage
        localStorage.setItem('filteredProducts', JSON.stringify(filteredProducts));
    
        // appeler la fonction d'affichage des produits filtrés
        displayProducts(filteredProducts);
      });
    }
   
    function displayProducts(productsToDisplay) {
      // ici vous pouvez afficher les produits filtrés en utilisant les produits à afficher en argument
    }
  
  
    
    const filters = ['Tous', 'Objets', 'Appartements', 'Hôtels & restaurants'];
  
    const filter = [
      { name: 'Tous', categoryId: 0 },
      { name: 'Objets', categoryId: 1 },
      { name: 'Appartements', categoryId: 2 },
      { name: 'Hôtels & restaurants', categoryId: 3 }
    ];
    
  
  // Boucle sur tous les travaux
figures.forEach(figure => {
  // Récupération de la catégorieId du travail
  const workCategoryId = figure.dataset.categoryId;

  // Si le nom de la catégorieId est égal au nom du filtre sélectionné, afficher le travail
  if (workCategoryId === this.textContent) {
    figure.style.display = 'block';
  } else {
    // Sinon, cacher le travail
    figure.style.display = 'none';
  }
});

  
  
   
  

//Recupération de l'élément dans le document grâce au sélecteur


//Récupération des produits depuis le backend
const products = [
    {id: 1, title: 'Abajour Tahina', imageUrl: 'http://localhost:5678/images/abajour-tahina1651286843956.png', categoryId: 1, userId: 1},
    {id: 2, title: 'Appartement Paris V', imageUrl: 'http://localhost:5678/images/appartement-paris-v1651287270508.png', categoryId: 2, userId: 1},
    {id: 3, title: 'Restaurant Sushisen - Londres', imageUrl: 'http://localhost:5678/images/restaurant-sushisen-londres1651287319271.png', categoryId: 3, userId: 1},
    {id: 4, title: 'Villa “La Balisiere” - Port Louis', imageUrl: 'http://localhost:5678/images/la-balisiere1651287350102.png', categoryId: 2, userId: 1},
    {id: 5, title: 'Structures Thermopolis', imageUrl: 'http://localhost:5678/images/structures-thermopolis1651287380258.png', categoryId: 1, userId: 1},
    {id: 6, title: 'Appartement Paris X', imageUrl: 'http://localhost:5678/images/appartement-paris-x1651287435459.png', categoryId: 2, userId: 1},
    {id: 7, title: 'Pavillon “Le coteau” - Cassis', imageUrl: 'http://localhost:5678/images/le-coteau-cassis1651287469876.png', categoryId: 2, userId: 1},
    {id: 8, title: 'Villa Ferneze - Isola d’Elba', imageUrl: 'http://localhost:5678/images/villa-ferneze1651287511604.png', categoryId: 2, userId: 1},
    {id: 9, title: 'Appartement Paris XVIII', imageUrl: 'http://localhost:5678/images/appartement-paris-xviii1651287541053.png', categoryId: 2, userId: 1},
    {id: 10, title: 'Bar “Lullaby” - Paris', imageUrl: 'http://localhost:5678/images/bar-lullaby-paris1651287567130.png', categoryId: 3, userId: 1},
    {id: 11, title: 'Hotel First Arte - New Delhi', imageUrl: 'http://localhost:5678/images/hotel-first-arte-new-delhi1651287605585.png', categoryId: 3, userId: 1},
  ];
  
// liste par catégories
const categories = [
    {id:[ 1, 5], name: 'Objets'},
    {id: [ 2, 4, 6, 7, 8, 9], name: 'Appartements'},
    {id: [ 3, 10, 11], name: 'Hotels & restaurants'},
    {id:[ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], name: 'Tous'},
];

let filters = document.querySelectorAll("#filters a");

filters.forEach(filter => {
  filter.addEventListener("click", function(event) {
    event.preventDefault();
    let category = event.target.textContent;
    let filteredProducts = products.filter(product => {
      return product.category === category;
    });
    console.log(filteredProducts);
  });
});
  



fetch("http://localhost:5678/api/works")
.then(res => res.json())
.then(data => {
    //Créez une copie des données pour éviter tout effet secondaire sur les données originales
    let produits = [...data];

    //Utilisez la méthode filter pour filtrer les produits par catégorie
    const filtrerProduits = (categorieId) => {
        let filtredData = produits.filter(function (produit) {
            return produit.categoryId === categorieId;
        });

        //Videz la liste des produits pour ajouter les produits filtrés
        document.querySelector(".gallery").innerHTML = "";

        //Ajoutez les produits filtrés à la liste
        filtredData.forEach(function (item) {
            let produit = templateHTML(item)
            document.querySelector(".gallery").appendChild(produit)
        });
        
    }

    //Ajoutez un addEventListener à chaque filtre pour écouter les événements de clic
    document.querySelector("#filters .link1").addEventListener("click", function () {
        filtrerProduits(0);
    });
    
    document.querySelector("#filters .link2").addEventListener("click", function () {
        filtrerProduits(1);
    });
    document.querySelector("#filters .link3").addEventListener("click", function () {
        filtrerProduits(2);
    });
    document.querySelector("#filters .link4").addEventListener("click", function () {
        filtrerProduits(3);
    });
})
.catch(err => {
    console.log("dans le catch")
    console.log(err)
});

document.getElementById("filters").appendChild(select);

//Recupération de l'élément dans le document grâce au sélecteur
const select = document.querySelector("#filters");

const filters = ['Tous', 'Objets', 'Appartements', 'Hôtels & restaurants'];

const filter = document.createElement('#filters');
filter.id = 'category-filter';

filters.forEach(filter => {
  const option = document.createElement('option');
  option.value = filter;
  option.textContent = filter;
  select.appendChild(option);
});

const filtersContainer = document.getElementById('filters');
filtersContainer.appendChild(select);


select.addEventListener("change", function() {
    const categoryId = this.value;
    const filteredData = data.filter(function(item) {
        return item.categoryId == categoryId;
    });

    document.querySelector(".gallery").innerHTML = "";
    filteredData.forEach(function(item) {
        let produit = templateHTML(item);
        document.querySelector(".gallery").appendChild(produit);
    });
});
 
const items = [
    {  name: 'Objet', category: 'Objets' },
    {  name: 'Appartement', category: 'Appartements' },
    {  name: 'Hôtel', category: 'Hôtels & restaurants' },
    {  name: 'Tous', category: 'Tous'},
    // ...
  ];
  
  const categories = items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});
  
  console.log(categories);
  
  const projects = [
    { id: 1, title: 'Project 1', categoryId: 1 },
    { id: 2, title: 'Project 2', categoryId: 2 },
    { id: 3, title: 'Project 3', categoryId: 3 },
    // ... ajoutez les autres projets ici
  ];
  
  const categories = [
    { id: 1, name: 'Objets' },
    { id: 2, name: 'Appartements' },
    { id: 3, name: 'Hotels & restaurants' },
    { id: [1, 2, 3], name: 'Tous' },
  ];
  






  const categorizedProjects = {};
  
  categories.forEach((category) => {
    categorizedProjects[category.name] = [];
  });
  
  projects.forEach((project) => {
    categories.forEach((category) => {
      if (category.id.includes(project.categoryId)) {
        categorizedProjects[category.name].push(project);
      }
    });
  });
  
  console.log(categorizedProjects);
  
// Récupération du bouton actif
const activeBtn = document.querySelector('.active-filter');

// Fonction pour afficher les projets en fonction de la catégorie sélectionnée
function showProjectsByCategory(categoryId) {
  projects.forEach(project => {
    // Si la catégorie du projet correspond à la catégorie sélectionnée, on affiche le projet
    if (project.categoryId === categoryId || categoryId === [1, 2, 3]) {
      document.querySelector('.gallery').appendChild(templateHTML(project));
    }
  });
}

// Écouteur d'événement sur le bouton actif pour afficher les projets en fonction de la catégorie sélectionnée
activeBtn.addEventListener('click', function() {
  // Récupération de l'ID de la catégorie sélectionnée
  const selectedCategoryId = categories.find(category => category.name === activeBtn.textContent).id;
  // Suppression des projets affichés précédemment
  document.querySelector('.gallery').innerHTML = '';
  // Affichage des projets en fonction de la catégorie sélectionnée
  showProjectsByCategory(selectedCategoryId);
});

const categories = [
    { id: 1, name: 'Objets' },
    { id: 2, name: 'Appartements' },
    { id: 3, name: 'Hotels & restaurants' },
    { id: [1, 2, 3], name: 'Tous' },
  ];

  const projects = [
    {  name: 'Objets', categoryId: 1 },
    {  name: 'Appartements', categoryId: 2 },
    {  name: 'Hotels & restaurants', categoryId: 3 },
    {  name: 'Tous', categoryId:[1, 2, 3]  },
  ];
  
// Récupération du bouton actif
const activeBtn = document.querySelector('.active-filter');

// Fonction pour afficher les projets en fonction de la catégorie sélectionnée
function showProjectsByCategory(categoryId) {
  projects.forEach(project => {
    // Si la catégorie du projet correspond à la catégorie sélectionnée, on affiche le projet
    if (project.categoryId === categoryId || categoryId === [1, 2, 3]) {
      document.querySelector('.gallery').appendChild(templateHTML(project));
    }
  });
}
const categories = [{name: 'Tous', id: ''}, {name: 'Objets', id: '1'}, {name: 'Appartements', id: '2'}, {name: 'Hôtels & restaurants', id: '3'}];

fetch("http://localhost:5678/api/works")
  .then(res => res.json())
  .then(data => {
    displayProducts('');
  })
  .catch(err => {
    console.log("dans le catch")
    console.log(err)
  });





  
// Création des catégories
const filters = ['Tous', 'Objets', 'Appartements', 'Hôtels & restaurants'];
//Recupération de l'élément dans le document grâce au sélecteur
const filterContainer = document.querySelector('#filters');

// Recupération de la liste des categories
fetch("http://localhost:5678/api/categories")
  .then(res => res.json())
  .then(data => {  
    const filters = data.map(category => category.name);
    // Recupération de l'élément dans le document grâce au sélecteur
    const filterContainer = document.querySelector('#filters');

    //Crétation des filtres
    filters.forEach(filter => {
      const btn = document.createElement('button');
      btn.textContent = filter;
      // code CSS pour styliser les boutons
      btn.style.backgroundColor = 'white';
      btn.style.color = '#1D6154';
      btn.style.fontWeight = '600';
      btn.style.fontFamily = 'syne';
      btn.style.borderRadius = '20px';
      btn.style.border = "1px solid #1D6154";
      btn.style.padding = '5px 15px';
      btn.style.margin = '5px';
      btn.style.cursor = 'pointer';
      btn.addEventListener('click', function() {
        const activeBtn = document.querySelector('.active-filter');
        if (activeBtn) {
          activeBtn.style.backgroundColor = 'white';
          activeBtn.style.color = '#1D6154';
          activeBtn.classList.remove('active-filter');
        }
        this.style.backgroundColor = '#1D6154';
        this.style.color = 'white';
        this.classList.add('active-filter');
      });
      filterContainer.appendChild(btn);
    });
  })
  .catch(err => {
    console.log("dans le catch")
    console.log(err)
  });




  
// Recuperation de la liste des categories
fetch("http://localhost:5678/api/categories")
.then(res => res.json())
.then(data => {
  
  const filters = data.map(category => category.name);
  const allCategories = [...filters, "Tous"];

  // Recuperation de l'element dans le document grace au selecteur
  const filterContainer = document.querySelector('#filters');

  // Creation des filtres
  allCategories.forEach(filter => {
    const btn = document.createElement('button');
    btn.textContent = filter;
    // code CSS pour styliser les boutons
    btn.style.backgroundColor = 'white';
    btn.style.color = '#1D6154';
    btn.style.fontWeight = '600';
    btn.style.fontFamily = 'syne';
    btn.style.borderRadius = '20px';
    btn.style.border = "1px solid #1D6154";
    btn.style.padding = '5px 15px';
    btn.style.margin = '5px';
    btn.style.cursor = 'pointer';
    btn.addEventListener('click', function() {
      const activeBtn = document.querySelector('.active-filter');
      if (activeBtn) {
        activeBtn.style.backgroundColor = 'white';
        activeBtn.style.color = '#1D6154';
        activeBtn.classList.remove('active-filter');
      }
      this.style.backgroundColor = '#1D6154';
      this.style.color = 'white';
      this.classList.add('active-filter');
    });
    filterContainer.appendChild(btn);
  });
})
.catch(err => {
  console.error(err);
});
// Recupération de la liste des categories
fetch("http://localhost:5678/api/categories")
  .then(res => res.json())
  .then(data => {  
    const filters = data.map(category => category.name);
    // Ajout du bouton TOUS en premier dans la liste
    filters.unshift("Tous");
    // Recupération de l'élément dans le document grâce au sélecteur
    const filterContainer = document.querySelector('#filters');
   

    //Crétation des filtres
    filters.forEach(filter => {
      const btn = document.createElement('button');
      btn.textContent = filter;
      // code CSS pour styliser les boutons
      btn.style.backgroundColor = 'white';
      btn.style.color = '#1D6154';
      btn.style.fontWeight = '600';
      btn.style.fontFamily = 'syne';
      btn.style.borderRadius = '20px';
      btn.style.border = "1px solid #1D6154";
      btn.style.padding = '5px 15px';
      btn.style.margin = '5px';
      btn.style.cursor = 'pointer';
      btn.addEventListener('click', function() {
        const activeBtn = document.querySelector('.active-filter');
        if (activeBtn) {
          activeBtn.style.backgroundColor = 'white';
          activeBtn.style.color = '#1D6154';
          activeBtn.classList.remove('active-filter');
        }
        this.style.backgroundColor = '#1D6154';
        this.style.color = 'white';
        this.classList.add('active-filter');
        
      });

      filterContainer.appendChild(btn);
      
  
    });

    
  })
  .catch(err => {
    console.log("dans le catch")
    console.log(err)
  });



  









fetch("http://localhost:5678/api/categories")
.then(res => res.json())
.then(data => {
  let displayCategories = data;

  const filters = data.map(category => category.name);
  // Ajout du bouton TOUS en premier dans la liste
  filters.unshift("Tous");
  // Recupération de l'élément dans le document grâce au sélecteur
  const filterContainer = document.querySelector('#filters');
 

  //Crétation des filtres
  filters.forEach(filter => {
    const btn = document.createElement('button');
    btn.textContent = filter;
    // code CSS pour le style des boutons
    btn.style.backgroundColor = 'white';
    btn.style.color = '#1D6154';
    btn.style.fontWeight = '600';
    btn.style.fontFamily = 'syne';
    btn.style.borderRadius = '20px';
    btn.style.border = "1px solid #1D6154";
    btn.style.padding = '5px 15px';
    btn.style.margin = '5px';
    btn.style.cursor = 'pointer';
    // fonction du click
    btn.addEventListener('click', function() {
      const activeBtn = document.querySelector('.active-filter');
      if (activeBtn) {
        activeBtn.style.backgroundColor = 'white';
        activeBtn.style.color = '#1D6154';
        activeBtn.classList.remove('active-filter');
      }
      this.style.backgroundColor = '#1D6154';
      this.style.color = 'white';
      this.classList.add('active-filter');

      // Fonction de filtrage
      const selectedFilter = this.textContent;
      if (selectedFilter === "Tous") {
        displayCategories = data;
      } else {
        displayCategories = data.filter(category => category.name === selectedFilter);
      }
    });
    filterContainer.appendChild(btn);
  });
})
.catch(err => {
  console.log("dans le catch")
  console.log(err)
});


fetch("http://localhost:5678/api/categories")
  .then(res => res.json())
  .then(data => {  
    // Récupération de la liste des categoryID
    const categoryIDs = data.map(category => category.id);
    const categories = data;
    const filterContainer = document.querySelector('#filters');
    console.log(categoryIDs);
    
    categories.forEach(category => {
      const btn = document.createElement('button');
      btn.textContent = category.name;
      // code CSS pour styliser les boutons
      btn.style.backgroundColor = 'white';
      btn.style.color = '#1D6154';
      btn.style.fontWeight = '600';
      btn.style.fontFamily = 'syne';
      btn.style.borderRadius = '20px';
      btn.style.border = "1px solid #1D6154";
      btn.style.padding = '5px 15px';
      btn.style.margin = '5px';
      btn.style.cursor = 'pointer';
      filterContainer.appendChild(btn);
    });
  })
  .catch(err => {
    console.log("dans le catch")
    console.log(err)
  });
 



  fetch("http://localhost:5678/api/categories")
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // Boucle sur les données pour obtenir l'Id et le name de chaque catégorie
    data.forEach(category => {
      const { categoryId, name } = category;
      const button = document.createElement("button");
      button.innerHTML = category.name;
      document.body.appendChild
      console.log(categoryId, name);
    });
  })
  .catch(error => console.error(error));

  fetch("http://localhost:5678/api/categories")
  .then(response => response.json())
  .then(categories => {
    categories.forEach(category => {
      // Créer un bouton pour chaque catégorie
      const button = document.createElement("button");
      button.innerHTML = category.name;
      // Styliser le bouton
      button.style.backgroundColor = "#YourColor";
      button.style.color = "#YourColor";
      button.style.padding = "10px 20px";
      button.style.borderRadius = "5px";
      // Attacher un événement click sur le bouton
      button.addEventListener("click", function() {
        // Filtrer les travaux en fonction de la catégorie sélectionnée
        const selectedFilter = this.innerHTML;
        if (selectedFilter === "Tous") {
          // Afficher tous les travaux
        } else {
          // Afficher uniquement les travaux correspondant à la catégorie sélectionnée
        }
      });
      // Ajouter le bouton à la page
      document.body.appendChild(button);
    });
  });



 
// Récupération de l'API des catégories
fetch("http://localhost:5678/api/categories")
  .then(res => res.json())
  .then(data => {
    console.log(data);
    // Ajout d'une catégorie "Tous" à la liste
    data.unshift({ categoryId: 0, name: "Tous" });

  
     // Récupération de la div des filtres
     const filters = document.querySelector("#filters");
    // Boucle sur les données pour obtenir l'Id et le name de chaque catégorie
    data.forEach(category => {
      const { categoryId, name } = category
      console.log(categoryId, name);
       // Création d'un bouton
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

          // Ajout de l'événement clique
     button.addEventListener("click", function () {
      // Réinitialisation du style de tous les boutons
      const buttons = document.querySelectorAll("button");
      const categoryId = this.getAttribute("data-category-id");
    

      buttons.forEach(btn => {
        btn.style.backgroundColor = "white";
        btn.style.color = "#1D6154";
      });
      // Mise en surbrillance du bouton cliqué
      this.style.backgroundColor = "#1D6154";
      this.style.color = "white";
    });
       
       // Ajout du bouton à la div des filtres
       filters.appendChild(button);
    });
  })
  .catch(err => {
    console.log("dans le catch")
    console.log(err)
  });
  
    
//Recupération de l'élément dans le document grâce au sélecteur
document.querySelector(".gallery");

//Récupération de l'api et des données
fetch("http://localhost:5678/api/works")
    .then(res => res.json())
    .then(data => {
        console.log(data)
        data.forEach(function(item){
          console.log(item.category.id)
            let produit = templateHTML(item)
            document.querySelector(".gallery").appendChild(produit)
        })
    })

    .catch(err => {
        console.log("dans le catch")
        console.log(err)
    })
    
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
    // Ajout d'une catégorie "Tous" à la liste
    //data.unshift({ categoryId: 0, name: "Tous" });
     // Récupération de la div des filtres
     const filters = document.querySelector("#filters");
    // Boucle sur les données pour obtenir l'Id et le name de chaque catégorie

    data.forEach(category => {
      const { categoryId, name } = category
      console.log(categoryId, name);
       // Création d'un bouton
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

     // Ajout de l'événement clique
     button.addEventListener("click", function () {
      // Réinitialisation du style de tous les boutons
      const buttons = document.querySelectorAll("button");
      const categoryId = this.getAttribute("data-category-id");
    

      buttons.forEach(btn => {
        btn.style.backgroundColor = "white";
        btn.style.color = "#1D6154";
      });
      // Mise en surbrillance du bouton cliqué
      this.style.backgroundColor = "#1D6154";
      this.style.color = "white";
    });
       
       // Ajout du bouton à la div des filtres
       filters.appendChild(button);
    });
  })
  .catch(err => {
    console.log("dans le catch")
    console.log(err)
  });
  
    


  
    
    

     

  
    
    

     