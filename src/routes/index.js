import React from "react";
import { Routes as Switch, Route } from "react-router-dom";
import Login from "../pages/Login/Login"
import SignUp from "../pages/SignUp/SignUp";
import Home from "../pages/Home/Home";
import ConsultReleases from "../pages/ConsultExams/ConsultExams";
import RegisterReleases from "../pages/RegisterExam/RegisterExam";

function Routes() {
  return (
    <>
      <Switch>
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/" element={<Login />} />
        <Route exact path="/register-institution" element={<SignUp/>} />
        <Route exact path="/exams" element={<ConsultReleases/>} />
        <Route exact path="/register-exam" element={<RegisterReleases/>} />
      </Switch>
    </>
  );
}

export default Routes;