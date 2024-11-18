import pool from "../db/index.js";

export const getAllCountries = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM Country");
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500);
  }
};

export const createCountry = async (req, res) => {
  const { cname, population } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO Country (cname, population) VALUES ($1, $2) RETURNING *",
      [cname, population]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500);
  }
};

export const updateCountry = async (req, res) => {
  const { population, cname } = req.body;
  try {
    const result = await pool.query(
      "UPDATE Country SET populatuion = $1 WHERE cname = $2 RETURNING *",
      [population, cname]
    );
    if (result.rows.length == 0) {
      return res.status(404).json({ msg: "country not found" });
    }

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500);
  }
};

export const deleteCountry = async (req, res) => {
  const { cname } = req.body;
  try {
    const result = await pool.query(
      "DELETE FROM Country WHERE cname = $1 RETURNING *",
      [cname]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ msg: "country type not found" });
    }
    res.json({ msg: "country deleted", user: result.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "server error" });
  }
};
