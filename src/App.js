import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar.js";
import News from "./components/News.js";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";
import React, { useState } from "react";
import LoadingBar from "react-top-loading-bar";

export default function() {

  const [progress, setProgress] = useState(0);

  const updateProgress = (progress) => {
    setProgress(progress);
  }

  return (
    <div>
      <LoadingBar
        loaderSpeed={1000}
        color="aqua"
        progress={progress}
      />
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <News setProgress={updateProgress}
                key="general"
                pageCount={9}
                country="in"
                category="general"
              />
            }
          ></Route>
          <Route
            path="/health"
            element={
              <News setProgress={updateProgress}
                key="health"
                pageCount={9}
                country="in"
                category="health"
              />
            }
          ></Route>
          <Route
            path="/entertainment"
            element={
              <News setProgress={updateProgress}
                key="entertainment"
                pageCount={9}
                country="in"
                category="entertainment"
              />
            }
          ></Route>
          <Route
            path="/sports"
            element={
              <News setProgress={updateProgress}
                key="sports"
                pageCount={9}
                country="in"
                category="sports"
              />
            }
          ></Route>
          <Route
            path="/business"
            element={
              <News setProgress={updateProgress}
                key="business"
                pageCount={9}
                country="in"
                category="business"
              />
            }
          ></Route>
          <Route
            path="/science"
            element={
              <News setProgress={updateProgress}
                key="science"
                pageCount={9}
                country="in"
                category="science"
              />
            }
          ></Route>
          <Route
            path="/technology"
            element={
              <News setProgress={updateProgress}
                key="technology"
                pageCount={9}
                country="in"
                category="technology"
              />
            }
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}
