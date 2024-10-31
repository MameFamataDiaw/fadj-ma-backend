const Groupe = require("../models/groupes");

const getGroupes = async (req, res) => {
  try {
    const groupes = await Groupe.find({});
    res.status(200).json(groupes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getGroupe = async (req, res) => {
  try {
    const { id } = req.params;
    const groupe = await Groupe.findById(id);
    res.status(200).json(groupe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const storeGroupe = async (req, res) => {
  try {
    const { nomGroupe } = req.body;
    const existingGroupe = await Groupe.findOne({ nomGroupe });

    if (existingGroupe) {
      return res.status(400).json({ message: "Ce groupe existe deja." });
    }

    const groupe = await Groupe.create({ nomGroupe });
    res.status(200).json(groupe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateGroupe = async (req, res) => {
  try {
    const { id } = req.params;
    const groupe = await Groupe.findByIdAndUpdate(id, req.body);
    if (!groupe) {
      return res.status(404).json({ message: "Groupe not found" });
    }
    const updateGroupe = await Groupe.findById(id);
    res.status(200).json(updateGroupe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteGroupe = async (req, res) => {
  try {
    const { id } = req.params;
    const groupe = await Groupe.findByIdAndDelete(id);
    if (!groupe) {
      return res.status(404).json({ message: "Groupe not found" });
    }
    res.status(200).json({ message: "Groupe deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getGroupes,
  getGroupe,
  storeGroupe,
  updateGroupe,
  deleteGroupe,
};
