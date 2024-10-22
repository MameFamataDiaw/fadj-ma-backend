const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
const Medicament = require("./models/medicament");
const medicamentRoute = require("./routes/medicament.route");

// middleware
app.use(express.json()); // pour parser les requêtes en JSON
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/api/medicaments", medicamentRoute);

app.get("/", (req, res) => {
  res.send("Hello");
});

mongoose
  .connect(
    "mongodb+srv://mfd:passer123@fadjma-db.202h4.mongodb.net/?retryWrites=true&w=majority&appName=fadjma-db"
  )
  .then(() => {
    console.log("Connexion à MongoDB réussie !");
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Connexion à MongoDB échouée :", error);
  });
