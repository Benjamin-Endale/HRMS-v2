import React from 'react'
import { SignOutButton } from './SignOutButton'

const HeaderOrg = ({ readPath , session }) => {
  // Object with code-friendly keys

  const parag = {
    Dashboard: "Welcome back! Here's what's happening at your organization today.",
    Employee_Management: "Manage employee profile, roles, and organizational structure.",
    Attendance: "Monitor employee attendance, working hours, and presence status.",
    Leave_Management: "Manage employee leave requests, balances, and policies.",
    Recruitment_and_ATS: "Manage job postings, candidates, and hiring process",
    Performance_Management:"Track goals, conduct reviews, and manage employee performance.",
    Announcements_and_Notifications:"Manage company-wide communications and employee notifications.",
    Assets:"",
    Add_New_Employee:"Enter employee details to create a new profile",
    Organization_Management: 'Manage all organizations in your HRMS platform',
    Create_Organization: 'Set up a new organization in your HRMS platform',
    Organization_Settings: 'Set up a new organization in your HRMS platform',
    Super_Administrators: 'Manage system administrators and their permissions',
    User_Statics: '',
    Training_and_Development: 'Manage training programs, enrollments, and employee development',
    User_Authentication: '',
    Department_Management: 'Manage company structure, departments hierarchy.',
    Admin_Settings: 'Manage training programs, enrollments, and employee development'
  }

  // Map human-readable titles to object keys
  const keyMap = {
    "Admin/OrganizationPages": "Dashboard",

    "Admin/OrganizationPages/Dashboard": "Dashboard",
    "Admin/OrganizationPages/Organization": "Organization_Management",
    "Admin/OrganizationPages/Department": "Department_Management",
    "Admin/OrganizationPages/DepartmentView": "Department_Management",
    "Admin/OrganizationPages/Employees": "Employee_Management",
    "Admin/OrganizationPages/Attendance": "Attendance",
    "Admin/OrganizationPages/LeaveManagment": "Leave_Management",
    "Admin/OrganizationPages/Performance":"Performance_Management",
    "Admin/OrganizationPages/Training":"Training_and_Development",
    "Admin/OrganizationPages/Announcement":"Announcements_and_Notifications",
    "Admin/OrganizationPages/EmployeeRegistration/AddNewemployee": 'Add_New_Employee',
    "Admin/OrganizationPages/EmployeeRegistration/AddNewemployeesecond": 'Add_New_Employee',
    "Admin/OrganizationPages/EmployeeRegistration/Compensation": "Add_New_Employee",
    "Admin/OrganizationPages/EmployeeRegistration/System": "Add_New_Employee",
    "Admin/OrganizationPages/EmployeeEdit/AddNewemployee": 'Add_New_Employee',
    "Admin/OrganizationPages/EmployeeEdit/AddNewemployeesecond": 'Add_New_Employee',
    "Admin/OrganizationPages/EmployeeEdit/Compensation": "Add_New_Employee",
    "Admin/OrganizationPages/EmployeeEdit/System": "Add_New_Employee",
    "Admin/OrganizationPages/EmployeeView": "Add_New_Employee",


    'Admin/OrganizationPages/RecruitmentPages/Jobposting' : "Recruitment_and_ATS",
    "Admin/OrganizationPages/RecruitmentPages/Candidates": "Recruitment_and_ATS",
    "Admin/OrganizationPages/RecruitmentPages/Interviews": "Recruitment_and_ATS",
    "Admin/OrganizationPages/RecruitmentPages/Shortlist": "Recruitment_and_ATS",
    'Admin/OrganizationPages/Performance': 'Performance_Management',
    'Admin/OrganizationPages/PerformancePages/Overview': 'Performance_Management',
    'Admin/OrganizationPages/PerformancePages/Goals': 'Performance_Management',
    'Admin/OrganizationPages/PerformancePages/Reviews': 'Performance_Management', 
    'Admin/OrganizationPages/PerformancePages/FeedBack': 'Performance_Management',
    'Admin/OrganizationPages/TrainingPages/Enrolment':'Training_and_Development',
    'Admin/OrganizationPages/TrainingPages/OverviewTraining':'Training_and_Development',
    'Admin/OrganizationPages/TrainingPages/Program':'Training_and_Development',
    'Admin/OrganizationPages/TrainingPages/Feedback':'Training_and_Development',
    'Admin/OrganizationPages/UserAuthentication': 'User_Authentication',
    'Admin/OrganizationPages/UserAuthentication/All': 'User_Authentication',
    'Admin/OrganizationPages/UserAuthentication/Authorized': 'User_Authentication',
    "Admin/OrganizationPages/EmployeeView": "Employee_Management",
    "Admin/OrganizationPages/EmployeeDetail": "Employee_Management",
    "Admin/OrganizationPages/EmployeeEdit": "Employee_Management",
    "Admin/OrganizationPages/OrganizationView": "Organization_Management",
    "Admin/OrganizationPages/SettingPages/General": "Admin_Settings",
    "Admin/OrganizationPages/SettingPages/Core": "Admin_Settings",
    "Admin/OrganizationPages/SettingPages/Talent": "Admin_Settings",
    "Admin/OrganizationPages/SettingPages/System": "Admin_Settings",




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

export default HeaderOrg
