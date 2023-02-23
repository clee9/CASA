import React, { useState } from "react"
import "./stylesCoach.css"
import { useLocalStorage } from '../General/useLocalStorage'
import { json } from "body-parser";
import { useNavigate } from "react-router-dom";
//import StudProfileContent from "./Student/StudProfileContent"

/* where the student profile page lives; get the local storage user information & send to StudProfileContent
to render the info*/

export default function CoachSeeStudentProfile() {
    let navigate = useNavigate();

    function homeButton() {
        navigate('/teacher', { replace: true })
    }

    const curruser = JSON.parse(localStorage.getItem("userID"));
    const curlyuser = "{" + curruser + "}";
    const fixeduser = JSON.parse(curlyuser);
    const coachID = fixeduser._id; 

    var postData;
    var isclicked = "false"
    const [data, setData] = useState("null");
    const [data1, setData1] = useState(null);
    const [data2, setData2] = useState(null);
    const [data3, setData3] = useState(null);
    const [data4, setData4] = useState(null);

    const [errorMessages, setErrorMessages] = useState({});
    const error = {
        name: "ERROR: student Not Found",
    }


    const fetchUserAccount = (incText) => {
        isclicked = "true";
        postData = { displayname: incText }
        const requestOptions = {
            method: 'Post',
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(incText)
        };
        fetch('/api/coach/coachseestudentprofile', requestOptions).then(
            res => res.text()).then(text => {
                try {
                    const userVal = JSON.parse(text);
                    if (userVal.displayname !== JSON.stringify(incText)) {
                        setErrorMessages({ name: "name", message: error.team })

                    }
                    else {
                        console.log(userVal.incText)
                        data(userVal.displayname);
                        data1(userVal.school);
                        setData2(userVal.tier);
                        setData3(userVal.gradlevel);
                        setData4(userVal.team);
                    }


                } catch (error) {
                    console.log("Unable to fetch -")
                }
            }
            );

    };






/*
// need to figure out how to get student username
    //const studentusername   = db.getUser({ usersInfo: { user: student, db: "users" } });    DOESN'T WORK


    const studentsearchurl = '/api/studentsearch/';
    //const finishedurl = studentsearchurl + studentusername;

    //   const [currStud, setStud] = useState([])
    const fetchUserAccount = (incText) => {
        postData = { displayname: incText }

        //useEffect(() => {
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
        
*/
            const [input, setInput] = useState('');
        
        return (
            <div className="App">
                
                    <input value={input} placeholder="enter student display name" onChange={ev1 => setInput(ev1.target.value)}/>
                    <button onClick={() => fetchUserAccount(input)}>Get Student Profile</button>
                        <p>isClicked: {isclicked}</p>
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

//export default CoachSeeStudentProfile;