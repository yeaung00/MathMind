import axios from 'axios';
import React, { useState } from 'react'
import assignmentServices from '../services/assignment';

function Course({ assignment }) {
  const [selectedFile, setSelectedFile] = useState();
  const [feedback, setFeedback] = useState({});

  console.log('assignment', assignment)

  const handleSubmit = async e => {
   // e.preventDefault();
    const formData = new FormData();
    formData.append('question', '7+6+5(x+3)==2');
    formData.append('imgFile', selectedFile);
    const { data } = await axios.post("https://flask-production-3d56.up.railway.app/", formData, { mode: "cors" })
    setFeedback(data);
    console.log('data', data)
    const res = await assignmentServices.postProblems({ explanation: data.explanation, keywords: data.keywords }, assignment._id);
    console.log(res);
  }
  return (
    <div className='Course'>
      <div className='assignment-pdf'>
        {selectedFile && <img alt="assignment" width={"100%"} src={URL.createObjectURL(selectedFile)} />}
      </div>
      <div className='file-submission'>
        <p> </p>
        <input className='add-file' type="file" name='file' onChange={e => setSelectedFile(e.target.files[0])}></input>
        <button className='submit-file' onClick={handleSubmit}>Submit</button>
        <div className='feedback'>
          <div className='answer'>
            {feedback.explanation}
            {feedback.keywords}
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Course