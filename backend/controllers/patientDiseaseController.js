import pool from "../db/index.js";

export const getAllPatientDiseases = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM PatientDisease");
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500);
  }
};

export const createPatientDisease = async (req, res) => {
  const { email, disease_code } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO PatientDisease (email, disease_code) VALUES ($1, $2) RETURNING *",
      [email, disease_code]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500);
  }
};

export const deletePatientDisease = async (req, res) => {
  const { email, disease_code } = req.body;
  try {
    const result = await pool.query(
      "DELETE FROM PatientDisease WHERE email = $1 AND disease_code = $2 RETURNING *",
      [email, disease_code]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ msg: "patient disease not found" });
    }
    res.json({ msg: "patient disease deleted", user: result.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "server error" });
  }
};
