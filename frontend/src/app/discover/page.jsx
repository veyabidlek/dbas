"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Link from "next/link";
export default function User() {
  const [operation, setOperation] = useState("LIST"); // Default operation
  const [discovers, setDiscovers] = useState([]);
  const [message, setMessage] = useState("");
  const { register, handleSubmit, reset } = useForm();
  const [selectedDiscover, setSelectedDiscover] = useState("");

  const apiUrl = "http://localhost:8000";

  useEffect(() => {
    if (operation === "LIST") {
      fetchDiscovers();
    } else if (operation === "UPDATE") {
      fetchDiscovers();
    }
  }, [operation]);

  const fetchDiscovers = async () => {
    try {
      const response = await axios.get(`${apiUrl}/discover/get`);
      setDiscovers(response.data.rows);
      setMessage("");
    } catch (error) {
      console.error("Error fetching discover:", error);
      setMessage("Error fetching discover.");
    }
  };

  // Handle Create
  const onCreate = async (data) => {
    try {
      await axios.post(`${apiUrl}/discover/create`, data);
      setMessage("Discover created successfully!");
      reset();
      if (operation === "LIST") fetchDiscovers();
    } catch (error) {
      console.error("Error creating discover:", error);
      setMessage("Failed to create discover.");
    }
  };

  const onUpdate = async (data) => {
    try {
      await axios.put(`${apiUrl}/discover/update`, data);
      setMessage("Discover updated successfully!");
      reset();
      if (operation === "LIST") fetchDiscovers();
    } catch (error) {
      console.error("Error updating discover:", error);
      setMessage("Failed to update discover.");
    }
  };

  const onDelete = async (data) => {
    try {
      await axios.delete(`${apiUrl}/discover/delete`, { data });
      setMessage("Discover deleted successfully!");
      reset();
      if (operation === "LIST") fetchDiscovers();
    } catch (error) {
      console.error("Error deleting discover:", error);
      setMessage("Failed to delete discover.");
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
      <h1>Discover Management</h1>
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
          <h2>List of Discovered Diseases</h2>
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Country</th>
                <th>Disease Code</th>
                <th>First Encounter Date</th>
              </tr>
            </thead>
            <tbody>
              {discovers.map((d) => (
                <tr key={d.cname + d.disease_code}>
                  <td>{d.cname}</td>
                  <td>{d.disease_code}</td>
                  <td>{d.first_enc_date}</td>

                  <td>
                    <button
                      onClick={() => {
                        setSelectedDiscover(d.cname, d.disease_code);
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
            Add Discover Disease
          </h2>
          <form onSubmit={handleSubmit(onCreate)} style={styles.form}>
            <div style={styles.formGroup}>
              <label>Country:</label>
              <input
                name="cname"
                {...register("cname", { required: true })}
                placeholder="Country"
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label>disease code:</label>
              <input
                name="disease_code"
                {...register("disease_code", { required: true })}
                placeholder="disease_code"
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label>first encounter date:</label>
              <input
                name="first_enc_date"
                {...register("first_enc_date", { required: true })}
                placeholder="1920-12-03"
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
          <h2>Update Discover Disease</h2>
          <form onSubmit={handleSubmit(onUpdate)} style={styles.form}>
            <div style={styles.formGroup}>
              <label>Select Disease Discover to Update:</label>
              <select
                name="cnamedisease_code"
                {...register("cnamedisease_code", { required: true })}
                onChange={(e) => setSelectedDiscover(e.target.value)}
                style={styles.input}
                defaultValue=""
              >
                <option value="" disabled>
                  -- Select Discover Date --
                </option>
                {discovers.map((d) => (
                  <option key={d.cname + d.disease_code} value={d.cname}>
                    {d.cname + " " + d.disease_code}
                  </option>
                ))}
              </select>
            </div>
            {selectedDiscover && (
              <>
                <div style={styles.formGroup}>
                  <label>New Country:</label>
                  <input
                    type="text"
                    name="cname"
                    {...register("cname", { required: true, min: 0 })}
                    style={styles.input}
                  />
                  <label>New Disease Code:</label>
                  <input
                    type="text"
                    name="disease_code"
                    {...register("disease_code", { required: true, min: 0 })}
                    style={styles.input}
                  />
                  <label>New Date:</label>
                  <input
                    type="text"
                    name="first_enc_date"
                    {...register("first_enc_date", { required: true, min: 0 })}
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
          <h2>Delete Discover</h2>
          <form onSubmit={handleSubmit(onDelete)} style={styles.form}>
            <div style={styles.formGroup}>
              <label>User Disocver:</label>
              <input
                name="cnamedisease_code"
                {...register("cnamedisease_code", { required: true })}
                placeholder="Key"
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
