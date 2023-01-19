import { atom, selector } from "recoil";

// type categories = "TO_DO" | "DOING" | "DONE";
export enum Categories {
  "TO_DO",
  "DOING",
  "DONE",
}
// 원하면 값을 바꿀 수 있음
// export enum Categories {
//   "TO_DO" = "TO_DO",
//   "DOING" = "DOING",
//   "DONE" = "DONE",
// }

export interface IToDo {
  text: string;
  id: number;
  // category: "TO_DO" | "DOING" | "DONE"; // 이 셋 중의 하나만 쓸 수 있다.
  category: Categories;
}

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

//  한 번에 하나의 카테고리만 보여주기 위해 수정
// 사용자가 현재 선택한 카테고리를 저장
export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO,
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    // options의 매개변수에 있는 {get} function 가져오기
    // 내장되어 있는 get function 사용
    const toDos = get(toDoState);
    const category = get(categoryState);
    // return [
    //   toDos.filter((toDo) => toDo.category === "TO_DO"),
    //   toDos.filter((toDo) => toDo.category === "DOING"),
    //   toDos.filter((toDo) => toDo.category === "DONE"),
    // ];
    return toDos.filter((toDo) => toDo.category === category);
  },
});

/*
export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    // options의 매개변수에 있는 {get} function 가져오기
    // 내장되어 있는 get function 사용
    const toDos = get(toDoState);
    return [
      toDos.filter((toDo) => toDo.category === "TO_DO"),
      toDos.filter((toDo) => toDo.category === "DOING"),
      toDos.filter((toDo) => toDo.category === "DONE"),
    ];
  },
});*/
