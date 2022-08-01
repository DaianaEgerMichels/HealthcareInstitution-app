import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import api from "../../utils/api";

function Home() {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const institutionLoggedString = localStorage.getItem("_institution_logged");
    const institutionLogged = JSON.parse(institutionLoggedString);
    api
      .get(`/api/healthcare-institutions/${institutionLogged.id}`)
      .then((response) => {
        setBalance(response.data.pixeonCoins);
      })
      .catch((erro) => alert(erro.response.data.messages));
  }, [balance]);
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="jumbotron">
          <h1 className="display-3">Welcome!</h1>
          <p className="lead">This is your healthcare system.</p>
          <p className="lead">
            You have {balance} Pixeon Coins to use in the system.
          </p>
          <hr className="my-4" />
          <p>
            And this is your administrative area, use one of the menus or
            buttons below to navigate the system.
          </p>
          <p className="lead">
            <a
              className="btn btn-success btn-lg"
              href="/register-exam"
              role="button"
            >
              <i className="pi pi-users"></i>
              Register Exam
            </a>
            <a className="btn btn-primary btn-lg" href="/exams" role="button">
              <i className="pi pi-money-bill"></i>
              Registered Exams
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default Home;
