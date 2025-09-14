'use client'

import React , {useState} from 'react'
import { Dropdown } from '@/app/Components/DropDown';

export default function AddSchedule({ onClose }) {
    const [selectedDuration, setSelectedDuration] = useState('')
    const [selectedInterviewer, setSelectedInterviewer] = useState('')
    const [selectedInterview, setSelectedInterview] = useState('')






  return ( 
    <div className='px-[3rem] py-[2.875rem]  space-y-[3.125rem] font-semibold w-full  ' >
        <div className='flex justify-between'>
            <div className=''>
                <h1 className='textFormColor'>Schedule New Interview</h1>
                <h4 className='text-limegray'>Set up an interview with a candidate</h4>
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
                      <label htmlFor="" className='textFormColor1'>Candidate</label>
                      <input type="text" placeholder='e.x Frontend developer' className='inputMod pr-[1.5625rem] ' />
                  </div>
                  {/* Interview Type */}
                  <div>
                      <Dropdown
                          label="Interview Type"
                          options={['Behavioral Interview', 'Behavioral Interview1' , 'Behavioral Interview2']}
                          selected={selectedInterview}
                          onSelect={setSelectedInterview}
                          placeholder="Select Interview Type"
                          className=''
                      />
                  </div>

                  {/* Date */}
                  <div className='flex flex-col w-full gap-[1rem]'>
                      <label htmlFor="" className='textFormColor1'>Date</label>
                      <input type="date" placeholder='e.g 10,000 - 15,000' className='inputMod pr-[1.5625rem] ' />
                  </div>
              </div>

              <div className='w-[15.5625rem] flex flex-col gap-[2.375rem] '>
                {/* Department  */} 
                {/*DropDown */}
                <div>
                    <Dropdown
                        label="Interviewer"
                        options={['Bereket Daniel', 'Benjamin Endale' , 'Kaleb seifu']}
                        selected={selectedInterviewer}
                        onSelect={setSelectedInterviewer}
                        placeholder="Select Interviewer"
                        className=''
                    />
                </div>
                <div  className="flex flex-col gap-[1rem] relative">
                  {/* Job Type  */}
                  <div>
                      <Dropdown
                          label="Job Type"
                          options={['4pm-6pm', '2pm-3pm' , '2pm-5pm']}
                          selected={selectedDuration}
                          onSelect={setSelectedDuration}
                          placeholder="Select Duration"
                          className=''
                      />
                  </div>
                </div>
                {/* Time */}
                  <div className='flex flex-col w-full gap-[1rem]'>
                      <label htmlFor="" className='textFormColor1'>Time</label>
                      <input type="text" placeholder='e.x Frontend developer' className='inputMod pr-[1.5625rem] ' />
                  </div>
              </div>
            </div>

            <div>
              {/* Location / Meeting Link */}
              <div className='flex flex-col gap-[2.375rem]'>
                <div className='flex flex-col gap-[1rem]'>
                  <label htmlFor="" className='text-formColor'>Location / Meeting Link</label>
                  <textarea name="" id=""  placeholder='Confrence Room or Zoom  link'  className='text-formColor bg-inputBack rounded-[10px] placeholder-input pt-[0.59375rem] pl-[1.1875rem] resize-none  h-[5.5rem]'></textarea>
                </div>
                {/* Interview Note */}
                <div className='flex flex-col gap-[1rem]'>
                  <label htmlFor="" className='text-formColor'>Interview Note </label>
                  <textarea name="" id=""  placeholder='Add any special instructions  or note for  the interview '  className='text-formColor bg-inputBack rounded-[10px] placeholder-input pt-[0.59375rem] pl-[1.1875rem] resize-none  h-[5.5rem]'></textarea>
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
