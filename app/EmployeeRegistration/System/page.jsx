'use client';
import React , {useState} from 'react'
import { useRouter } from 'next/navigation';
import { Dropdown } from '@/app/Components/DropDown';

const page = () => {
    const router = useRouter()
    const [selectedRole, setSelectedRole] = useState()
    const [selectedShift, setSelectedShift] = useState()
    const [selectedWork, setSelectedWork] = useState()
  return (
    <div className='font-semibold flex flex-col gap-[4rem]'>
        <div className='flex flex-col gap-[2.5rem]'>
            {/* Header */}
            <div className='flex items-center gap-[0.9375rem]'>
                <img onClick={()=>router.push('/EmployeeRegistration/Compensation')} src="/image/Icon/ArrowLeft.png" alt="" />
                <li className='textWhite list-none'>4. System Access & Work Details</li>
            </div>

            {/* ProgressBar */}
            <div>
                <div className='grid grid-cols-4'>
                    <div className='rounded-[0.53125rem] bg-lemongreen w-[22.625rem] h-[5px] '></div>
                    <div className='rounded-[0.53125rem] bg-lemongreen w-[22.625rem] h-[5px] '></div>
                    <div className='rounded-[0.53125rem] bg-lemongreen w-[22.625rem] h-[5px] '></div>
                    <div className='rounded-[0.53125rem] bg-lemongreen w-[22.625rem] h-[5px] '></div>
                </div>
            </div>
        </div>
        <div className='between gap-[12.25rem]'> 
            <div className='w-[49.5625rem] h-[36.3125rem] overflow-y-auto scrollBarDash'>
                <form action="" className='flex gap-[2.5625rem] px-[10px]'>
                    <div className='flex flex-col w-[23.1875rem] gap-[35px]'>
                        {/* username */}
                        <div className='flex flex-col gap-[1rem]'>
                            <label htmlFor="username" className='text-formColor'>Username</label>
                            <input type="text" id='username' placeholder='e.x bereketdan' className='inputMod'/>
                        </div>
                        {/* Role */}
                        <div>
                            <Dropdown
                                label="Role"
                                options={['Employee','Admin','HR','CTO']}
                                selected={selectedRole}
                                onSelect={setSelectedRole}
                                placeholder='Employee'
                                className=''
                            />
                        </div>
                        {/* Shift */}
                        <div>
                            <Dropdown
                                label="Shift Details"
                                options={['Morning Shift','Night Shift']}
                                selected={selectedShift}
                                onSelect={setSelectedShift}
                                placeholder='Morning Shift'
                                className=''
                            />
                        </div>
                    </div>
                    <div className='w-[23.1875rem] flex flex-col gap-[35px]'>
                        {/* password */}
                        <div className='flex flex-col gap-[1rem]'>
                            <label htmlFor="password" className='text-formColor'>Password</label>
                            <input id='password' type="password" placeholder='*************' className='inputMod'/>
                        </div>
                        {/* Work Location */}
                        <div>
                            <Dropdown
                                label="Work Location"
                                options={['Office','Home']}
                                selected={selectedWork}
                                onSelect={setSelectedWork}
                                placeholder='Office'
                                className=''
                            />
                        </div>
                        {/* Certefication */}
                        <div className='flex flex-col gap-[1rem]'>
                            <label htmlFor="Certefication" className='text-formColor'>Certefication</label>
                            <label htmlFor="Certefication" className='inputModfile cursor-pointer' >
                                <img src="image/Icon/File.png" alt="" />
                                <span className='text-limeLight'>Upload Certefication</span>
                            </label>
                            <input type="file" id='Certefication' className='hidden'/>
                        </div>
                    </div>
                </form>
                <div className='w-full h-[3.4375rem] my-[4rem] px-[10px]  flex gap-[2.5625rem]'>
                    <button type="button" onClick={()=>router.push('/EmployeeRegistration/Compensation')} className='w-[23.1875rem] border border-formColor text-formColor rounded-[10px] cursor-pointer'>Back</button>
                    <button type="submit" onClick={()=>router.push('/')} className='w-[23.1875rem] bg-lemongreen rounded-[10px] cursor-pointer'>Complete</button>
                </div>
            </div>
            <div className='flex-1'>
                <div className='border border-limegray w-[31rem]  rounded-[1.1875rem] px-[2.25rem] pt-[1.5625rem] pb-[1.9375rem]'>
                    <div className='flex items-center gap-[10px] pb-[0.8125rem]'>
                         <img src="/image/Icon/Alert.png" alt="" />
                        <span className='textFormColor'><strong>Important:</strong></span>
                    </div>
                    <div className='space-y-[2.25rem]'>
                        <p className='textLimegray'>Provide accurate information about your current employment status, including your job title, employer's name, and contact information. This helps establish your professional background and may be necessary for verification or eligibility purposes.</p>
                        <p className='textLimegray'><strong className='text-formColor'>Tip:</strong> Make sure to list your employer's official name and provide a valid work email or phone number if requested.</p>
                    </div>
                </div>           
            </div>
        </div>
    </div>
  )
}

export default page