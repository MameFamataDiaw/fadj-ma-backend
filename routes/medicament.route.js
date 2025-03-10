const express = require("express");
const Medicament = require("../models/medicaments.js");
const router = express.Router();
const {
  getMedicaments,
  getMedicament,
  storeMedicament,
  updateMedicament,
  deleteMedicament,
} = require("../controllers/medicament.controller.js");

router.get("/", getMedicaments);
router.get("/:id", getMedicament);

router.post("/", storeMedicament);

router.put("/:id", updateMedicament);

router.patch("/:id", updateMedicament);

router.delete("/:id", deleteMedicament);

module.exports = router;
