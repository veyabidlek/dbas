"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Link from "next/link";
export default function Country() {
  const [operation, setOperation] = useState("LIST"); // Default operation
  const [countries, setCountries] = useState([]);
  const [message, setMessage] = useState("");
  const { register, handleSubmit, reset } = useForm();
  const [selectedCountry, setSelectedCountry] = useState("");

  const apiUrl = "http://localhost:8000";

  useEffect(() => {
    if (operation === "LIST") {
      fetchCountries();
    } else if (operation === "UPDATE") {
      fetchCountries();
    }
  }, [operation]);

  const fetchCountries = async () => {
    try {
      const response = await axios.get(`${apiUrl}/countries/get`);
      setCountries(response.data.rows);
      setMessage("");
    } catch (error) {
      console.error("Error fetching countries:", error);
      setMessage("Error fetching countries.");
    }
  };

  // Handle Create
  const onCreate = async (data) => {
    try {
      await axios.post(`${apiUrl}/countries/create`, data);
      setMessage("Country created successfully!");
      reset();
      if (operation === "LIST") fetchCountries();
    } catch (error) {
      console.error("Error creating country:", error);
      setMessage("Failed to create country.");
    }
  };

  // Handle Update
  const onUpdate = async (data) => {
    try {
      await axios.put(`${apiUrl}/countries/update`, data); // Ensure backend route is correct
      setMessage("Country updated successfully!");
      reset();
      if (operation === "LIST") fetchCountries();
    } catch (error) {
      console.error("Error updating country:", error);
      setMessage("Failed to update country.");
    }
  };

  // Handle Delete
  const onDelete = async (data) => {
    try {
      await axios.delete(`${apiUrl}/countries/delete`, { data });
      setMessage("Country deleted successfully!");
      reset();
      if (operation === "LIST") fetchCountries();
    } catch (error) {
      console.error("Error deleting country:", error);
      setMessage("Failed to delete country.");
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
      <h1>Country Management</h1>
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
          <h2>List of Countries</h2>
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Population</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {countries.map((country) => (
                <tr key={country.cname}>
                  <td>{country.cname}</td>
                  <td>{country.population.toLocaleString()}</td>
                  <td>
                    <button
                      onClick={() => {
                        setSelectedCountry(country.cname);
                        setOperation("UPDATE");
                      }}
                      style={styles.actionButton}
                    >
                      Edit
                    </button>
                    {" | "}
                    <button
                      onClick={() => onDelete({ cname: country.cname })}
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
          <h2>Create Country</h2>
          <form onSubmit={handleSubmit(onCreate)} style={styles.form}>
            <div style={styles.formGroup}>
              <label>Country Name:</label>
              <input
                name="cname"
                {...register("cname", { required: true })}
                placeholder="Country Name"
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label>Population:</label>
              <input
                type="number"
                name="population"
                {...register("population", { required: true, min: 0 })}
                placeholder="Population"
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
          <h2>Update Country</h2>
          <form onSubmit={handleSubmit(onUpdate)} style={styles.form}>
            <div style={styles.formGroup}>
              <label>Select Country to Update:</label>
              <select
                name="cname"
                {...register("cname", { required: true })}
                onChange={(e) => setSelectedCountry(e.target.value)}
                style={styles.input}
                defaultValue=""
              >
                <option value="" disabled>
                  -- Select Country --
                </option>
                {countries.map((country) => (
                  <option key={country.cname} value={country.cname}>
                    {country.cname}
                  </option>
                ))}
              </select>
            </div>
            {selectedCountry && (
              <>
                <div style={styles.formGroup}>
                  <label>New Population:</label>
                  <input
                    type="number"
                    name="population"
                    {...register("population", { required: true, min: 0 })}
                    placeholder="New Population"
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
          <h2>Delete Country</h2>
          <form onSubmit={handleSubmit(onDelete)} style={styles.form}>
            <div style={styles.formGroup}>
              <label>Country Name:</label>
              <input
                name="cname"
                {...register("cname", { required: true })}
                placeholder="Country Name"
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
