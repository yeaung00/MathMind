import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import assignmentServices from '../services/assignment';
import userServices from '../services/user';
import ClassAssignments from './ClassAssignments';

function Assignment({ userData, setCurrentAssignment }) {
  const [showForm, setShowForm] = useState(false);
  const [input, setInput] = useState('');
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    if (userData) {
      userServices.getAllAssignments(userData.user.username)
        .then(res => setAssignments(res))
    }
    
  }, [userData])
  const handleSubmit = async e => {
    e.preventDefault();
    const assignment = { 'description': input};
    const data = await assignmentServices.postAssignment(assignment);
    setAssignments(data);
    setInput('');
  }
  return (
    <div>
      <div className='create-new'>
        {showForm 
        ? <form className='assignment-form'onSubmit={handleSubmit}>
            <input onChange={e => setInput(e.target.value)} value={input}/>
            <div className='assignment-form-btn-group'>
              <button type='button' onClick={() => setShowForm(false)}>Cancel</button>
              <button type='submit'>Submit</button>
            </div>
          </form>
          
        : 
            <button onClick={() => setShowForm(true)} className='new-assign'>Create New Assignment</button>
        }
      </div>
        <div className='existing-assignments'>
            {assignments.map(assignment => (
              <button onClick={() => setCurrentAssignment(assignment)} key={assignment._id} className='assign'>
                <Link to='/course'><ClassAssignments assignment={assignment}/></Link> 
              </button>
            ))}
            {/* <button className='assign'>
                <Link to='/course'><ClassAssignments /></Link> 
            </button> */}
        </div>
    </div>
  )
}

export default Assignment