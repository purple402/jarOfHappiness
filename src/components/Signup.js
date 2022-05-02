import React from "react";
import { createUser } from "../firebase";

function Signup(props) {
  async function handleSubmit(e) {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    const displayName = e.target[2].value;
    const user = await createUser(email, password, displayName);
    props.finishSignup(user);
  }

  return (
    <div className="Signup">
      <div className="modalTitle">
        <span>회원가입</span>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="modalFormDiv">
          <label htmlFor="id">이메일</label>
          <input type="email" id="id" name="id" required />
        </div>
        <div className="modalFormDiv">
          <label htmlFor="password">비밀번호</label>
          <input type="password" id="password" name="password" required />
        </div>
        <div className="modalFormDiv">
          <label htmlFor="displayName">별명</label>
          <input id="displayName" name="displayName" required />
        </div>
        <div className="modalBtnDiv">
          <input
            type="button"
            value="취소"
            className="yellowBtn"
            onClick={() => props.finishSignup(null)}
          />
          <input type="submit" className="greenBtn" value="회원가입" />
        </div>
      </form>
    </div>
  );
}

export default Signup;
