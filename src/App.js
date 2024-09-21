import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Listings from "./pages/Listings.jsx";
import Listing from "./pages/Listing.jsx";
import AddRealEstate from "./pages/AddRealEstate.jsx";
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
          <Route path="/real-estate-manager/" element={<Listings />} />
          <Route path="/listing/:id/" element={<Listing />} />
          <Route path="/add-real-estate/" element={<AddRealEstate />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;