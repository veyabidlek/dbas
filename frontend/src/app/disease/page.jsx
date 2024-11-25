"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Link from "next/link";
export default function Disease() {
  const [operation, setOperation] = useState("LIST"); // Default operation
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const { register, handleSubmit, reset } = useForm();
  const [selectedUser, setSelectedUser] = useState("");

  const apiUrl = "http://localhost:8000";

  useEffect(() => {
    if (operation === "LIST") {
      fetchUsers();
    } else if (operation === "UPDATE") {
      fetchUsers();
    }
  }, [operation]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${apiUrl}/diseases/get`);
      setUsers(response.data.rows);
      setMessage("");
    } catch (error) {
      console.error("Error fetching countries:", error);
      setMessage("Error fetching countries.");
    }
  };

  // Handle Create
  const onCreate = async (data) => {
    try {
      await axios.post(`${apiUrl}/diseases/create`, data);
      setMessage("Disease created successfully!");
      reset();
      if (operation === "LIST") fetchUsers();
    } catch (error) {
      console.error("Error creating disease:", error);
      setMessage("Failed to create disease.");
    }
  };

  const onUpdate = async (data) => {
    try {
      await axios.put(`${apiUrl}/diseases/update`, data);
      setMessage("Disease updated successfully!");
      reset();
      if (operation === "LIST") fetchUsers();
    } catch (error) {
      console.error("Error updating user:", error);
      setMessage("Failed to update user.");
    }
  };

  const onDelete = async (data) => {
    try {
      await axios.delete(`${apiUrl}/diseases/delete`, { data });
      setMessage("Disease deleted successfully!");
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
      <h1>Disease Management</h1>
      {/* Operation Selection */}
      <div style={styles.buttonGroup}>
        <button onClick={() => setOperation("LIST")} style={styles.button}>
          LIST
        </button>
        <button onClick={() => setOperation("CREATE")} style={styles.button}>
          CREATE
        </button>
        <button onClick={() => setOperation("UPDATE")} style={styles.button}>
          UPDATE
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
          <h2>List of diseases</h2>
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Disease Code</th>
                <th>Pathogen</th>
                <th>Description</th>
                <th>ID</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.disease_code}>
                  <td>{user.disease_code}</td>
                  <td>{user.pathogen}</td>
                  <td>{user.description}</td>
                  <td>{user.id}</td>

                  <td>
                    <button
                      onClick={() => {
                        setSelectedUser(user.email);
                        setOperation("UPDATE");
                      }}
                      style={styles.actionButton}
                    >
                      Edit
                    </button>
                    {" | "}
                    <button
                      onClick={() =>
                        onDelete({ disease_code: user.disease_code })
                      }
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
            Create Disease
          </h2>
          <form onSubmit={handleSubmit(onCreate)} style={styles.form}>
            <div style={styles.formGroup}>
              <label>Disease Code:</label>
              <input
                name="disease_code"
                {...register("disease_code", { required: true })}
                placeholder="disease_code"
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label>Pathogen:</label>
              <input
                name="pathogen"
                {...register("pathogen", { required: true })}
                placeholder="pathogen"
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label>Description:</label>
              <input
                name="description"
                {...register("description", { required: true })}
                placeholder="description"
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label>ID:</label>
              <input
                name="id"
                {...register("id", { required: true })}
                placeholder="id"
                style={styles.input}
              />
            </div>

            <button type="submit" style={styles.submitButton}>
              Create
            </button>
          </form>
        </div>
      )}

      {operation === "UPDATE" && (
        <div>
          <h2>Update User</h2>
          <form onSubmit={handleSubmit(onUpdate)} style={styles.form}>
            <div style={styles.formGroup}>
              <label>Select User to Update:</label>
              <select
                name="disease_code"
                {...register("disease_code", { required: true })}
                onChange={(e) => setSelectedUser(e.target.value)}
                style={styles.input}
                defaultValue=""
              >
                <option value="" disabled>
                  -- Select Disease --
                </option>
                {users.map((user) => (
                  <option key={user.disease_code} value={user.disease_code}>
                    {user.disease_code}
                  </option>
                ))}
              </select>
            </div>
            {selectedUser && (
              <>
                <div style={styles.formGroup}>
                  <label>New Description:</label>
                  <input
                    type="text"
                    name="description"
                    {...register("description", { required: true, min: 0 })}
                    placeholder={selectedUser.name}
                    style={styles.input}
                  />
                  <label>New Pathogen:</label>
                  <input
                    type="text"
                    name="pathogen"
                    {...register("pathogen", { required: true, min: 0 })}
                    placeholder="pathogen"
                    style={styles.input}
                  />
                </div>
                <button type="submit" style={styles.submitButton}>
                  Update
                </button>
              </>
            )}
          </form>
        </div>
      )}

      {operation === "DELETE" && (
        <div>
          <h2>Delete Disease</h2>
          <form onSubmit={handleSubmit(onDelete)} style={styles.form}>
            <div style={styles.formGroup}>
              <label>Disease:</label>
              <input
                name="disease_code"
                {...register("disease_code", { required: true })}
                placeholder="Disease"
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