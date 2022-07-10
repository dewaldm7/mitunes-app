import React from "react";
import NavBar from "./components/navBar";
import Home from "./components/home";
import Music from "./components/music";
import Videos from "./components/videos";
import Movies from "./components/movies";
import AudioBooks from "./components/audiobooks";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

//used react-router-dom to navigate pages
function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/music" exact element={<Music />} />
          <Route path="/videos" exact element={<Videos />} />
          <Route path="/movies" exact element={<Movies />} />
          <Route path="/audiobooks" exact element={<AudioBooks />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
