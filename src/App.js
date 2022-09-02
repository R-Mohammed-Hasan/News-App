import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar.js'
import News from './components/News.js'
import { BrowserRouter as Router, Route,Routes, NavLink } from 'react-router-dom'
import React, { Component } from 'react'

export default class extends Component {
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<News pageCount={9} country="in" category="general"/>}>
            </Route>
            <Route path="/health" element={<News pageCount={9} country="in" category="health"/>}>
            </Route>
            <Route path="/entertainment" element={<News pageCount={9} country="in" category="entertainment"/>}>
            </Route>
            <Route path="/sports" element={<News pageCount={9} country="in" category="sports"/>}>
            </Route>
            <Route path="/business" element={<News pageCount={9} country="in" category="business"/>}>
            </Route>
            <Route path="/science" element={<News pageCount={9} country="in" category="science"/>}>
            </Route>
            <Route path="/technology" element={<News pageCount={9} country="in" category="technology"/>}>
            </Route>
          </Routes>


        </Router>
      </div>
    )
  }
}
