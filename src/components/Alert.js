import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";

// styled-component 사용하니 Alert 처음 나타날 때
// 폰트 스타일이 깨졌다가 다시 돌아옴

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 15px;
  left: 0px;
  width: 100%;
`;

const AlertBody = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  width: 250px;
  height: 50px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -70px;
  transition: transform 0.3s ease-in-out;

  &.show {
    transform: translateY(70px);
  }
`;

const Message = styled.p`
  color: white;
  font-size: 15px;
`;

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
      case "auth/network-request-failed":
        messageRef.current.innerHTML =
          "인터넷에 연결되어 있지 않습니다. <br/> 접속상태를 확인해주세요.";
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
    <Container>
      <AlertBody className={show && "show"}>
        <Message ref={messageRef}></Message>
      </AlertBody>
    </Container>
  );
}

export default Alert;
