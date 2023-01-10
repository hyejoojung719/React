import styled from "styled-components";

// propstypes => 브라우저의 콘솔에 경고표시를 해줌
// 즉 코드를 실행한 후에만 확인 가능
// 글그러나 Typescript로 prop들을 보호할 수있음

// interface => object shape(객체 모양)을
// typescript에게 설명해주는 개념
// (예전) const x = (a: number, b:number)  => a+b

interface ContainerProps {
  bgColor: string;
}

const Container = styled.div<ContainerProps>`
  width: 200px;
  height: 200px;
  background-color: ${(props) => props.bgColor};
`;

// typescript에게 bgColor는 String이 되어야 한다고 설명
interface CircleProps {
  bgColor: string;
}

// bgColor라는 prop이 필요한 상황
function Circle({ bgColor }: CircleProps) {
  return <Container bgColor={bgColor} />;
}
// 또는 아래처럼 쓸 수 있음
// function Circle(props: CircleProps) {
//   return <Container bgColor={props.bgColor} />;
// }

export default Circle;
