import React from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, Checkbox } from "@mui/material";

const roles = ["Admin", "Editor", "Viewer"];
const permissions = ["Read", "Write", "Delete"];

const PermissionGrid = () => {
  const [rolePermissions, setRolePermissions] = React.useState({
    Admin: ["Read", "Write", "Delete"],
    Editor: ["Read", "Write"],
    Viewer: ["Read"],
  });

  const togglePermission = (role, permission) => {
    setRolePermissions((prev) => ({
      ...prev,
      [role]: prev[role].includes(permission)
        ? prev[role].filter((p) => p !== permission)
        : [...prev[role], permission],
    }));
  };

  return (
    <div>
      <h2>Permission Management</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Role</TableCell>
            {permissions.map((permission) => (
              <TableCell key={permission}>{permission}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {roles.map((role) => (
            <TableRow key={role}>
              <TableCell>{role}</TableCell>
              {permissions.map((permission) => (
                <TableCell key={permission}>
                  <Checkbox
                    checked={rolePermissions[role].includes(permission)}
                    onChange={() => togglePermission(role, permission)}
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PermissionGrid;
