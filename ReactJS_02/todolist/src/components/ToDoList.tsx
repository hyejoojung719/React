// import React, { useState } from "react";

import { useRecoilState, useRecoilValue } from "recoil";
import { Categories, categoryState, toDoSelector, toDoState } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
// import { DefaultValue } from "recoil";

/*
function ToDoList() {
  const [toDo, setToDo] = useState("");
  const [toDoError, setToDoError] = useState("");
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setToDoError("");
    setToDo(value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(toDo);
    if (toDo.length < 10) {
      return setToDoError("To do should be longer");
    }
    console.log("submit");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} value={toDo} placeholder="Write a to do" />
        <button>Add</button>
        {toDoError !== "" ? toDoError : null}
      </form>
    </div>
  );
}*/

function ToDoList() {
  // 배열의 첫 번째 항목은 데이터의 value, 두 번째는 value를 변경하기 위해 사용되는 함수
  // 데이터만 불러오고 싶을 때는 useRecoilValue를 쓰고, 둘 다 쓰고 싶을 때는 useRecoilState 사용
  // const [value, modFn] = useRecoilState(toDoState);
  // 아래를 한 줄로 쓰기
  // const value = useRecoilValue(toDoState);
  // const modFn = useSetRecoilState(toDoState);

  // const toDos = useRecoilValue(toDoState);
  // const selectorOutput = useRecoilValue(toDoSelector);
  // console.log(toDos);
  // console.log(selectorOutput);
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  // select의 onInput 감지하기
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    console.log("현재값", event.currentTarget.value);
    setCategory(+event.currentTarget.value as number);
  };
  // console.log(category);
  console.log("toDos", toDos);

  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      {/* 한 번에 하나의 카테고리만 보여주기 위해 수정 */}

      <select value={category} onInput={onInput}>
        <option value={Categories.TO_DO}>To DO</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
      </select>
      <CreateToDo />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}

      {/* <h2>To Do</h2>
      <ul>
        {toDo.map((toDo) => (
          // <ToDo text={toDo.text} category={toDo.category} id={toDo.id} />
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
      <hr />
      <h2>DOING</h2>
      <ul>
        {doing.map((doing) => (
          <ToDo key={doing.id} {...doing} />
        ))}
      </ul>
      <hr />
      <h2>DONE</h2>
      <ul>
        {done.map((done) => (
          <ToDo key={done.id} {...done} />
        ))}
      </ul>
      <hr /> */}
    </div>
  );
}

// 회원가입 form 유효성 검사하기
// interface IForm {
//   email: string;
//   firstName: string;
//   lastName: string;
//   username: string;
//   password: string;
//   password1: string;
//   extraError?: string;
// }

// function ToDoList() {
//   const {
//     register /*, watch*/,
//     handleSubmit,
//     formState: { errors },
//     setError,
//   } = useForm<IForm>({
//     // 기본값 설정해주기
//     defaultValues: {
//       email: "@naver.com",
//     },
//   });
//   //   console.log(register("toDo")); register 함수에 어떤 게 있는 지 알 수 있음
//   //   console.log(watch());
//   const onValid = (data: IForm) => {
//     // console.log(data);

//     // password가 password1과 일치하지 않을 때 에러 발생 시키기
//     if (data.password !== data.password1) {
//       return setError(
//         "password1",
//         { message: "Password are not the same" },
//         { shouldFocus: true }
//       );
//     }
//     // setError("extraError", { message: "Server offline." });
//   };
//   console.log(errors);

//   return (
//     <div>
//       <form
//         style={{ display: "flex", flexDirection: "column" }}
//         onSubmit={handleSubmit(onValid)}
//       >
//         {/* register 함수가 반환하는 객체를 가져다가 input에 props로 주기 */}
//         {/* react-hook-form에서 required사용하면 유효하지 않은 항목으로 자동 focus해줌 */}
//         {/* 정규식 검삭 => pattern에 넣기 */}
//         <input
//           {...register("email", {
//             required: "Email is required",
//             pattern: {
//               value: /^[A-Za-z0-9._%+-]+@naver.com$/,
//               message: "Only naver.com emails allowed",
//             },
//           })}
//           placeholder="Email"
//         />
//         {/* error가 뜨면 메시지 출력해준다.  */}
//         <span>{errors?.email?.message}</span>
//         <input
//           {...register("firstName", {
//             required: "Write here",
//             // 인자로 현재 받고 있는 value값을 보내기
//             // value가 nico를 포함하지 않는다면 true 반환 => 에러 통과
//             // !value.includes("nico") 자리에 "hello" return 하면 에러 메시지 리턴한다는 뜻
//             // 여러 개의 validation을 만들 수 있다!!
//             // validate는 custom error를 발생시킬 때 사용한다...
//             validate: {
//               noNico: (value) =>
//                 value.includes("nico") ? "no nicos allowed" : true,
//               noNick: (value) =>
//                 value.includes("nick") ? "no nicks allowed" : true,
//             },
//           })}
//           placeholder="First Name"
//         />
//         <span>{errors?.firstName?.message}</span>
//         <input
//           {...register("lastName", { required: "Write here" })}
//           placeholder="Last Name"
//         />
//         <span>{errors?.lastName?.message}</span>
//         {/* 최소 길이 설정해주는 것도 minLength쓰면 간단하당 */}
//         <input
//           {...register("username", { required: "Write here", minLength: 10 })}
//           placeholder="Username"
//         />
//         <span>{errors?.username?.message}</span>
//         <input
//           {...register("password", { required: "Write here", minLength: 5 })}
//           placeholder="Password"
//         />
//         <span>{errors?.password?.message}</span>
//         <input
//           {...register("password1", {
//             required: "Password is required",
//             minLength: {
//               value: 5,
//               message: "Your password is too short",
//             },
//           })}
//           placeholder="Password1"
//         />
//         <span>{errors?.password1?.message}</span>
//         <button>Add</button>
//         <span>{errors?.extraError?.message}</span>
//       </form>
//     </div>
//   );
// }

export default ToDoList;
