import React from 'react'

const Training = ({readPath}) => {
  return (
    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg" stroke={readPath === 'Admin/Training' || readPath === 'Admin/TrainingPages/OverviewTraining'  || readPath === 'Admin/TrainingPages/Feedback' || readPath === 'Admin/TrainingPages/Enrolment' || readPath === 'EmployeePortal/Training/Enrolment' || readPath === 'EmployeePortal/Training/Programs' || readPath === 'Admin/TrainingPages/Program' ? 'white' : '#5D6150'} strokeWidth="1.5">
        <path d="M4.35648 8.47444C2.61882 7.77939 1.75 7.43186 1.75 7C1.75 6.56814 2.61882 6.22061 4.35648 5.52555L6.81389 4.54259C8.55153 3.84753 9.42034 3.5 10.5 3.5C11.5797 3.5 12.4484 3.84753 14.1861 4.54259L16.6436 5.52555C18.3812 6.22061 19.25 6.56814 19.25 7C19.25 7.43186 18.3812 7.77939 16.6436 8.47444L14.1861 9.45744C12.4484 10.1525 11.5797 10.5 10.5 10.5C9.42034 10.5 8.55153 10.1525 6.81389 9.45744L4.35648 8.47444Z" />
        <path d="M19.25 10.5C19.25 10.5 18.3812 11.2794 16.6436 11.9745L14.1861 12.9574C12.4484 13.6525 11.5797 14 10.5 14C9.42034 14 8.55153 13.6525 6.81389 12.9574L4.35648 11.9745C2.61882 11.2794 1.75 10.5 1.75 10.5"  strokeLinecap="round"/>
        <path d="M19.25 14C19.25 14 18.3812 14.7794 16.6436 15.4745L14.1861 16.4574C12.4484 17.1525 11.5797 17.5 10.5 17.5C9.42034 17.5 8.55153 17.1525 6.81389 16.4574L4.35648 15.4745C2.61882 14.7794 1.75 14 1.75 14"  strokeLinecap="round"/>
    </svg>
  )
}

export default Training