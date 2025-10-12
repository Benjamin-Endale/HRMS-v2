'use client'
import React from 'react'
import Link from 'next/link';
import DashboardIcon from '@/public/svg/DashboardSvg/Dashboard'
import Organization from '@/public/svg/DashboardSvg/Organization';
import OrganizationSetting from '@/public/svg/DashboardSvg/OrganizationSetting'
import SuperAdmin from '@/public/svg/DashboardSvg/SuperAdmin'
import Performance from '@/public/svg/DashboardSvg/Performance';


const SuperAdminBody = ({readPath}) => {
  return (
    <aside className='border customBorder scrollBar  w-[20.5rem]  h-screen flex flex-col gap-[4.25rem] relative  pt-[3.5rem] overflow-y-auto font-semibold'>
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
                    <h4 className={`${['SuperAdmin/AllOrganization', 'SuperAdmin/CreateOrganization' ,'SuperAdmin/OrganizationSettings'].includes(readPath) ? 'text-lemongreen' : 'text-limegray'} text-[0.9375rem]`}>ORGANIZATIONS</h4>
                </div>
                <div className='flex items-center' >
                    <div className={`${readPath === 'SuperAdmin/AllOrganization' ? 'flex' : 'hidden'} absolute  left-0   navBarhover `}></div>
                    <div className='navLinkconfig'>
                        <DashboardIcon readPath={readPath}/>
                        <div>
                            <Link href='/SuperAdmin/AllOrganization'><h4 className={`${readPath === 'SuperAdmin/AllOrganization' ? 'text-white' : 'text-limegray'} ` }>All Tenant</h4></Link>
                        </div>
                    </div>
                </div>
                {/* Create Organization */}
                <div className='flex items-center' >
                    <div className={`${readPath === 'SuperAdmin/CreateOrganization/CreateTenant' || readPath === "SuperAdmin/CreateOrganization/RegisterAdmin" || readPath === "SuperAdmin/CreateOrganization/UserAccess" || readPath === "SuperAdmin/CreateOrganization/Compensation" ? 'flex' : 'hidden'} absolute  left-0   navBarhover `}></div>
                    <div className='navLinkconfig'>
                        <Organization readPath={readPath}/>
                        <div>
                            <Link href='/SuperAdmin/CreateOrganization/CreateTenant'><h4 className={`${readPath === 'SuperAdmin/CreateOrganization/CreateTenant' || readPath === "SuperAdmin/CreateOrganization/RegisterAdmin" || readPath === "SuperAdmin/CreateOrganization/UserAccess" || readPath === "SuperAdmin/CreateOrganization/Compensation"  ? 'text-white' : 'text-limegray'} ` }>Create Tenant </h4></Link>
                        </div>
                    </div>
                </div>
                {/* Organization Settings */}
                <div className='flex items-center   '>
                    <div  className={`${readPath === 'SuperAdmin/OrganizationSettings'  ? 'flex' : 'hidden'} absolute  left-0  navBarhover `}></div>
                    <div className='navLinkconfig'> 
                        <OrganizationSetting readPath={readPath} />
                        <div>
                            <Link href='/SuperAdmin/OrganizationSettings'><h4 className={`${readPath === 'SuperAdmin/OrganizationSettings'  ? 'text-white' : 'text-limegray'}`}>Tenant Settings</h4></Link>
                        </div>
                    </div>
                </div>
            </section>
            {/* USER MANAGMENT */}
            <section className='space-y-[1.5625rem] w-full  pl-[2.75rem] relative'>
                <div>
                    <h4 className= {`${['SuperAdmin/SuperAdmin'].includes(readPath) ? 'text-lemongreen' : 'text-limegray'} text-[0.9375rem]`}>USER MANEGMENT</h4>
                </div>
                <div className='flex items-center'>
                    <div  className={`${readPath === 'SuperAdmin/SuperAdmin' ? 'flex' : 'hidden'} absolute  left-0  navBarhover `}></div>
                    <div className='navLinkconfig'>
                        <SuperAdmin readPath ={readPath}/>
                        <div>
                            <Link href='/SuperAdmin/SuperAdmin'><h4 className={`${readPath === 'SuperAdmin/SuperAdmin' ? 'text-white' : 'text-limegray'}`}>Super Admin</h4></Link>
                        </div>
                    </div>
                </div>
            </section>
            {/* REPORT */}
            <section className='space-y-[1.5625rem] w-full  pl-[2.75rem] relative'>
                <div>
                    <h4 className= {`${['SuperAdmin/UserStatics'].includes(readPath) ? 'text-lemongreen' : 'text-limegray'} text-[0.9375rem]`}>REPORT</h4>
                </div>
                <div className='flex items-center'>
                    <div  className={`${readPath === 'SuperAdmin/UserStatics' ? 'flex' : 'hidden'} absolute  left-0  navBarhover `}></div>
                    <div className='navLinkconfig'>
                        <Performance readPath={readPath}/>
                        <div>
                            <Link href='/SuperAdmin/UserStatics'><h4 className={`${readPath === 'SuperAdmin/UserStatics' ? 'text-white' : 'text-limegray'}`}>User Statics</h4></Link>
                        </div>
                    </div>
                </div>
            </section>
        </nav>
    </aside>
    )
}

export default SuperAdminBody