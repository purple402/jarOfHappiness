import React from "react";
import { login } from "../firebase.js";
import "./Login.css";
import { useSetUser } from "../UserContext";

function LoginForm({onSignup, setError}) {
    const changeUser = useSetUser();

    async function handleSubmit(e) {
        e.preventDefault();
        const id = e.target[0].value;
        const password = e.target[1].value;
        const user = await login(id, password);
        if (typeof user !== "string") {
            changeUser(user);
        } else {
            setError(user);
        }
    }

    function handleSignupBtn() {
        onSignup();
    }

    return (
        <div className="Login">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="id">이메일</label>
            <input type="email" id="id" name="id" required />
          </div>
          <div>
            <label htmlFor="password">비밀번호</label>
            <input type="password" id="password" name="password" required />
          </div>
          <input type="submit" className="greenBtn" value="로그인" />
        </form>
        {/* 회원가입 버튼 */}
        <div className="signup">
          <span>회원이 아니신가요?</span>
          <input
            type="button"
            value="회원가입"
            className="blueBtn"
            onClick={handleSignupBtn}
          />
        </div>
        {/* 설명서 링크 */}
        <a
          className="info"
          href="https://www.notion.so/joy-lee/9d49d506adc04cea9c613404ce1f6ef2"
          target="_blank"
          rel="noopener noreferrer"
        >
          설명서를 참고해주세요!
        </a>
      </div>
    );
}

export default LoginForm;
