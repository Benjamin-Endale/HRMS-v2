import React , {useState} from 'react'
import { Dropdown } from '@/app/Components/DropDown';

export default function AddEnrol({ onClose }) {
    const [selectedEmployee , setSelectedEmployee ] = useState(''); 
    const [selectedTraining, setSelectedTraining] = useState('');






  return ( 
    <div className='px-[3rem] py-[2.875rem]  space-y-[3.125rem] font-semibold w-full  ' >
        <div className='flex justify-between'>
            <div>
                <h1 className='textFormColor'>Create Training Program</h1>
                <h4 className='text-limegray'>Set up a new training program or course</h4>
            </div>
            <button onClick={onClose} className='rounded-full center-center cursor-pointer'>
                <img src="/image/Icon/Action/CloseCircle.png" alt="" />
            </button>
        </div>
        <form action="" className='flex flex-col gap-[2.4375rem]'>
            <div className='space-y-[2.0625rem]'>
                <div className='flex  gap-[1.125rem]'>
                    {/* Employee   */}
                    <div className='flex-1'>
                        <Dropdown
                        label="Employee"
                        options={['Engineering', 'Marketing', 'Finance']}
                        selected={selectedEmployee}
                        onSelect={setSelectedEmployee}
                        placeholder="Select employee"
                        />
                    </div>
                    {/* Training Program */}
                    <div className='flex-1'>
                        <Dropdown
                        label="Training Program"
                        options={['Engineering', 'Marketing', 'Finance']}
                        selected={selectedTraining}
                        onSelect={setSelectedTraining}
                        placeholder="Select training program "
                        />
                    </div>
                </div>
                <div className='flex flex-col gap-[1rem]'>
                    <label htmlFor="" className='text-formColor'>Enrolment Note </label>
                    <textarea name="" id=""  placeholder='Provide specific insturaction or focus area for the feedback '  className='text-formColor bg-inputBack rounded-[10px] placeholder-input pt-[0.59375rem] pl-[1.1875rem] resize-none  h-[5.5rem]'></textarea>
                </div>
                <div className="flex gap-[12.625rem]">
                        <label className="inline-flex items-center cursor-pointer">
                            <input className="peer hidden after" type="checkbox"/>
                            <span className="w-[1.3125rem] h-[1.3125rem] inline-block border rounded-[5px] border-[#1D2015] bg-[#1D2015] peer-checked:bg-[#BEE532] peer-checked:border-[#BEE532]"></span>
                            <span className="textLimeGray1 ml-[0.75rem]">Send notification to employee</span> 
                        </label>
                    </div>
                <div className="flex gap-[12.625rem]">
                        <label className="inline-flex items-center cursor-pointer">
                            <input className="peer hidden after" type="checkbox"/>
                            <span className="w-[1.3125rem] h-[1.3125rem] inline-block border rounded-[5px] border-[#1D2015] bg-[#1D2015] peer-checked:bg-[#BEE532] peer-checked:border-[#BEE532]"></span>
                            <span className="textLimeGray1 ml-[0.75rem]">Notify employee’s manager </span> 
                        </label>
                    </div>
            </div>
          <div className='w-full h-[3.4375rem] mt-[0.5rem]'>
              <button type="submit" onClick={()=>navigate('/')} className='w-full h-full bg-lemongreen rounded-[10px] cursor-pointer'>Enroll Employee</button>
          </div>
        </form>
    </div>
  )
}
