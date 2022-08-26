import React from "react";
import { useWindowWidth } from "../WindowWidthContext";

function Header() {
  const windowWidth = useWindowWidth();
  
  return (
    <div className="titleDiv">
      <div className="title">
        <span id="emoji">🌼</span>
        <span id="appTitle">해피 저금통</span>
      </div>
      {windowWidth > 530 ? (
        <p id="titleInfo">
          기쁜 일이나 즐거운 일을 적어 해피 저금통에 넣어주세요.
          <br />
          연말에 개봉해 꺼내 보며 한 해 동안 행복했던 순간들을 떠올려봐요.
        </p>
      ) : (
        <p id="titleInfo">
          기쁜 일이나 즐거운 일을 적어 <br />
          해피 저금통에 넣어주세요.
          <br />
          연말에 개봉해 꺼내 보며 <br />한 해 동안 행복했던 순간들을 떠올려봐요.
        </p>
      )}
    </div>
  );
}

export default Header;
