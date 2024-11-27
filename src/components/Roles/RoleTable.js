import React, { useState } from "react";
import { Button, Table, TableHead, TableRow, TableCell, TableBody, Modal } from "@mui/material";
import RoleModal from "./RoleModal";

const RoleTable = () => {
  const [roles, setRoles] = useState([
    { id: 1, name: "Admin", permissions: ["Read", "Write", "Delete"] },
    { id: 2, name: "Editor", permissions: ["Read", "Write"] },
    { id: 3, name: "Viewer", permissions: ["Read"] },
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editRole, setEditRole] = useState(null);

  const handleDelete = (id) => setRoles(roles.filter((role) => role.id !== id));

  const handleSave = (role) => {
    if (role.id) {
      setRoles(roles.map((r) => (r.id === role.id ? role : r)));
    } else {
      setRoles([...roles, { ...role, id: roles.length + 1 }]);
    }
    setModalOpen(false);
  };

  return (
    <div>
      <h2>Role Management</h2>
      <Button variant="contained" onClick={() => { setEditRole(null); setModalOpen(true); }}>
        Add Role
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Permissions</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {roles.map((role) => (
            <TableRow key={role.id}>
              <TableCell>{role.name}</TableCell>
              <TableCell>{role.permissions.join(", ")}</TableCell>
              <TableCell>
                <Button variant="outlined" onClick={() => { setEditRole(role); setModalOpen(true); }}>
                  Edit
                </Button>
                <Button variant="outlined" color="error" onClick={() => handleDelete(role.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <RoleModal role={editRole} onSave={handleSave} onClose={() => setModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default RoleTable;