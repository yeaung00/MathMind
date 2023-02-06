import React from 'react'

function ClassAssignments({ assignment }) {
  return (
    <div className='ClassAssignments'>
      <div className='Assignment-label'>
        {assignment.description}
      </div>
    </div>
  )
}

export default ClassAssignments