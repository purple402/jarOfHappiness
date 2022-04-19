import React, { useEffect, useRef, useState } from "react";
import { getHappiness } from "../firebase";
import "./UserData.css";

function UserData() {
  const informRef = useRef(null);
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
    }
    fetchData();
  }, [year]);

    let i = 0;
      i++;
    }
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
    </div>
  );
}

export default UserData;
