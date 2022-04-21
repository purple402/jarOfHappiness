import React, { useEffect, useRef, useState } from "react";
import { createHappiness } from "../firebase";
import Picker from "emoji-picker-react";

function Writing(props) {
  const dateRef = useRef(null);
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [emojiPicker, setEmojiPicker] = useState(false);

  function getToday() {
    const today = new Date();
    let dateValue = new Date(today);

    // 새벽 3시에 날짜 바뀜
    let hours = today.getHours();
    if (hours < 3) {
      dateValue.setDate(today.getDate() - 1);
    }

    let year = dateValue.getFullYear();
    let month = dateValue.getMonth() + 1;
    let date = dateValue.getDate();

    // 날짜 형식으로 반환
    return `${year}-${month < 10 ? "0" + month : month}-${
      date < 10 ? "0" + date : date
    }`;
  }

  useEffect(() => {
    const today = getToday();
    dateRef.current.value = today;
    dateRef.current.max = today;
    dateRef.current.min = `${today.substring(0, 4)}-01-01`;
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const text = e.target[0].value;
    const emoji = e.target[1].value || null;
    const date = e.target[2].value;

    // 문자열 마지막 공백과 개행문자 제거
    let str = text.replace(/\n\s*$/, '');
    await createHappiness({ "text" : str, emoji, date });
    
    props.finishWriting();
  }

  function handleCancel() {
    props.finishWriting();
  }

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject.emoji);
  };

  const handleEmojiBtn = () => {
    console.log("togglePicker");
    setEmojiPicker(!emojiPicker);
  };

  return (
    <div className="Writing">
      <div className="titleDiv">
        <div className="title">
          <span id="emoji">✏️</span>
          <span id="appTitle">해피 저금통</span>
        </div>
      </div>
      {/* 작성 */}
      <div className="writingDiv">
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="간직하고싶은 행복을 적어주세요"
            required
          />
          <div className="writingSetting">
            <div className="writingDetail">
              <label htmlFor="date">📆</label>
              <input id="date" type="date" ref={dateRef} required />
            </div>
            <div className="writingDetail">
              <label htmlFor="emoji">🌸</label>
              <input
                id="emoji"
                type="text"
                placeholder="행복의 아이콘은?"
                onClick={handleEmojiBtn}
                disabled
                value={chosenEmoji}
              />
              <input
                type="button"
                id="emojiBtn"
                value={chosenEmoji || "😊"}
                onClick={handleEmojiBtn}
              />
              {emojiPicker && <Picker onEmojiClick={onEmojiClick} />}
            </div>
          </div>
          <div className="writingSetting">
            <input type="button" value="다음에 적기" onClick={handleCancel} className="writingSubmitBtn"/>
            <input type="submit" value="저금통에 넣기" className="writingSubmitBtn"/>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Writing;
