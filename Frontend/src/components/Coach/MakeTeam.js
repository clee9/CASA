import React, { useState, useEffect } from "react";
import './MakeTeam.css'


function MakeTeam(props) {
    const[teamNationalID, setTeamNationalID] = useState();
    const[teamName, setTeamName] = useState();
    const[teamSchool, setTeamSchool] = useState();
    const[teamDistrict, setTeamDistrict] = useState();
    const[teamIsROTC, setTeamIsROTC] = useState();
    const[teamCoachID, setTeamCoachID] = useState();

/*

app.post('/api/admin/register_team', async(req, res) => {
    const { national_id, name, school, district, rotc, coach } = req.body;


*/
    const createATeam = async (tID, tName, tSchool, tDistrict, tROTC, tcoachID) => {
        var tmpData = { national_id: tID, name: tName, school: tSchool, district: tDistrict, rotc: tROTC, coach: tcoachID }
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(tmpData)
        };
        fetch('/api/admin/register_team', requestOptions).then(

        )
    }

    useEffect(() => {
        setTeamCoachID(localStorage.getItem("_id"));
    }, []) 
    
    const handleSubmit = (e) => {
        e.preventDefault();
        alert('You have submitted');
        props.closeForm();
    }

    if(props.enabled === true){
        return (
            <div className="form-popup">
                <h2>Make Team</h2>
                <div>
                    <form className="form-container" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor='national_id'>Team's National ID: </label>
                            <input
                                type='text'
                                id='national_id'
                                name='national_id'
                                value={teamNationalID}
                                onChange={(e) => setTeamNationalID(e.target.value)}
                                required                            
                            />
                            <label htmlFor='teamName'>Team's Name: </label>
                            <input
                                type='text'
                                id='teamName'
                                name='teamName'
                                value={teamName}
                                onChange={(e) => setTeamName(e.target.value)}
                                required                            
                            />
                            <label htmlFor='teamIsROTC'>Is the team ROTC True/False: </label>
                            <button className="casa-button" type="submit" onClick={()=>{setTeamIsROTC(true)}}>True</button>
                            <button className="casa-button" type="submit" onClick={()=>{setTeamIsROTC(false)}}>False</button>
                            <label htmlFor='teamSchool'>School Name: </label>
                            <input
                                type='text'
                                id='teamSchool'
                                name='teamSchool'
                                value={teamSchool}
                                onChange={(e) => setTeamSchool(e.target.value)}
                                required                            
                            />
                            <label htmlFor='teamDistrict'>School District: </label>
                            <input
                                type='text'
                                id='teamDistrict'
                                name='teamDistrict'
                                value={teamDistrict}
                                onChange={(e) => setTeamDistrict(e.target.value)}
                                required                                
                            />

                            <button className="casa-button" type="submit" onClick={()=>{createATeam(teamNationalID, teamName, teamSchool, teamDistrict, teamIsROTC, teamCoachID);}}>Create Team</button>
                            <button className="casa-button" type="button" onClick={props.closeForm}>Close</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default MakeTeam