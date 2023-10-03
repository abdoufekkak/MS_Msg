// Importer la bibliothèque Express avec la syntaxe ES modules
import  express  from "express";
const client = require("./src/rote/UserRote.ts");
// const cors = require("cors");

// Créer une instance d'application Express
const app = express();

app.use(express.json());

app.use("/api/client", client);

// Définir une route pour la page d'accueil
app.get('/', (req:any, res:any) => {
  res.send('Hello, World!');
});

// Définir le port sur lequel le serveur écoutera
const port = 3000;
const host = '192.168.0.7'; // Adresse IP sur laquelle le serveur écoute (0.0.0.0 signifie toutes les adresses IP disponibles)

// Démarrer le serveur
app.listen(port,host, () => {
  console.log(`Serveur Express en cours d'exécution sur le port ${port}`);
});
