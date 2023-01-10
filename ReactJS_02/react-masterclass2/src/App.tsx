import Circle from "./Circle";

// typescript 설치하기 => 처음 만들때부터 typescript 형태로 만드는게 편함..
// npx create-react-app 이름 --template typescript
// typescript로 만들어진 파일이 아닌경우 읽을 수 없기 떄문에 ex) styled-components
// npm i --save-dev @types/styled-components
// npm i styled-components

function App() {
  return (
    <div>
      <Circle bgColor="teal" />
      <Circle bgColor="tomato" />
    </div>
  );
}

export default App;
