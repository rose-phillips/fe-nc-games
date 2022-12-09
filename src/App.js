//import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import ReviewList from "./components/ReviewList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SingleReview from "./components/SingleReview";
import NavBar from "./components/NavBar";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <NavBar />
        <Routes>
          <Route path="/" element={<ReviewList />} />
          <Route path="category/:category" element={<ReviewList />} />
          <Route path="/reviews/:review_id" element={<SingleReview />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
