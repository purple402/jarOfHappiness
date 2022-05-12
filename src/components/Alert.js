import React, { useRef, useEffect, useState } from "react";
import "./Alert.css";

function Alert(props) {
  const [show, setShow] = useState(false);
  const code = props.code;
  const messageRef = useRef();

  useEffect(() => {
    setShow(true);
    switch (code) {
      case "auth/user-not-found":
        messageRef.current.innerHTML = `아이디가 존재하지 않습니다. </br> 아이디를 확인해주세요.`;
        break;
      case "auth/wrong-password":
        messageRef.current.innerHTML =
          "비밀번호가 틀렸습니다. </br> 비밀번호를 확인해주세요.";
        break;
      case "auth/email-already-in-use":
        messageRef.current.innerHTML =
          "이미 사용중인 이메일입니다. </br> 다른 이메일을 사용해주세요.";
        break;
      case "auth/invalid-email":
        messageRef.current.innerHTML = "이메일을 형식에 맞게 입력해주세요.";
        break;
      case "signup-loading":
        messageRef.current.innerHTML =
          "회원가입중입니다. <br/> 잠시만 기다려 주세요.";
        break;
      case "profileUpdate-loading":
        messageRef.current.innerHTML =
          "회원정보를 수정중입니다. <br/> 잠시만 기다려 주세요.";
        break;
      case "writing-loading":
        messageRef.current.innerHTML =
          "행복을 저장하고 있습니다. <br/> 잠시만 기다려 주세요.";
        break;
      default:
        messageRef.current.innerHTML =
          "오류가 발생했습니다. </br> 잠시 후 다시 시도해주세요.";
        break;
    }

    let timer = setTimeout(() => {
      setShow(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  
  let timer2 = setTimeout(() => {
    props.finishAlert(null);
  }, 2500);

  return (
    <div className="Alert">
      <div className={show ? "alertBody show" : "alertBody"}>
        <p id="message" ref={messageRef}></p>
      </div>
    </div>
  );
}

export default Alert;
