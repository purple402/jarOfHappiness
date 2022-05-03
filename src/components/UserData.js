import React, { useEffect, useRef, useState } from "react";
import { getHappiness, countHappiness } from "../firebase";
import "./UserData.css";

function UserData() {
  const informRef = useRef(null);
  const [list, setList] = useState([]);
  const thisYear = new Date().getFullYear();
  const [year, setYear] = useState(thisYear);
  const [lastYearCount, setLastYearCount] = useState(null);

  const checkExposeContent = () => {
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
      const { data, length } = await getHappiness(year.toString());
      const openContent = checkExposeContent();

      if (length === 0) {
        informRef.current.innerHTML = `첫 번째 행복을 적어보세요!`;
      } else {
        if (thisYear === year) {
          informRef.current.innerHTML = `${year}년에는 ${length}개의 행복을 저장했어요.<br/><br/>작성 내용은 내년에 확인할 수 있습니다.`;
        } else {
          informRef.current.innerHTML = `${year}년에는 ${length}개의 행복을 저장했어요.`;
        }
      }
      createList(data);

      const lastYear = await countHappiness((year - 1).toString());
      setLastYearCount(lastYear);
    }
    fetchData();
  }, [year]);

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
          ◀
        </button>
        <span id="thisYear">{year}년</span>
        <button
          id="nextYear"
          className="yearBtn"
          onClick={() => setYear(year + 1)}
          disabled={year === thisYear && true}
        >
          ▶
        </button>
      </div>
      <p id="number" ref={informRef}></p>
      <div className="list">{list}</div>
    </div>
  );
}

export default UserData;
