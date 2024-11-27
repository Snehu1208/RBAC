import React, { useState, useEffect } from "react";
import { Box, Button, TextField, MenuItem } from "@mui/material";

const UserModal = ({ onClose, onSubmit, editingUser }) => {
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    email: "",
    role: "Viewer",
    status: "Active",
  });

  // Populate form when editing
  useEffect(() => {
    if (editingUser) {
      setFormData(editingUser);
    } else {
      setFormData({
        id: null,
        name: "",
        email: "",
        role: "Viewer",
        status: "Active",
      });
    }
  }, [editingUser]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <Box
      sx={{
        p: 4,
        backgroundColor: "#fff",
        width: "400px",
        margin: "50px auto",
        borderRadius: "8px",
      }}
    >
      <h3>{editingUser ? "Edit User" : "Add User"}</h3>
      <TextField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Role"
        name="role"
        value={formData.role}
        onChange={handleChange}
        select
        fullWidth
        margin="normal"
      >
        <MenuItem value="Admin">Admin</MenuItem>
        <MenuItem value="Editor">Editor</MenuItem>
        <MenuItem value="Viewer">Viewer</MenuItem>
      </TextField>
      <TextField
        label="Status"
        name="status"
        value={formData.status}
        onChange={handleChange}
        select
        fullWidth
        margin="normal"
      >
        <MenuItem value="Active">Active</MenuItem>
        <MenuItem value="Inactive">Inactive</MenuItem>
      </TextField>
      <Button variant="contained" onClick={handleSubmit}>
        Submit
      </Button>
      <Button variant="outlined" onClick={onClose}>
        Cancel
      </Button>
    </Box>
  );
};

export default UserModal;