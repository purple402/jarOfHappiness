import React, { useEffect } from "react";
import "./Modal.css";

// 스크롤 막기
// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
  window.addEventListener(
    "test",
    null,
    Object.defineProperty({}, "passive", {
      get: function () {
        supportsPassive = true;
      },
    })
  );
} catch (e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent =
  "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";

function disableScroll() {
  window.addEventListener("DOMMouseScroll", preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener("touchmove", preventDefault, wheelOpt); // mobile
  window.addEventListener("keydown", preventDefaultForScrollKeys, false);
}

// call this to Enable
function enableScroll() {
  window.removeEventListener("DOMMouseScroll", preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
  window.removeEventListener("touchmove", preventDefault, wheelOpt);
  window.removeEventListener("keydown", preventDefaultForScrollKeys, false);
}

function Modal(props) {
  useEffect(() => {
    // modal이 떠 있을 땐 스크롤 막음
    disableScroll();
    // modal 닫히면 다시 스크롤 가능하도록 함
    return () => enableScroll();
  }, []);

  function closeModal() {
    props.closeModal();
  }

  return (
    <div className="Modal" onClick={closeModal}>
      <div className="modalBody" onClick={(e) => e.stopPropagation()}>
        <button id="modalCloseBtn" onClick={closeModal}>
          ✖
        </button>
        {props.children}
      </div>
    </div>
  );
}

export default Modal;
