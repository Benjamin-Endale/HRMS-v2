'use client'
import React , {useState} from 'react'
import EmployeePortalSubNav from '@/app/EmployeePortalSubNav'
import ModalContainerFeed from '@/app/Modals/AddFeedback/ModalContainerFeed'
import AddFeed from '@/app/Modals/AddFeedback/AddFeed'


const page = () => {
  const reviews = [
    {name:'John smith' , department: 'Engineering' ,date: 'Mar 31, 2024' },
    {name:'John smith' , department: 'Engineering' ,date: 'Mar 31, 2024' },
    {name:'John smith' , department: 'Engineering' ,date: 'Mar 31, 2024' },
    {name:'John smith' , department: 'Engineering' ,date: 'Mar 31, 2024' },
    {name:'John smith' , department: 'Engineering' ,date: 'Mar 31, 2024' },


  ]
  const [isOpen,setisOpen] = useState(false)
  return (
    <>

    <EmployeePortalSubNav readPath= '/EmployeePortal/Performance/Feedback'/>
    <div className='font-semibold mt-[3.75rem] '>
      {reviews.map((rev,idx) => (
        <div key={idx} className='border pl-[2.0625rem] border-[rgba(88,88,88,1)] rounded-[10px] mb-3  h-[4.375rem] between-center pr-[7px]'>
          <div className='flex items-center gap-[15.875rem] w-full'>
            <div className=''>
              <h4 className='text-limeLight'>{rev.name}</h4>
            </div>
            <div className=''>
              <h4 className='bg-[rgba(190,229,50,0.05)]  text-formColor rounded-full px-[14px] py-[8px] '>{rev.department} Department</h4>
            </div>
            <div className='flex gap-[0.75rem] '>
              <img src="/image/Icon/Action/calendarSecond.png" alt="" />
              <h4 className='text-limeLight font-medium'>Due: {rev.date}</h4>
            </div>
          </div>
          <div className='center-center cursor-pointer bg-lemongreen h-[3.125rem] w-[12.125rem] rounded-[10px] gap-[0.75rem]'>
            <button onClick={()=> setisOpen(true)} className='center-center cursor-pointer gap-[0.75rem]' type="button">
              <img src="/svg/SvgImage/PlusSign.svg" alt="" />
              <h4>Give Feedback</h4>
            </button>
            <ModalContainerFeed open={isOpen}>
              <AddFeed onClose={()=>setisOpen(false)} />
            </ModalContainerFeed>
          </div>
        </div>
      ))}
    </div>
    </>
  )
}

export default page