'use client'

import React , {useState}  from 'react'
import ModalContainerEnrol from '@/app/Modals/AddEnrol/ModalContainerEnrol'
import AddEnrol from '@/app/Modals/AddEnrol/AddEnrol'
import SubNavigation from '@/app/SubNavigation'

const page = () => {
  const [isOpen , setisOpen] = useState(false)
  return (
    <>
      <SubNavigation readPath = '/TrainingPages/Enrolment'/>
      <div className='font-semibold mt-[2.9375rem]'>
        <div className='flex w-full flex-col gap-[3.625rem]'>
            <div className='space-y-[2.25rem]'>
                {/* header */}
                <div className='between'>
                    <div className='flex flex-col'>
                        <h1 className='textFormColor'>Training Enrollments</h1>
                        <h4 className='textLimegray'>Track employee training progress and attendance</h4>
                    </div>
                    <div>
                        <button type="button" className='cursor-pointer' onClick={()=>setisOpen(true)}>
                            <div className='center-center w-[12.125rem] h-[3.125rem] rounded-[0.625rem] gap-[0.625rem] bg-lemongreen'>
                                  <img src="/svg/SvgImage/plusSign.svg" alt="" />
                                <span className='text-black font-semibold'>Enroll Employee</span>
                            </div>
                        </button>
                        {/* Modal */}
                        <ModalContainerEnrol  open={isOpen}>
                            <AddEnrol onClose={() => setisOpen(false)} />
                        </ModalContainerEnrol>
                    </div>
                </div>
                {/* SearchArea */}
                <div className='flex gap-[2.125rem]'>
                    <div className='w-[71.9375rem] h-[3.4375rem]  flex items-center gap-[1.1875rem] bg-[#1D2015] rounded-[0.625rem] px-[1.4375rem] '>
                        <img src="/image/Icon/SearchIcon.png" alt="" />
                        <input type="search" placeholder="Search enrollments..." className='placeholder-input text-white  w-full h-full outline-0' name="" id="" />
                    </div>

                {/* filter */}
                <div className='w-[18.125rem] h-[3.4375rem]  between-center  rounded-[0.625rem] bg-[#151812] gap-[4.6875rem] px-[1.5625rem]'>
                    <div className='flex items-center gap-[0.625rem]'>
                        <img src="/svg/SvgImage/Filter.svg" alt="" />
                        <span className='text-white'>Program</span>
                    </div>
                        <img src="/image/Icon/ArrowDown.png" alt="" />
                    </div>
                </div>
            </div>
        </div>
        <div className='pt-[3.1875rem]'>
          <table>
            <thead className='tableBordercolor'>
              <tr className='textFormColor1'>
                <th className='pr-[26.9375rem] pb-[0.8125rem]'>Employee</th>
                <th className='pr-[24.625rem] pb-[0.8125rem]'>Program</th>
                <th className='pr-[15rem] pb-[0.8125rem]'>Program</th>
                <th className='pr-[9.625rem] pb-[0.8125rem]'>Enrolled</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='pt-[2.4375rem]'>
                  <div className='flex items-center gap-[0.9375rem]'>
                    <div className='w-[2.4375rem] h-[2.4375rem] bg-lemongreen rounded-full '></div>
                    <div>
                      <h1 className='text-limeLight'>John Smith</h1>
                      <h4 className='textLimegray'>Senior Software Engineer</h4>
                    </div>
                  </div>
                </td>
                <td className='pt-[2.4375rem]'>
                  <h4 className='text-limegray'>Advanced React Development</h4>
                </td>
                <td className='pt-[2.4375rem]'>
                  <h4 className='text-limegray'>65%</h4>
                </td>
                <td className='pt-[2.4375rem]'>
                  <h4 className='text-limegray'>Jan 15, 2024</h4>
                </td>
              </tr>
              <tr>
                <td className='pt-[2.4375rem]'>
                  <div className='flex items-center gap-[0.9375rem]'>
                    <div className='w-[2.4375rem] h-[2.4375rem] bg-lemongreen rounded-full '></div>
                    <div>
                      <h1 className='text-limeLight'>John Smith</h1>
                      <h4 className='textLimegray'>Senior Software Engineer</h4>
                    </div>
                  </div>
                </td>
                <td className='pt-[2.4375rem]'>
                  <h4 className='text-limegray'>Advanced React Development</h4>
                </td>
                <td className='pt-[2.4375rem]'>
                  <h4 className='text-limegray'>65%</h4>
                </td>
                <td className='pt-[2.4375rem]'>
                  <h4 className='text-limegray'>Jan 15, 2024</h4>
                </td>
              </tr>
              <tr>
                <td className='pt-[2.4375rem]'>
                  <div className='flex items-center gap-[0.9375rem]'>
                    <div className='w-[2.4375rem] h-[2.4375rem] bg-lemongreen rounded-full '></div>
                    <div>
                      <h1 className='text-limeLight'>John Smith</h1>
                      <h4 className='textLimegray'>Senior Software Engineer</h4>
                    </div>
                  </div>
                </td>
                <td className='pt-[2.4375rem]'>
                  <h4 className='text-limegray'>Advanced React Development</h4>
                </td>
                <td className='pt-[2.4375rem]'>
                  <h4 className='text-limegray'>65%</h4>
                </td>
                <td className='pt-[2.4375rem]'>
                  <h4 className='text-limegray'>Jan 15, 2024</h4>
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