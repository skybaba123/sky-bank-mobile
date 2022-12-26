import { createContext, useEffect, useState } from "react";
import { getUsers } from "../http/http";

export const AuthContext = createContext({
  users: [],
  loginHandler: (token) => {},
  logoutHandler: () => {},
  getCurrentUserHandler: () => {},
  newAccountHandler: () => {},
  updateUsers: () => {},
  authenticated: false,
  currentUser: {},
});

const AuthContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [authenticated, setAuthenticated] = useState();

  useEffect(() => {
    updateUsers();
  }, []);

  const newAccountHandler = (newUser) => {
    setUsers((prev) => [...prev, newUser]);
  };

  const loginHandler = (token) => {
    setAuthenticated(token);
  };

  const logoutHandler = () => {
    setAuthenticated(null);
  };

  const getCurrentUserHandler = (email) => {
    setCurrentUser(users.find((user) => user.email === email));
  };

  const updateUsers = async () => {
    const fetchedUser = await getUsers();
    setUsers(fetchedUser);
    console.log("Fetching Users");
  };

  const contextValue = {
    users,
    loginHandler,
    logoutHandler,
    authenticated: !!authenticated,
    currentUser,
    getCurrentUserHandler,
    newAccountHandler,
    updateUsers,
  };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
