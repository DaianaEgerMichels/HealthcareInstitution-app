import React from "react";
import NavbarItem from "../NavbarItem/NavbarItem";
import {IoLogOutOutline} from 'react-icons/io5';
import {RiMentalHealthFill} from "react-icons/ri";
import { useNavigate } from "react-router";

function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/home">
         Health System <RiMentalHealthFill size={28}/>
        </a>
        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav me-auto">
            <NavbarItem label="Home" href="/home"/>
            <NavbarItem label="Exams" href="/exams"/>
            <NavbarItem label="Register" href="/register-exam"/>
          </ul>
        <button className="btn btn-primary my-2 my-sm-0" onClick={()=> navigate('/')}><IoLogOutOutline size={26}/></button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
