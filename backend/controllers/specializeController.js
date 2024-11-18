import pool from "../db/index.js";

export const getAllSpecializes = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM Specialize");
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500);
  }
};

export const createSpecialize = async (req, res) => {
  const { id, email } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO Specialize (id, email) VALUES ($1, $2) RETURNING *",
      [id, email]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500);
  }
};

export const deleteSpecialize = async (req, res) => {
  const { id, email } = req.body;
  try {
    const result = await pool.query(
      "DELETE FROM Specialize WHERE id = $1 AND email = $2 RETURNING *",
      [id, email]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ msg: "specialize not found" });
    }
    res.json({ msg: "specialize deleted", user: result.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "server error" });
  }
};
