const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

const Medicament = require("./models/medicaments");
const Groupe = require("./models/groupes")

// middleware
app.use(
    cors({
       origin: [
        "https://fadj-ma-frontend.vercel.app",
        "http://localhost:3001",
      ],
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      credentials: true,
      allowedHeaders: ['Content-Type', 'Authorization'],
        exposedHeaders: ['set-cookie']
    })
);
app.use(cookieParser());
app.use(express.json()); // pour parser les requêtes en JSON
app.use(express.urlencoded({ extended: false }));

// Routes
const authRoute = require("./routes/AuthRoute");
app.use("/",authRoute)
const groupeRoute = require("./routes/groupeRoute");
app.use("/api/groupes", groupeRoute);
const medicamentRoute = require("./routes/medicament.route");
app.use("/api/medicaments", medicamentRoute);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connexion à MongoDB réussie !");
    app.listen(port, '0.0.0.0', () => {
      console.log(`Serveur démarré sur le port ${port}`);
      console.log('Variables d\'environnement chargées:', {
        port: process.env.PORT,
        mongoUri: process.env.MONGODB_URI ? 'Défini' : 'Non défini',
        nodeEnv: process.env.NODE_ENV
      });
    });
  })
  .catch((error) => {
    console.error("Connexion à MongoDB échouée :", error);
    process.exit(1);  // Arrêter le serveur en cas d'erreur de connexion
  });