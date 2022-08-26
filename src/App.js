import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login, Main, Write } from "./screens";
import { UserProvider } from "./UserContext";
import { WindowWidthProvider } from "./WindowWidthContext";
import "./App.css";

function App() {

  return (
    <BrowserRouter>
      <WindowWidthProvider>
        <UserProvider>
          <div className="App">
            <Routes>
              <Route path="/jarOfHappiness" element={<Login />} />
              <Route path="/jarOfHappiness/main" element={<Main />} />
              <Route path="/jarOfHappiness/write" element={<Write />} />
              <Route
                path="*"
                element={
                  <>
                    <p>주소를 다시 확인해주세요!</p>
                  </>
                }
              />
            </Routes>
          </div>
        </UserProvider>
      </WindowWidthProvider>
    </BrowserRouter>
  );
}

export default App;
