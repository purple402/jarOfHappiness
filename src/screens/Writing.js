import React from "react";

function Writing(props) {
  function handleSubmit(e) {
    e.preventDefault();
    console.log("handleSubmit");
  }

  function handleCancel() {
    props.finishWriting();
  }

  return (
    <div className="Writing">
      <div className="titleDiv">
        <div className="title">
          <span id="emoji">✏️</span>
          <span id="appTitle">해피 저금통</span>
        </div>
      </div>
      <div className="writingDiv">
        <form onSubmit={handleSubmit}>
          <textarea placeholder="나중에 다시 보고싶은 행복을 적어주세요" />
          <input id="date" type="date"/>
          <input type="submit" value="저금통에 넣기" />
          <input type="button" value="다음에 적기" onClick={handleCancel} />
        </form>
      </div>
    </div>
  );
}

export default Writing;
