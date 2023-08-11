import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar/Navbar";
import Asset from "./pages/Asset";
const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/asset/:id" element={<Asset />} />
      </Routes>
    </>
  );
};

export default App;
