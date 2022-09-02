import React from "react";
import { UserData, Header, Greeting } from "../components";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";
import styled from "styled-components";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 50px;
  max-width: 700px;
  width: 100%;
  /* userName과 Modal을 위한 z-index 설정 */
  z-index: 1;

  @media (max-width: 730px) {
    padding: 0 30px;
  }
`;

function Main() {
  const user = useUser();
  let navigate = useNavigate();
  return (
    <>
      {user ? (
        // 유저가 있으면 메인페이지 보여줌
        <MainContainer>
          {/* 헤더 */}
          <Header />
          {/* 버튼 */}
          <Greeting />
          {/* 유저 데이터 */}
          <UserData />
        </MainContainer>
      ) : (
        // 유저가 없으면 로그인 페이지로 이동하도록함
        <MainContainer>
          <p>로그인 페이지로 이동합니다.</p>
          <button
            onClick={() => navigate("/jarOfHappiness")}
            className="blueBtn"
          >
            로그인 페이지
          </button>
        </MainContainer>
      )}
    </>
  );
}

export default Main;
