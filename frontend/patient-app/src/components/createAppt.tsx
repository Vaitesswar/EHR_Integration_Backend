import '../App.css';
import { useKeycloak } from "@react-keycloak/web";
import jwt_decode, { JwtPayload } from 'jwt-decode'
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function CreateAppt() {

    const { keycloak } = useKeycloak();

  const decode = jwt_decode<JwtPayload>(keycloak.token || '') || null;
  const doctorID = decode.sub;
  const [patients, setPatients] = useState([]);
  const [patientSelected, setPatientSelected] = useState(null);
  const [ datetime, setDatetime ] = useState('');

  useEffect(() => {
    fetch(`http://127.0.0.1:8001/patients`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${keycloak.token}`
        }
    })
        .then(resp => resp.json()) // Convert response to JSON
        .then(resp => setPatients(resp)) // Set the response in movies
        .catch(error => console.log(error))
  }, [keycloak.token])

  const patientChange = (e: React.ChangeEvent<any>) => {
    setPatientSelected(e.target.value);
  };
  const dateChange = (e: React.ChangeEvent<any>) => {
    if (!e.target['validity'].valid) return;
    const dt= e.target['value'] + ':00.000Z';
    setDatetime(dt);
  };

  function create(body:any) {
    return fetch(`http://127.0.0.1:8001/appointments/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${keycloak.token}`
        },
        body: JSON.stringify(body)
    }).then(resp => resp.json())
}
    const apptCreate = (e: React.ChangeEvent<any>) => {
        create({ "patientID":patientSelected, "doctorID":doctorID, "appointmentDateTime":datetime });
    };

    return (
        <div className="App">
            <h1> Create new appointment </h1>
            <select value={patientSelected} onChange={patientChange} className="form-select" aria-label="Default select example">
            <option selected>Select a Patient</option>
                {patients.map(patient => (
                    <option
                    key={patient._id}
                    value={patient._id}
                    >
                    {patient.name}
                    </option>
                ))}
            </select>
            <label>Choose a time for your appointment</label>
            <input type="datetime-local" 
            value={(datetime || '').toString().substring(0, 16)}
            onChange={dateChange}/>
            <p></p>
            <p>
            <button onClick={apptCreate}>Create</button>
            </p>
        </div>
             
    )
}

export default CreateAppt;