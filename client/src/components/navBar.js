import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../App.css";

function NavBar() {
  return (
    <header>
      <Navbar className="navBar">
        <Navbar.Brand href="/">
          <div className="wrap-Brand">
            <h1 className="logo">
              {" "}
              <i className="fa fa-signal"></i>miTunes.
            </h1>
            <i className="fa fa-headphones" aria-hidden="true" />
            <h2 className="home">Home</h2>
          </div>
        </Navbar.Brand>

        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text className="nav-text">
            <Nav className="mr-auto">
              <Link to="/music" className="link">
                Music
              </Link>
              <Link to="/videos" className="link">
                Videos
              </Link>
              <Link to="/movies" className="link">
                Movies
              </Link>
              <Link to="/audiobooks" className="link">
                Audio Books
              </Link>
            </Nav>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}

export default NavBar;
