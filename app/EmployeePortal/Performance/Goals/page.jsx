'use client'
import React , {useState} from 'react'
import EmployeePortalSubNav from '@/app/EmployeePortalSubNav'
import { Dropdown } from '@/app/Components/DropDown'



const page = () => {
    const Duty = [
      { Title: "Improve Code Review Process", parag: "Implement automated code review tools and reduce review time by 30%", date: "Mar 31, 2024", Process: "Process Improvement", Difficalty: 'Hard'},
      { Title: "Improve Code Review Process", parag: "Implement automated code review tools and reduce review time by 30%", date: "Mar 31, 2024", Process: "Process Improvement", Difficalty: 'Hard'},
      { Title: "Improve Code Review Process", parag: "Implement automated code review tools and reduce review time by 30%", date: "Mar 31, 2024", Process: "Process Improvement", Difficalty: 'Hard'},
      { Title: "Improve Code Review Process", parag: "Implement automated code review tools and reduce review time by 30%", date: "Mar 31, 2024", Process: "Process Improvement", Difficalty: 'Hard'},
      { Title: "Improve Code Review Process", parag: "Implement automated code review tools and reduce review time by 30%", date: "Mar 31, 2024", Process: "Process Improvement", Difficalty: 'Hard'},



    ];
    const [selectedPercent, setSelectedPercent] = useState(Array(Duty.length).fill(null))
    const options = Array.from({ length: 101 }, (_, i) => `${i}%`)




      
  return (
    <>
    <EmployeePortalSubNav readPath= '/EmployeePortal/Performance/Goals'/>
    <div className='font-semibold my-[3.25rem] h-screen'>
      <div className='flex gap-[5.4375rem] flex-wrap'>
        {Duty.map((duty, idx) => (
          <React.Fragment key={idx}>
            <div className='space-y-[2rem] w-[300px]'>
              <div>
                <div className='mb-[0.9375rem]'>
                    <span className='bg-[rgba(190,229,50,0.05)] text-sm px-[20px] py-[8px] rounded-full text-Error'>{duty.Difficalty}</span>
                </div>
                <div className='space-y-[1.0625rem]'>
                  <h1 className='text-formColor'>{duty.Title}</h1>
                  <h4 className='textLimegray w-[20rem] text-wrap '>{duty.parag}</h4>
                </div>
              </div>
              <div className='space-y-[0.625rem]'>
                <div className='flex gap-[0.75rem]'>
                  <img src="/image/Icon/Action/calendarSecond.png" alt="" />
                  <h4 className='text-limeLight font-medium'>Due: {duty.date}</h4>
                </div>
                <div className='flex gap-[0.75rem]'>
                  <img src="/image/Icon/Action/Bars.png" alt="" />
                  <h4 className='text-limeLight font-medium'>{duty.Process}</h4>
                </div>
              </div>

              <div>
                <Dropdown
                  label=""
                  options={options}
                  selected={selectedPercent[idx]}
                  onSelect={(val) => {
                    const newPercents = [...selectedPercent];
                    newPercents[idx] = val;
                    setSelectedPercent(newPercents);
                  }}
                  placeholder="Select Progress"
                  className="w-[18.6875rem]"
                  color="bg-[rgba(13,15,17,1)]"
                  ClassForborder="bg-inherit w-full h-[3.125rem] placeholder-input text-formColor rounded-[10px] pl-[1.1875rem] border border-[rgba(88,88,88,1)]"
                />
              </div>
            </div>
          </React.Fragment>
        ))}

      </div>

    </div>
    </>
  )
}

export default page