const User = require("../models/UserModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");

module.exports.Signup = async (req, res, next) => {
    try {
        const { prenom, nom, genre, dateNaiss, email, password, createdAt } = req.body;
        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.json({ message: "User already exists" });
        }
        const user = await User.create({ prenom, nom, genre, dateNaiss, email, password, createdAt })
        const token = createSecretToken(user._id);
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false,
        });
        res
            .status(201)
            .json({message: "User signed in successfully", success: true, user });
            next();
    } catch (error) {
        console.error(error);
    }
}

// module.exports.Login = async (req, res, next) => {
module.exports.Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password ) {
            return res.status(400).json({
                success: false,
                message: 'Email et mot de passe requis'
            });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Email ou mot de passe incorrect'
            });
        }

        const isValidPassword = await user.comparePassword(password);
        if (!isValidPassword) {
            return res.status(401).json({
                success: false,
                message: 'Email ou mot de passe incorrect'
            });
        }

        const token = createSecretToken(user._id);
        res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 3 * 24 * 60 * 60 * 1000 // 3 jours
        });

        res.status(200).json({
            success: true,
            message: "Connexion réussie",
            user: {
              id: user._id,
              email: user.email,
              prenom: user.prenom,
              nom: user.nom,
              role: user.role
            }
        });

        // const auth = await bcrypt.compare(password,user.password)
        // if (!auth) {
        //     return res.json({message:'Incorrect password or email'})
        // }
        // const token = createSecretToken(user._id);
        // res.cookie("token", token, {
        //     withCredentials: true,
        //     httpOnly: false,
        // });
        // res.status(201).json({message: "User logged in successfully", success: true});
        // next()
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: "Erreur serveur"
        });
    }
}