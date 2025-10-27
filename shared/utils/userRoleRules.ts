import { User } from "../types";

export function userCanModify(user: User | null, targetUser: User | null) {
  if (!user) return false; // Non user cant modify anything
  if (!targetUser) return true; // Creating new user / Empty target user

  // Demo site user cannot be modified
  //if (targetUser?.email === "demosite@gmail.com") return false;

  // SITE_OWNER can modify anyone
  if (user.role === "SITE_OWNER") return true;

  // ADMIN rules
  if (user.role === "ADMIN") {
    // ADMIN can modify self
    if (user.id === targetUser.id) return true;
    // ADMIN cannot modify other ADMIN or SITE_OWNER
    if (targetUser.role !== "ADMIN" && targetUser.role !== "SITE_OWNER")
      return true;
  }

  return false;
}
