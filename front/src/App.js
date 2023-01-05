import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from "./component/LogIn";
import Main from "./component/Main";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/login" element={<LogIn />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
