import React , {useState} from 'react'
import { Dropdown } from '@/app/Components/DropDown';

export default function AddJob({ onClose }) {
    const [selectedDept, setSelectedDept] = useState('')
    const [selectedJob, setSelectedJob] = useState('')






  return ( 
    <div className='px-[3rem] py-[2.875rem]  space-y-[3.125rem] font-semibold w-full  ' >
        <div className='flex justify-between'>
            <div className=''>
                <h1 className='textFormColor'>Create New Job Posting</h1>
                <h4 className='text-limegray'>Fill in the details to create a new job posting</h4>
            </div>
            <button onClick={onClose} className='rounded-full center-center cursor-pointer'>
                <img src="/image/Icon/Action/CloseCircle.png" alt="" />
            </button>
        </div>
        <form action="" className='flex flex-col gap-[2.375rem]'>
          <div className=' w-full flex gap-[1.125rem]'>
            <div className='flex flex-col gap-[2.375rem] w-[15.5625rem] '>

              {/* JobTitle */}
                <div className='flex flex-col w-full gap-[1rem]'>
                    <label htmlFor="" className='textFormColor1'>Job Title</label>
                    <input type="text" placeholder='e.x Frontend developer' className='inputMod pr-[1.5625rem] ' />
                </div>
                {/* Location */}
                <div className='flex flex-col w-full gap-[1rem]'>
                    <label htmlFor="" className='textFormColor1'>Addis Abeba</label>
                    <input type="text" placeholder='e.x Frontend developer' className='inputMod pr-[1.5625rem] ' />
                </div>
                {/* Salary Range */}
                <div className='flex flex-col w-full gap-[1rem]'>
                    <label htmlFor="" className='textFormColor1'>Salary Range</label>
                    <input type="text" placeholder='e.g 10,000 - 15,000' className='inputMod pr-[1.5625rem] ' />
                </div>
            </div>

            <div className='w-[15.5625rem] flex flex-col gap-[2.375rem] '>
              {/* Department  */} 
              {/*DropDown */}
              <div>
                  <Dropdown
                      label="Department"
                      options={['Engineering', 'Marketing' , 'Finance']}
                      selected={selectedDept}
                      onSelect={setSelectedDept}
                      placeholder="Select Department"
                      className=''
                  />
              </div>
              <div  className="flex flex-col gap-[1rem] relative">
                {/* Job Type  */}
                <div>
                    <Dropdown
                        label="Job Type"
                        options={['Full Time', 'Half Time' , 'Remote']}
                        selected={selectedJob}
                        onSelect={setSelectedJob}
                        placeholder="Select Job"
                        className=''
                    />
                </div>
              </div>
              {/* Application Deadline */}
                <div className='flex flex-col w-full gap-[1rem]'>
                    <label htmlFor="" className='textFormColor1'>Application Deadline</label>
                    <input type="date" placeholder='e.x Frontend developer' className='inputMod pr-[1.5625rem] ' />
                </div>
            </div>
          </div>

          <div>
            <div className='flex flex-col gap-[2.375rem]'>
              <div className='flex flex-col gap-[1rem]'>
                <label htmlFor="" className='text-formColor'>Job Description</label>
                <textarea name="" id=""  placeholder='Enter detailed job description.. '  className='text-formColor bg-inputBack rounded-[10px] placeholder-input pt-[0.59375rem] pl-[1.1875rem] resize-none  h-[5.5rem]'></textarea>
              </div>
              <div className='flex flex-col gap-[1rem]'>
                <label htmlFor="" className='text-formColor'>Requirement </label>
                <textarea name="" id=""  placeholder='List required skills, experience  and qualification'  className='text-formColor bg-inputBack rounded-[10px] placeholder-input pt-[0.59375rem] pl-[1.1875rem] resize-none  h-[5.5rem]'></textarea>
              </div>
            </div>
          </div>
          <div className='w-full h-[3.4375rem] mt-[0.5rem]'>
              <button type="submit" onClick={()=>navigate('/')} className='w-full h-full bg-lemongreen rounded-[10px] cursor-pointer'>Complete</button>
          </div>
        </form>
    </div>
  )
}
