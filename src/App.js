import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar.js'
import News from './components/News.js'

import React, { Component } from 'react'

export default class extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <News pageCount="9" />
      </div>
    )
  }
}
