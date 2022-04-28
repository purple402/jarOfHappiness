import React, { useEffect, useRef, useState } from "react";
import { createHappiness } from "../firebase";
import { EmojiPicker } from "../components";

function Writing(props) {
  const dateRef = useRef(null);
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [displayEmojiPicker, setDisplayEmojiPicker] = useState(false);

  function getToday() {
    // 오늘 날짜 가져오기
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
    // 올해 1월1일부터 오늘까지만 입력 가능
    const today = getToday();
    dateRef.current.value = today;
    dateRef.current.max = today;
    dateRef.current.min = `${today.substring(0, 4)}-01-01`;
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const text = e.target[0].value;
    const date = e.target[1].value;
    const emoji = chosenEmoji;

    // 문자열 마지막 공백과 개행문자 제거
    let str = text.replace(/\n\s*$/, "");
    // firebase에 자료 저장
    await createHappiness({ text: str, emoji, date });

    // 메인 스크린으로 나감
    props.finishWriting();
  }

  function handleCancel() {
    props.finishWriting();
  }

  const handleEmojiBtn = () => {
    setDisplayEmojiPicker(!displayEmojiPicker);
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
        <form id="writingForm" onSubmit={handleSubmit}>
          <textarea placeholder="간직하고싶은 행복을 적어주세요" required />
          <div className="writingSetting">
            <div className="writingDetail">
              <label htmlFor="date">📆 날짜</label>
              <input id="dateInput" type="date" ref={dateRef} required />
            </div>
            <div className="writingDetail">
              <label htmlFor="emoji">🌸 아이콘</label>
              <input
                type="button"
                id="emojiBtn"
                value={chosenEmoji || "📌"}
                onClick={handleEmojiBtn}
              />
              <EmojiPicker
                selectEmoji={(emoji) => setChosenEmoji(emoji)}
                displayEmojiPicker={displayEmojiPicker}
                setDisplayEmojiPicker={(display) =>
                  setDisplayEmojiPicker(display)
                }
              />
            </div>
          </div>
          <div className="writingSetting">
            <input
              type="button"
              value="다음에 적기"
              onClick={handleCancel}
              className="writingSubmitBtn yellowBtn"
            />
            <input
              type="submit"
              value="저금통에 넣기"
              className="writingSubmitBtn greenBtn"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Writing;
