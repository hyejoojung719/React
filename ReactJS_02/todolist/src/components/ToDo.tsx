import { useSetRecoilState } from "recoil";
import { IToDo, toDoState } from "../atoms";

function ToDo({ text, category, id }: IToDo) {
  //   const onClick = (newCategory: IToDo["category"]) => {
  //     console.log("i wanna to ", newCategory);
  //   };

  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;

    setToDos((oldToDos) => {
      // 수정할 ToDo 경로 찾기
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      //   const oldToDo = oldToDos[targetIndex];
      const newToDo = { text, id, category: name as any }; // as any => ts에게 타입 체크하지 않도록 하는거
      //   console.log(targetIndex);
      //   console.log(oldToDo, newToDo);
      //   console.log(
      //     "replace the to do in the index",
      //     targetIndex,
      //     "with",
      //     newToDo
      //   );
      //   return oldToDos;
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  return (
    <li>
      <span>{text}</span>
      {category !== "DOING" && (
        <button name="DOING" onClick={onClick}>
          Doing
        </button>
      )}
      {category !== "TO_DO" && (
        <button name="TO_DO" onClick={onClick}>
          To Do
        </button>
      )}
      {category !== "DONE" && (
        <button name="DONE" onClick={onClick}>
          Done
        </button>
      )}
    </li>
  );
}

export default ToDo;