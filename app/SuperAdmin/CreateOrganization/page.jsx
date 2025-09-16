'use client'
import React , {useState} from 'react'
import { Dropdown } from '@/app/Components/DropDown';

const page = () => {
    const [selectedIndustry, setSelectedIndustry] = useState()
    const [selectedCompany, setSelectedCompany] = useState()


    const [selectedCountry, setSelectedCountry] = useState()


    const [selectedTime, setSelectedTime] = useState()


    const [toggleOn, settoggleOn] = useState([false, false, false]);

    const handleToggle = (index) => {
      settoggleOn((prev) => {
        const newToggles = [...prev];
        console.log(...prev)
        newToggles[index] = !newToggles[index];
        return newToggles;
      });
    };
    const [toggleOn2, settoggleOn2] = useState([false, false, false]);

    const handleToggle2 = (index) => {
      settoggleOn2((prev) => {
        const newToggles = [...prev];
        console.log(...prev)
        newToggles[index] = !newToggles[index];
        return newToggles;
      });
    };













  return (
    <div className='flex gap-[7.0625rem] font-semibold'>
      {/* firstSection */}
      <div className='w-[42.5625rem]'>
        {/* firstSectionDivider */}
        <div className='flex flex-col gap-[4.5625rem]'>
          <div className='flex flex-col gap-[2.4375rem]'>
            {/* 1stSection */}
            <div className='flex flex-col gap-[0.5625rem]'>
              <div className='flex items-center gap-[0.4375rem]'>
                <img src="/image/building.png" alt="" />
                <span className='textWhite'>Organization Details</span>
              </div>
              <h4 className='text-limegray leading-none'>Basic information about the organization</h4>
            </div>
            {/* FormSection */}
            <div>


              
              <form  action="" className='space-y-[2.875rem]'>
                <div className='flex gap-[2.1875rem]'>
                  {/* firstForm */}
                  <div className='w-[20.1875rem] flex flex-col gap-[2.875rem]'>
                    {/* OrganizationName */}
                    <div className='flex flex-col gap-[1rem]'>
                      <label htmlFor="organizationName" className='text-formColor'>Organization Name*</label>
                      <input  type="text" placeholder='Enter Organization Name' className='inputMod' />
                    </div>
                    {/* Insustry */}
                    <div>
                        <Dropdown
                        label="Insustry"
                        options={['Industry1', 'Industry2']}
                        selected={selectedIndustry}
                        onSelect={setSelectedIndustry}
                        placeholder="Select Industry"
                        />
                    </div>
                  </div>
                  {/* secondForm */}
                  <div className='w-[20.1875rem] flex flex-col gap-[2.875rem]'>
                    {/* Domain */}
                    <div className='flex flex-col gap-[1rem]'>
                      <label htmlFor="domain " className='text-formColor'>Domain*</label>
                      <input  id='domain' type="text" placeholder='Enter Organization Domain' className='inputMod' />
                    </div>
                    {/* Company Size */}
                    <div>
                        <Dropdown
                        label="Company Size"
                        options={['100', '200']}
                        selected={selectedCompany}
                        onSelect={setSelectedCompany}
                        placeholder="Company Size"
                        />
                    </div>
                  </div>  
                </div>

                {/* TextArea */}
                <div className='flex flex-col gap-[1rem]'>
                  <label htmlFor="" className='text-formColor'>Description</label>
                  <textarea name="" id=""  placeholder='Brief description of the organization '  className='text-formColor bg-inputBack rounded-[10px] placeholder-input pt-[1.75rem] pl-[1.1875rem] resize-none  h-[8.4375rem]'></textarea>
                </div>
              </form>
            </div>
          </div>
          {/* 2ndSection */}
          <div className=''>
            {/* secondSectionHeader */}
            <div className='space-y-[2.875rem]'>
              <div className='flex flex-col gap-[0.5625rem]'>
                <div className='flex items-center gap-[0.4375rem]'>
                  <img src="/image/building.png" alt="" />

                  <span className='textWhite'>Module Selection</span>
                </div>
                <h4 className='text-limegray leading-none'>Choose which modules to enable for this organization</h4>
              </div>
              {/* ModuleSelection */}
              <div className='space-y-[2.875rem]'>
                {
                  [
                    { title: 'Employee Management', desc: 'Core employee data and profiles' },
                    { title: 'Attendance & Time Tracking', desc: 'Clock in/out and time management' },
                    { title: 'Leave Management', desc: 'Leave requests and approvals' }
                  ].map((item,i) => (

                    <div key={i} className='flex between-center'>
                      <div>
                        <h1 className='text-formColor'>{item.title}</h1>
                        <h4 className='text-limegray'>{item.desc}</h4>
                      </div>
                      <div onClick={()=>handleToggle(i)} className={`${toggleOn[i] ? ' bg-lemongreen' : ' bg-limegray'} w-[4.0625rem] h-[2.1875rem] rounded-full border  relative flex items-center py-[3px]`}>
                        <div className={`${toggleOn[i] ? 'translate-x-full' : 'translate-x-0 '} mx-[4px] absolute w-[1.8125rem] h-[1.8125rem] bg-white rounded-full  transition-transform ease-in-out duration-300`}></div>
                      </div>  
                    </div>

                  ))
                }
                <div className='w-full h-[3.4375rem] flex gap-[2.5625rem] mb-[4.125rem]'>
                    <button type="button" onClick={()=>navigate('/AddNewemployeesecond')} className='w-[19.875rem] border border-formColor text-formColor rounded-[10px] cursor-pointer'>Cancel</button>
                    <button type="submit" onClick={()=>navigate('/System')} className='w-[19.875rem] bg-lemongreen rounded-[10px] cursor-pointer'>Create Organization</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* secondSection */}
      <div className='w-[42.5625rem]  space-y-[10.5625rem]'>
        <div className='flex flex-col gap-[2.875rem]'>
          {/* firstSectionDivider */}
          <div className='flex flex-col gap-[2.4375rem]'>
            {/* 1stSection */}
            <div className='flex flex-col gap-[0.5625rem]'>
              <div className='flex items-center gap-[0.4375rem]'>
                <img src="/image/userGreen.png" alt="" />
                <span className='textWhite'>Administrator Details</span>
              </div>
              <h4 className='text-limegray leading-none'>Primary administrator for this organization</h4>
            </div>
            <div className='space-y-[2.875rem]'>
              <div>
                <form action="" className='space-y-[2.875rem]'>
                  <div className='flex gap-[2.1875rem]'>
                  {/* firstForm */} 
                    <div className='w-[20.1875rem] flex flex-col gap-[2.875rem]'>
                        {/* First Name */}
                      <div className='flex flex-col gap-[1rem]'>
                        <label htmlFor="firstName" className='text-formColor'>First Name*</label>
                        <input id='firstName' type="text" placeholder='Enter First Name' className='inputMod' />
                      </div>
                      {/* Email */}
                      <div className='flex flex-col gap-[1rem]'>
                        <label htmlFor="Email" className='text-formColor'>Email*</label>
                        <input id='Email' type="email" placeholder='example@company.name' className='inputMod' />
                      </div>
                    </div>
                    {/* secondForm */}
                    <div className='w-[20.1875rem] flex flex-col gap-[2.875rem]'>
                        {/* Last Name */}
                      <div className='flex flex-col gap-[1rem]'>
                        <label htmlFor="lastName" className='text-formColor'>Last Name*</label>
                        <input id='lastName' type="text" placeholder='Enter Last Name' className='inputMod' />
                      </div>
                      {/* Phone Number */}
                      <div className='flex flex-col gap-[1rem]'>
                        <label htmlFor="phoneNumber" className='text-formColor'>Phone number</label>
                        <input id='phoneNumber' type="email" placeholder='+1(555) 123-4567' className='inputMod' />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-[2.4375rem]'>
            {/* 1stSection */}
            <div className='flex flex-col gap-[0.5625rem]'>
              <div className='flex items-center gap-[0.4375rem]'>
                <img src="/image/building.png" alt="" />
                <span className='textWhite'>Regional Settings</span>
              </div>
              <h4 className='text-limegray leading-none'>Timezone and location settings</h4>
            </div>
            <div className='space-y-[2.875rem]'>
              <div>








                <form  action="" className='space-y-[2.875rem]'>
                  <div className='flex gap-[2.1875rem]'>
                    {/* Country */}
                    <div className='w-[20.1875rem]'>
                      <div>
                          <Dropdown
                          label="Country"
                          options={['Ethiopia', 'USA', 'UK' , 'Sudan']}
                          selected={selectedCountry}
                          onSelect={setSelectedCountry}
                          placeholder="Select Country"
                          />
                      </div>
                    </div>

                    {/* Time Zone */}
                    <div className='w-[20.1875rem]'>
                      <div>
                          <Dropdown
                          label="Time Zone "
                          options={['Ethiopia', 'USA', 'UK' , 'Sudan']}
                          selected={selectedTime}
                          onSelect={setSelectedTime}
                          placeholder="Time Zone "
                          />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* ModuleSelection */}
        <div className='space-y-[2.875rem]'>
          {
            [
              { title: 'Recruitment & ATS', desc: 'Job postings and candidate tracking' },
              { title: 'Performance Management', desc: 'Goals and performance reviews' },
              { title: 'Training & Development', desc: 'Learning programs and courses' }
            ].map((item,j) => (

              <div key={j} className='flex between-center'>
                <div>
                  <h1 className='text-formColor'>{item.title}</h1>
                  <h4 className='text-limegray'>{item.desc}</h4>
                </div>
                <div onClick={()=>handleToggle2(j)} className={`${toggleOn2[j] ? ' bg-lemongreen' : ' bg-limegray'} w-[4.0625rem] h-[2.1875rem] rounded-full border  relative flex items-center py-[3px]`}>
                  <div className={`${toggleOn2[j] ? 'translate-x-full' : 'translate-x-0 '} mx-[4px] absolute w-[1.8125rem] h-[1.8125rem] bg-white rounded-full  transition-transform ease-in-out duration-300`}></div>
                </div>
              </div>

            ))
          }
        </div>
      </div>
    </div>
  )
}

export default page