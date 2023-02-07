import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from "./component/LogIn";
import Main from "./component/Main";
import Register from "./component/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/login" element={<LogIn />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
