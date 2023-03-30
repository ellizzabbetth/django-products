import { createContext, useState, useCallback, useMemo } from "react";

export const UserContext = createContext({
  setCurrentUser: () => null,
  currentUser: null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  // get additional user data from database
  // add data usercontext.provide value
  // https://stackoverflow.com/questions/45354886/using-react-context-to-maintain-user-state
  const userData = useCallback(() => {
     
  })

  // const value = { currentUser, setCurrentUser };
  const value = useMemo(() => ({
    fetch: userData,
    currentUser, 
    setCurrentUser,
  }), [userData])

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};