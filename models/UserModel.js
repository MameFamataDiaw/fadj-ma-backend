const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    prenom: {
        type: String,
        required: [true, "Your prenom is required"],
    },
    nom: {
        type: String,
        required: [true, "Your nom is required"],
    },
    genre: {
        type: String,
        enum: ['homme', 'femme'],
        required: [true, "put your gender is required"],
    },
    dateNaiss: {
        type: Date,
        required: [true, "Your date of birth is required"],
    },
    email: {
        type: String,
        required: [true, "Your email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: function(v){
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
            },
            message: 'Format email invalide'
        }
    },
    role: {
        type: String,
        enum: ['admin', 'pharmacien', 'vendeur'],
        default: 'admin'
    },
    password: {
        type: String,
        required: [true, "Your password is required"],
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
    
}

userSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 12);
});

module.exports = mongoose.model("User", userSchema);