import React, { useEffect, useRef } from "react";
import Picker from "emoji-picker-react";

function EmojiPicker(props) {
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
    >
      <Picker onEmojiClick={onEmojiClick} />
    </div>
  );
}

export default EmojiPicker;
