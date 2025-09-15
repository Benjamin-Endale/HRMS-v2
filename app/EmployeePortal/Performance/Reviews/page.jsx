
'use client'
import React , {useState} from 'react'
import EmployeePortalSubNav from '@/app/EmployeePortalSubNav'
import { Dropdown } from '@/app/Components/DropDown'


const page = () => {
  const [selectedLeave, setSelectedLeave] = useState('');

  return (
    <>
    <EmployeePortalSubNav readPath= '/EmployeePortal/Performance/Reviews'/>
    <div className='font-semibold mt-[2.375rem] space-y-[2.25rem]'>
      <div>
          <Dropdown
          label=""
          options={['Engineering', 'Marketing', 'Finance']}
          selected={selectedLeave}
          onSelect={setSelectedLeave}
          placeholder="Select Review Type"
          color="bg-[rgba(21,24,18,1)]"
          src='/svg/SvgImage/Filter.svg'
          ClassForborder='bg-[rgba(21,24,18,1)] w-full h-[3.125rem] placeholder-input text-formColor rounded-[10px] pl-[1.1875rem]'
          />
      </div>
      <div className='border border-[rgba(88,88,88,1)] rounded-[20px] px-[2.1875rem] py-[2rem] '>
        <div className='space-y-[1.625rem]'>
          <div className='flex gap-7'>
            <h1 className='text-formColor'>Overall Feedback</h1>
            <li className='list-disc marker:text-lemongreen text-limegray'>23/01/2025</li>
          </div>
          <div>
            <p className='textLimegray'>John has been doing excellent work on the new architecture. His attention to detail and problem-solving skills are outstanding.John has been doing excellent work on the new architecture. His attention to detail and problem-solving skills are outstanding.</p>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default page