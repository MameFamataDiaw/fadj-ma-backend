const mongoose = require("mongoose");

const GroupeSchema = new mongoose.Schema(
    {
        nomGroupe: {
            type: String,
            //enum: ['Medecine generique','Antibiotiques','Antihypertenseurs','Diabetes','Maladies Cardiovasculaires','Produits a base de plantes', 'Cremes et pommades cutanees','Gels et sprays anti-inflammatoires'],
            required: true,
            unique: true,
          },
    },
    {
        timestamps: true,
      }
    );
    
    module.exports = mongoose.model("Groupe", GroupeSchema);