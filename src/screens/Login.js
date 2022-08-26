import React, { useState } from "react";
import { LoginForm, Header, Alert, Modal, SignupForm } from "../components";

function Login() {
  const [signup, setSignup] = useState(false);
  const [error, setError] = useState(null);

  return (
    <div>
      <Header />
      {/* 로그인 */}
      <LoginForm onSignup={() => setSignup(true)} setError={setError} />
      {/* 에러 알람 */}
      {error && <Alert code={error} finishAlert={(error) => setError(error)} />}
      {/* 회원가입 모달 */}
      {signup && (
        <Modal closeModal={() => setSignup(!signup)}>
          <SignupForm finishSignup={() => setSignup(!signup)} />
        </Modal>
      )}
    </div>
  );
}

export default Login;
