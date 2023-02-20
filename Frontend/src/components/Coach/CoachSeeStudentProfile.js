import React, { useState } from "react"
import "./teamstyles.css"
import { useLocalStorage } from '../useLocalStorage'
import { json } from "body-parser";
import { useNavigate } from "react-router-dom";
//NEED TO ADD TO THE TEACHER.JS IN ORDER TO BE SEEN ON THE PAGE IN ORDER TO BE MOVED TO THIS PAGE

/* where the student profile page lives; get the local storage user information & send to StudProfileContent
to render the info*/

export default function CoachSeeStudentProfile() {
    let navigate = useNavigate();

    function homeButton() {
        navigate('/teacher', { replace: true })
    }

    var postData;
    var allStudents;
    const [data, setData] = useState(null);
    const [data1, setData1] = useState(null);
    const [data2, setData2] = useState(null);
    const [data3, setData3] = useState(null);
    const [data4, setData4] = useState(null);

    // need to figure out how to get student username
    const studentusername = db.getUser({ usersInfo: { user: student, db: "users" } });


    const studentsearchurl = '/api/studentsearch/';
    //const finishedurl = studentsearchurl + studentusername;

    //   const [currStud, setStud] = useState([])
    const fetchUserAccount = (incText) => {
        postData = { displayname: incText }

        useEffect(() => {
            const finishedurl = studentsearchurl + incText;

            var fieldData = ['username', 'school', 'tier', 'gradelevel', 'team'] //payload
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(fieldData)
            };
            fetch(finishedurl, requestOptions).then(res => res.json()).then(
                data => {
                    setStud(data.collection)
                    console.log("Values in data collection:" + data.collection) // object Object
                    if (data.collection == null) { console.log(Error) }
                })
        }, []);

        return (
            <div className="App">
                <input value={input} placeholder="enter display name" onChange={ev => setInput(ev.target.value)} />
                <button onClick={() => fetchUserAccount(input)}>Get Team</button>
                <p>username: {data}</p>
                <p>School: {data1}</p>
                <p>Tier: {data2}</p>
                <p>Gradlevel: {data3}</p>
                <p>Team: {data4}</p>

                <button onClick={homeButton}>
                    Home
                </button>

            </div>
        );

    }