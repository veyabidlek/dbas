import pool from "../db/index.js";

export const getAllPublicServants = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM PublicServant");
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500);
  }
};

export const createPublicServant = async (req, res) => {
  const { email, department } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO PublicServant (email, department) VALUES ($1, $2) RETURNING *",
      [email, department]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500);
  }
};

export const updatePublicServant = async (req, res) => {
  const { department, email } = req.body;
  try {
    const result = await pool.query(
      "UPDATE PublicServant SET department = $1 WHERE email = $2 RETURNING *",
      [department, email]
    );
    if (result.rows.length == 0) {
      return res.status(404).json({ msg: "public servant not found" });
    }

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500);
  }
};

export const deletePublicServant = async (req, res) => {
  const { email } = req.body;
  try {
    const result = await pool.query(
      "DELETE FROM PublicServant WHERE email = $1 RETURNING *",
      [email]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ msg: "Public servant not found" });
    }
    res.json({ msg: "public servant deleted", user: result.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "server error" });
  }
};
