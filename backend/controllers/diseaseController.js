import pool from "../db/index.js";

export const getAllDiseases = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM Disease");
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500);
  }
};

export const createDisease = async (req, res) => {
  const { disease_code, pathogen, description, id } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO Disease (disease_code, pathogen, description, id) VALUES ($1, $2,$3,$4) RETURNING *",
      [disease_code, pathogen, description, id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500);
  }
};

export const updateDisease = async (req, res) => {
  const { pathogen, description, id, disease_code } = req.body;
  try {
    const result = await pool.query(
      "UPDATE Disease SET pathogen = $1, description = $2 , id = $3  WHERE disease_code = $4 RETURNING *",
      [pathogen, description, id, disease_code]
    );
    if (result.rows.length == 0) {
      return res.status(404).json({ msg: "disease not found" });
    }

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500);
  }
};

export const deleteDisease = async (req, res) => {
  const { disease_code } = req.body;
  try {
    const result = await pool.query(
      "DELETE FROM Disease WHERE disease_code = $1 RETURNING *",
      [disease_code]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ msg: "disease not found" });
    }
    res.json({ msg: "disease deleted", user: result.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "server error" });
  }
};
