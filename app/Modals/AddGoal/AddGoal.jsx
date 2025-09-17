import React , {useState} from 'react'
import { Dropdown } from '@/app/Components/DropDown';

export default function AddGoal({ onClose }) {
    const [selectedDept, setSelectedDept] = useState('')
    const [selectedJob, setSelectedJob] = useState('')






  return ( 
    <div className='px-[3rem] py-[2.875rem]  space-y-[3.125rem] font-semibold w-full  ' >
        <div className='flex justify-between'>
            <div className=''>
                <h1 className='textFormColor'>Create New Goal</h1>
                <h4 className='text-limegray'>Set up a new performance goal for an employee</h4>
            </div>
            <button onClick={onClose} className='rounded-full center-center cursor-pointer'>
                <img src="/image/Icon/Action/CloseCircle.png" alt="" />
            </button>
        </div>
        <form action="" className='flex flex-col gap-[2.375rem] '>
          <div className=' w-full flex gap-[1.125rem]'>
            <div className='flex flex-col gap-[2.375rem] w-[15.5625rem] '>

              {/* Employee */}
              <div>
                  <Dropdown
                      label="Employee"
                      options={['Engineering', 'Marketing' , 'Finance']}
                      selected={selectedDept}
                      onSelect={setSelectedDept}
                      placeholder="Select employee"
                      className=''
                  />
              </div>
                {/* Priority */}
              <div>
                  <Dropdown
                      label="Priority"
                      options={['Engineering', 'Marketing' , 'Finance']}
                      selected={selectedDept}
                      onSelect={setSelectedDept}
                      placeholder="Select category"
                      className=''
                  />
              </div>
            </div>

            <div className='w-[15.5625rem] flex flex-col gap-[2.375rem] '>
              {/* Category  */} 
              <div>
                  <Dropdown
                      label="Category"
                      options={['Engineering', 'Marketing' , 'Finance']}
                      selected={selectedDept}
                      onSelect={setSelectedDept}
                      placeholder="Select Department"
                      className=''
                  />
              </div>
              {/* Due Date */}
                <div className='flex flex-col w-full gap-[1rem]'>
                    <label htmlFor="" className='textFormColor1'>Due Date</label>
                    <input type="date"  className='inputMod pr-[1.5625rem] ' />
                </div>
            </div>
          </div>

          <div>
            <div className='flex flex-col gap-[2.375rem]'>
              <div className='flex flex-col gap-[1rem]'>
                <label htmlFor="" className='text-formColor'>Goal Title</label>
                <input type="text" placeholder='e.g Improve Code Review Process'  className='inputMod pr-[1.5625rem] placeholder-input' />
            </div>
              <div className='flex flex-col gap-[1rem]'>
                <label htmlFor="" className='text-formColor'>Description </label>
                <textarea name="" id=""  placeholder='Detailed description of the goal and  expected  outcomes..'  className='text-formColor bg-inputBack rounded-[10px] placeholder-input pt-[0.59375rem] pl-[1.1875rem] resize-none  h-[5.5rem]'></textarea>
              </div>
            </div>
          </div>
          <div className='w-full h-[3.4375rem] mt-[0.5rem]'>
              <button type="submit" onClick={()=>navigate('/')} className='w-full h-full bg-lemongreen rounded-[10px] cursor-pointer'>Create Goal</button>
          </div>
        </form>
    </div>
  )
}
