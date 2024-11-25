import pool from "../db/index.js";

export const getAllPatients = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM Patients");
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500);
  }
};

export const createPatient = async (req, res) => {
  const { email } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO Patients (email) VALUES ($1) RETURNING *",
      [email]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500);
  }
};

export const deletePatient = async (req, res) => {
  const { email } = req.body;
  try {
    const result = await pool.query(
      "DELETE FROM Patients WHERE email = $1 RETURNING *",
      [email]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ msg: "patients not found" });
    }
    res.json({ msg: "patient deleted", user: result.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "server error" });
  }
};
