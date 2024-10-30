const mongoose = require("mongoose");

const medicamentSchema = new mongoose.Schema(
  {
    image: {
      type: String,
    },
    nom: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    dosage: {
      type: String,
      required: true
    },
    prix: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
    },
    composition: {
      type: String,
    },
    fabricant: {
      type: String,
    },
    typeCons: {
      type: String,
    },
    dateExp: {
      type: Date,
    },
    ingredients: {
      type: String,
    },
    effets:{
      type: String,
    },
    formePharma:{
      type: String,
    },
    groupe: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Groupe",
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Medicament", medicamentSchema);
