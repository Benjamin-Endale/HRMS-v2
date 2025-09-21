
'use client'
import React , {useState} from 'react'
import AddSchedule from '@/app/Modals/AddSchedule/AddSchedule'
import ModalContainerSchedule from '@/app/Modals/AddSchedule/ModalContainerSchedule'
import SubNavigation from '@/app/SubNavigation'


const page = () => {
    const [isOpen,setisOpen] = useState(false)
  return (
    <>
      <SubNavigation readPath='/RecruitmentPages/Interviews'/>
      <div className='font-semibold space-y-[3.3125rem]'>
        <div className='between'>
          <div className='flex flex-col'>
            <h1 className='textFormColor'>Interview Management</h1>
            <h4 className='textLimegray'>Schedule and track page</h4>
          </div>
            {/* Schedule Interview */}
            <button type="button" className='cursor-pointer ' onClick={()=>setisOpen(true)}>
              <div className='center-center w-[14.0625rem] h-[3.125rem] rounded-[0.625rem] gap-[0.625rem] bg-lemongreen'>
                <img src="/svg/SvgImage/PlusSign.svg" alt="" />
                <span className='text-black'>Schedule Interview</span>
              </div>
            </button>
            {/* Modal */}
            <ModalContainerSchedule  open={isOpen}>
              <AddSchedule  onClose={() => setisOpen(false)} />
            </ModalContainerSchedule >
        </div>
        {/* table */}
        <div>
          <table>
            <thead className='tableBordercolor'>
              <tr className='textFormColor1'>
                <th className='pb-[0.8125rem] pr-[7.125rem]'>Candidate</th>
                <th className='pb-[0.8125rem] pr-[13.9375rem]'>Position</th>
                <th className='pb-[0.8125rem] pr-[7.3125rem]'>Interviewer</th>
                <th className='pb-[0.8125rem] pr-[6.8125rem]'>Date & Time</th>
                <th className='pb-[0.8125rem] pr-[10.8125rem]'>Type</th>
                <th className='pb-[0.8125rem] pr-[8.625rem]'>Status</th>
                <th className='pb-[0.8125rem] pr-[10.125rem]'>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='pt-[1.4375rem]'>
                  <h4 className='textLimegray1'>Engineering</h4>
                </td>
                <td className='pt-[1.4375rem]'>
                  <h4 className='textLimegray1'>Senior Software Engineer</h4>
                </td>
                <td className='pt-[1.4375rem]'>
                  <h4 className='textLimegray1'>Bereket Daniel</h4>
                </td>
                <td className='pt-[1.4375rem]'>
                  <div className='flex flex-col'>
                    <h1 className='text-limeLight'>Jan 25, 2024</h1>
                    <h4 className='textLimegray'>2:00 PM</h4>
                  </div>
                </td>
                <td className='pt-[1.4375rem]'>
                  <h4 className='textLimegray1'>Technical Interview</h4>
                </td>
                <td className='pt-[1.4375rem]'>
                  <div>
                    <span className='bg-[rgba(190,229,50,0.05)] text-sm px-[20px] py-[8px] rounded-full text-lemongreen'>Scheduled</span>
                  </div>
                </td>
                <td className='pt-[2.0625rem] flex items-center gap-[2.5625rem]'>
                  <button type="button" className='cursor-pointer'>
                    <img src="/image/Icon/Action/squarePen.png" alt="" />
                  </button>
                  <button type="button" className='cursor-pointer'>
                    <img src="/image/Icon/Action/ban.png" alt="" />
                  </button>
                </td>
              </tr>
              <tr>
                <td className='pt-[1.4375rem]'>
                  <h4 className='textLimegray1'>Engineering</h4>
                </td>
                <td className='pt-[1.4375rem]'>
                  <h4 className='textLimegray1'>Senior Software Engineer</h4>
                </td>
                <td className='pt-[1.4375rem]'>
                  <h4 className='textLimegray1'>Bereket Daniel</h4>
                </td>
                <td className='pt-[1.4375rem]'>
                  <div className='flex flex-col'>
                    <h1 className='text-limeLight'>Jan 25, 2024</h1>
                    <h4 className='textLimegray'>2:00 PM</h4>
                  </div>
                </td>
                <td className='pt-[1.4375rem]'>
                  <h4 className='textLimegray1'>HR Interview</h4>
                </td>
                <td className='pt-[1.4375rem]'>
                  <div>
                    <span className='bg-[rgba(190,229,50,0.05)] text-sm px-[20px] py-[8px] rounded-full text-Error'>Completed</span>
                  </div>
                </td>
                <td className='pt-[2.0625rem] flex items-center gap-[2.5625rem]'>
                  <button type="button" className='cursor-pointer'>
                    <img src="/image/Icon/Action/squarePen.png" alt="" />
                  </button>
                  <button type="button" className='cursor-pointer'>
                    <img src="/image/Icon/Action/ban.png" alt="" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default page