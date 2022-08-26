import React, { useState, createContext, useContext, useEffect } from "react";

// 화면 크기 구함
function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return { width, height };
}

const WindowWidthContext = createContext(null);

export function WindowWidthProvider({ children }) {
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
    <WindowWidthContext.Provider value={windowDimensions.width}>
      {children}
    </WindowWidthContext.Provider>
  );
}

export function useWindowWidth() {
  const windowWidth = useContext(WindowWidthContext);
  if (!windowWidth) throw new Error("cannot find WindowWidthProvider");
  return windowWidth;
}
