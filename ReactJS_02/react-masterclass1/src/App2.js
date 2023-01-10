import styled, { keyframes } from "styled-components";

const Wrapper = styled.div`
  display: flex;
`;

const rotationAnimation = keyframes`
    0%{
      transform:rotate(0deg);
      border-radius: 0px;
    }50%{
      border-radius: 100px;
    }100%{
      transform:rotate(360deg);
      border-radius: 0px;
    }
`;

const colorAnimation = keyframes`
from{color: tomato;}
to{
  color:teal;
}`;

const Emoji = styled.span`
  font-size: 36px;
`;

const Box = styled.div`
  height: 200px;
  width: 200px;
  background-color: tomato;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${rotationAnimation} 1s linear infinite;
  // span {
  //   font-size: 36px;
  //   &:hover {
  //     font-size: 48px;
  //   }
  //   &:active {
  //     opacity: 0;
  //   }
  // }
  ${Emoji} {
    &:hover {
      font-size: 98px;
    }
  }
`;

const Btn = styled.button`
  animation: ${colorAnimation} 0.5s infinite;
`;

function App2() {
  return (
    <Wrapper>
      <Box>
        <Emoji>😁</Emoji>
      </Box>
      {/* 이 아래 Emoji는 hover 속성 적용 X */}
      <Emoji>😁</Emoji>
      <Btn>Hello</Btn>
    </Wrapper>
  );
}

export default App2;
