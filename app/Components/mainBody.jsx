'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import DashboardIcon from '@/public/svg/DashboardSvg/Dashboard';
import Organization from '@/public/svg/DashboardSvg/Organization';
import Employee from '@/public/svg/DashboardSvg/Employee';
import Attendance from '@/public/svg/DashboardSvg/Attendance';
import LeaveManegment from '@/public/svg/DashboardSvg/LeaveManegment';
import Recruitment from '@/public/svg/DashboardSvg/Recruitment';
import Performance from '@/public/svg/DashboardSvg/Performance';
import Training from '@/public/svg/DashboardSvg/Training';
import Announcement from '@/public/svg/DashboardSvg/Announcement';
import UserAuth from '@/public/svg/DashboardSvg/UserAuth';
import Settings from '@/public/svg/DashboardSvg/Setting';
import Department from '@/public/svg/DashboardSvg/Department';
import { Dropdown } from '@/app/Components/DropDownforNav'; // make sure path is correct
import { hrmsAPI } from '@/app/lib/api/client';
import { useRouter } from 'next/navigation';
import OrgSelectorPanel from './OrgSelectorPanel';


const MainBody = ({ readPath, modules, session }) => {
  const [organizations, setOrganizations] = useState([]);
  const [selectedOrg, setSelectedOrg] = useState('');
  const [loading, setLoading] = useState(true);
  const tenantId = session?.user?.tenantId;
  const token =  session?.accessToken
  const router = useRouter()

  useEffect(() => {
    const fetchOrganizations = async () => {


      try {
        
        const res = await hrmsAPI.getOrganizationsByTenantId(tenantId, token);
        setOrganizations(res || []);
        if (res?.length > 0) setSelectedOrg(res[0].name);
      } catch (err) {
        console.error('Error fetching organizations:', err);
      } finally {
        setLoading(false);
      }
    };

    if (tenantId && token) {
      fetchOrganizations();
    }
  }, [tenantId, token]);


  const handleOrgSelect = (orgName) => {
  const org = organizations.find((o) => o.name === orgName);
  if (!org) return;

  setSelectedOrg(orgName);

  console.log('Switched to organization:', org);

  // Navigate to the organization dashboard using its ID
  router.push(`/Admin/OrganizationPages/${org.id}`);
};


  const menuSections = [
    {
      title: 'CORE',
      items: [
        { path: '/Admin/Dashboard', label: 'Dashboard', icon: DashboardIcon },
        { path: '/Admin/Organization', label: 'Organization', icon: Organization },
        { path: '/Admin/Department', label: 'Department', icon: Department },
        { path: '/Admin/Employees', label: 'Employees', icon: Employee },
        { path: '/Admin/Attendance', label: 'Attendance', icon: Attendance, moduleKey: 'attendanceTracking' },
        { path: '/Admin/LeaveManagment', label: 'Leave Management', icon: LeaveManegment, moduleKey: 'leaveManagement' },
        { path: '/Admin/UserAuthentication/All', label: 'User Authentication', icon: UserAuth },
      ],
    },
    {
      title: 'TALENT',
      items: [
        { path: '/Admin/RecruitmentPages/Jobposting', label: 'Recruitment', icon: Recruitment, moduleKey: 'recruitment' },
        { path: '/Admin/PerformancePages/Overview', label: 'Performance', icon: Performance, moduleKey: 'performanceManagement' },
        { path: '/Admin/TrainingPages/OverviewTraining', label: 'Training', icon: Training, moduleKey: 'trainingDevelopment' },
      ],
    },
    {
      title: 'OPERATION',
      items: [
        { path: '/Admin/Announcement', label: 'Announcement', icon: Announcement },
        { path: '/Admin/SettingPages/General', label: 'Settings', icon: Settings },
      ],
    },
  ];

  const isActive = (item) =>
    readPath === item.path.replace('/', '') ||
    (item.path === '/Admin/Employees' &&
      ['Admin/EmployeeRegistration/AddNewemployee', 'Admin/EmployeeRegistration/AddNewemployeesecond', 'Admin/EmployeeRegistration/Compensation', 'Admin/EmployeeRegistration/System', 'Admin/EmployeeView'].includes(readPath)) ||
    (item.path === '/Admin/PerformancePages/Overview' &&
      ['Admin/PerformancePages/Goals', 'Admin/PerformancePages/FeedBack', 'Admin/PerformancePages/Reviews'].includes(readPath)) ||
    (item.path === '/Admin/UserAuthentication/All' &&
      ['Admin/UserAuthentication/Authorized'].includes(readPath)) ||
    (item.path === '/Admin/Organization' &&
      ['Admin/OrganizationView'].includes(readPath)) ||
    (item.path === '/Admin/EmployeeEdit' &&
      ['Admin/EmployeeEdit/AddNewemployee', 'Admin/EmployeeEdit/AddNewemployeesecond', 'Admin/EmployeeEdit/Compensation', 'Admin/EmployeeEdit/System', 'Admin/EmployeeView'].includes(readPath)) ||
    (item.path === '/Admin/Department'  &&
      ['Admin/DepartmentView' , 'Admin/DepartmentView/SubDepartmentView'].includes(readPath)) ||
    (item.path === '/Admin/SettingPages/General' &&
      ['Admin/SettingPages/Core', 'Admin/SettingPages/Talent', 'Admin/SettingPages/System' ].includes(readPath)) || 
(item.path === '/Admin/Department' &&
  ['Admin/DepartmentView', 'Admin/DepartmentView/SubDepartmentView', 
   'Admin/AssignDepartment/Categorized', 'Admin/AssignDepartment/Uncategorized'].includes(readPath)) ||
    (item.path === '/Admin/RecruitmentPages/Jobposting' &&
      ['Admin/RecruitmentPages/Shortlist', 'Admin/RecruitmentPages/Candidates', 'Admin/RecruitmentPages/Interviews' ].includes(readPath))  


  return (
    <aside className="font-semibold customBorder scrollBar w-[20.5rem] h-screen flex flex-col gap-[4.25rem] relative pt-[3.5rem] overflow-y-auto">
      {/* Header */}
      <div className="flex items-center gap-[1.25rem] pl-[2.75rem]">
        <img className="w-[2.0625rem] h-[2.3125rem]" src="/image/logo.png" alt="Logo" />
        <div>
          <h1 className="text-[1.4rem] text-white font-semibold">HRMS Platforms</h1>
          <h4 className="text-limegray">Multi-Tenant HR System</h4>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-[4.0625rem] overflow-y-auto scrollBar">
        {menuSections.map((section) => {
          const hasVisibleItems = section.items.some(
            (item) => !item.moduleKey || modules?.[item.moduleKey] === true
          );
          if (!hasVisibleItems) return null;

          return (
            <section key={section.title} className="space-y-[1.5625rem] w-full pl-[2.75rem] relative">
              <h4 className={`${section.items.some(isActive) ? 'text-lemongreen' : 'text-limegray'} text-[0.9375rem]`}>
                {section.title}
              </h4>

              {section.items.map((item) => {
                const Icon = item.icon;
                const visible = !item.moduleKey || modules?.[item.moduleKey] === true;
                if (!visible) return null;

                return (
                  <div key={item.path} className="flex items-center">
                    <div className={`${isActive(item) ? 'flex' : 'hidden'} absolute left-0 navBarhover`} />
                    <div className="navLinkconfig">
                      <Icon readPath={readPath} />
                      <div>
                        <Link href={item.path}>
                          <h4 className={`${isActive(item) ? 'text-white' : 'text-limegray'}`}>{item.label}</h4>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </section>
          );
        })}
        <OrgSelectorPanel session={session} />

      </nav>
    </aside>
  );
};

export default MainBody;




// 'use client';
// import React from 'react'

// import Link from 'next/link';
// import DashboardIcon from '@/public/svg/DashboardSvg/Dashboard'
// import Organization from '@/public/svg/DashboardSvg/Organization'
// import Employee from '@/public/svg/DashboardSvg/Employee';
// import Attendance from '@/public/svg/DashboardSvg/Attendance';
// import LeaveManegment from '@/public/svg/DashboardSvg/LeaveManegment';
// import Recruitment from '@/public/svg/DashboardSvg/Recruitment';
// import Performance from '@/public/svg/DashboardSvg/Performance';
// import Training from '@/public/svg/DashboardSvg/Training';
// import Announcement from '@/public/svg/DashboardSvg/Announcement';
// import UserAuth from '@/public/svg/DashboardSvg/UserAuth';

// const MainBody = ({ readPath }) => {
//   return (

//     <>
//         <aside className='font-semibold  customBorder scrollBar w-[20.5rem]  h-screen flex flex-col gap-[4.25rem] relative  pt-[3.5rem] overflow-y-auto '>
//             <div className=' flex items-center gap-[1.25rem] pl-[2.75rem]'>
//                 <img className='w-[2.0625rem] h-[2.3125rem]' src="/image/logo.png" alt="" />
//                 <div >
//                     <h1 className='text-[1.4rem] text-white font-semibold'>HRMS Platforms</h1>
//                     <h4 className='text-limegray'>Multi-Tenant HR System </h4>
//                 </div>
//             </div>
            
//             <nav className='flex flex-col gap-[4.0625rem] overflow-y-auto scrollBar '>
//                 {/* Core */}
//                 <section className='space-y-[1.5625rem] w-full  pl-[2.75rem] relative'> 
//                     <div>
//                         <h4 className={`${['Admin/Dashboard' , 'Admin/Organization' , 'Admin/Employees', 'Admin/Attendance' , 'Admin/LeaveManagment' ,"Admin/EmployeeRegistration/AddNewemployee" ,'Admin/EmployeeRegistration/AddNewemployeesecond',"Admin/EmployeeRegistration/Compensation","Admin/EmployeeRegistration/System"].includes(readPath) ? 'text-lemongreen' : 'text-limegray'} text-[0.9375rem]`}>CORE</h4>
//                     </div>
//                     <div className='flex items-center' >
//                         <div className={`${readPath === 'Admin/Dashboard' ? 'flex' : 'hidden'} absolute  left-0   navBarhover `}></div>
//                         <div className='navLinkconfig'>
//                             <DashboardIcon readPath={readPath}/>
//                             <div>
//                                 <Link href="/Admin/Dashboard"><h4 className={`${readPath === 'Admin/Dashboard' ? 'text-white' : 'text-limegray'} ` }>Dashboard</h4></Link>
//                             </div>
//                         </div>
//                     </div>
//                      {/* Organization */}
//                      <div className='flex items-center' >
//                         <div className={`${readPath === 'Admin/Organization' ? 'flex' : 'hidden'} absolute  left-0   navBarhover `}></div>
//                         <div className='navLinkconfig'>
//                             <Organization readPath={readPath}/>
//                             <div>
//                                 <Link href="/Admin/Organization"><h4 className={`${readPath === 'Admin/Organization' ? 'text-white' : 'text-limegray'} ` }>Organization</h4></Link>
//                             </div>
//                         </div>
//                     </div>
//                     {/* Employee */}
//                    <div className='flex items-center' >
//                         <div className={`${readPath === 'Admin/Employees' || readPath === 'Admin/EmployeeRegistration/AddNewemployee' || readPath === 'Admin/EmployeeRegistration/AddNewemployeesecond' || readPath === 'Admin/EmployeeRegistration/Compensation' || readPath === 'Admin/EmployeeRegistration/System' ? 'flex' : 'hidden'} absolute  left-0   navBarhover `}></div>
//                         <div className='navLinkconfig'>
//                             <Employee readPath={readPath}/>
//                             <div>
//                                 <Link href="/Admin/Employees"><h4 className={`${readPath === 'Admin/Employees' || readPath === 'Admin/EmployeeRegistration/AddNewemployee' || readPath === 'Admin/EmployeeRegistration/AddNewemployeesecond' || readPath === 'Admin/EmployeeRegistration/Compensation' || readPath === 'Admin/EmployeeRegistration/System' ? 'text-white' : 'text-limegray'} ` }>Employees</h4></Link>
//                             </div>
//                         </div>
//                     </div>
//                     {/* User Authentication */}
//                    <div className='flex items-center' >
//                         <div className={`${readPath === 'Admin/UserAuthentication'  ? 'flex' : 'hidden'} absolute  left-0   navBarhover `}></div>
//                         <div className='navLinkconfig'>
//                             <UserAuth readPath={readPath}/>
//                             <div>
//                                 <Link href="/Admin/UserAuthentication/All"><h4 className={`${readPath === 'Admin/UserAuthentication'  ? 'text-white' : 'text-limegray'} ` }>User Authentication</h4></Link>
//                             </div>
//                         </div>
//                     </div>
//                     {/* Attendance */}
//                    <div className='flex items-center' >
//                         <div className={`${readPath === 'Admin/Attendance' ? 'flex' : 'hidden'} absolute  left-0   navBarhover `}></div>
//                         <div className='navLinkconfig'>
//                             <Attendance readPath={readPath}/>
//                             <div>
//                                 <Link href="/Admin/Attendance"><h4 className={`${readPath === 'Admin/Attendance' ? 'text-white' : 'text-limegray'} ` }>Attendance</h4></Link>
//                             </div>
//                         </div>
//                     </div>
//                     {/* Leave Management */}
//                    <div className='flex items-center' >
//                         <div className={`${readPath === 'Admin/LeaveManagment' ? 'flex' : 'hidden'} absolute  left-0   navBarhover `}></div>
//                         <div className='navLinkconfig'>
//                             <LeaveManegment readPath={readPath}/>
//                             <div>
//                                 <Link href="/Admin/LeaveManagment"><h4 className={`${readPath === 'Admin/LeaveManagment' ? 'text-white' : 'text-limegray'} ` }>Leave Managment</h4></Link>
//                             </div>
//                         </div>
//                     </div>
//                 </section>
//                 {/* Talent */}
//                 <section className='space-y-[1.5625rem] w-full  pl-[2.75rem] relative'> 
//                     <div>
//                         <h4 className= {`${['Admin/Recruitment', 'Admin/PerformancePages/Overview' , 'Training' , 'Admin/RecruitmentPages/Jobposting', 'Admin/RecruitmentPages/Candidates', 'Admin/RecruitmentPages/Interviews' , 'Admin/PerformancePages/Reviews' ,  "Admin/PerformancePages/Goals", "/RecruitmentPages/Shortlist" , "Admin/PerformancePages/FeedBack" ,"Admin/TrainingPages/Program", "Admin/TrainingPages/Enrolment", "Admin/TrainingPages/Feedback", 'Admin/TrainingPages/OverviewTraining'].includes(readPath) ? 'text-lemongreen' : 'text-limegray'} text-[0.9375rem]`}>TALENT</h4>
//                     </div>
//                     {/* Recruitment */}
//                    <div className='flex items-center' >
//                         <div className={`${readPath === "Admin/RecruitmentPages/Jobposting" || readPath === "Admin/RecruitmentPages/Candidates" || readPath === "Admin/RecruitmentPages/Interviews"  || readPath === "Admin/RecruitmentPages/Shortlist" ? 'flex' : 'hidden'} absolute  left-0   navBarhover `}></div>
//                         <div className='navLinkconfig'>
//                             <Recruitment readPath={readPath}/>
//                             <div>
//                                 <Link href="/Admin/RecruitmentPages/Jobposting"><h4 className={`${readPath === 'Admin/Recruitment' || readPath === "Admin/RecruitmentPages/Jobposting" || readPath === "Admin/RecruitmentPages/Candidates" || readPath === "Admin/RecruitmentPages/Interviews" ? 'text-white' : 'text-limegray'} ` }>Recruitment</h4></Link>
//                             </div>
//                         </div>
//                     </div>                    
//                     {/* Performance */}
//                    <div className='flex items-center' >
//                         <div className={`${readPath === 'Admin/PerformancePages/Overview' || readPath === "Admin/PerformancePages/Goals" || readPath === "Admin/PerformancePages/FeedBack" || readPath === "Admin/PerformancePages/Reviews"  ? 'flex' : 'hidden'} absolute  left-0   navBarhover `}></div>
//                         <div className='navLinkconfig'>
//                             <Performance readPath={readPath}/>
//                             <div>
//                                 <Link href="/Admin/PerformancePages/Overview"><h4 className={`${readPath === 'Admin/PerformancePages/Overview' || readPath === "Admin/PerformancePages/Goals" || readPath === "Admin/PerformancePages/Reviews" || readPath === "Admin/PerformancePages/FeedBack" ? 'text-white' : 'text-limegray'} ` }>Performance</h4></Link>
//                             </div>
//                         </div>
//                     </div>    
//                     {/* Training */}
                    
//                    <div className='flex items-center' >
//                         <div className={`${readPath === 'Admin/Training' || readPath === 'Admin/TrainingPages/OverviewTraining'  || readPath === 'Admin/TrainingPages/Feedback' || readPath === 'Admin/TrainingPages/Enrolment' || readPath === 'Admin/TrainingPages/Program'? 'flex' : 'hidden'} absolute  left-0   navBarhover `}></div>
//                         <div className='navLinkconfig'>
//                             <Training readPath={readPath}/>
//                             <div>
//                                 <Link href="/Admin/TrainingPages/OverviewTraining"><h4 className={`${readPath === 'Training' || readPath === 'Admin/TrainingPages/OverviewTraining'  || readPath === 'Admin/TrainingPages/Feedback' || readPath === 'Admin/TrainingPages/Enrolment' || readPath === 'Admin/TrainingPages/Program'? 'text-white' : 'text-limegray'} ` }>Training</h4></Link>
//                             </div>
//                         </div>
//                     </div> 
//                 </section>


//                 {/* OPERATION */}
//                 <section className='space-y-[1.5625rem] w-full  pl-[2.75rem] relative'> 

//                     <div>
//                         <h4 className= {`${['assets', 'Admin/Announcement'].includes(readPath) ? 'text-lemongreen' : 'text-limegray'} text-[0.9375rem]`}>OPERATION</h4>
//                     </div>

//                     {/* Assets                    
//                     <div className='flex items-center   '>
//                         <div  className={`${readPath === 'assets' ? 'flex' : 'hidden'} absolute  left-0  navBarhover `}></div>
//                         <div className='navLinkconfig'>
//                             <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg" stroke={readPath === 'assets' ? 'white' : '#5D6150'} stroke-width="1.5">
// <path d="M13.6305 2.95922L15.3805 3.87758C17.2632 4.86558 18.2045 5.35958 18.7273 6.24727C19.25 7.13497 19.25 8.23959 19.25 10.4488V10.5512C19.25 12.7604 19.25 13.8651 18.7273 14.7528C18.2045 15.6405 17.2632 16.1344 15.3805 17.1224L13.6305 18.0408C12.0943 18.8469 11.3263 19.25 10.5 19.25C9.67374 19.25 8.90566 18.8469 7.3695 18.0408L5.6195 17.1224C3.7368 16.1344 2.79544 15.6405 2.27272 14.7528C1.75 13.8651 1.75 12.7604 1.75 10.5512V10.4488C1.75 8.23959 1.75 7.13497 2.27272 6.24727C2.79544 5.35958 3.7368 4.86558 5.6195 3.87758L7.3695 2.95922C8.90566 2.15308 9.67374 1.75 10.5 1.75C11.3263 1.75 12.0943 2.15308 13.6305 2.95922Z"  stroke-linecap="round"/>
// <path d="M18.375 6.5625L14.875 8.3125M14.875 8.3125C14.875 8.3125 14.6084 8.44582 14.4375 8.53125C12.8998 9.30011 10.5 10.5 10.5 10.5M14.875 8.3125V11.375M14.875 8.3125L6.5625 3.9375M10.5 10.5L2.625 6.5625M10.5 10.5V18.8125"  stroke-linecap="round"/>
//                             </svg>

//                             <div>
//                                 <NavLink to='/assets'><h4 className={`${readPath === 'assets' ? 'text-white' : 'text-limegray'}`}>Assets</h4></NavLink>
//                             </div>
//                         </div>
//                     </div> */}
//                     {/* Announcement */}
//                     <div className='flex items-center' >
//                         <div className={`${readPath === 'Admin/Announcement' ? 'flex' : 'hidden'} absolute  left-0   navBarhover `}></div>
//                         <div className='navLinkconfig'>
//                             <Announcement readPath={readPath}/>
//                             <div>
//                                 <Link href="/Admin/Announcement"><h4 className={`${readPath === 'Admin/Announcement' ? 'text-white' : 'text-limegray'} ` }>Announcement</h4></Link>
//                             </div>
//                         </div>
//                     </div> 
//                 </section>
//             </nav>
//         </aside>
        

//     </>
//   )
// }

// export default MainBody