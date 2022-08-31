import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import { UserProvider } from "./UserContext";
import { WindowWidthProvider } from "./WindowWidthContext";
import "./App.css";

function App() {

  return (
    <BrowserRouter>
      <WindowWidthProvider>
        <UserProvider>
          <div className="App">
            <AppRoutes />
          </div>
        </UserProvider>
      </WindowWidthProvider>
    </BrowserRouter>
  );
}

export default App;
