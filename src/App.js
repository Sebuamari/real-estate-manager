import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Listings from "./pages/Listings.jsx";
import Listing from "./pages/Listing.jsx";
import "../src/styles/css/Reset.css";
import "../src/styles/sass/Fonts.scss";
import "../src/styles/css/Global.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Listings />} />
          <Route path="/listing/:id" element={<Listing />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;