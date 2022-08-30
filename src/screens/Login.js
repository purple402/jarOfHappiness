import React, { useEffect, useState } from "react";
import { LoginForm, Header, Alert, Modal, SignupForm } from "../components";
import { useUser } from "../UserContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [signup, setSignup] = useState(false);
  const [error, setError] = useState(null);

  // 로그인 되어있으면 메인 페이지로 이동
  const user = useUser();
  let navigate = useNavigate();
  useEffect(() => {
    if (user) navigate("/jarOfHappiness/main");
  }, [user, navigate]);

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
