import React from "react";
import { Login } from "./screens";
import { UserProvider } from "./UserContext";
import { WindowWidthProvider } from "./WindowWidthContext";
import "./App.css";

function App() {
  return (
    <WindowWidthProvider>
      <UserProvider>
        <div className="App">
          <Login />
        </div>
      </UserProvider>
    </WindowWidthProvider>
  );
}

export default App;
