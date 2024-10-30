const express = require("express");
const Categories = require("../models/groupes.js");
const router = express.Router();
const {
  getGroupes,
  getGroupe,
  storeGroupe,
  updateGroupe,
  deleteGroupe,
} = require("../controllers/groupeController.js");

router.get("/", getGroupes);
router.get("/:id", getGroupe);

router.post("/", storeGroupe);

router.put("/:id", updateGroupe);

router.delete("/:id", deleteGroupe);

module.exports = router;
