import React from 'react'
import { Link, NavLink } from 'react-router-dom'


const SuperAdminBody = ({readPath}) => {
  return (
    <aside className='border customBorder scrollBar w-[20.5rem]  h-screen flex flex-col gap-[4.25rem] relative  pt-[3.5rem] overflow-y-auto font-semibold'>
        <div className=' flex items-center gap-[1.25rem] pl-[2.75rem]'>
            <img className='w-[2.0625rem] h-[2.3125rem]' src="/image/logo.png" alt="" />
            <div >
                <h1 className='text-[1.4rem] text-white'>HRMS Platforms</h1>
                <h4 className='text-limegray font-medium'>Multi-Tenant HR System </h4>
            </div>
        </div>
        <nav className='flex flex-col gap-[4.0625rem] overflow-y-auto scrollBar'>
            <section className='space-y-[1.5625rem] w-full  pl-[2.75rem] relative'>
                {/* All Organization */}
                <div>
                    <h4 className={`${['allorganization', 'createorganization' ,'organizationsetting'].includes(readPath) ? 'text-lemongreen' : 'text-limegray'} text-[0.9375rem]`}>ORGANIZATIONS</h4>
                </div>
                <div className='flex items-center' >
                    <div className={`${readPath === 'allorganization' ? 'flex' : 'hidden'} absolute  left-0   navBarhover `}></div>
                    <div className='navLinkconfig'>
                        <svg  width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg" stroke= {readPath === 'allorganization' ? 'white' : '#5D6150'} stroke-width="1.3125">
        <path d="M2.1875 5.6875C2.1875 4.03758 2.1875 3.21262 2.70007 2.70007C3.21262 2.1875 4.03758 2.1875 5.6875 2.1875C7.33742 2.1875 8.16238 2.1875 8.67493 2.70007C9.1875 3.21262 9.1875 4.03758 9.1875 5.6875V15.3125C9.1875 16.9624 9.1875 17.7873 8.67493 18.2999C8.16238 18.8125 7.33742 18.8125 5.6875 18.8125C4.03758 18.8125 3.21262 18.8125 2.70007 18.2999C2.1875 17.7873 2.1875 16.9624 2.1875 15.3125V5.6875Z" />
        <path d="M11.8125 13.5625C11.8125 11.9126 11.8125 11.0877 12.3251 10.5751C12.8377 10.0625 13.6626 10.0625 15.3125 10.0625C16.9624 10.0625 17.7873 10.0625 18.2999 10.5751C18.8125 11.0877 18.8125 11.9126 18.8125 13.5625V15.3125C18.8125 16.9624 18.8125 17.7873 18.2999 18.2999C17.7873 18.8125 16.9624 18.8125 15.3125 18.8125C13.6626 18.8125 12.8377 18.8125 12.3251 18.2999C11.8125 17.7873 11.8125 16.9624 11.8125 15.3125V13.5625Z"/>
        <path d="M11.8125 4.8125C11.8125 3.99711 11.8125 3.58941 11.9457 3.2678C12.1233 2.83901 12.464 2.49833 12.8928 2.32071C13.2144 2.1875 13.6221 2.1875 14.4375 2.1875H16.1875C17.0029 2.1875 17.4106 2.1875 17.7322 2.32071C18.161 2.49833 18.5017 2.83901 18.6793 3.2678C18.8125 3.58941 18.8125 3.99711 18.8125 4.8125C18.8125 5.62789 18.8125 6.03559 18.6793 6.3572C18.5017 6.78599 18.161 7.12667 17.7322 7.30429C17.4106 7.4375 17.0029 7.4375 16.1875 7.4375H14.4375C13.6221 7.4375 13.2144 7.4375 12.8928 7.30429C12.464 7.12667 12.1233 6.78599 11.9457 6.3572C11.8125 6.03559 11.8125 5.62789 11.8125 4.8125Z"/>
                        </svg>
                        <div>
                            <NavLink to='/allorganization'><h4 className={`${readPath === 'allorganization' ? 'text-white' : 'text-limegray'} ` }>All Organizations</h4></NavLink>
                        </div>
                    </div>
                </div>
                {/* Create Organization */}
                <div className='flex items-center' >
                    <div className={`${readPath === 'createorganization' ? 'flex' : 'hidden'} absolute  left-0   navBarhover `}></div>
                    <div className='navLinkconfig'>
                        <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg" stroke={readPath === 'createorganization' ? 'white' : '#5D6150'} stroke-width="1.3125">
<path d="M19.25 19.25H1.75"  stroke-linecap="round"/>
<path d="M14.875 19.25V5.25C14.875 3.60008 14.875 2.77512 14.3624 2.26257C13.8498 1.75 13.0249 1.75 11.375 1.75H9.625C7.97508 1.75 7.15012 1.75 6.63757 2.26257C6.125 2.77512 6.125 3.60008 6.125 5.25V19.25" />
<path d="M18.375 19.25V10.0625C18.375 8.83356 18.375 8.21915 18.08 7.77775C17.9524 7.58667 17.7883 7.42261 17.5972 7.29493C17.1559 7 16.5414 7 15.3125 7" />
<path d="M2.625 19.25V10.0625C2.625 8.83356 2.625 8.21915 2.91993 7.77775C3.04761 7.58667 3.21167 7.42261 3.40275 7.29493C3.84415 7 4.4586 7 5.6875 7" />
<path d="M10.5 19.25V16.625"  stroke-linecap="round"/>
<path d="M8.75 4.375H12.25"  stroke-linecap="round"/>
<path d="M8.75 7H12.25"  stroke-linecap="round"/>
<path d="M8.75 9.625H12.25"  stroke-linecap="round"/>
<path d="M8.75 12.25H12.25"  stroke-linecap="round"/>
                        </svg>
                        <div>
                            <NavLink to='/createorganization'><h4 className={`${readPath === 'createorganization' ? 'text-white' : 'text-limegray'} ` }>Create Organization </h4></NavLink>
                        </div>
                    </div>
                </div>
                {/* Organization Settings */}
                <div className='flex items-center   '>
                    <div  className={`${readPath === 'organizationsetting'  ? 'flex' : 'hidden'} absolute  left-0  navBarhover `}></div>
                    <div className='navLinkconfig'> 
                        <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg" stroke={readPath === 'organizationsetting'  ? 'white' : '#5D6150'} stroke-width="1.5">
                        <path d="M7.875 8.75C9.808 8.75 11.375 7.183 11.375 5.25C11.375 3.317 9.808 1.75 7.875 1.75C5.942 1.75 4.375 3.317 4.375 5.25C4.375 7.183 5.942 8.75 7.875 8.75Z" />
                        <path d="M13.125 7.875C14.5748 7.875 15.75 6.69974 15.75 5.25C15.75 3.80026 14.5748 2.625 13.125 2.625"  stroke-linecap="round"/>
                        <path d="M7.875 18.375C11.2577 18.375 14 16.808 14 14.875C14 12.942 11.2577 11.375 7.875 11.375C4.49226 11.375 1.75 12.942 1.75 14.875C1.75 16.808 4.49226 18.375 7.875 18.375Z" />
                        <path d="M15.75 12.25C17.2849 12.5866 18.375 13.439 18.375 14.4375C18.375 15.3381 17.488 16.12 16.1875 16.5116"  stroke-linecap="round"/>
                        </svg>
                        <div>
                            <NavLink to='/organizationsetting'><h4 className={`${readPath === 'organizationsetting'  ? 'text-white' : 'text-limegray'}`}>Organization Settings</h4></NavLink>
                        </div>
                    </div>
                </div>
            </section>
            {/* USER MANAGMENT */}
            <section className='space-y-[1.5625rem] w-full  pl-[2.75rem] relative'>
                <div>
                    <h4 className= {`${['superadmin'].includes(readPath) ? 'text-lemongreen' : 'text-limegray'} text-[0.9375rem]`}>USER MANEGMENT</h4>
                </div>
                <div className='flex items-center'>
                    <div  className={`${readPath === 'superadmin' ? 'flex' : 'hidden'} absolute  left-0  navBarhover `}></div>
                    <div className='navLinkconfig'>
                        <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg" stroke={readPath === 'superadmin' ? 'white' : '#5D6150'} stroke-width="1.5">
                        <path d="M10.5 8.75C12.433 8.75 14 7.183 14 5.25C14 3.317 12.433 1.75 10.5 1.75C8.567 1.75 7 3.317 7 5.25C7 7.183 8.567 8.75 10.5 8.75Z" />
                        <path d="M14.875 19.25C16.808 19.25 18.375 17.683 18.375 15.75C18.375 13.817 16.808 12.25 14.875 12.25C12.942 12.25 11.375 13.817 11.375 15.75C11.375 17.683 12.942 19.25 14.875 19.25Z" />
                        <path d="M13.7082 15.75L14.4375 16.625L16.0416 14.9722"  stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M12.25 18.2301C11.6955 18.3243 11.1081 18.375 10.5 18.375C7.11726 18.375 4.375 16.808 4.375 14.875C4.375 12.942 7.11726 11.375 10.5 11.375C11.9993 11.375 13.3728 11.6828 14.4375 12.1939" />
                        </svg>
                        <div>
                            <NavLink to='/superadmin'><h4 className={`${readPath === 'superadmin' ? 'text-white' : 'text-limegray'}`}>Super Admin</h4></NavLink>
                        </div>
                    </div>
                </div>
            </section>
            {/* REPORT */}
            <section className='space-y-[1.5625rem] w-full  pl-[2.75rem] relative'>
                <div>
                    <h4 className= {`${['userstatics'].includes(readPath) ? 'text-lemongreen' : 'text-limegray'} text-[0.9375rem]`}>REPORT</h4>
                </div>
                <div className='flex items-center'>
                    <div  className={`${readPath === 'userstatics' ? 'flex' : 'hidden'} absolute  left-0  navBarhover `}></div>
                    <div className='navLinkconfig'>
                        <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg" stroke={readPath === 'userstatics' ? 'white' : '#5D6150'} stroke-width="1.5">
<path d="M10.5 1.75C15.3324 1.75 19.25 5.66751 19.25 10.5C19.25 15.3324 15.3324 19.25 10.5 19.25C5.66751 19.25 1.75 15.3324 1.75 10.5C1.75 8.05228 2.75506 5.8393 4.375 4.25125"  stroke-linecap="round"/>
<path d="M4.375 10.5C4.375 13.8827 7.11726 16.625 10.5 16.625C13.8827 16.625 16.625 13.8827 16.625 10.5C16.625 7.11726 13.8827 4.375 10.5 4.375"  stroke-linecap="round"/>
<path d="M10.5 14C12.433 14 14 12.433 14 10.5C14 8.567 12.433 7 10.5 7"  stroke-linecap="round"/>
                        </svg>
                        <div>
                            <NavLink to='/userstatics'><h4 className={`${readPath === 'userstatics' ? 'text-white' : 'text-limegray'}`}>User Statics</h4></NavLink>
                        </div>
                    </div>
                </div>
            </section>
        </nav>
    </aside>

    )
}

export default SuperAdminBody