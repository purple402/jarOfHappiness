import React from "react";
import { Routes, Route } from "react-router-dom";
import { Login, Main, Write } from "./screens";

function AppRoutes() {
  return (
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
  );
}

export default AppRoutes;
