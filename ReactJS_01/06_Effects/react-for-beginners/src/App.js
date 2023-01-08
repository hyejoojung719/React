import { useState, useEffect } from "react";

function App() {
  const [counter, setValue] = useState(0); // react app 쓰고 있어서 React.useState할 필요 X, 위에 import
  const [keyword, setKeyword] = useState(0);

  const onClick = () => setValue((prev) => prev + 1); // counter += 1

  const onChange = (event) => setKeyword(event.target.value);

  console.log("I run all the time.");

  // const iRunOnlyOnce = () => {
  //   console.log("I run only once.");
  // };

  useEffect(
    /*iRunOnlyOnce*/
    () => {
      console.log("I run only once");
    },
    []
  );

  useEffect(() => {
    // 이 코드는 keyword가 변할때만 실행
    if (keyword !== "" && keyword.length > 5) console.log("I run when keyword changes.");
  }, [keyword]);

  useEffect(() => {
    console.log("I run when counter changes.");
  }, [counter]);

  useEffect(() => {
    // 둘 중 하나가 변화되면 실행
    console.log("I run when keyword & counter changes.");
  }, [keyword, counter]);

  return (
    <div>
      <input value={keyword} onChange={onChange} type="text" placeholder="Search here..." />
      <h1>{counter}</h1>
      <button onClick={onClick}>click me</button>
    </div>
  );
}

export default App;
