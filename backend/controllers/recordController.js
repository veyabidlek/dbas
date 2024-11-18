import pool from "../db/index.js";

export const getAllRecords = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM Record");
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500);
  }
};

export const createRecord = async (req, res) => {
  const { email, cname, disease_code, total_deaths, total_patients } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO Record (email, cname, disease_code, total_deaths, total_patients) VALUES ($1, $2,$3,$4, $5) RETURNING *",
      [email, cname, disease_code, total_deaths, total_patients]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500);
  }
};

export const updateRecord = async (req, res) => {
  const { total_deaths, total_patients, email, cname, disease_code } = req.body;
  try {
    const result = await pool.query(
      "UPDATE Record SET total_deaths = $1, total_patients = $2 WHERE email = $3 AND cname = $4 AND disease_code = $5  RETURNING *",
      [total_deaths, total_patients, email, cname, disease_code]
    );
    if (result.rows.length == 0) {
      return res.status(404).json({ msg: "record not found" });
    }

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500);
  }
};

export const deleteRecord = async (req, res) => {
  const { email, cname, disease_code } = req.body;
  try {
    const result = await pool.query(
      "DELETE FROM Disease WHERE email = $1 AND cname = $2 AND disease_code = $3 RETURNING *",
      [email, cname, disease_code]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ msg: "record not found" });
    }
    res.json({ msg: "record deleted", user: result.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "server error" });
  }
};
