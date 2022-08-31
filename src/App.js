import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import { UserProvider } from "./UserContext";
import { WindowWidthProvider } from "./WindowWidthContext";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: 'Cafe24SsurroundAir';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2105_2@1.0/Cafe24SsurroundAir.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}

body {
  background-color: #f4f8ff;
}

body, button, input, textarea {
  font-family: "Cafe24SsurroundAir";
}

input[type="submit"]:hover,
input[type="button"]:hover,
button {
  cursor: pointer;
}
`;

const RootDiv = styled.div`
  display: flex;
  justify-content: center;
`;

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <WindowWidthProvider>
        <UserProvider>
          <RootDiv>
            <AppRoutes />
          </RootDiv>
        </UserProvider>
      </WindowWidthProvider>
    </BrowserRouter>
  );
}

export default App;
