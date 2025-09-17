'use client';
import React , {useState} from 'react'
import { useRouter } from 'next/navigation';
import { Dropdown } from '@/app/Components/DropDown';

const page = () => {
  const [selectedEmployment, setSelectedEmployment] = useState()
  const [selectedManeger, setSelectedManeger] = useState()
  const [selectedDepartment, setSelectedDepartment] = useState()
  const router = useRouter();
  return (
    <div className='font-semibold flex flex-col gap-[4rem]'>
      {/* headerContainer */}
      <div className='flex flex-col gap-[2.5rem]'>
      {/* Header */}
        <div className='flex items-center gap-[0.9375rem]'>
           <img onClick={()=>router.push('/EmployeeRegistration/AddNewemployee')} src="/image/Icon/ArrowLeft.png" alt="" />
            <li className='textWhite list-none'>2. Employment Details</li>
        </div>

      {/* ProgressBar */}
        <div>
            <div className='grid grid-cols-4'>
              <div className='rounded-[0.53125rem] bg-lemongreen w-[22.625rem] h-[5px] '></div>
              <div className='rounded-[0.53125rem] bg-lemongreen w-[22.625rem] h-[5px] '></div>
              <div className='rounded-[0.53125rem] bg-[rgba(223,223,223,0.26)] w-[22.625rem] h-[5px] '></div>
              <div className='rounded-[0.53125rem] bg-[rgba(223,223,223,0.26)] w-[22.625rem] h-[5px] '></div>
            </div>
        </div>
      </div>
        <div className='between gap-[12.25rem]'>
          {/* mainContent */}
          <div className='w-[49.5625rem] h-[36.3125rem] overflow-y-auto scrollBarDash' > 
              <form action="" className='flex gap-[2.5625rem] px-[10px]'>
                <div className='flex flex-col w-[23.1875rem] gap-[35px]'>
                  <div className='flex flex-col gap-[1rem]'>
                      <label htmlFor="firstName" className='text-formColor'>Job Title</label>
                      <input type="text" placeholder='e.x senior developer' className='inputMod'/>
                  </div>
                  {/* Employee */}
                  <div>
                      <Dropdown
                          label="Employment Type"
                          options={['Full Time','Half Time','Remote']}
                          selected={selectedEmployment}
                          onSelect={setSelectedEmployment}
                          placeholder="Full Time"
                          className=''
                      />
                  </div>
                  {/* Manager */}
                  <div>
                      <Dropdown
                          label="Manager"
                          options={['Manager','Manager','Manager']}
                          selected={selectedManeger}
                          onSelect={setSelectedManeger}
                          placeholder="Maneger"
                          className=''
                      />
                  </div>
                </div>
                
                <div className='w-[23.1875rem] flex flex-col gap-[35px]'>
                  {/* Department */}
                  <div>
                      <Dropdown
                          label="Department"
                          options={['Department','Department1','Department2']}
                          selected={selectedDepartment}
                          onSelect={setSelectedDepartment}
                          placeholder="Department"
                          className=''
                      />
                  </div>
                  <div className='flex flex-col gap-[1rem]'>
                    <label htmlFor="firstName" className='text-formColor'>Joining Date</label>
                    <input type="date"   className='inputMod pr-[1.5625rem]'/>
                  </div>
                </div>
              </form>
              <div className='w-full h-[3.4375rem] mt-[4rem] flex gap-[2.5625rem]'>
                <button type="button" onClick={()=>router.push('/EmployeeRegistration/AddNewemployee')} className='w-[23.1875rem] border border-formColor text-formColor rounded-[10px] cursor-pointer'>Back</button>
                <button type="submit" onClick={()=>router.push('/EmployeeRegistration/Compensation')} className='w-[23.1875rem] bg-lemongreen rounded-[10px] cursor-pointer'>Next</button>
              </div>
          </div>

        <div className='flex-1'>
            <div className='border border-limegray w-[31rem]  rounded-[1.1875rem] px-[2.25rem] pt-[1.5625rem] pb-[1.9375rem]'>
            <div className='flex items-center gap-[10px] pb-[0.8125rem]'>
              <img src="/image/Icon/Alert.png" alt="" />
                <span className='textFormColor'><strong>Important:</strong></span>
            </div>
            <div className='space-y-[2.25rem]'>
                <p className='textLimegray'>Provide accurate information about your current employment status, including your job title, employe's name, and contact information. This helps establish your professional background and may be necessary for verification or eligibility purposes.</p>
                <p className='textLimegray'><strong className='text-formColor'>Tip:</strong> Make sure to list your employer's official name and provide a valid work email or phone number if requested.</p>
            </div>
            </div>           
        </div>
      </div>
    </div>

  )
}

export default page