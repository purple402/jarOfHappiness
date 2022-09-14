import styled from "styled-components";

const StyledButton = styled.input`
  margin: 0px 5px;
  padding: 10px 25px;
  border-radius: 20px;
  font-size: 16px;
  font-weight: 600;
  color: white;
  box-sizing: border-box;
`;

const GreenBtn = styled(StyledButton)`
  background-color: #48cd6b;
  border: 1px solid #39b359;
  &:hover {
    background-color: #42b962;
  }
  &:disabled {
    background-color: rgba(128, 128, 128, 0.548);
    border-color: rgba(128, 128, 128, 0.678);
  }
  &:disabled:hover {
    background-color: rgba(128, 128, 128, 0.766);
  }
`;

const YellowBtn = styled(StyledButton)`
  background-color: #fddb46;
  border: 1px solid #f2d039;
  &:hover {
    background-color: #fcc631;
  }
`;

const BlueBtn = styled(StyledButton)`
  background-color: #79bcff;
  border: 1px solid #84bcf3;
  &:hover {
    background-color: #378ee5;
  }
`;

export { GreenBtn, YellowBtn, BlueBtn };
