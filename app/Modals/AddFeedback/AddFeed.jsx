import React , {useState} from 'react'
import { Dropdown } from '@/app/Components/DropDown';

export default function AddFeed({ onClose }) {
    const [selectedDept, setSelectedDept] = useState('')
    const [selectedJob, setSelectedJob] = useState('')






  return ( 
    <div className='px-[3rem] py-[2.875rem]  space-y-[3.125rem] font-semibold w-full  ' >
        <div className='flex justify-between'>
            <div className=''>
                <h1 className='textFormColor'>Request 360° Feedback</h1>
                <h4 className='text-limegray'>Set up a feedback collection cycle</h4>
            </div>
            <button onClick={onClose} className='rounded-full center-center cursor-pointer'>
                <img src="/image/Icon/Action/CloseCircle.png" alt="" />
            </button>
        </div>
        <form action="" className='flex flex-col gap-[2.375rem] '>
          <div>
            <div className='flex flex-col gap-[2.375rem]'>
              <div className='flex flex-col gap-[1rem]'>
                <label htmlFor="" className='text-formColor'>Instructions for Reviewers  </label>
                <textarea name="" id=""  placeholder='Provide specific insturaction or focus area for the feedback '  className='text-formColor bg-inputBack rounded-[10px] placeholder-input pt-[0.59375rem] pl-[1.1875rem] resize-none  h-[19.0625rem]'></textarea>
              </div>
            </div>
          </div>
          <div className='w-full h-[3.4375rem] mt-[0.5rem]'>
              <button type="submit" onClick={()=>navigate('/')} className='w-full h-full bg-lemongreen rounded-[10px] cursor-pointer'>Submit</button>
          </div>
        </form>
    </div>
  )
}
