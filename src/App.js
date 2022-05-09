import React, { useState, useEffect } from "react";
import { Main, Writing } from "./screens";
import "./App.css";

// 화면 크기 구함
function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return { width, height };
}

function App() {
  const [user, setUser] = useState(null);
  const [isWriting, setIsWriting] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    // 화면 크기 변화를 감지함
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="App">
      {!isWriting ? (
        <Main
          user={user}
          onChangeUser={(user) => setUser(user)}
          startWriting={() => setIsWriting(true)}
          windowWidth={windowDimensions.width}
        />
      ) : (
        <Writing
          finishWriting={() => setIsWriting(false)}
          windowWidth={windowDimensions.width}
        />
      )}
    </div>
  );
}

export default App;
