import React from "react";
import NavbarItem from "../NavbarItem/NavbarItem";
import {IoLogOutOutline} from 'react-icons/io5';
import { useNavigate } from "react-router";

function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/home">
          Healthcare System
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav me-auto">
            <NavbarItem label="Exams" href="/exams"/>
          </ul>
        <button className="btn btn-primary my-2 my-sm-0" onClick={()=> navigate('/')}><IoLogOutOutline size={26}/></button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
