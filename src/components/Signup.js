import React from "react";
import { createUser } from "../firebase";

function Signup(props) {
  async function handleSubmit(e) {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    const displayName = e.target[2].value;
    const user = await createUser(email, password, displayName);
    console.log("Signup createUser", user);
    props.finishSignup(user);
  }

  return (
    <div className="Signup">
      <span>회원가입을 위한 정보를 적어주세요</span>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="id">이메일</label>
          <input type="email" id="id" name="id" required />
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <input type="password" id="password" name="password" required />
        </div>
        <div>
          <label htmlFor="displayName">별명</label>
          <input id="displayName" name="displayName" required />
        </div>
        <input type="submit" value="회원가입하기" />
        <input type="button" value="취소하기" />
      </form>
    </div>
  );
}

export default Signup;
