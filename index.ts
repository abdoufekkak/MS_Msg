// Importer la bibliothèque Express avec la syntaxe ES modules
import  express  from "express";
import cors from 'cors';
const client = require("./src/rote/UserRote.ts");
const message = require("./src/rote/MessageRoute.ts");
import { Server as SocketServer } from 'socket.io';
import multer from "multer";
// require('./globals'); // Importez le fichier globals.js pour initialiser la variable globale
const host =  'localhost'; // Adresse IP sur laquelle le serveur écoute (0.0.0.0 signifie toutes les adresses IP disponibles)

// const cors = require("cors");

// Créer une instance d'application Express
const app = express();
const corsOptions = {
  origin: `http://${host}:4200` // Remplacez par l'origine de votre application Angular
};

app.use(cors(corsOptions));
app.use(express.json());
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage,
});

app.post('/upload-audio', upload.single('audioFile'), (req, res) => {
  if (!req.file) {

    return res.status(400).json({ message: 'Aucun fichier audio n\'a été envoyé.' });
  }

  // Traitez le fichier audio ici, par exemple, en le stockant dans un dossier spécifique.
  // Vous pouvez utiliser req.file pour accéder aux informations sur le fichier.

  console.log(req.file.filename)
  return res.status(200).json(req.file.filename);
});

app.use("/api/client", client);
app.use("/api/message", message);

// Définir une route pour la page d'accueil
app.use('/uploads', express.static("uploads"))


// Définir le port sur lequel le serveur écoutera
const port = 3000;

// Démarrer le serveur
const server=app.listen(port,host, () => {
  console.log(`Serveur Express en cours d'exécution sur le port ${port}`);
});

const io = new SocketServer(server, {
  cors: {
    origin:`http://${host}:4200`,
    credentials: true,
  },});


  
  // // Assignez une valeur à la variable globale
  // global.globalMap = new Map<string, string>();
  // // Déclaration en tant que variable globale
//   io.on("connection", (socket) => {
//     // console.log(socket.id)
// socket.on("setup",(id)=>{
//   socket.join(id);
//   console.log(id);
//   socket.emit("connected",4);
// })
// socket.on("join chat",(id)=>{
//   socket.join(id);
//   console.log(id);
//   socket.emit("connected",4);
// })

// socket.on("join chat",(id)=>{
//   socket.join(id);
//   console.log(id);
//   socket.emit("connected",4);
// })
// socket.on("message",(message)=>{
  
//   socket.to(message.id).emit("msgenvoyer",message.message);
// })
// });


const onlineUsers = new Map();
io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("join chat", (userId) => {
    onlineUsers.set(userId, socket.id);
    console.log(onlineUsers);

  });
  socket.on("message", (data) => {
    const sendUserSocket = onlineUsers.get(data.receiver_id);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msgenvoyer", data);
    }
  });
  socket.on("audio", (data) => {
    console.log(data.receiver_id,"ok")
    const sendUserSocket = onlineUsers.get(data.receiver_id);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msgenvoyer", data);
    }
  });
});