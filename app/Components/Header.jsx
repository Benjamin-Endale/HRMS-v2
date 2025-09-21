import React from 'react'
import { SignOutButton } from './SignOutButton'

const Header = ({ readPath , session }) => {
  // Object with code-friendly keys
  const parag = {
    Dashboard: "Welcome back! Here's what's happening at your organization today.",
    Organization: "Manage company structure, departments, and organizational hierarchy.",
    Employee: "Manage employee profile, roles, and organizational structure.",
    Attendance: "Monitor employee attendance, working hours, and presence status.",
    Leave_Management: "Manage employee leave requests, balances, and policies.",
    Recruitment_and_ATS: "Manage job postings, candidates, and hiring process",
    Performance_Management:"Track goals, conduct reviews, and manage employee performance.",
    Announcements_and_Notifications:"Manage company-wide communications and employee notifications.",
    Assets:"",
    Add_New_Employee:"Enter employee details to create a new profile",
    All_Organizations: 'Manage all organizations in your HRMS platform',
    Create_Organization: 'Set up a new organization in your HRMS platform',
    Organization_Settings: 'Set up a new organization in your HRMS platform',
    Super_Administrators: 'Manage system administrators and their permissions',
    User_Statics: '',
    Training_and_Development: 'Manage training programs, enrollments, and employee development'
  }

  // Map human-readable titles to object keys
  const keyMap = {
    "Admin/Dashboard": "Dashboard",
    "Admin/Organization": "Organization",
    "Admin/Employees": "Employee",
    "Admin/Attendance": "Attendance",
    "Admin/LeaveManagment": "Leave_Management",
    "Admin/Performance":"Performance_Management",
    "Admin/Training":"Training_and_Development",
    "Admin/Announcement":"Announcements_and_Notifications",
    "EmployeeRegistration/AddNewemployee": 'Add_New_Employee',
    "EmployeeRegistration/AddNewemployeesecond": 'Add_New_Employee',
    "EmployeeRegistration/Compensation": "Add_New_Employee",
    "EmployeeRegistration/System": "Add_New_Employee",
    "SuperAdmin/AllOrganization": 'All_Organizations',
    "SuperAdmin/CreateOrganization": "Create_Organization",
    "SuperAdmin/OrganizationSettings":'Organization_Settings',
    "Admin/Recruitment": "Recruitment_and_ATS",
    'SuperAdmin/SuperAdmin':'Super_Administrators',
    'SuperAdmin/UserStatics': 'User_Statics',
    'Admin/RecruitmentPages/Jobposting' : "Recruitment_and_ATS",
    "Admin/RecruitmentPages/Candidates": "Recruitment_and_ATS",
    "Admin/RecruitmentPages/Interviews": "Recruitment_and_ATS",
    "Admin/RecruitmentPages/Shortlist": "Recruitment_and_ATS",
    'Admin/Performance': 'Performance_Management',
    'Admin/PerformancePages/Overview': 'Performance_Management',
    'Admin/PerformancePages/Goals': 'Performance_Management',
    'Admin/PerformancePages/Reviews': 'Performance_Management',
    'Admin/PerformancePages/FeedBack': 'Performance_Management',
    'Admin/TrainingPages/Enrolment':'Training_and_Development',
    'Admin/TrainingPages/OverviewTraining':'Training_and_Development',
    'Admin/TrainingPages/Program':'Training_and_Development',
    'Admin/TrainingPages/Feedback':'Training_and_Development',
    'TestConnection': 'Training_and_Development'


  }

  // Safely access the right key
  const description = parag[keyMap[readPath]] || ""

  return (
    <div className='flex items-center w-full'>
      <header className='w-[calc(100%-3.0625rem)] flex items-center justify-between'>
        <div className='flex flex-col  leading-none space-y-[0.4375rem]'>
          <h1 className='text-white text-[2rem] font-semibold'>{keyMap[readPath].replace(/_/g, ' ')} </h1>
          <h4 className='text-limegray text-[15px] font-medium'>{description}</h4>
        </div>
        <div className='h-full w-[19.375rem] text-nowrap'>
              <SignOutButton session={session} />
        </div>
      </header>
    </div>
  )
}

export default Header
