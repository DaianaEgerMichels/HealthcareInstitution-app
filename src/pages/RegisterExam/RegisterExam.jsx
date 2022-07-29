import React from "react";
import { useState, useEffect } from "react";
import Card from "../../components/Card/Card";
import Navbar from "../../components/Navbar/Navbar";
import FormGroup from "../../components/FormGroup/FormGroup";
import SelectMenu from "../../components/SelectMenu/SelectMenu";
import {
  messageError,
  messageSuccess,
  messageAlert
} from "../../components/Toastr/toastr.js";
import { useNavigate, useParams } from "react-router";
import api from "../../utils/api";

function RegisterExam() {
  const navigate = useNavigate();
  const params = useParams();

  const [patientName, setPatientName] = useState("");
  const [patientAge, setPatientAge] = useState(0);
  const [patientGender, setPatientGender] = useState("");
  const [physicianName, setPhysicianName] = useState("");
  const [physicianCRM, setPhysicianCRM] = useState("");
  const [procedureName, setProcedureName] = useState("");

  const gender = [
    { label: "SELECIONE...", value: "" },
    { label: "FEMALE", value: "FEMALE" },
    { label: "MALE", value: "MALE" },
  ];

  const validateFields = () => {
    const messages = [];

    if (!patientName) {
      messages.push("Enter the patient's name.");
    } else if (!patientAge || patientAge < 0) {
      messages.push("Inform the patient's age.");
    } else if (!patientGender) {
      messages.push("Select patient gender.");
    } else if (!physicianName) {
      messages.push("Provide the name of the physician responsible for the examination.");
    } else if (!physicianCRM) {
      messages.push("Inform the physician's CRM.");
    } else if (!procedureName) {
      messages.push("Enter the name of the exam procedure.");
    }
    return messages;
  };

  const handleSaveExam = (e, institutionLogged) => {
    e.preventDefault();
    const messages = validateFields();

    if (messages && messages.length > 0) {
      messages.forEach((message, index) => {
        messageError(message);
      });
      return false;
    }

    try {
      const instituionLoggedString = localStorage.getItem(
        "_institution_logged"
      );
      const institutionLogged = JSON.parse(instituionLoggedString);
      if (institutionLogged.id === null || institutionLogged.id === 0) {
        messageError("There was an error fetching the exams");
        navigate("/home")
      }
      if(params.id){
        api.put(`/api/exams/${params.id}`, {institutionId: institutionLogged.id,
          patientName: patientName,
          patientAge: patientAge,
          patientGender: patientGender,
          physicianName: physicianName,
          physicianCRM: physicianCRM,
          procedureName: procedureName,}).then(() => {
            messageSuccess("Exam update successfully!");
          navigate("/exams");
          })
          .catch((erro) => {
             messageError(erro.response.data.messages);
          });
      } else {
        api
        .post("/api/exams", {
          institutionId: institutionLogged.id,
          patientName: patientName,
          patientAge: patientAge,
          patientGender: patientGender,
          physicianName: physicianName,
          physicianCRM: physicianCRM,
          procedureName: procedureName,
        })
        .then(() => {
          messageSuccess("Exam registered successfully!");
          navigate("/exams");
        })
        .catch((erro) => messageError(erro.response.data.messages));
      }
      
    } catch (error) {
      messageError(error);
    }
  };

  const institutionLoggedString = localStorage.getItem("_institution_logged");
  const institutionLogged = JSON.parse(institutionLoggedString);

    if (institutionLogged.id === null || institutionLogged.id === 0) {
      messageError("There was an error fetching the exams");
    }

  useEffect(() => {
    try {
        if(params.id){         
      api
        .get(`/api/exams/${params.id}`, {params: {id_institution: institutionLogged.id}})
        .then((response) => {
          if(!response){
            messageAlert("There are no exams registered yet!")
            navigate("/home")
          }
        let result = response.data;
        setPatientName(result.patientName);
        setPatientAge(result.patientAge);
        setPatientGender(result.patientGender);
        setPhysicianName(result.physicianName);
        setPhysicianCRM(result.physicianCRM);
        setProcedureName(result.procedureName);
    })
        .catch((erro) =>{
          messageAlert("There was a problem fetching the exams!");
          messageError(erro.response.data.messages);}
        );}
    } catch (error) {
      messageError(error);
    }
  }, [params, institutionLogged.id, navigate]); 

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/home");
  };

  return (
    <>
      <Navbar />
      <div className="container">
      <Card title={params.id ? "Edit Exam": "Exam Registration"}>
        <div className="row">
          <div className="col-md-12">
            <FormGroup id="inputPatientName" label="Patient Name: *">
              <input
                id="inputPatientName"
                value={patientName}
                name="patientName"
                onChange={(e) => setPatientName(e.target.value)}
                type="text"
                className="form-control"
              />
            </FormGroup>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <FormGroup id="inputPatientAge" label="Patient Age: *">
              <input
                id="inputPatientAge"
                value={patientAge}
                name="patientAge"
                onChange={(e) => setPatientAge(e.target.value)}
                type="number"
                className="form-control"
              />
            </FormGroup>
          </div>
          <div className="col-md-6">
            <FormGroup id="inputPatientGender" label="Patient Gender: *">
              <SelectMenu
                id="inputPatientGender"
                className="nav-link dropdown-toggle  btn-outline-info form-control"
                data-bs-toggle="dropdown"
                role="button"
                aria-haspopup="true"
                lista={gender}
                value={patientGender}
                onChange={(e) => setPatientGender(e.target.value)}
              />
            </FormGroup>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <FormGroup id="inputPhysicianName" label="Physician Name: *">
              <input
                id="inputPhysicianName"
                value={physicianName}
                name="physicianName"
                onChange={(e) => setPhysicianName(e.target.value)}
                type="text"
                className="form-control"
              />
            </FormGroup>
          </div>
          <div className="col-md-6">
            <FormGroup id="inputPhysicianCRM" label="Physician CRM: *">
              <input
                id="inputPhysicianCRM"
                value={physicianCRM}
                name="physicianCRM"
                onChange={(e) => setPhysicianCRM(e.target.value)}
                type="text"
                className="form-control"
              />
            </FormGroup>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <FormGroup id="inputProcedureName" label="Procedure Name: *">
              <input
                id="inputProcedureName"
                value={procedureName}
                name="procedureName"
                onChange={(e) => setProcedureName(e.target.value)}
                type="text"
                className="form-control"
              />
            </FormGroup>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <button onClick={handleSaveExam} className="btn btn-success">
            {params.id ? "Update": "Save"}
            </button>
            <button onClick={handleCancel} className="btn btn-primary">
              Cancel
            </button>
          </div>
        </div>
      </Card>
      </div>
    </>
  );
}

export default RegisterExam;
