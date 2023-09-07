import { Route, Routes } from "react-router-dom";
import { Landing, Home, Create, Detail } from "../src/views/index";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/countries/:id" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
