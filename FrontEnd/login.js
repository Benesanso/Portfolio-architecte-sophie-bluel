
// Formulaire de connexion
const loginForm = document.getElementById('login-form');

// Récupérer l'élément HTML pour afficher les messages d'erreur
const errorMessage = document.getElementById('erreur');
// Ajouter un écouteur d'événement au formulaire de connexion
loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
// Récupérer les valeurs des champs email et mot de passe
 const email = document.getElementById('email').value;
 const password = document.getElementById('password').value;

// Envoyer une requête POST pour se connecter
fetch('http://localhost:5678/api/users/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
    body: JSON.stringify({ email, password })
  })
  .then(response => {
    if (response.ok) {
    // La combinaison email / password est correcte
      return response.json();
    } else {
    // La combinaison email / password est incorrecte
      throw new Error('Erreur dans l’identifiant ou le mot de passe');
    }
  })
  .then(data => {
    localStorage.setItem('token', data.token);
    
    // Rediriger vers la page d'accueil
    window.location.href = "index.html";
   
  })
  .catch(error => {
    // Afficher un message d'erreur
    errorMessage.style.display = 'block';
    errorMessage.textContent = error.message;
  });
});

const loginLink = document.querySelector('a[href="login.html"]');

loginLink.addEventListener('click', () => {
  // Ajouter la classe active
  loginLink.classList.add('active');
  // Supprimer la classe inactive
  loginLink.classList.remove('inactive');
});
