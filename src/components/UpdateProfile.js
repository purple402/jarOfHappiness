import React, { useState } from "react";
import { getCurrentUser, updateUserDisplayName } from "../firebase";

function UpdateProfile(props) {
  const user = getCurrentUser();
  const [displayName, setDisplayName] = useState(user.displayName);

  async function handleSubmit(e) {
    e.preventDefault();
    if(displayName !== user.displayName) {
      await updateUserDisplayName(displayName);
    }
    props.finishUpdateProfile();
  }

  function handleDisplayName(e) {
    setDisplayName(e.target.value);
  }

  function closeModal() {
    props.finishUpdateProfile()
  }

  return (
    <div className="UpdateProfile">
      <div>
        <span>프로필 수정</span>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
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
        <div>
          <label htmlFor="displayName">별명</label>
          <input
            id="displayName"
            name="displayName"
            value={displayName || undefined}
            onChange={handleDisplayName}
            placeholder={displayName === null ? "별명이 없습니다" : ""}
          />
        </div>
        <input type="submit" value="적용" />
        <input type="button" value="취소" onClick={() => closeModal()}/>
      </form>
    </div>
  );
}

export default UpdateProfile;
