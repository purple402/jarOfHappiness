import React from "react";
import { UserData, Header, Greeting } from "../components";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";

function Main() {
  const user = useUser();
  let navigate = useNavigate();
  return (
    <>
      {user ? (
        // 유저가 있으면 메인페이지 보여줌
        <div className="Main">
          {/* 헤더 */}
          <Header />
          {/* 버튼 */}
          <Greeting />
          {/* 유저 데이터 */}
          <UserData />
        </div>
      ) : (
        // 유저가 없으면 로그인 페이지로 이동하도록함
        <>
          <p>로그인 페이지로 이동합니다.</p>
          <button
            onClick={() => navigate("/jarOfHappiness")}
            className="blueBtn"
          >
            로그인 페이지
          </button>
        </>
      )}
    </>
  );
}

export default Main;
