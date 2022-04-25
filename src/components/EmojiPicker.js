import React, { useEffect, useRef } from "react";
import Picker from "emoji-picker-react";

function EmojiPicker(props) {
  const pickerRef = useOutsideRef(null);

  function useOutsideRef() {
    const ref = useRef(null);

    useEffect(() => {
      // picker 외부 클릭하면 picker 사라짐
      function handleClickOutside(event) {
        // emojiPicker가 나와있을 때만 작동
        if (props.displayEmojiPicker) {
          if (ref.current && !ref.current.contains(event.target)) {
            props.setDisplayEmojiPicker(!props.displayEmojiPicker);
          }
        }
      }
      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    });
    return ref;
  }

  const onEmojiClick = (event, emojiObject) => {
    props.selectEmoji(emojiObject.emoji);
  };

  return (
    <div
      className={
        props.displayEmojiPicker
          ? "emojiPickerContainer display"
          : "emojiPickerContainer"
      }
      ref={pickerRef}
    >
      <Picker onEmojiClick={onEmojiClick} />
    </div>
  );
}

export default EmojiPicker;
