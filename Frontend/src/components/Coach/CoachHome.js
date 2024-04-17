// Here will be the mentor page with a decent layout and buttons to future pages.
import React, { useEffect, useState } from 'react';
//import Button from './MentorButton';
import '../Mentor/PageLayout.css'
import '../Coach/CoachProfile'
import './coachHome.css'
import ManageTeams from './ManageTeams';
import StudentStats from './StudentStats';
import Navbar from './../General/Navbar';
import { useNavigate } from 'react-router-dom';
import {loginChecker} from "../General/LoginCheck";
import CoachProfile from '../Coach/CoachProfile';
import { validateTeamID } from '../General/validateTeamID';
import { formatTeamIDString } from '../General/formatTeamIDString';
import { formatTeamIDNumber } from '../General/formatTeamIDNumber';
import PreviousQuizzes from './PreviousQuizzes';
import CreateQuiz from './CreateQuiz';
import FindMentors from './FindMentors';

/* 
CoachHome is the coach's home page. It uses state variables to control which sub-component is being rendered.
*/

function CoachHome() {

  const [enabledManageTeam, setEnabledManageTeam] = useState(true);
  const [enabledStudentStats, setEnabledStudentStats] = useState(false);
  const [enabledCreateQuiz, setEnabledCreateQuiz] = useState(false);
  const [enabledFindMentors, setEnabledFindMentors] = useState(false);
  const [enabledCoachProfile, setEnabledCoachProfile] = useState(false);
  const [enabledPreviousQuizzes, setEnabledPreviousQuizzes] = useState(false);
  const [resetKey, setResetKey] = useState("key");

  let navigate = useNavigate();

  //makes sure the current user is a Coach -> otherwise, kicks them off the page
  window.onload = (event) => {
    var toNavigateTo = loginChecker("Coach")
    if(toNavigateTo != "")navigate(toNavigateTo, {replace: true})
  };

  //the 5 funtions below control which component is being rendered

  function showPreviousQuizzes() {
    setEnabledPreviousQuizzes(true);
    setEnabledManageTeam(false);
    setEnabledStudentStats(false);
    setEnabledCreateQuiz(false);
    setEnabledFindMentors(false);
    setEnabledCoachProfile(false);
  }

  function teamsButton(){
    //navigate('/ViewTeams2', {replace: true}) 
    setEnabledManageTeam(true); 
    setEnabledStudentStats(false);
    setEnabledCreateQuiz(false);
    setEnabledFindMentors(false); 
    setEnabledCoachProfile(false);
    setEnabledPreviousQuizzes(false);
  }

  function showStudentStats() {
    setEnabledStudentStats(true);
    setEnabledManageTeam(false); 
    setEnabledCreateQuiz(false);
    setEnabledFindMentors(false);
    setEnabledCoachProfile(false);
    setEnabledPreviousQuizzes(false);
  }

  function showCreateQuiz() {
    setEnabledCreateQuiz(true);
    setEnabledManageTeam(false);
    setEnabledStudentStats(false);
    setEnabledFindMentors(false);
    setEnabledPreviousQuizzes(false);
    setEnabledCoachProfile(false);
  }

  function showFindMentors() {
    setEnabledFindMentors(true);
    setEnabledCreateQuiz(false);
    setEnabledManageTeam(false);
    setEnabledStudentStats(false);
    setEnabledPreviousQuizzes(false);
    setEnabledCoachProfile(false);
  }

  function showCoachProfile(){
    setEnabledCoachProfile(true);
    setEnabledFindMentors(false);
    setEnabledCreateQuiz(false);
    setEnabledManageTeam(false);
    setEnabledPreviousQuizzes(false);
    setEnabledStudentStats(false);
  }

  function coachTableButton(){
    navigate('/coachtable', {replace: true})
  }

  const resetCreateQuiz = () => {
    setResetKey("reset");
  }
  useEffect(() => {
    if(resetKey == "reset") {
      setResetKey("key");
    }
  }, [resetKey])

return (
  <>
    <Navbar buttonSet="coach"/>

    <div className="coach-page-main">
        <button className={enabledManageTeam ? "selected-tab" : "unselected-tab"} onClick={teamsButton}>
        Manage Teams
        </button>

        <button className={enabledStudentStats ? "selected-tab" : "unselected-tab"} onClick={showStudentStats}>
        Student Stats
        </button>

        <button className={enabledPreviousQuizzes ? "selected-tab" : "unselected-tab"} onClick={showPreviousQuizzes}>
        Previous Quizzes
        </button>

        <button className={enabledCreateQuiz ? "selected-tab" : "unselected-tab"} onClick={showCreateQuiz}>
        Create Quizzes
        </button>

        <button className={enabledFindMentors ? "selected-tab" : "unselected-tab"} onClick={showFindMentors}>
        Find Mentors
        </button>

        <button className={enabledCoachProfile ? "selected-tab" : "unselected-tab"} onClick={showCoachProfile}>
        My Account
        </button>

        <div className="content-area">
          {!enabledManageTeam && !enabledStudentStats && !enabledCreateQuiz && !enabledFindMentors && !enabledCoachProfile && !enabledPreviousQuizzes
            ? <h1 className="descriptor-text">Click on a tab to view its contents</h1> 
            : null
          }
          <ManageTeams enabled={enabledManageTeam}/>
          <StudentStats enabled={enabledStudentStats}/>
          <FindMentors enabled={enabledFindMentors}/>
          <CoachProfile enabled={enabledCoachProfile}/>
          <CreateQuiz key={resetKey} reset={resetCreateQuiz} enabled={enabledCreateQuiz}/>
          <PreviousQuizzes enabled={enabledPreviousQuizzes}/>

          {/* {enabledFindMentors 
          ? <h1>This page is planned to be implemented in the future.</h1>
          : null}*/}
        </div>
    </div> 
  </>
  );
}
  
export default CoachHome;