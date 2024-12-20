"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Link from "next/link";
import "dotenv/config";
const apiUrl = process.env.BACKEND_URL;
export default function User() {
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
      const response = await axios.get(`${apiUrl}/record/get`);
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
      await axios.post(`${apiUrl}/record/create`, data);
      setMessage("User created successfully!");
      reset();
      if (operation === "LIST") fetchUsers();
    } catch (error) {
      console.error("Error creating user:", error);
      setMessage("Failed to create user.");
    }
  };

  const onUpdate = async (data) => {
    try {
      await axios.put(`${apiUrl}/record/update`, data);
      setMessage("User updated successfully!");
      reset();
      if (operation === "LIST") fetchUsers();
    } catch (error) {
      console.error("Error updating user:", error);
      setMessage("Failed to update user.");
    }
  };

  const onDelete = async (data) => {
    try {
      await axios.delete(`${apiUrl}/record/delete`, { data });
      setMessage("Record deleted successfully!");
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
      <h1>Record Management</h1>
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
          <h2>Record</h2>
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Email</th>
                <th>Country</th>
                <th>Disease code</th>
                <th>Total Deaths</th>
                <th>Total Patients</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.email + user.cname + user.disease_code}>
                  <td>{user.email}</td>
                  <td>{user.cname}</td>
                  <td>{user.disease_code}</td>
                  <td>{user.total_deaths}</td>
                  <td>{user.total_patients}</td>

                  <td>
                    <button
                      onClick={() => {
                        setSelectedUser(
                          `${user.email},${user.cname},${user.disease_code}`
                        );
                        setOperation("UPDATE");
                      }}
                      style={styles.actionButton}
                    >
                      Edit
                    </button>
                    {" | "}
                    <button
                      onClick={() =>
                        onDelete({
                          email: user.email,
                          cname: user.cname,
                          disease_code: user.disease_code,
                        })
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
            Create User
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
            <div style={styles.formGroup}>
              <label>Name:</label>
              <input
                name="name"
                {...register("name", { required: true })}
                placeholder="name"
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label>Surname:</label>
              <input
                name="surname"
                {...register("surname", { required: true })}
                placeholder="surname"
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label>Salary:</label>
              <input
                name="salary"
                {...register("salary", { required: true })}
                placeholder="salary"
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label>Phone:</label>
              <input
                name="phone"
                {...register("phone", { required: true })}
                placeholder="phone"
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label>Country:</label>
              <input
                name="cname"
                {...register("cname", { required: true })}
                placeholder="country"
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
                name="email"
                {...register("email", { required: true })}
                onChange={(e) => setSelectedUser(e.target.value)}
                style={styles.input}
                defaultValue=""
              >
                <option value="" disabled>
                  -- Select User --
                </option>
                {users.map((user) => (
                  <option key={user.email} value={user.email}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
            {selectedUser && (
              <>
                <div style={styles.formGroup}>
                  <label>New Name:</label>
                  <input
                    type="text"
                    name="name"
                    {...register("name", { required: true, min: 0 })}
                    placeholder={selectedUser.name}
                    style={styles.input}
                  />
                  <label>New Surname:</label>
                  <input
                    type="text"
                    name="surname"
                    {...register("surname", { required: true, min: 0 })}
                    placeholder={selectedUser.surname}
                    style={styles.input}
                  />
                  <label>New Salary:</label>
                  <input
                    type="number"
                    name="salary"
                    {...register("salary", { required: true, min: 0 })}
                    placeholder="New salary"
                    style={styles.input}
                  />
                  <label>New Phone:</label>
                  <input
                    type="text"
                    name="phone"
                    {...register("phone", { required: true, min: 0 })}
                    placeholder="New phone"
                    style={styles.input}
                  />
                  <label>New Country:</label>
                  <input
                    type="text"
                    name="cname"
                    {...register("cname", { required: true, min: 0 })}
                    placeholder="New country"
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
          <h2>Delete Record</h2>
          <form onSubmit={handleSubmit(onDelete)} style={styles.form}>
            <div style={styles.formGroup}>
              <label>Email:</label>
              <input
                name="email"
                {...register("email", { required: true })}
                placeholder="email"
                style={styles.input}
              />
              <label>Country:</label>
              <input
                name="cname"
                {...register("cname", { required: true })}
                placeholder="Country"
                style={styles.input}
              />
              <label>Disease Code:</label>
              <input
                name="disease_code"
                {...register("disease_code", { required: true })}
                placeholder="disease_code"
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
