import pool from "../db/index.js";

export const getAllDiseaseTypes = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM DiseaseType");
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500);
  }
};

export const createDiseaseType = async (req, res) => {
  const { id, description } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO DiseaseType (id, description) VALUES ($1, $2) RETURNING *",
      [id, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500);
  }
};

export const updateDiseaseType = async (req, res) => {
  const { description, id } = req.body;
  try {
    const result = await pool.query(
      "UPDATE DiseaseType SET description = $1 WHERE id = $2 RETURNING *",
      [description, id]
    );
    if (result.rows.length == 0) {
      return res.status(404).json({ msg: "disease type not found" });
    }

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500);
  }
};

export const deleteDiseaseType = async (req, res) => {
  const { id } = req.body;
  try {
    const result = await pool.query(
      "DELETE FROM DiseaseType WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ msg: "disease type not found" });
    }
    res.json({ msg: "disease type deleted", user: result.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "server error" });
  }
};
