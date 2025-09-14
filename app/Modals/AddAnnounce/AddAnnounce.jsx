import React , {useState} from 'react'
import { Dropdown } from '@/app/Components/DropDown';

export default function AddAnnounce({ onClose }) {
    const [selectedDestination, setSelectedDestination] = useState('')
    const [selectedAnnouncement, setSelectedAnnouncement] = useState('')






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
            <div className='flex flex-col gap-[2.375rem] '>
              {/* Destination  */} 
              <div className='flex-1'>
                  <Dropdown
                      label="Destination"
                      options={['Engineering', 'Marketing' , 'Finance']}
                      selected={selectedDestination}
                      onSelect={setSelectedDestination}
                      placeholder="All Destination"
                      className=''
                  />
              </div>
                {/* Announcement categories  */} 
              <div className='flex-1'>
                  <Dropdown
                      label="Announcement categories"
                      options={['Engineering', 'Marketing' , 'Finance']}
                      selected={selectedAnnouncement}
                      onSelect={setSelectedAnnouncement}
                      placeholder="Urgent"
                      className=''
                  />
              </div>
              {/* Title */}
                <div className='flex flex-col w-full gap-[1rem]'>
                    <label htmlFor="" className='textFormColor1'>Title</label>
                    <input type="text" placeholder='add header'  className='inputMod pr-[1.5625rem] ' />
                </div>
            </div>

            <div className='flex flex-col gap-[1rem]'>
                <label htmlFor="" className='text-formColor'>Description </label>
                <textarea name="" id=""  placeholder='Detailed description of the Program and  expected  outcomes..'  className='text-formColor bg-inputBack rounded-[10px] placeholder-input pt-[0.59375rem] pl-[1.1875rem] resize-none  h-[5.5rem]'></textarea>
            </div>

          <div className='w-full h-[3.4375rem] mt-[0.5rem]'>
              <button type="submit" onClick={()=>navigate('/')} className='w-full h-full bg-lemongreen rounded-[10px] cursor-pointer'>Create Announcement</button>
          </div>
        </form>
    </div>
  )
}
