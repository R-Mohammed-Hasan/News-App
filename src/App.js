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
import React, { Component } from "react";
import LoadingBar from "react-top-loading-bar";

export default class extends Component {

  state = {
    progress: 0
  }

  setProgress = (progress) => {
    this.setState({progress: progress});
  }

  render() {
    return (
      <div>
        <LoadingBar
          loaderSpeed={1000}
          color="aqua"
          progress={this.state.progress}
        />
        <Router>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                <News setProgress={this.setProgress}
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
                <News setProgress={this.setProgress}
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
                <News setProgress={this.setProgress}
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
                <News setProgress={this.setProgress}
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
                <News setProgress={this.setProgress}
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
                <News setProgress={this.setProgress}
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
                <News setProgress={this.setProgress}
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
}
