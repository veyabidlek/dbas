import pool from "../db/index.js";

export const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM Users");
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500);
  }
};

export const createUser = async (req, res) => {
  const { email, name, surname, salary, phone, cname } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO Users (email, name, surname, salary, phone, cname) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [email, name, surname, salary, phone, cname]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500);
  }
};

export const updateUser = async (req, res) => {
  const { name, surname, salary, phone, cname, email } = req.body;
  try {
    const result = await pool.query(
      "UPDATE Users SET name = $1, surname = $2, salary = $3, phone = $4, cname = $5 WHERE email = $6 RETURNING *",
      [name, surname, salary, phone, cname, email]
    );
    if (result.rows.length == 0) {
      return res.status(404).json({ msg: "user not found" });
    }

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500);
  }
};

export const deleteUser = async (req, res) => {
  const { email } = req.body;
  try {
    const result = await pool.query(
      "DELETE FROM Users WHERE email = $1 RETURNING *",
      [email]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ msg: "user not found" });
    }
    res.json({ msg: "user deleted", user: result.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "server error" });
  }
};
