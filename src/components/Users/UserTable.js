import React, { useState } from "react";
import {
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Modal,
} from "@mui/material";
import UserModal from "./UserModal";

// Helper function to determine permissions
const getPermissions = (role, status) => {
  if (status === "Inactive") {
    return "No Access";
  }
  switch (role) {
    case "Admin":
      return "Full Access";
    case "Editor":
      return "Edit and View";
    case "Viewer":
      return "View Only";
    default:
      return "Unknown";
  }
};

const UserTable = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Editor", status: "Inactive" },
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // Add or Update User
  const handleSaveUser = (user) => {
    if (user.id) {
      // Update user
      setUsers(users.map((u) => (u.id === user.id ? user : u)));
    } else {
      // Add new user
      setUsers([...users, { ...user, id: users.length + 1 }]);
    }
  };

  // Delete User
  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div>
      <h2>User Management</h2>
      <Button
        variant="contained"
        onClick={() => {
          setEditingUser(null);
          setModalOpen(true);
        }}
      >
        Add User
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Permissions</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.status}</TableCell>
              <TableCell>{getPermissions(user.role, user.status)}</TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setEditingUser(user);
                    setModalOpen(true);
                  }}
                  sx={{ marginRight: 1 }}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <UserModal
          onClose={() => setModalOpen(false)}
          onSubmit={(user) => {
            handleSaveUser(user);
            setModalOpen(false);
          }}
          editingUser={editingUser}
        />
      </Modal>
    </div>
  );
};

export default UserTable;