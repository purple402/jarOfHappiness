import { Main, Writing } from "./screens";
import React from "react";
import { UserProvider } from "./UserContext";
import { WindowWidthProvider } from "./WindowWidthContext";
import "./App.css";

function App() {
  return (
    <WindowWidthProvider>
      <UserProvider>
        <div className="App">
        </div>
      </UserProvider>
    </WindowWidthProvider>
  );
}

export default App;
