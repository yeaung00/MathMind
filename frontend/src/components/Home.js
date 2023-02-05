import React, { useEffect, useState } from 'react';
import ClassCard from './ClassCard';
import { Link } from 'react-router-dom';
import courseServices from '../services/course';
import userServices from '../services/user';

function Home({ userData, setCurrentCourse }) {
  const [courses, setCourses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState();
  const [userCourses, setUserCourses] = useState([]);
  console.log('userData', userData)
  useEffect(() => {
    if (userData) {
      userServices.getAllCourses(userData.user.username)
        .then(res => setUserCourses(res));
      courseServices.getAllCourses()
        .then(res => setCourses(res))
    }

  }, [userData])
  
  const handleChange = e => {
    const { value } = e.target;
    setSelectedCourse(value);
  }
  const handleSubmit = async e => {
    setShowForm(true)
    const data = await userServices.postCourse(selectedCourse, userData.username);
    setUserCourses(data);
  }
  return (
    <div className='Home'>
      {showForm 
      ? <form>
        <div className='course-label'>
          <label htmlFor='course'>Course</label>
          </div>
        <select onChange={handleChange} id='course' value={selectedCourse}>
          {courses.map(course => <option key={course.id}>{course.name}</option>)}
        </select>
        <div className='add-btn'>
          <button onClick={handleSubmit} type='submit'>Add class</button>
        </div>
        <div className='cancel-btn'>
          <button onClick={() => setShowForm(false)} type='button'>Cancel</button>
        </div>
      </form>
      : <button className='add-course-btn'onClick={() => setShowForm(true)} >Add course</button>
      }
      <div className='card-div'>
        {userCourses && userCourses.map(course => (
          <Link key={course._id} onClick={() => setCurrentCourse(course.courseName)} to={`/assignments/${course.courseName}`}>
            <ClassCard courseName={course.courseName} />
          </Link>
        ))}
        <Link onClick={() => setCurrentCourse('AM 3 Precalculus for the Social Sciences')} to={`/assignments/AM 3 Precalculus for the Social Sciences`}>
            <ClassCard courseName={'AM 3 Precalculus for the Social Sciences'} />
          </Link>
      </div>
    </div>
  )
}

export default Home