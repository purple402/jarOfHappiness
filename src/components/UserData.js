import React, { useEffect, useRef, useState } from "react";
import { getHappiness } from "../firebase";

function UserData() {
  const informRef = useRef(null);

  useEffect(async () => {
    const today = new Date();
    const year = today.getFullYear().toString();
    const { data, length } = await getHappiness(year);
    if (length === 0) {
      informRef.current.innerHTML = `첫 번째 행복을 적어보세요!`;
    } else {
      informRef.current.innerHTML = `${year}년에는 ${length}개의 행복을 저장했어요`;
    }
  }, []);

    let i = 0;
      i++;
    }
  };

  return (
    <div className="UserData">
        <p ref={informRef}></p>
      </div>
    </div>
  );
}

export default UserData;
