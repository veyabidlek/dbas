import pool from "../db/index.js";

export const getAllDoctors = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM Doctor");
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500);
  }
};

export const createDoctor = async (req, res) => {
  const { email, degree } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO Doctor (email, degree) VALUES ($1, $2) RETURNING *",
      [email, degree]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500);
  }
};

export const updateDoctor = async (req, res) => {
  const { degree, email } = req.body;
  try {
    const result = await pool.query(
      "UPDATE Doctoer SET degree = $1 WHERE email = $2 RETURNING *",
      [degree, email]
    );
    if (result.rows.length == 0) {
      return res.status(404).json({ msg: "doctor not found" });
    }

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500);
  }
};

export const deleteDoctor = async (req, res) => {
  const { email } = req.body;
  try {
    const result = await pool.query(
      "DELETE FROM Doctor WHERE email = $1 RETURNING *",
      [email]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ msg: "doctor not found" });
    }
    res.json({ msg: "doctor deleted", user: result.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "server error" });
  }
};
