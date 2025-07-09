const pool = require('../config/db');

exports.findByEmail = async (email) => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
};

exports.createUser = async ({ nom, email, mot_de_passe, localisation }) => {
  const result = await pool.query(
    `INSERT INTO users (nom, email, mot_de_passe, localisation)
     VALUES ($1, $2, $3, $4)
     RETURNING id, nom, email`,
    [nom, email, mot_de_passe, localisation]
  );
  return result.rows[0];
};
