import React, { useEffect, useRef, useState } from "react";
import { getHappiness } from "../firebase";
import "./UserData.css";

function UserData() {
  const informRef = useRef(null);
  const [list, setList] = useState([]);
  const thisYear = new Date().getFullYear();
  const [year, setYear] = useState(thisYear);

  useEffect(() => {
    async function fetchData() {
      const { data, length } = await getHappiness(year.toString());

      if (length === 0) {
        informRef.current.innerHTML = `첫 번째 행복을 적어보세요!`;
      } else {
        informRef.current.innerHTML = `${year}년에는 ${length}개의 행복을 저장했어요`;
      }
      createList(data);
    }
    fetchData();
  }, [year]);

  const createList = (data) => {
    let i = 0;
    let createdList = [];
    while (i < data.length) {
      const currentData = data[i];
      createdList.push(
        <div className="container" id={currentData.createdAt}>
          <div className="contents">
            <div className="icon">
              <span id="iconEmoji">{currentData.emoji || "📌"}</span>
            </div>
            <div className="data">
              <span className="createdAt">{currentData.date}</span>
              <p className="textValue">{currentData.text}</p>
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
        <button id="lastYear" onClick={() => setYear(year - 1)}>
          ◀
        </button>
        <span id="thisYear">{year}</span>
        <button
          id="nextYear"
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
