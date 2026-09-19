/**
 * Authentication and Role Management Utility
 * Prepares CivicPulse for future Admin Dashboard and role-based access control.
 */

export const ROLES = {
  CITIZEN: "citizen",
  ADMIN: "admin",
};

// Retrieve current user from browser storage
export const getCurrentUser = () => {
  try {
    const stored =
      localStorage.getItem("civicpulse_user") ||
      localStorage.getItem("currentUser") ||
      localStorage.getItem("user");
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // ignore parse error
  }
  // Default citizen role for public/normal users
  return {
    id: "citizen_user",
    name: "Citizen",
    role: ROLES.CITIZEN,
  };
};

// Check if current user is an authorized administrator
export const isAdminUser = (user) => {
  const currentUser = user || getCurrentUser();
  return currentUser?.role === ROLES.ADMIN;
};

// Authorization guard for administrative actions (like issue status update)
export const canUpdateIssueStatus = (user) => {
  return isAdminUser(user);
};

