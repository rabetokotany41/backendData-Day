const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Register
exports.register = async (req, res) => {
  const { nom, email, mot_de_passe, localisation } = req.body;

  try {
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email déjà utilisé' });
    }

    const hashedPassword = await bcrypt.hash(mot_de_passe, 10);
    const newUser = await User.createUser({ nom, email, mot_de_passe: hashedPassword, localisation });

    res.status(201).json({
      message: 'Inscription réussie',
      user: newUser
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Login
exports.login = async (req, res) => {
  const { email, mot_de_passe } = req.body;

  try {
    const user = await User.findByEmail(email);
    if (!user) return res.status(404).json({ message: 'Utilisateur introuvable' });

    const isMatch = await bcrypt.compare(mot_de_passe, user.mot_de_passe);
    if (!isMatch) return res.status(400).json({ message: 'Mot de passe incorrect' });

    res.json({
      message: 'Connexion réussie',
      user: {
        id: user.id,
        nom: user.nom,
        email: user.email
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
