const Medicament = require("../models/medicaments");
const Groupe = require("../models/groupes");

const getMedicaments = async (req, res) => {
  try {
    console.log(req.query)
    const medicaments = await Medicament.find(req.query).populate('groupe');
    
    // const medicaments= await Medicament.find()
    // .where('nom')
    // .equals(req.query.nom)
    // .where('groupe')
    // .equals(req.query.groupe);


    res.status(200).json(medicaments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMedicament = async (req, res) => {
  try {
    const { id } = req.params;
    const medicament = await Medicament.findById(id).populate('groupe');
    res.status(200).json(medicament);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const storeMedicament = async (req, res) => {
  try {
    const medicament = await Medicament.create(req.body);
    res.status(200).json(medicament);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateMedicament = async (req, res) => {
  try {
    const { id } = req.params;
    const { groupe } = req.body;

    if (groupe) {
      const groupeExists = await Groupe.findById(groupe);
      if (!groupeExists) {
        return res.status(400).json({ message: "Groupe non trouvé" });
      }
    }

    const medicament = await Medicament.findByIdAndUpdate(id, req.body, { new: true });
    if (!medicament) {
      return res.status(404).json({ message: "Medicament not found" });
    }
    const updateMedicament = await Medicament.findById(id);
    res.status(200).json(updateMedicament);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteMedicament = async (req, res) => {
  try {
    const { id } = req.params;
    const medicament = await Medicament.findByIdAndDelete(id);
    if (!medicament) {
      return res.status(404).json({ message: "Medicament not found" });
    }
    res.status(200).json({ message: "Medicament deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getMedicaments,
  getMedicament,
  storeMedicament,
  updateMedicament,
  deleteMedicament,
};
