import React from "react";
import { NavLink } from "react-router-dom";

const Home = () => (
  <div>
    <h2>Home Page</h2>
    <NavLink to="/contacts">Contacts</NavLink>
    <br></br>
    <hr></hr>
    <NavLink to="/gallery">Gallery</NavLink>
  </div>
);

export default Home;
