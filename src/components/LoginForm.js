import React from "react";
import { login } from "../firebase.js";
import { useSetUser } from "../UserContext";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div``;

const StyledLabel = styled.label`
  display: block;
  margin-bottom: 4px;
  font-size: 16px;
`;

const StyledInput = styled.input`
  font-size: 15px;
  margin-bottom: 6px;
  height: 20px;
  width: 95%;
`;

const SignupDiv = styled.div`
  margin-top: 10px;
  text-align: center;
`;


function LoginForm({ onSignup, setError }) {
  const changeUser = useSetUser();
  let navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const id = e.target[0].value;
    const password = e.target[1].value;
    const user = await login(id, password);
    if (typeof user !== "string") {
      changeUser(user);
      navigate("/jarOfHappiness/main");
    } else {
      setError(user);
    }
  }

  function handleSignupBtn() {
    onSignup();
  }

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <div>
          <StyledLabel htmlFor="id">이메일</StyledLabel>
          <StyledInput type="email" id="id" name="id" required />
        </div>
        <div>
          <StyledLabel htmlFor="password">비밀번호</StyledLabel>
          <StyledInput type="password" id="password" name="password" required />
        </div>
        <input type="submit" className="greenBtn" value="로그인" />
      </form>
      {/* 회원가입 버튼 */}
      <SignupDiv>
        <span>회원이 아니신가요?</span>
        <input
          type="button"
          value="회원가입"
          className="blueBtn"
          onClick={handleSignupBtn}
        />
      </SignupDiv>
      {/* 설명서 링크 */}
      <a
        className="info"
        href="https://www.notion.so/joy-lee/9d49d506adc04cea9c613404ce1f6ef2"
        target="_blank"
        rel="noopener noreferrer"
      >
        설명서를 참고해주세요!
      </a>
    </Container>
  );
}

export default LoginForm;
