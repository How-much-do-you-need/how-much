import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from "./component/LogIn";
import Main from "./component/Main";
import Register from "./component/Register";
import Upload from "./component/Upload";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/login" element={<LogIn />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/upload" element={<Upload />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
