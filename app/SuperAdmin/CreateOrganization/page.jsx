import React , {useState} from 'react'
import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const page = () => {
    const [dropdownOpenI, setDropdownOpenI] = useState(false);
    const [selectedIndustry, setSelectedIndustry] = useState('Select Industry')
    const Industry = ['Industry1', 'Industry2']
    const [dropdownOpenC, setDropdownOpenC] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState('Company Size')
    const Company = ['100', '200']


    const [dropdownOpenCnt, setDropdownOpenCnt] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState('Select Country ')
    const country = ['Ethiopia', 'USA', 'UK' , 'Sudan']


    const [dropdownOpenT, setDropdownOpenT] = useState(false);
    const [selectedTime, setSelectedTime] = useState('Time Zone ')
    const timeZone = ['Ethiopia', 'USA', 'UK' , 'Sudan']


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





    const validationScheme = z.object({
      organizationName : z.string(),
      Industry: z.enum(['Industry1','Industry2']),
      Domain: z.string(),
      companySize: z.number(),
    })

    const {register,handleSubmit,formState: { errors }} = useForm({
    resolver: zodResolver(validationScheme)
  });

  const onSubmit = (data) => {
  console.log("✅ Valid data:", data);
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
                <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.25 20.1666V3.66665C5.25 3.18042 5.43437 2.7141 5.76256 2.37028C6.09075 2.02647 6.53587 1.83331 7 1.83331H14C14.4641 1.83331 14.9092 2.02647 15.2374 2.37028C15.5656 2.7141 15.75 3.18042 15.75 3.66665V20.1666M5.25 20.1666H15.75M5.25 20.1666H3.5C3.03587 20.1666 2.59075 19.9735 2.26256 19.6297C1.93437 19.2859 1.75 18.8195 1.75 18.3333V12.8333C1.75 12.3471 1.93437 11.8808 2.26256 11.537C2.59075 11.1931 3.03587 11 3.5 11H5.25M15.75 20.1666H17.5C17.9641 20.1666 18.4092 19.9735 18.7374 19.6297C19.0656 19.2859 19.25 18.8195 19.25 18.3333V10.0833C19.25 9.59708 19.0656 9.13077 18.7374 8.78695C18.4092 8.44313 17.9641 8.24998 17.5 8.24998H15.75M8.75 5.49998H12.25M8.75 9.16665H12.25M8.75 12.8333H12.25M8.75 16.5H12.25" stroke="#BEE532" stroke-width="1.375" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span className='textWhite'>Organization Details</span>
              </div>
              <h4 className='text-limegray leading-none'>Basic information about the organization</h4>
            </div>
            {/* FormSection */}
            <div>


              
              <form onSubmit={handleSubmit(onSubmit)} action="" className='space-y-[2.875rem]'>
                <div className='flex gap-[2.1875rem]'>
                  {/* firstForm */}
                  <div className='w-[20.1875rem] flex flex-col gap-[2.875rem]'>
                    {/* OrganizationName */}
                    <div className='flex flex-col gap-[1rem]'>
                      <label htmlFor="organizationName" className='text-formColor'>Organization Name*</label>
                      <input {...register('organizationName')} type="text" placeholder='Enter Organization Name' className='inputMod' />
                    </div>
                    {/* Insustry */}
                    <div className='flex flex-col gap-[1rem] relative'>
                        <label htmlFor="Industry" className='text-formColor'>Industry</label>
                        <div className='inputMod flex items-center justify-between pr-[1.5625rem]' >
                            <button type="button" className='text-formColor text-left' onClick={() => setDropdownOpenI(!dropdownOpenI)}>{selectedIndustry}</button>
                            <svg onClick={() => setDropdownOpenI(!dropdownOpenI)} className={`transition-transform duration-200 ${dropdownOpenI ? 'rotate-180' : ''}`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 9L12 15L5 9" stroke="#BEE532" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <div className={`${dropdownOpenI ? 'flex' : 'hidden'} bg-inputBack rounded-[10px]   w-full top-[6.3125rem] absolute z-10 text-formColor flex-col center-center border border-limeLight`}>
                            <ul className='flex flex-col space-y-5 py-5 '>
                                {Industry.map(ind => (
                                <li key={ind} className={`cursor-pointer w-full text-center ${selectedIndustry === ind ? 'text-lemongreen font-bold' : ''}`}
                                onClick={() => {
                                    setSelectedIndustry(ind)
                                    setDropdownOpenI(false)
                                }}>
                                {ind}
                                </li>
                            ))}
                            </ul>
                        </div>
                    </div>
                  </div>
                  {/* secondForm */}
                  <div className='w-[20.1875rem] flex flex-col gap-[2.875rem]'>
                    {/* Domain */}
                    <div className='flex flex-col gap-[1rem]'>
                      <label htmlFor="domain " className='text-formColor'>Domain*</label>
                      <input {...register('Domain')}  id='domain' type="text" placeholder='Enter Organization Domain' className='inputMod' />
                    </div>
                    {/* Company Size */}
                    <div className='flex flex-col gap-[1rem] relative'>
                        <label htmlFor="firstName" className='text-formColor'>Company Size</label>
                        <div className='inputMod flex items-center justify-between pr-[1.5625rem]' >
                            <button type="button" className='text-formColor text-left' onClick={() => setDropdownOpenC(!dropdownOpenC)}>{selectedCompany}</button>
                            <svg onClick={() => setDropdownOpenC(!dropdownOpenC)} className={`transition-transform duration-200 ${dropdownOpenC ? 'rotate-180' : ''}`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 9L12 15L5 9" stroke="#BEE532" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <div className={`${dropdownOpenC ? 'flex' : 'hidden'} bg-inputBack rounded-[10px]   w-full top-[6.3125rem] absolute z-10 text-formColor flex-col center-center border border-limeLight`}>
                            <ul className='flex flex-col space-y-5 py-5 '>
                                {Company.map(comp => (
                                <li key={comp} className={`cursor-pointer w-full text-center ${selectedCompany === comp ? 'text-lemongreen font-bold' : ''}`}
                                onClick={() => {
                                    setSelectedCompany(comp)
                                    setDropdownOpenC(false)
                                }}>
                                {comp}
                                </li>
                            ))}
                            </ul>
                        </div>
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
          {/* 5.1875 */}
          <div className=''>
            {/* secondSectionHeader */}
            <div className='space-y-[2.875rem]'>
              <div className='flex flex-col gap-[0.5625rem]'>
                <div className='flex items-center gap-[0.4375rem]'>
                  <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.25 20.1666V3.66665C5.25 3.18042 5.43437 2.7141 5.76256 2.37028C6.09075 2.02647 6.53587 1.83331 7 1.83331H14C14.4641 1.83331 14.9092 2.02647 15.2374 2.37028C15.5656 2.7141 15.75 3.18042 15.75 3.66665V20.1666M5.25 20.1666H15.75M5.25 20.1666H3.5C3.03587 20.1666 2.59075 19.9735 2.26256 19.6297C1.93437 19.2859 1.75 18.8195 1.75 18.3333V12.8333C1.75 12.3471 1.93437 11.8808 2.26256 11.537C2.59075 11.1931 3.03587 11 3.5 11H5.25M15.75 20.1666H17.5C17.9641 20.1666 18.4092 19.9735 18.7374 19.6297C19.0656 19.2859 19.25 18.8195 19.25 18.3333V10.0833C19.25 9.59708 19.0656 9.13077 18.7374 8.78695C18.4092 8.44313 17.9641 8.24998 17.5 8.24998H15.75M8.75 5.49998H12.25M8.75 9.16665H12.25M8.75 12.8333H12.25M8.75 16.5H12.25" stroke="#BEE532" stroke-width="1.375" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
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
                <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.625 19.25V17.4167C16.625 16.4442 16.2563 15.5116 15.5999 14.8239C14.9435 14.1363 14.0533 13.75 13.125 13.75H7.875C6.94674 13.75 6.0565 14.1363 5.40013 14.8239C4.74375 15.5116 4.375 16.4442 4.375 17.4167V19.25M14 6.41667C14 8.44171 12.433 10.0833 10.5 10.0833C8.567 10.0833 7 8.44171 7 6.41667C7 4.39162 8.567 2.75 10.5 2.75C12.433 2.75 14 4.39162 14 6.41667Z" stroke="#BEE532" stroke-width="1.375" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
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
                <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.25 20.1667V3.66671C5.25 3.18048 5.43437 2.71416 5.76256 2.37034C6.09075 2.02653 6.53587 1.83337 7 1.83337H14C14.4641 1.83337 14.9092 2.02653 15.2374 2.37034C15.5656 2.71416 15.75 3.18048 15.75 3.66671V20.1667M5.25 20.1667H15.75M5.25 20.1667H3.5C3.03587 20.1667 2.59075 19.9736 2.26256 19.6297C1.93437 19.2859 1.75 18.8196 1.75 18.3334V12.8334C1.75 12.3471 1.93437 11.8808 2.26256 11.537C2.59075 11.1932 3.03587 11 3.5 11H5.25M15.75 20.1667H17.5C17.9641 20.1667 18.4092 19.9736 18.7374 19.6297C19.0656 19.2859 19.25 18.8196 19.25 18.3334V10.0834C19.25 9.59714 19.0656 9.13083 18.7374 8.78701C18.4092 8.4432 17.9641 8.25004 17.5 8.25004H15.75M8.75 5.50004H12.25M8.75 9.16671H12.25M8.75 12.8334H12.25M8.75 16.5H12.25" stroke="#BEE532" stroke-width="1.375" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
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
                      <div className='flex flex-col gap-[1rem] relative'>
                          <label htmlFor="firstName" className='text-formColor'>Countrty</label>
                          <div className='inputMod flex items-center justify-between pr-[1.5625rem]' >
                              <button type="button" className='text-formColor text-left' onClick={() => setDropdownOpenCnt(!dropdownOpenCnt)}>{selectedCountry}</button>
                              <svg onClick={() => setDropdownOpenCnt(!dropdownOpenCnt)} className={`transition-transform duration-200 ${dropdownOpenCnt ? 'rotate-180' : ''}`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 9L12 15L5 9" stroke="#BEE532" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                              </svg>
                          </div>
                          <div className={`${dropdownOpenCnt ? 'flex' : 'hidden'} bg-inputBack rounded-[10px]   w-full top-[6.3125rem] absolute z-10 text-formColor flex-col center-center border border-limeLight`}>
                              <ul className='flex flex-col space-y-5 py-5 '>
                                  {country.map(cnt => (
                                  <li key={cnt} className={`cursor-pointer w-full text-center ${selectedCountry === cnt ? 'text-lemongreen font-bold' : ''}`}
                                  onClick={() => {
                                      setSelectedCountry(cnt)
                                      setDropdownOpenCnt(false)
                                  }}>
                                  {cnt}
                                  </li>
                              ))}
                              </ul>
                          </div>
                      </div>
                    </div>

                    {/* Time Zone */}
                    <div className='w-[20.1875rem]'>
                      <div className='flex flex-col gap-[1rem] relative'>
                          <label htmlFor="firstName" className='text-formColor'>Time Zone</label>
                          <div className='inputMod flex items-center justify-between pr-[1.5625rem]' >
                              <button type="button" className='text-formColor text-left' onClick={() => setDropdownOpenT(!dropdownOpenT)}>{selectedTime}</button>
                              <svg onClick={() => setDropdownOpenT(!dropdownOpenT)} className={`transition-transform duration-200 ${dropdownOpenT ? 'rotate-180' : ''}`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 9L12 15L5 9" stroke="#BEE532" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                              </svg>
                          </div>
                          <div className={`${dropdownOpenT ? 'flex' : 'hidden'} bg-inputBack rounded-[10px]   w-full top-[6.3125rem] absolute z-10 text-formColor flex-col center-center border border-limeLight`}>
                              <ul className='flex flex-col space-y-5 py-5 '>
                                  {timeZone.map(tZone => (
                                  <li key={tZone} className={`cursor-pointer w-full text-center ${selectedTime === tZone ? 'text-lemongreen font-bold' : ''}`}
                                  onClick={() => {
                                      setSelectedTime(tZone)
                                      setDropdownOpenT(false)
                                  }}>
                                  {tZone}
                                  </li>
                              ))}
                              </ul>
                          </div>
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