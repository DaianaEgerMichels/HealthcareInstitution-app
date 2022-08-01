import React, { useState } from "react";
import Card from "../../components/Card/Card";
import FormGroup from "../../components/FormGroup/FormGroup";
import { useNavigate } from "react-router";
import api from "../../utils/api";

import {
  messageError,
  messageSuccess,
} from "../../components/Toastr/toastr.js";

function SignUp() {
  const navigate = useNavigate();
  const [nameInstitution, setNameInstitution] = useState("");
  const [cnpj, setCnpj] = useState("");

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/");
  };

  const validateFields = ()=>{
    const messages = []

    if (!nameInstitution) {
      messages.push("Name is a required field.");
     
    } else if (!cnpj.match(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/) || cnpj.length !== 14) {
      messages.push("Please provide a valid CNPJ!");
    } 
    return messages;
  }

  const handleRegisterInstitution = (e) => {
    e.preventDefault();
    const messages = validateFields();

    if(messages && messages.length >0){
      messages.forEach((message, index)=>{
        messageError(message)
      });
      return false;
    }

    try {
      api
        .post("/api/healthcare-institutions", {
          nameInstitution: nameInstitution,
          cnpj: cnpj,
        })
        .then(() => {
          messageSuccess(
            "Healthcare Institution registered successfully! Login to access the system!"
          );
          navigate("/");
        })
        .catch((erro) => {messageError(erro.response.data.messages)});
    } catch (error) {
      messageError(error);
    }
  };

  return (
    <div className="signup-container">
    <Card title="Register Healthcare Institution">
      <div className="row">
        <div className="col-lg-12">
          <div className="bs-component">
            <FormGroup label="Healthcare Institution Name: *" htmlFor="inputName">
              <input
                type="text"
                id="inputName"
                value={nameInstitution}
                name="nome"
                onChange={(e) => setNameInstitution(e.target.value)}
                className="form-control"
                placeholder="Enter the name of the Institution here"
              />
            </FormGroup>
            <FormGroup label="CNPJ: *" htmlFor="inputCnpj">
              <input
                type="cnpj"
                value={cnpj}
                onChange={(e) => setCnpj(e.target.value)}
                className="form-control"
                id="inputCnpj"
                placeholder="Enter the Institution's CNPJ here"
              />
            </FormGroup>
            <button onClick={handleRegisterInstitution} className="btn btn-success">
              Register
            </button>
            <button onClick={handleCancel} className="btn btn-primary">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Card>
    </div>
  );
}

export default SignUp;
