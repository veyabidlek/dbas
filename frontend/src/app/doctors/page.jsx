"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Link from "next/link";
import "dotenv/config";
const apiUrl = process.env.BACKEND_URL;
export default function Patients() {
  const [operation, setOperation] = useState("LIST"); // Default operation
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const { register, handleSubmit, reset } = useForm();
  const [selectedUser, setSelectedUser] = useState("");

  useEffect(() => {
    if (operation === "LIST") {
      fetchUsers();
    } else if (operation === "UPDATE") {
      fetchUsers();
    }
  }, [operation]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${apiUrl}/doctor/get`);
      setUsers(response.data.rows);
      setMessage("");
    } catch (error) {
      console.error("Error fetching doctors:", error);
      setMessage("Error fetching doctors.");
    }
  };

  // Handle Create
  const onCreate = async (data) => {
    try {
      await axios.post(`${apiUrl}/doctor/create`, data);
      setMessage("Doctor addded successfully!");
      reset();
      if (operation === "LIST") fetchUsers();
    } catch (error) {
      console.error("Error creating doctors:", error);
      setMessage("Failed to create doctors.");
    }
  };

  const onDelete = async (data) => {
    try {
      await axios.delete(`${apiUrl}/doctor/delete`, { data });
      setMessage("doctor deleted successfully!");
      reset();
      if (operation === "LIST") fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      setMessage("Failed to delete user.");
    }
  };

  return (
    <div style={styles.container}>
      <Link
        href="/"
        className="absolute top left-0 top-0 text-[red] hover:underline "
      >
        Return
      </Link>
      <h1>Doctors Management</h1>
      {/* Operation Selection */}
      <div style={styles.buttonGroup}>
        <button onClick={() => setOperation("LIST")} style={styles.button}>
          LIST
        </button>
        <button onClick={() => setOperation("CREATE")} style={styles.button}>
          CREATE
        </button>

        <button onClick={() => setOperation("DELETE")} style={styles.button}>
          DELETE
        </button>
      </div>

      {/* Message Display */}
      {message && <p style={styles.message}>{message}</p>}

      {/* Operation Components */}
      {operation === "LIST" && (
        <div>
          <h2>List of doctors</h2>
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.email}>
                  <td>{user.email}</td>
                  <td>
                    {" | "}
                    <button
                      onClick={() => onDelete({ email: user.email })}
                      style={styles.actionButton}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {operation === "CREATE" && (
        <div>
          <h2 className="text-[red] font-bold text-lg mb-4 underline">
            Add doctor
          </h2>
          <form onSubmit={handleSubmit(onCreate)} style={styles.form}>
            <div style={styles.formGroup}>
              <label>Email:</label>
              <input
                name="email"
                {...register("email", { required: true })}
                placeholder="Email"
                style={styles.input}
              />
            </div>
            <button type="submit" style={styles.submitButton}>
              Create
            </button>
          </form>
        </div>
      )}

      {operation === "DELETE" && (
        <div>
          <h2>Delete doctor </h2>
          <form onSubmit={handleSubmit(onDelete)} style={styles.form}>
            <div style={styles.formGroup}>
              <label>User Email:</label>
              <input
                name="email"
                {...register("email", { required: true })}
                placeholder="User email"
                style={styles.input}
              />
            </div>
            <button type="submit" style={styles.submitButton}>
              Delete
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

// Simple inline styles for simplicity
const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  buttonGroup: {
    marginBottom: "20px",
  },
  button: {
    marginRight: "10px",
    padding: "10px 20px",
    cursor: "pointer",
    backgroundColor: "#0070f3",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
  },
  message: {
    color: "green",
    fontWeight: "bold",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "20px",
  },
  actionButton: {
    padding: "5px 10px",
    cursor: "pointer",
    backgroundColor: "#555",
    color: "#fff",
    border: "none",
    borderRadius: "3px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "400px",
  },
  formGroup: {
    marginBottom: "15px",
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "8px",
    fontSize: "16px",
    borderRadius: "3px",
    border: "1px solid #ccc",
  },
  submitButton: {
    padding: "10px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
  },
};
