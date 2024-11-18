import pool from "../db/index.js";

export const getAllDiscovers = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM Discover");
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500);
  }
};

export const createDiscover = async (req, res) => {
  const { cname, disease_code, first_enc_date } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO Discover (cname, disease_code, first_enc_date) VALUES ($1, $2, $3) RETURNING *",
      [cname, disease_code, first_enc_date]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500);
  }
};

export const updateDiscover = async (req, res) => {
  const { first_enc_date, cname, disease_code } = req.body;
  try {
    const result = await pool.query(
      "UPDATE Discover SET first_enc_date = $1 WHERE cname = $2 AND disease_code = $3 RETURNING *",
      [first_enc_date, cname, disease_code]
    );
    if (result.rows.length == 0) {
      return res.status(404).json({ msg: "discover not found" });
    }

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500);
  }
};

export const deleteDiscover = async (req, res) => {
  const { cname, disease_code } = req.body;
  try {
    const result = await pool.query(
      "DELETE FROM Country WHERE cname = $1 AND disease_code = $2 RETURNING *",
      [cname, disease_code]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ msg: "discover not found" });
    }
    res.json({ msg: "discover deleted", user: result.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "server error" });
  }
};
