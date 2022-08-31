import React from "react";
import { useWindowWidth } from "../WindowWidthContext";
import styled from "styled-components";

const Container = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 730px) {
    margin-top: 30px;
  }
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  font-size: 30px;

  @media (max-width: 730px) {
    font-size: 25px;
  }
`;

const Emoji = styled.span`
  margin-right: 10px;
  margin-bottom: 5px;

  @media (max-width: 730px) {
    font-size: 20px;
  }
`;

const TitleInfo = styled.p`
  font-size: 20px;
  text-align: center;

  @media (max-width: 730px) {
    font-size: 16px;
  }
`;

function Header() {
  const windowWidth = useWindowWidth();

  return (
    <Container>
      <Title>
        <Emoji>🌼</Emoji>
        <span>해피 저금통</span>
      </Title>
      {windowWidth > 530 ? (
        <TitleInfo>
          기쁜 일이나 즐거운 일을 적어 해피 저금통에 넣어주세요.
          <br />
          연말에 개봉해 꺼내 보며 한 해 동안 행복했던 순간들을 떠올려봐요.
        </TitleInfo>
      ) : (
        <TitleInfo>
          기쁜 일이나 즐거운 일을 적어 <br />
          해피 저금통에 넣어주세요.
          <br />
          연말에 개봉해 꺼내 보며 <br />한 해 동안 행복했던 순간들을 떠올려봐요.
        </TitleInfo>
      )}
    </Container>
  );
}

export default Header;
