import React, { createContext, useContext } from "react";
import * as userService from "@services/user-service";

interface UsersContextType {
  getAllUsers: (limit: number, cursor?: string) => Promise<any[]>;
  createUser: (user: any) => Promise<any>;
  getUser: (id: string) => Promise<any>;
  updateUser: (id: string, user: any) => Promise<any>;
  deleteUser: (id: string) => Promise<any>;
}

const UsersContext = createContext<UsersContextType | null>(null);

export const UsersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <UsersContext.Provider
    value={{
      getAllUsers: userService.getAllUsers,
      createUser: userService.createUser,
      getUser: userService.getUser,
      updateUser: userService.updateUser,
      deleteUser: userService.deleteUser,
    }}
  >
    {children}
  </UsersContext.Provider>
);

export const useUsers = () => {
  const ctx = useContext(UsersContext);
  if (!ctx) throw new Error("useUsers must be used within UsersProvider");
  return ctx;
};