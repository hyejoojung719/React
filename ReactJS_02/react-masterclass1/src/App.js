// styled-component 설치
// npm i styled-components
import styled from "styled-components";

const Father = styled.div`
  display: flex;
`;

// const Box = styled.div`
//   background-color: ${(props) => props.bgColor};
//   width: 100px;
//   height: 100px;
// `;

// const Circle = styled.div`
//   background-color: ${(props) => props.bgColor};
//   width: 100px;
//   height: 100px;
//   border-radius: 50px;
// `;
// 코드 중복 방지 => 기존 styled 가져오기 => 아래와 같이 변경
// const Circle = styled(Box)`
//   border-radius: 50px;
// `;

// const Text = styled.span`
//   color: white;
// `;

const Btn = styled.button`
  color: white;
  background-color: tomato;
  border: 0;
  border-radius: 15px;
`;

const Input = styled.input.attrs({ required: true, minLength: 10 })`
  background-color: tomato;
`;

function App() {
  return (
    <Father as="header">
      <Btn>Log in</Btn>
      {/* button에 링크 연결하는 법 */}
      <Btn as="a" href="/">
        Log in
      </Btn>
      <Input />
      <Input />
      <Input />
      <Input />
      <Input />
      {/* <Box bgColor="teal" /> */}
      {/* <Box bgColor="tomato" /> */}
      {/* <Circle bgColor="tomato" /> */}
    </Father>
  );
}

export default App;
