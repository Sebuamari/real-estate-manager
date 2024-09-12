import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Listing from "./pages/Listing.jsx";
import "../src/styles/css/reset.css";
import "../src/styles/css/global.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Listing />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;