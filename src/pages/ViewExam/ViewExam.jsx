import {React, useEffect} from "react";
import Card from "../../components/Card/Card";
import Navbar from "../../components/Navbar/Navbar";
import { MdEdit, MdDelete } from "react-icons/md";
import {RiHealthBookLine} from "react-icons/ri";
import { useState } from "react";
import * as messages from "../../components/Toastr/toastr.js";
import Swal from "sweetalert2";
import api from "../../utils/api";
import { useNavigate, useParams } from "react-router-dom";

function ViewExam() {
  const navigate = useNavigate();
  const params = useParams();

  const [examId, setExamId] = useState(0);
  const [patientName, setPatientName] = useState("");
  const [patientAge, setPatientAge] = useState(0);
  const [patientGender, setPatientGender] = useState("");
  const [physicianName, setPhysicianName] = useState("");
  const [physicianCRM, setPhysicianCRM] = useState("");
  const [procedureName, setProcedureName] = useState("");
  
 
  const handleRegisterExam = () => {
    navigate("/register-exam");
  };

    const institutionLoggedString = localStorage.getItem("_institution_logged");
    const institutionLogged = JSON.parse(institutionLoggedString);

    if (institutionLogged.id === null || institutionLogged.id === 0) {
      messages.messageError("There was an error fetching the exams");
    }

  useEffect(() => {
    try {
        if(params.id){         
      api
        .get(`/api/exams/${params.id}`, {params: {id_institution: institutionLogged.id}})
        .then((response) => {
          if(!response){
            messages.messageAlert("There are no exams registered yet!")
            navigate("/home")
          }
        let result = response.data;
        setExamId(result.id);
        setPatientName(result.patientName);
        setPatientAge(result.patientAge);
        setPatientGender(result.patientGender);
        setPhysicianName(result.physicianName);
        setPhysicianCRM(result.physicianCRM);
        setProcedureName(result.procedureName);
    })
        .catch(() =>
          messages.messageAlert("There was a problem fetching the exams!")
        );}
    } catch (error) {
      messages.messageError(error);
    }
  }, [params, institutionLogged.id, navigate]); 


  const handleEdit = (idExam) => {
    navigate(`/register-exam/${idExam}`)
  };

  const handleDelete = (idExam) => {
    Swal.fire({
      title: "Are you sure you want to delete the exam?",
      text: "If confirmed, you will no longer be able to reverse this action!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1e8b1ac0",
      cancelButtonColor: "#0e8c9c",
      confirmButtonText: "Yes, delete!",
    })
      .then((result) => {
        if (result.isConfirmed) {
          if (idExam) {
            api.delete(`/api/exams/${idExam}`,{params: {id_institution: institutionLogged.id}});
          }
          Swal.fire("Deleted!", "Exam deleted successfully!", "success");
          navigate("/exams")
        }
      })
      .catch(() =>
        messages.messageAlert("There was a problem deleting the exam!")
      );
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <Card title="Details Exam">
          <div className="row">
            <div className="col-md-12">
              <div className="bg-component">
                <button
                  onClick={handleRegisterExam}
                  className="btn btn-success"
                >
                  Register New Exam <RiHealthBookLine size={24}/>
                </button>
              </div>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-md-12">
              <div className="bs-component">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Id</th>
                      <th scope="col">Patient Name</th>
                      <th scope="col">Patient Age</th>
                      <th scope="col">Patient Gender</th>
                      <th scope="col">Physician Name</th>
                      <th scope="col">Physician CRM</th>
                      <th scope="col">Procedure Name</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                      <tr key={examId}>
                        <td>{examId}</td>
                        <td>{patientName}</td>
                        <td>{patientAge}</td>
                        <td>{patientGender}</td>
                        <td>{physicianName}</td>
                        <td>{physicianCRM}</td>
                        <td>{procedureName}</td>
                        <td>
                        <button
                            onClick={() => handleEdit(examId)}
                            className="btn btn-primary"
                          >
                            <abbr title="Edit">
                              <MdEdit size={20}/>
                            </abbr>
                          </button>
                          <button
                            onClick={() => handleDelete(examId)}
                            className="btn btn-danger"
                          >
                            <abbr title="Delete">
                              <MdDelete size={20}/>
                            </abbr>
                          </button>
                        </td>
                      </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}

export default ViewExam;
