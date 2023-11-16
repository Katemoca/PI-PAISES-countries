import { Route, Routes } from "react-router-dom";
import {
  Landing,
  Home,
  Create,
  Detail,
  Activities,
  DetailActivities,
} from "../src/views/index";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:detailId" element={<Detail />} />
        <Route path="/create" element={<Create />} />
        <Route path="/activities/:actName" element={<DetailActivities />} />
        <Route path="/activities" element={<Activities />} />
      </Routes>
    </div>
  );
}

export default App;
