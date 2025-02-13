const Medicament = require("../models/medicaments");
const Groupe = require("../models/groupes");

const getMedicaments = async (req, res) => {
  try {
    console.log(req.query)
    const medicaments = await Medicament.find(req.query).populate('groupe','nomGroupe');
    
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
    let groupeId = req.body.groupe;

    if (req.body.nomGroupe) {
      const groupe = await Groupe.findOneAndUpdate(
        { nomGroupe: req.body.nomGroupe },
        { nomGroupe: req.body.nomGroupe },
        { upsert: true, new: true }
      );
      groupeId = groupe._id;
    }

    const medicament = await Medicament.create({ ...req.body, groupe: groupeId });
    res.status(200).json(medicament);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateMedicament = async (req, res) => {
  try {
      const { id } = req.params;  // Récupération de l'ID du médicament à partir des paramètres de la requête.
      const updates = req.body;  // Récupération des champs de mise à jour envoyés par le client.

      // Vérifier si un groupe est fourni dans la requête
      if (updates.groupe) {
          // Chercher le groupe par nom dans la base de données
          const groupeExists = await Groupe.findOne({ nomGroupe: updates.groupe });
          
          // Si le groupe n'existe pas, créer un nouveau groupe avec le nom fourni
          if (!groupeExists) {
              const newGroupe = new Groupe({ nomGroupe: updates.groupe });
              await newGroupe.save();  // Enregistrer le nouveau groupe dans la base de données
              updates.groupe = newGroupe._id;  // Utiliser l'ID du nouveau groupe pour la mise à jour
          } else {
              // Si le groupe existe déjà, utiliser son ID pour la mise à jour
              updates.groupe = groupeExists._id;
          }
      }

      // Rechercher et mettre à jour le médicament par son ID avec les champs de mise à jour
      const medicament = await Medicament.findByIdAndUpdate(id, updates, { new: true });
      
      // Vérifier si le médicament a bien été trouvé et mis à jour
      if (!medicament) {
          return res.status(404).json({ message: "Médicament non trouvé" });
      }
      
      // Répondre avec le médicament mis à jour en cas de succès
      res.status(200).json(medicament);
  } catch (error) {
      // Gérer les erreurs et afficher un message dans la console
      console.error("Erreur lors de la mise à jour du médicament :", error);
      res.status(500).json({ message: "Erreur lors de la mise à jour du médicament" });
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
