import './App.css';
import { useKeycloak } from "@react-keycloak/web";
import jwt_decode, { JwtPayload } from 'jwt-decode'
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function App() {
  const { keycloak } = useKeycloak();

  const decode = jwt_decode<JwtPayload>(keycloak.token || '') || null;
  const doctorID = decode.sub;
  console.log(doctorID);
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://127.0.0.1:8001/appointments/byDoctor/${doctorID}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(resp => resp.json()) // Convert response to JSON
        .then(resp => setAppointments(resp)) // Set the response in movies
        .catch(error => console.log(error))
  }, [])

  function JsonDataDisplay(){
    const DisplayData=appointments.map(
        (info)=>{
            return(
                <tr>
                    <td>{info.doctorID}</td>
                    <td>{info.patientID}</td>
                    <td>{info.appointmentDateTime}</td>
                </tr>
            )
        }
    )

    return (
          <div>
            <table className="table table-striped">
                <thead>
                    <tr>
                    <th>Doctor ID</th>
                    <th>Patient ID</th>
                    <th>Appointment (Date & Time)</th>
                    </tr>
                </thead>
                <tbody>
                    {DisplayData}
                </tbody>
            </table>
         </div>
    )
  }

  const navigateToCreateAppt = () => {
    navigate('/createAppt');
  };

  return (
    <div className="App">
          <h2>
              List of appointments
          </h2>
          <JsonDataDisplay />
          <button onClick={navigateToCreateAppt}>Create appointment</button>
    </div>
  );
}

export default App;
