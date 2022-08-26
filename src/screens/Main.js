import React from "react";
import { UserData, Header, Greeting } from "../components";

function Main() {
  return (
    <div className="Main">
      {/* 헤더 */}
      <Header />
      {/* 버튼 */}
      <Greeting />
      {/* 유저 데이터 */}
      <UserData />
    </div>
  );
}

export default Main;
