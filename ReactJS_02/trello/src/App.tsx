import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

function App() {
  // onDragEnd 함수 : 유저가 드래그 끝낸 시점에 불려지는 함수
  const onDragEnd = () => {};

  // DragDropContext는 children을 필요로 한다.
  // Droppable은 droppablelId라고 불리는 prop을 필요로 한다.
  // Droppable의 children은 함수여야 한다.
  // Draggable도 draggableId, index를 draggable에 전해줘야 함(prop)
  // Draggable도 children은 함수여야 한다.

  // droppbale, draggable의 첫 번쨰 argument는 provided(magic)
  // {...magic.droppableProps}을 통해 privided의 다양한 prop들을 전해준다.
  // draggableProps : 요소 전체 드래그
  // dragHandleProps :
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        <Droppable droppableId="one">
          {(magic) => (
            <ul ref={magic.innerRef} {...magic.droppableProps}>
              <Draggable draggableId="first" index={0}>
                {(magic) => (
                  <li ref={magic.innerRef} {...magic.draggableProps}>
                    <span {...magic.dragHandleProps}>😀</span>
                    One
                  </li>
                )}
              </Draggable>
              <Draggable draggableId="second" index={1}>
                {(magic) => (
                  <li ref={magic.innerRef} {...magic.draggableProps}>
                    <span {...magic.dragHandleProps}>😀</span>
                    Two
                  </li>
                )}
              </Draggable>
            </ul>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}

export default App;
