import React, { useEffect, useRef } from "react";
import {countHappiness} from "../firebase"

function UserData() {
  const canvasRef = useRef(null);
  let ctx = null;
  //const contextRef = useRef(null);
  const informRef = useRef(null);

  useEffect(async () => {
    // 캔버스 그리기
    const canvas = canvasRef.current;
    canvas.width = 300;
    canvas.height = 350;
    ctx = canvas.getContext("2d");
    ctx.strokeRect(0, 0, 300, 350);

    // 병 모양 그리기
    ctx.beginPath();
    ctx.moveTo(100, 35);
    ctx.lineTo(200, 35);
    ctx.lineTo(200, 50); //185
    ctx.lineTo(195, 50); //180
    ctx.lineTo(195, 60); //180
    ctx.quadraticCurveTo(250, 60, 250, 105);
    ctx.lineTo(250, 310);
    ctx.quadraticCurveTo(250, 325, 180, 325);
    ctx.lineTo(120, 325);
    ctx.quadraticCurveTo(50, 325, 50, 305);
    ctx.lineTo(50, 105);
    ctx.quadraticCurveTo(50, 60, 105, 60);
    ctx.lineTo(105, 50);

    ctx.lineTo(100, 50);
    ctx.closePath();
    ctx.stroke();
    ctx.clip();

    const today = new Date();
    const year = (today.getFullYear()).toString();
    const num = await countHappiness(year);
    if (num === 0) {
        informRef.current.innerHTML = `첫 번째 행복을 적어보세요!`;
    } else {
        informRef.current.innerHTML = `${year}년에는 ${num}개의 행복을 저장했어요`
    }
    createBall(num)
  }, []);

  // 공 만들기
  const createBall = (n) => {
    for (let i = 0; i < n; i++) {
      const coordX = Math.random() * (240 - 60) + 60;
      const coordY = Math.random() * (300 - 65) + 65;
      const color = "#" + Math.floor(Math.random() * 16777215).toString(16);
      const radius = Math.random() * (20 - 10) + 10;
      ctx.beginPath();
      ctx.arc(coordX, coordY, radius, 0, 2 * Math.PI);
      // ctx.stroke();
      ctx.fillStyle = color;
      ctx.fill();
    }
  };

  return (
    <div className="UserData">
        <p ref={informRef}></p>
      <div className="canvasDiv">
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  );
}

export default UserData;
