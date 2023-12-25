// Importer la bibliothèque Express avec la syntaxe ES modules
import  express, { NextFunction , Request, RequestHandler, Response } 
from "express";
import cors from 'cors';
const client = require("./src/rote/UserRote.ts");
const message = require("./src/rote/MessageRoute.ts");
import { Server as SocketServer } from 'socket.io';
  import multer from "multer";



var admin = require("firebase-admin");
var serviceAccount = require("./src/utils/chat-projet-ce77a-firebase-adminsdk-2d5j8-d2cb5b7d97.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const app = express();

// Middleware pour vérifier le jeton d'authentification Firebase
const verifyFirebaseToken = (req: Request, res: Response, next: NextFunction) => {
  const idToken = req.body?.idToken;

  admin.auth().verifyIdToken(idToken)
    .then((decodedToken :any) => {
      // L'ID du compte utilisateur vérifié
      const uid = decodedToken.uid;
      const email = decodedToken.email;

      // Vérifiez si l'adresse e-mail est celle que vous attendez
      if (email === 'toumi10oussama@gmail.com') {
        console.log(uid)
        next(); // Autorisez l'accès à la route protégée
      } else {
        // Adresse e-mail ne correspondant pas
        res.status(403).send('Accès refusé : Adresse e-mail non autorisée.');
      }
    })
    .catch((error:any) => {
      // Gestion des erreurs d'authentification
      console.error(error);
      res.status(401).send('Unauthorized');
    });
};

// Utilisez ce middleware pour vérifier le jeton d'authentification avant d'accéder à certaines routes protégées
app.use('/protected', verifyFirebaseToken as RequestHandler, (req: Request, res: Response) => {
  // Votre code de gestion des routes protégées ici
  res.status(200).send('Accès autorisé à la route protégée.');
});
const host =  'localhost'; // Adresse IP sur laquelle le serveur écoute (0.0.0.0 signifie toutes les adresses IP disponibles)

// const cors = require("cors");

// Créer une instance d'application Express
const corsOptions = {
  origin: `http://${host}:4200` // Remplacez par l'origine de votre application Angular
};

app.use(cors());
app.use(express.json());
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const storageImage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage,
});

const uploade = multer({
  storage: storageImage,
});

app.post('/upload-image', uploade.single('imageFile'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Aucun fichier image n\'a été envoyé.' });
  }

  // Traitez le fichier audio ici, par exemple, en le stockant dans un dossier spécifique.
  // Vous pouvez utiliser req.file pour accéder aux informations sur le fichier.

  console.log(req.file.filename)
  return res.status(200).json(req.file.filename);
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
app.use('/images', express.static("images"))
app.use('/images/posts', express.static("posts"))


// Définir le port sur lequel le serveur écoutera
const port = 3000;

// Démarrer le serveur
const server=app.listen(port,host, () => {
  console.log(`Serveur Express en cours d'exécution sur le port ${port}`);
});

const io = new SocketServer(server, {
  cors: {
    // origin:`http://${host}:4200`,
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
  socket.on("delete", (data) => {
    const sendUserSocket = onlineUsers.get(data.receiver_id);
    if (sendUserSocket) {
      console.log(sendUserSocket)

      socket.to(sendUserSocket).emit("msgdelete", data.id);
    }
  });
  socket.on("audio", (data) => {
    console.log(data.receiver_id,"ok")
    const sendUserSocket = onlineUsers.get(data.receiver_id);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msgenvoyer", data);
    } 
  });
  socket.on("video", (data) => {
    console.log(data)
    // const sendUserSocket = onlineUsers.get(data.receiver_id);
    // if (sendUserSocket) {
    //   socket.to(sendUserSocket).emit("msgenvoyer", data);
    // }
  });
});