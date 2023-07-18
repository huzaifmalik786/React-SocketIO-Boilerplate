// pages
import { Login } from "./pages/login";

import { BrowserRouter, Routes, Route, redirect } from "react-router-dom";
import SocketIOWrapper from "./components/Socket/SocketIO.wrapper";

function App() {
  return (
    <>
      <SocketIOWrapper>
        <BrowserRouter>
          <Routes>
            <Route path="/"  element={<Login />}/>

            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </SocketIOWrapper>
    </>
  );
}

export default App;
