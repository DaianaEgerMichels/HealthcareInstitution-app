import {React, useEffect} from "react";
import Card from "../../components/Card/Card";
import Navbar from "../../components/Navbar/Navbar";
import { MdEdit, MdDelete } from "react-icons/md";
import {IoMdEye} from "react-icons/io";
import {RiHealthBookLine} from "react-icons/ri";
import { useState } from "react";
import * as mensagens from "../../components/Toastr/toastr.js";
import Swal from "sweetalert2";
import api from "../../utils/api";
import { useNavigate, useParams } from "react-router-dom";

function ConsultExams() {
  const navigate = useNavigate();
  const params = useParams();

  const [deleteMessage, setDeleteMessage] = useState(false);
  const [exams, setExams] = useState([]);

  const handleRegisterExam = () => {
    navigate("/register-exam");
  };

    const institutionLoggedString = localStorage.getItem("_institution_logged");
    const institutionLogged = JSON.parse(institutionLoggedString);

    if (institutionLogged.id == null) {
      mensagens.messageError("There was an error fetching the exams");
    }

    useEffect(() => {
      try {
        api
          .get(`/api/exams/all/${institutionLogged.id}`)
          .then((response) => {
            if(response.data == []){
              mensagens.messageAlert("There are no exams registered yet!")
              navigate("/home")
            }
            setExams(response.data);
          })
          .catch(() =>
            mensagens.messageAlert("There was a problem fetching the exams!")
          );
      } catch (error) {
        mensagens.messageError(error);
      }
    }, [deleteMessage]); 

  const handleEdit = (idExam) => {
    navigate(`/register-exam/${idExam}`)
  };

  const handleViewExam = (idExam) => {
    navigate(`/exams/${idExam}`)
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
          setDeleteMessage(true);
          if (idExam) {
            api.delete(`/api/exams/${idExam}`, {params: {id_institution:institutionLogged.id}});
          }
          Swal.fire("Deleted!", "Exam deleted successfully!", "success");
        }
      })
      .catch(() =>
        mensagens.messageAlert("There was a problem deleting the exam!")
      );
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <Card title="Registered Exams">
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
                      <th scope="col">Patient Gender</th>
                      <th scope="col">Physician Name</th>
                      <th scope="col">Procedure Name</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {exams.map((exam) => {return (
                      <tr key={exam.id}>
                        <td>{exam.id}</td>
                        <td>{exam.patientName}</td>
                        <td>{exam.patientGender}</td>
                        <td>{exam.physicianName}</td>
                        <td>{exam.procedureName}</td>
                        <td>
                          <button
                            onClick={(id) => handleEdit(exam.id)}
                            className="btn btn-primary"
                          >
                            <abbr title="Edit">
                              <MdEdit size={20}/>
                            </abbr>
                          </button>
                          <button
                            onClick={(id) => handleViewExam(exam.id)}
                            className="btn btn-info"
                          >
                            <abbr title="View Exam">
                              <IoMdEye size={20}/>
                            </abbr>
                          </button>
                          <button
                            onClick={(id) => handleDelete(exam.id)}
                            className="btn btn-danger"
                          >
                            <abbr title="Delete">
                              <MdDelete size={20}/>
                            </abbr>
                          </button>
                        </td>
                      </tr>
                    )})}
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

export default ConsultExams;
