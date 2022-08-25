import React, { useState, createContext, useContext } from 'react';
// import * as firebase from './firebase';

const UserContext = createContext(null);
const SetUserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

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
