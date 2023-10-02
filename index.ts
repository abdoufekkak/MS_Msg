// Importer la bibliothèque Express avec la syntaxe ES modules
const express =require('express');

// Créer une instance d'application Express
const app = express();

// Définir une route pour la page d'accueil
app.get('/', (req:any, res:any) => {
  res.send('Hello, World!');
});

// Définir le port sur lequel le serveur écoutera
const port = 3000;

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur Express en cours d'exécution sur le port ${port}`);
});
