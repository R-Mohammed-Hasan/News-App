import React from 'react'
import {Link} from 'react-router-dom'

export default function Navbar(){

  async function sendRequest(event){
    event.preventDefault();
    let input = document.getElementById("input").value;
    console.log(input);
    let url = `https://newsapi.org/v2/everything?q=${input}&apiKey=${process.env.REACT_APP_API_KEY}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData.articles);
  }

  return (
    <div>
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark p-3">
          <div className="container-fluid">
            <Link className="navbar-brand  ms-3 ms-lg-0" to="/">News Center</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-3 ms-lg-0">
              <li className="nav-item dropdown">
                  <Link className="nav-link dropdown-toggle" to="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Profile
                  </Link>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><Link className="dropdown-item"  to="/profile">Your Profile</Link></li>
                    <li><Link className="dropdown-item" to="/editProfile">Edit Profile</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><Link className="dropdown-item" to="/signOut">Sign Out</Link></li>
                  </ul>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${window.location.pathname === "/" ? "active":""}`}  aria-current="page" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${window.location.pathname.includes("about") ? "active":""}`} to="/about">About</Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${window.location.pathname.includes("business") ? "active":""}`} to="/business">Business</Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${window.location.pathname.includes("entertainment") ? "active":""}`} to="/entertainment">Entertainment</Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${window.location.pathname.includes("health") ? "active":""}`} to="/health">Health</Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${window.location.pathname.includes("science") ? "active":""}`} to="/science">Science</Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${window.location.pathname.includes("sports") ? "active":""}`} to="/sports">Sports</Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${window.location.pathname.includes("technology") ? "active":""}`} to="/technology">Technology</Link>
                </li>
              </ul>
              <form className="d-flex" onSubmit={sendRequest} >
                <input className="form-control me-2" type="search" id="input" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-light" type="submit">Search</button>
              </form>
            </div>
          </div>
      </nav>
    </div>
  )
}
