import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./routes/Home";
import Detail from "./routes/Detail";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/movie/:id">
          {/* :id => Detail UseParam에 id가 넘어간다. 만약 다른 이른으로 적으면 그걸로 넘어감. 
          즉, apple이라고 적으면 id값을 apple로 부를 수 있는 것 */}
          <Detail />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
