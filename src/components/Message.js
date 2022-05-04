import React from "react";
import './Message.css'

function Message(props) {
  const spanColor = props.color + "Message";
  return (
    <div className="Message">
      <span className={spanColor}>
        {props.children}
      </span>
    </div>
  );
}

export default Message;
