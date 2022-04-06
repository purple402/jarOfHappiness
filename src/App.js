import React, { useState } from "react";
import { Main, Writing } from "./screens";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [isWriting, setIsWriting] = useState(false);

  return (
    <div className="App">
      {!isWriting ? (
        <Main
          user={user}
          onChangeUser={(user) => setUser(user)}
          startWriting={() => setIsWriting(true)}
        />
      ) : (
        <Writing />
      )}
    </div>
  );
}

export default App;
