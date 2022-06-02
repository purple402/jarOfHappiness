import React, { useEffect, useRef, useState } from "react";
import { getHappiness, countHappiness } from "../firebase";
import "./UserData.css";

function UserData() {
  const informRef = useRef(null);
  // thisYear는 올해, year는 목록에 나타낼 내용의 년도
  const thisYear = new Date().getFullYear();
  const [year, setYear] = useState(thisYear);
  const [list, setList] = useState([]);
  const [lastYearCount, setLastYearCount] = useState(null);

  function checkExposeContent() {
    // 내용 공개 여부 확인
    // 12월부터 그 해에 쓴 글 확인 가능
    const today = new Date();
    const month = today.getMonth() + 1;
    if (thisYear !== year) {
      return true;
    } else if (month === 12) {
      return true;
    } else {
      return false;
    }
  }

  useEffect(() => {
    async function fetchData() {
      // localStorage 저장된 자료 확인
      let data = JSON.parse(localStorage.getItem(year.toString()));
      let dataCount = data?.length || 0;
      // firebase의 자료 확인
      const count = await countHappiness(year.toString());

      if (count === 0) {
        // 저장된 행복 없는 경우
        // (firebase에 없으면 local에도 없다고 생각함)
        informRef.current.innerHTML = `첫 번째 행복을 적어보세요!`;
      } else if (dataCount !== count) {
        // localStorage 저장본과 firebase 자료 다른 경우
        // localStorage에 업데이트
        const firebaseData = await getHappiness(year.toString());
        localStorage.setItem(
          year.toString(),
          JSON.stringify(firebaseData.data)
        );
        data = JSON.parse(localStorage.getItem(year.toString()));
      } else {
        // localStorage 저장본과 firebase 자료 같은 경우
      }

      // 내용 공개 여부 확인
      const openContent = checkExposeContent();

      if (!openContent) {
        informRef.current.innerHTML = `${year}년에는 ${count}개의 행복을 저장했어요.<br/><br/>작성된 내용은 연말에 확인할 수 있습니다.`;
      } else {
        informRef.current.innerHTML = `${year}년에는 ${count}개의 행복을 저장했어요.`;
      }
      // 행목 목록 만들기
      createList(data, openContent);

      // 작년 행복 개수 확인
      const lastYearHappiness = await countHappiness((year - 1).toString());
      setLastYearCount(lastYearHappiness);
    }
    fetchData();
  }, [year, thisYear]);

  const createList = (data, openContent) => {
    let i = 0;
    let createdList = [];
    while (i < data.length) {
      const currentData = data[i];
      createdList.push(
        <div className="container" key={currentData.createdAt}>
          <div className="contents">
            <div className="icon">
              <span id="iconEmoji">{currentData.emoji || "📌"}</span>
            </div>
            <div className="data">
              <span className="createdAt">{currentData.date}</span>
              {!openContent || (
                <p className="textValue" style={{ whiteSpace: "pre-line" }}>
                  {" "}
                  {currentData.text}
                </p>
              )}
            </div>
          </div>
        </div>
      );
      i++;
    }
    setList(createdList);
  };

  return (
    <div className="UserData">
      <div className="selectYearDiv">
        <button
          id="lastYear"
          className="yearBtn"
          onClick={() => setYear(year - 1)}
          disabled={lastYearCount === 0 && true}
        >
          ◀ {(year - 1).toString().slice(2, 4) + "년"}
        </button>
        <span id="thisYear">{year}년</span>
        <button
          id="nextYear"
          className="yearBtn"
          onClick={() => setYear(year + 1)}
          disabled={year === thisYear && true}
        >
          {(year + 1).toString().slice(2, 4) + "년"} ▶
        </button>
      </div>
      <p id="number" ref={informRef}></p>
      <div className="list">{list}</div>
    </div>
  );
}

export default UserData;
