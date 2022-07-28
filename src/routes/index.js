import React from "react";
import { Routes as Switch, Route } from "react-router-dom";
import Login from "../pages/Login/Login"
import SignUp from "../pages/SignUp/SignUp";
import Home from "../pages/Home/Home";
import ConsultExams from "../pages/ConsultExams/ConsultExams";
import RegisterExam from "../pages/RegisterExam/RegisterExam";
import ViewExam from "../pages/ViewExam/ViewExam";

function Routes() {
  return (
    <>
      <Switch>
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/" element={<Login />} />
        <Route exact path="/register-institution" element={<SignUp/>} />
        <Route exact path="/exams" element={<ConsultExams/>} />
        <Route exact path="/exams/:id" element={<ViewExam />} />
        <Route exact path="/register-exam" element={<RegisterExam/>} />
        <Route exact path="/register-exam/:id" element={<RegisterExam/>} />
      </Switch>
    </>
  );
}

export default Routes;