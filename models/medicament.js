const mongoose = require("mongoose");

const medicamentSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
    },
    groupe: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    prix: {
      type: Number,
      required: true,
    },
    // idMedicament: {
    //   type: String,
    //   unique: true,
    //   required: true,
    // },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Medicament", medicamentSchema);
