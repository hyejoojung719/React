import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";

const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(1, 1fr);
`;

const Board = styled.div`
  padding: 20px 10px;
  padding-top: 30px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
`;

const Card = styled.div`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) => props.theme.cardColor};
`;

function App() {
  // atom의 값을 가져오고 싶다면 useRecoilValue사용
  // atom의 값 뿐만 아니라 atom을 수정하는 함수까지 부르고 싶다면 useRecoilState
  const [toDos, setToDos] = useRecoilState(toDoState);

  // onDragEnd 함수 : 유저가 드래그 끝낸 시점에 불려지는 함수
  const onDragEnd = ({ destination, source }: DropResult) => {
    // args => 드래그 정보 알 수 있음 ex) 출발지, 목적지 등..
    // 여기서 destination이랑 source만 가져오기
    console.log("드래그 끝남");

    // source.index(우리가 움직인 거)가 2라면 array에서 지우려고 함
    // destination.index가 0이먄 우리가 방금 삭제한 걸 그 위치에 추가
  };

  // DragDropContext는 children을 필요로 한다.
  // Droppable은 droppablelId라고 불리는 prop을 필요로 한다.
  // Droppable의 children은 함수여야 한다.
  // Draggable도 draggableId, index를 draggable에 전해줘야 함(prop)
  // Draggable도 children은 함수여야 한다.

  // droppbale, draggable의 첫 번쨰 argument는 provided(magic)
  // {...magic.droppableProps}을 통해 privided의 다양한 prop들을 전해준다.
  // draggableProps : 요소 전체 드래그
  // dragHandleProps :dragHandleProps를 props로 받은 영역이 드래그할 수 있는 영역이 됨
  // placeholder : droppable이 끝날 때 두는 무언가라 사이즈가 변하는 걸 막아줌
  // => 사이즈가 변하는 Board의 끝에 넣기
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          <Droppable droppableId="one">
            {(magic) => (
              <Board ref={magic.innerRef} {...magic.droppableProps}>
                {toDos.map((toDo, index) => (
                  <Draggable key={index} draggableId={toDo} index={index}>
                    {(magic) => (
                      <Card
                        ref={magic.innerRef}
                        {...magic.dragHandleProps}
                        {...magic.draggableProps}
                      >
                        {toDo}
                      </Card>
                    )}
                  </Draggable>
                ))}
                {magic.placeholder}
                {/* <Draggable draggableId="second" index={1}>
                  {(magic) => (
                    <Card
                      ref={magic.innerRef}
                      {...magic.dragHandleProps}
                      {...magic.draggableProps}
                    >
                      <span {...magic.dragHandleProps}>😀</span>
                      Two
                    </Card>
                  )}
                </Draggable> */}
              </Board>
            )}
          </Droppable>
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
