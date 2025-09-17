import React , {useState} from 'react'
import { Dropdown } from '@/app/Components/DropDown';

export default function AddProgram({ onClose }) {
    const [selectedLevel, setSelectedLevel] = useState(''); 
    const [selectedProgram, setSelectedProgram] = useState('');
    const [selectedCategory,setSelectedCategory] = useState('');    






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
                <div className='flex gap-[1.125rem]'>
                    <div className=' w-[15.5625rem] flex flex-col gap-[1.75rem]'>
                        {/* Program Title   */}
                        <div>
                            <Dropdown
                            label="Program Title  "
                            options={['Engineering', 'Marketing', 'Finance']}
                            selected={selectedProgram}
                            onSelect={setSelectedProgram}
                            placeholder="Select employee"
                            />
                        </div>
                        {/* Level */}
                        <div>
                            <Dropdown
                            label="Level"
                            options={['Engineering', 'Marketing', 'Finance']}
                            selected={selectedLevel}
                            onSelect={setSelectedLevel}
                            placeholder="Select Level "
                            />
                        </div>

                        {/* Instructor  */}
                        <div className='flex flex-col w-full gap-[1rem]'>
                            <label htmlFor="" className='textFormColor1'>Instructor </label>
                            <input type="number" placeholder='Instructor Name' className='inputMod pr-[1.5625rem] ' />
                        </div>

                        {/* Date  */}
                        <div className='flex flex-col w-full gap-[1rem]'>
                            <label htmlFor="" className='textFormColor1'>Start Date</label>
                            <input type="date" placeholder='' className='inputMod pr-[1.5625rem] ' />
                        </div>
                    </div>
                    <div className='w-[15.5625rem] flex flex-col gap-[1.75rem]'>
                        <div>
                            <Dropdown
                            label="Category "
                            options={['Engineering', 'Marketing', 'Finance']}
                            selected={selectedCategory}
                            onSelect={setSelectedCategory}
                            placeholder="Select category"
                            />
                        </div>
                        {/* Duration  */}
                        <div className='flex flex-col w-full gap-[1rem]'>
                            <label htmlFor="" className='textFormColor1'>Duration </label>
                            <input type="text" placeholder='e.x 5 Hours' className='inputMod pr-[1.5625rem] ' />
                        </div>

                        {/* Enrollment  */}
                        <div className='flex flex-col w-full gap-[1rem]'>
                            <label htmlFor="" className='textFormColor1'>Max Enrollment</label>
                            <input type="number" placeholder='30' className='inputMod pr-[1.5625rem] ' />
                        </div>
                
                        {/* Date  */}
                        <div className='flex flex-col w-full gap-[1rem]'>
                            <label htmlFor="" className='textFormColor1'>End Date </label>
                            <input type="date" placeholder='' className='inputMod pr-[1.5625rem] ' />
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-[1rem]'>
                    <label htmlFor="" className='text-formColor'>Description </label>
                    <textarea name="" id=""  placeholder='Detailed description of the Program and  expected  outcomes..'  className='text-formColor bg-inputBack rounded-[10px] placeholder-input pt-[0.59375rem] pl-[1.1875rem] resize-none  h-[5.5rem]'></textarea>
                </div>
            </div>
          <div className='w-full h-[3.4375rem] mt-[0.5rem]'>
              <button type="submit" onClick={()=>navigate('/')} className='w-full h-full bg-lemongreen rounded-[10px] cursor-pointer'>Create Program</button>
          </div>
        </form>
    </div>
  )
}
