import { User } from "../types";

export function userPermissions(
  user: User | null,
  targetUser: User | null
): {
  edit: boolean;
  editRole?: boolean;
  delete: boolean;
} {
  if (!user) return { edit: false, delete: false }; // Non user cant modify anything
  if (!targetUser) return { edit: true, delete: false }; // Creating new user / Empty target user

  // Check if modifying own account
  const idMatch = user.id === targetUser.id;

  // Demo user user cannot be modified or deleted
  if (targetUser?.email === "demouser@gmail.com")
    return { edit: false, delete: false };

  // Site owners can modify and delete anyone.
  // They can only edit themselves because deleting themselves would be bad.
  if (targetUser.role === "SITE_OWNER") {
    return {
      edit: user.role === "SITE_OWNER" && idMatch,
      editRole: false,
      delete: false,
    };
  }

  // Admins can modify other admins only if they are SITE_OWNER or modifying themselves
  if (targetUser.role === "ADMIN") {
    return {
      edit:
        user.role === "SITE_OWNER" || (targetUser.role === "ADMIN" && idMatch),
      delete: user.role === "SITE_OWNER",
    };
  }

  // Users can modify other users only if they are ADMIN or SITE_OWNER
  // or if they are modifying their own account
  if (targetUser.role === "USER") {
    return {
      edit:
        user.role === "SITE_OWNER" ||
        user.role === "ADMIN" ||
        (targetUser.role === "USER" && idMatch),
      delete:
        user.role === "SITE_OWNER" ||
        user.role === "ADMIN" ||
        (targetUser.role === "USER" && idMatch),
    };
  }

  return { edit: false, delete: false };
}
