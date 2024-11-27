import React, { useState } from "react";
import { Box, Button, TextField, Checkbox, FormGroup, FormControlLabel } from "@mui/material";

const permissionsList = ["Read", "Write", "Delete"];

const RoleModal = ({ role, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: role ? role.name : "",
    permissions: role ? role.permissions : [],
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handlePermissionChange = (permission) => {
    setFormData((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter((p) => p !== permission)
        : [...prev.permissions, permission],
    }));
  };

  const handleSubmit = () => {
    onSave({ ...role, ...formData });
    onClose();
  };

  return (
    <Box sx={{ p: 4, backgroundColor: "#fff", width: "400px", margin: "50px auto", borderRadius: "8px" }}>
      <h3>{role ? "Edit Role" : "Add Role"}</h3>
      <TextField
        label="Role Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <FormGroup>
        {permissionsList.map((permission) => (
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.permissions.includes(permission)}
                onChange={() => handlePermissionChange(permission)}
              />
            }
            label={permission}
            key={permission}
          />
        ))}
      </FormGroup>
      <Button variant="contained" onClick={handleSubmit}>
        Save
      </Button>
      <Button variant="outlined" onClick={onClose}>
        Cancel
      </Button>
    </Box>
  );
};

export default RoleModal;
