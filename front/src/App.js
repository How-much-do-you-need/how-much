import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./component/Auth";
import LogIn from "./component/LogIn";
import Main from "./component/Main";
import Register from "./component/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Auth SpecificComponent={Main} option={null} />}
        ></Route>
        {/* <Route exact path="/login" component={Auth(LogIn, false)} />
        <Route exact path="/register" component={Auth(Register, false)} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
