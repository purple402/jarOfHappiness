import React, { useState } from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="titleDiv">
        <div className="title">
          <span id="emoji">✏️</span>
          <span id="appTitle">해피 저금통</span>
          <p id="titleInfo">
            기쁜 일이나 즐거운 일을 적어 넣어주세요. 한 해 동안 모아둔 행복한
            순간을 연말에 개봉해 꺼내보며 한 해의 기쁨을 떠올려봐요.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
