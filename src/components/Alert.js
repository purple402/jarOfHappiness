import React, {useRef} from "react";
import './Alert.css'

function Alert(props) {
const messageRef = useRef(null);

  const code = props.code;
  let message = null;
  switch(code) {
      case "auth/user-not-found":
          message = `아이디가 존재하지 않습니다. 아이디를 확인해주세요.`
          break;
    case "auth/wrong-password":
        messageRef.current.innerHTML = '비밀번호가 틀렸습니다. </br> 비밀번호를 확인해주세요.'
        break;
  }
  return (
    <div className="Alert">
      <div className="alertBody">
        <p id="message" ref={messageRef}></p>
      </div>
    </div>
  );
}

export default Alert;
