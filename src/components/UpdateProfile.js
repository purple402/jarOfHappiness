import React, { useState } from "react";
import { getCurrentUser, updateUserDisplayName } from "../firebase";
import { Alert } from "../components";

function UpdateProfile(props) {
  const user = getCurrentUser();
  const [displayName, setDisplayName] = useState(user.displayName);
  const [alert, setAlert] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (displayName !== user.displayName) {
      setAlert("profileUpdate-loading");
      await updateUserDisplayName(displayName);
      setAlert(null)
    }
    props.finishUpdateProfile();
  }

  function handleDisplayName(e) {
    setDisplayName(e.target.value);
  }

  function deleteDisplayName(e) {
    e.target.previousSibling.value = "";
  }

  function closeModal() {
    props.finishUpdateProfile();
  }

  return (
    <div className="UpdateProfile">
      <div className="modalTitle">
        <span>프로필 수정</span>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="modalFormDiv">
          <label htmlFor="id">이메일</label>
          <input
            type="email"
            id="id"
            name="id"
            value={user.email}
            readOnly
            disabled
          />
        </div>
        <div className="modalFormDiv">
          <label htmlFor="displayName">별명</label>
          <input
            id="displayName"
            name="displayName"
            value={displayName || undefined}
            onChange={handleDisplayName}
            placeholder={displayName === null ? "별명이 없습니다" : ""}
            required
          />
          <input
            type="button"
            value="✖"
            id="deleteBtn"
            onClick={(e) => deleteDisplayName(e)}
          />
        </div>
        <div className="modalBtnDiv">
          <input
            type="button"
            value="취소"
            className="yellowBtn"
            onClick={() => closeModal()}
          />
          <input type="submit" className="greenBtn" value="적용" />
        </div>
      </form>
      {alert && (
        <Alert code={alert} finishAlert={(alert) => setAlert(alert)} />
      )}
    </div>
  );
}

export default UpdateProfile;
