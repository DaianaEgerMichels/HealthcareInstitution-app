import React, { useState } from "react";
import Card from "../../components/Card/Card";
import FormGroup from "../../components/FormGroup/FormGroup";
import { useNavigate } from "react-router";
import api from "../../utils/api"

import { messageError } from "../../components/Toastr/toastr.js";

export default function Login() {
  const navigate = useNavigate();
  const [nameInstitution, setNameInstitution] = useState("");
  const [cnpj, setCnpj] = useState("");

  const login = (e) => {
    e.preventDefault();
    try {
      api
        .post("/api/healthcare-institutions/authenticate", {
          nameInstitution: nameInstitution,
          cnpj: cnpj,
        }).then((response) => {
          localStorage.setItem('_institution_logged', JSON.stringify(response.data))
          localStorage.getItem('_institution_logged')
          console.log(response.data);
          navigate("/home");
        })
        .catch((erro) => messageError(erro.response.data));
    } catch (error) {
      messageError(error);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/register-institution");
  };

  return (
    <div className="login-container">
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <div className="bs-docs-section">
          <Card title="Login">
            <div className="row">
              <div className="col-lg-12">
                <div className="bs-component">
                  <fieldset>
                    <FormGroup label="Name Healthcare Institution: *" htmlFor="exampleInputNameInstitution1">
                      <input
                        type="text"
                        value={nameInstitution}
                        onChange={(e) => setNameInstitution(e.target.value)}
                        className="form-control"
                        id="exampleInputNameInstitution1"
                        placeholder="Enter the name of the Institution"
                      />
                    </FormGroup>
                    <FormGroup label="CNPJ: *" htmlFor="exampleInputCnpj1">
                      <input
                        type="text"
                        value={cnpj}
                        onChange={(e) => setCnpj(e.target.value)}
                        className="form-control"
                        id="exampleInputCnpj1"
                        placeholder="Enter the institution's CNPJ"
                      />
                    </FormGroup>
                    <button onClick={login} className="btn btn-success">
                      Login
                    </button>
                    <button onClick={handleClick} className="btn btn-primary">
                      Register
                    </button>
                  </fieldset>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
    </div>
  );
}
