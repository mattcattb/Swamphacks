import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Graph from '../components/Graph'
import { Button } from 'react-bootstrap';
import user from '../lib/user'
import AddInfo from '../components/AddInfo';
import { axiosInstance } from '../lib/axios';

export default function LandingPage() {
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [allMeds, setAllMeds] = useState([]); //list of all meds
  const [selectedMed, setSelectedMed] = useState(""); //ID of the pill selected

  useEffect(() => {
    const currTime = new Date();
    const morningTime = new Date();
    morningTime.setHours(0, 0, 0, 0); 
  
    const afternoonTime = new Date();
    afternoonTime.setHours(12, 0, 0, 0); 
  
    const eveningTime = new Date();
    eveningTime.setHours(17, 30, 0, 0); 
  
    const messages = ["Good Morning, ", "Good Afternoon, ", "Good Evening, "];
  
    if (currTime >= morningTime && currTime < afternoonTime) {
      setWelcomeMessage(messages[0]);
    } else if (currTime >= afternoonTime && currTime < eveningTime) {
      setWelcomeMessage(messages[1]);
    } else {
      setWelcomeMessage(messages[2]);
    }

    axiosInstance.get('/medication/').then(res => {
      if(res.data && res.data.allMedications) {
        setAllMeds(res.data.allMedications);
      }
    }).catch(err => {
      console.log(err);
    })
  }, []); 



  
  return (
    <div style={{fontFamily: 'Montserrat', fontWeight: 'bold', backgroundColor: "#ff6b6b", height: "100vh"}} className='flex flex-col items-center justify-center pt-3 text-center text-white'>
      <div>
        <h1 className='mb-3 text-3xl'>{welcomeMessage} NAME GOES HERE</h1>
      </div>

      <div className="flex flex-row">
        <AddInfo allMeds={allMeds} setSelectedMed={setSelectedMed}/>
        <Graph/>
      </div>
      

      {/* <Button 
      style={{backgroundColor: "white", color: "black", border: "none"}} 
      disabled={selectedMed == ""}
      onClick={() => {axiosInstance.post(`/entry/notARealUser/${selectedMed}/`)}}> Record Entry</Button> */}

    </div>
  );
}
