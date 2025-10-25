'use client'

import React,{useState} from 'react'
import SubNavigation from '@/app/SubNavigation'
import { Dropdown } from '@/app//Components/DropDown';


const page = () => {
    const [isIp , setIsIp] = useState('')
    const formatTime = (timeStr) => {
    const [hours, minutes] = timeStr.split(':');
    const h = parseInt(hours, 10);
    const suffix = h >= 12 ? 'PM' : 'AM';
    const formatted = `${((h + 11) % 12 + 1)}:${minutes} ${suffix}`;
    return formatted;
    };
const [time, setTime] = useState('09:00');
const [time2,setTime2]  = useState('09:00');
const [toggle1,setIsToggle1]  = useState(false);

const [toggle2,setIsToggle2]  = useState(false)


  return (
    <>
    <SubNavigation readPath= '/Admin/SettingPages/Core'/>
    <div className='mt-[2.625rem] font-semibold flex gap-[5.1875rem]'>
        <div className='w-[23.5rem] space-y-[2.1875rem]'>
            <div className='space-y-[2.625rem]'>
                <div>
                    <h1 className='textFormColor'>Attendance</h1>
                    <h4 className='textLimegray'>Shifts, geofence, overtime</h4>
                </div>
                <div className='space-y-[1.1875rem]'>
                    <Dropdown
                    label="IP Restrictions (CIDR)"
                    options={["GMT", "AMT", "EST"]}
                    selected= {isIp}
                    onSelect={setIsIp}
                    placeholder="e.g., 192.168.1.0/24, 10.0.0.0/8"
                    />
                    <span className='textLimegray'>List allowed IP addresses </span>
                </div>
            </div>
            {/* Grace Minutes */}
            <div className='flex flex-col gap-[1rem] relative'>
                <label className='text-formColor'>Grace Minutes</label>
                <input type="number" placeholder='10' className='inputMod' />
            </div>

            {/* End of Date */}
            <div className='flex flex-col gap-[1rem] relative'>
                <label className='text-formColor'>End Shift Start</label>
                <input
                type="time"
                className="inputMod pr-[1.1875rem]"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                />
            </div>

            {/* End of Date */}
            <div className='flex flex-col gap-[1rem] relative'>
                <label className='text-formColor'>Default Shift Start</label>
                <input
                type="time"
                className="inputMod pr-[1.1875rem]"
                value={time2}
                onChange={(e) => setTime2(e.target.value)}
                />
            </div>

        </div>
        <div className='w-[23.5rem]'>
            <div className='space-y-[2.625rem]'>
                <div>
                    <h1 className='textFormColor'>Employees</h1>
                    <h4 className='textLimegray'>ID pattern</h4>
                </div>
                    <div className='flex flex-col gap-[1rem] relative'>
                        <label className='text-formColor'>Employee ID Pattern</label>
                        <input type="text" placeholder='EMP-(0000)' className='inputMod' />
                    </div>
            </div>
        </div>
        <div className='w-[35.4375rem] border border-Error'>
            <div className='space-y-[2.625rem]'>
                <div>
                    <h1 className='textFormColor'>Leave Management</h1>
                    <h4 className='textLimegray'>Add Leave Types</h4>
                </div>
                <div className='space-y-[2.125rem]'>
                    <div className='space-y-[2.5625rem]'>
                        <div className="flex justify-between items-center">
                            <div className='space-y-[0.5rem]'>
                                <h1 className="text-formColor">Paid Leave</h1>
                                <h4 className="text-limegray">If there is a paid please turn on</h4>
                            </div>
                            <div
                                onClick={() => setIsToggle1((prev) => !prev)}
                                className={`w-[4.0625rem] h-[2.1875rem] rounded-full border flex items-center px-[4px] cursor-pointer transition-all duration-300 ${toggle1 ? 'bg-lemongreen justify-end' : 'bg-limegray justify-start'}`}
                                >
                                <div className="w-[1.8125rem] h-[1.8125rem] bg-white rounded-full transition-all duration-300 shadow-md"></div>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className='space-y-[0.5rem]'>
                                <h1 className="text-formColor">Carry Forward</h1>
                                <h4 className="text-limegray">Unused days roll over to next year</h4>
                            </div>
                            <div
                                onClick={() => setIsToggle2((prev) => !prev)}
                                className={`w-[4.0625rem] h-[2.1875rem] rounded-full border flex items-center px-[4px] cursor-pointer transition-all duration-300 ${toggle2 ? 'bg-lemongreen justify-end' : 'bg-limegray justify-start'}`}
                            >
                            <div className="w-[1.8125rem] h-[1.8125rem] bg-white rounded-full transition-all duration-300 shadow-md"></div>
                            </div>
                        </div>
                    </div>
                    <div className='space-y-[2.5625rem]'>
                        <div className='flex gap-[2.0625rem]'>
                            <div className='flex flex-col gap-[1rem] relative w-[16.8125rem]'>
                                <label className='text-formColor'>Name</label>
                                <input type="text" placeholder='Enter Name' className='inputMod' />
                            </div>
                            <div className='flex flex-col gap-[1rem] relative  w-[16.8125rem]'>
                                <label className='text-formColor'>Day</label>
                                <input type="number" placeholder='30' className='inputMod' />
                            </div>
                        </div>
                        <div className="flex flex-col gap-[1rem] relative">
                            <label className="text-formColor">Description</label>
                            <textarea
                                placeholder="Brief description of the organization"
                                className="text-formColor bg-inputBack rounded-[10px] placeholder-input pt-[1.75rem] pl-[1.1875rem] resize-none h-[8.4375rem]"
                            ></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default page