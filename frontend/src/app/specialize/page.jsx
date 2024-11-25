"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Link from "next/link";
export default function PublicServant() {
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
      const response = await axios.get(`${apiUrl}/specialize/get`);
      setUsers(response.data.rows);
      setMessage("");
    } catch (error) {
      console.error("Error fetching patient-diseases:", error);
      setMessage("Error fetching patient-diseases.");
    }
  };
  const onUpdate = async (data) => {
    try {
      await axios.put(`${apiUrl}/specialize/update`, data);
      setMessage("patient-disease updated successfully!");
      reset();
      if (operation === "LIST") fetchUsers();
    } catch (error) {
      console.error("Error updating patient-disease", error);
      setMessage("Failed to update patient-disease.");
    }
  };
  // Handle Create
  const onCreate = async (data) => {
    try {
      await axios.post(`${apiUrl}/specialize/create`, data);
      setMessage("Specialize addded successfully!");
      reset();
      if (operation === "LIST") fetchUsers();
    } catch (error) {
      console.error("Error creating patient-disease", error);
      setMessage("Failed to create patient-disease.");
    }
  };

  const onDelete = async (data) => {
    try {
      await axios.delete(`${apiUrl}/patient-disease/delete`, { data });
      setMessage("patient-disease deleted successfully!");
      reset();
      if (operation === "LIST") fetchUsers();
    } catch (error) {
      console.error("Error deleting patient-disease:", error);
      setMessage("Failed to delete patient-disease.");
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
      <h1>Specialize Management</h1>
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
          <h2>List of Specialize</h2>
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Email</th>
                <th>id</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.email + user.id}>
                  <td>{user.email}</td>
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
                      onClick={() => onDelete({ cname: user.email })}
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
            Add specialize
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
              <label>ID (1-13):</label>
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
          <h2>Update Specialize</h2>
          <form onSubmit={handleSubmit(onUpdate)} style={styles.form}>
            <div style={styles.formGroup}>
              <label>Select Specialize to Update:</label>
              <select
                name="email"
                {...register("email", { required: true })}
                onChange={(e) => {
                  const [email, id] = e.target.value.split(",");
                  setSelectedUser(e.target.value);
                }}
                style={styles.input}
                defaultValue=""
              >
                <option value="" disabled>
                  -- Select Specialize --
                </option>
                {users.map((d) => (
                  <option key={`${d.id},${d.email}`} value={d.email}>
                    {d.email + "|" + d.id}
                  </option>
                ))}
              </select>
            </div>
            {selectedUser && (
              <>
                <div style={styles.formGroup}>
                  <label>New Email:</label>
                  <input
                    type="email"
                    name="email"
                    {...register("email", {
                      required: true,
                      min: 0,
                    })}
                    style={styles.input}
                  />
                  <label>New ID:</label>
                  <input
                    type="number"
                    name="id"
                    {...register("id", {
                      required: true,
                      min: 0,
                    })}
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
          <h2>Delete Specialize </h2>
          <form onSubmit={handleSubmit(onDelete)} style={styles.form}>
            <div style={styles.formGroup}>
              <label> Email:</label>
              <input
                name="email"
                {...register("email", { required: true })}
                placeholder=" email"
                style={styles.input}
              />
              <label> ID:</label>
              <input
                name="id"
                {...register("id", { required: true })}
                placeholder="id "
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
