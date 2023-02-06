import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
//import Login from './components/Login';
import LoginButton from './components/LoginButton';
import Home from './components/Home';
import Course from './components/Course';
import Background from './components/Background';
import LoginPage from './components/LoginPage';
import Assignment from './components/Assignment';
import Welcome from './components/Welcome';
import MathMindWatermark from './components/MathMindWatermark';
import { useEffect, useState } from 'react';
import userServices from './services/user';

function App() {
  const [userData, setUserData] = useState();
  const [currentCourse, setCurrentCourse] = useState();
  const [currrentAssignment, setCurrentAssignment] = useState();
  console.log('curr ass', currrentAssignment)
  useEffect(() => {
    const loggedInUser = localStorage.getItem('userData');
    if (loggedInUser) {
      const parsedUser = JSON.parse(loggedInUser);
      setUserData(parsedUser)
      userServices.setToken(parsedUser.token)
    }
  },[])
  return (
    <div className="App">
      <Welcome />
      <Background />
      <Routes>
        <Route path='/' element={<Welcome />} />
        <Route path='/login' element={<LoginPage />} />
        {/* <Route path="/login" exact element={<LoginButton />} /> */}
        <Route path='/home' element={<Home userData={userData} setCurrentCourse={setCurrentCourse} />} />
        <Route path="/new-assignment" element={<newAssignment />} />
        <Route path={`/assignments/${currentCourse}`} element={<Assignment userData={userData} setCurrentAssignment={setCurrentAssignment}/>} />
        <Route path='/course' element={<Course assignment={currrentAssignment} />} />
      </Routes>
      <Navbar />
      <LoginButton />
      <MathMindWatermark />
    </div>
  );
}

export default App;
