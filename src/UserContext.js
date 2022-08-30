import React, { useState, createContext, useContext, useEffect } from "react";

const UserContext = createContext(null);
const SetUserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    const localData = sessionStorage.getItem("user");
    return localData ? JSON.parse(localData) : null;
  });

  useEffect(() => {
    sessionStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <UserContext.Provider value={user}>
      <SetUserContext.Provider value={setUser}>
        {children}
      </SetUserContext.Provider>
    </UserContext.Provider>
  );
}

export function useUser() {
  const user = useContext(UserContext);
  if (!user) throw new Error('cannot find UserProvider');
  return user;
}

export function useSetUser() {
  const setUser = useContext(SetUserContext);
  if (!setUser) throw new Error('cannot find SetUserProvider');
  return setUser;
}
