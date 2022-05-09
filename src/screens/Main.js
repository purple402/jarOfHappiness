import React, { useState } from "react";
import { Login, Modal, Signup, UpdateProfile, UserData } from "../components";
import { logout } from "../firebase";

function Main(props) {
  const user = props.user;
  const windowWidth = props.windowWidth;

  const [signup, setSignup] = useState(false);
  const [updateProfile, setUpdateProfile] = useState(false);

  function handleSubmit(user) {
    props.onChangeUser(user);
  }

  function handleLogoutBtn() {
    logout();
    props.onChangeUser(null);
  }

  function finishSignup(user) {
    setSignup(!signup);
    props.onChangeUser(user);
  }

  function handleWriteBtn() {
    props.startWriting();
  }

  return (
    <div className="Main">
      <div className="titleDiv">
        <div className="title">
          <span id="emoji">🌼</span>
          <span id="appTitle">해피 저금통</span>
        </div>
        {windowWidth > 530 ? (
          <p id="titleInfo">
            기쁜 일이나 즐거운 일을 적어 해피 저금통에 넣어주세요.
            <br />
            연말에 개봉해 꺼내보며 한 해 동안 행복했던 순간들을 떠올려봐요.
          </p>
        ) : (
          <p id="titleInfo">
            기쁜 일이나 즐거운 일을 적어 <br />
            해피 저금통에 넣어주세요.
            <br />
            연말에 개봉해 꺼내보며 <br />한 해 동안 행복했던 순간들을
            떠올려봐요.
          </p>
        )}
      </div>
      {user === null ? (
        <Login
          onSubmit={(user) => handleSubmit(user)}
          onSignup={() => setSignup(!signup)}
        />
      ) : (
        <div className="user">
          {windowWidth > 530 ? (
            <div id="userGreeting">
              <span id="userName">
                안녕하세요, {user.displayName}님! 오늘의 행복을 기록해 봐요!
              </span>
              <span id="userNameHighlight">{user.displayName}</span>
            </div>
          ) : (
            <p id="userGreeting">
              안녕하세요,{" "}
              <span style={{ backgroundColor: "yellow" }}>
                {user.displayName}
              </span>
              님!
              <br />
              오늘의 행복을 기록해 봐요!
            </p>
          )}
          <div id="userButtons">
            <button id="writeBtn" className="greenBtn" onClick={handleWriteBtn}>
              작성하기
            </button>
            <button
              id="updateProfileBtn"
              className="yellowBtn"
              onClick={() => setUpdateProfile(true)}
            >
              정보수정하기
            </button>
            <button
              id="logoutBtn"
              className="blueBtn"
              onClick={handleLogoutBtn}
            >
              로그아웃하기
            </button>
          </div>
        </div>
      )}
      {signup && (
        <Modal closeModal={() => setSignup(!signup)}>
          <Signup finishSignup={(user) => finishSignup(user)} />
        </Modal>
      )}
      {updateProfile && (
        <Modal closeModal={() => setUpdateProfile(!updateProfile)}>
          <UpdateProfile
            finishUpdateProfile={() => setUpdateProfile(!updateProfile)}
          />
        </Modal>
      )}
      {user && <UserData />}
    </div>
  );
}

export default Main;
