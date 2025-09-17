'use client'
import React, {useState} from 'react'
import ModalContainerReview from '@/app/Modals/AddReview/ModalContainerReview'
import AddReview from '@/app/Modals/AddReview/AddReview'
import SubNavigation from '@/app/SubNavigation'

const page = () => {
  const [isOpen , setisOpen] = useState(false)
  return (
    <>
      <SubNavigation readPath={"/PerformancePages/Reviews"}/>
      <div className='font-semibold'>
        <div className='space-y-[3.625rem]'>
          <div className='flex w-full flex-col gap-[3.625rem]'>
              <div className='space-y-[2.25rem]'>
                  {/* header */}
                  <div className='between'>
                      <div className='flex flex-col'>
                          <h1 className='textFormColor'>Performance Reviews</h1>
                          <h4 className='textLimegray'>Manage performance review cycles and evaluations</h4>
                      </div>
                      <div>
                          <button type="button" className='cursor-pointer' onClick={()=>setisOpen(true)}>
                              <div className='center-center w-[12.125rem] h-[3.125rem] rounded-[0.625rem] gap-[0.625rem] bg-lemongreen'>
                                <img src="/svg/SvgImage/PlusSign.svg" alt="" />
                                  <span className='text-black'>Start Review</span>
                              </div>
                          </button>
                          {/* Modal */}
                          <ModalContainerReview  open={isOpen}>
                              <AddReview onClose={() => setisOpen(false)} />
                          </ModalContainerReview>
                      </div>
                  </div>
                  {/* SearchArea */}
                  <div className='flex gap-[2.125rem]  '>
                      <div className='w-[71.9375rem] h-[3.4375rem]  flex items-center gap-[1.1875rem] bg-[#1D2015] rounded-[0.625rem] px-[1.4375rem] '>
                        <img src="/svg/SvgImage/Search.svg" alt="" />
                          <input type="search" placeholder="Search Jobs" className='placeholder-input text-white  w-full h-full outline-0' name="" id="" />
                      </div>

                  {/* filter */}
                  <div className='w-[18.125rem] h-[3.4375rem]  between-center  rounded-[0.625rem] bg-[#151812] gap-[4.6875rem] px-[1.5625rem]'>
                      <div className='flex items-center gap-[0.625rem]'>
                        <img src="/svg/SvgImage/Filter.svg" alt="" />
                          <span className='text-white'>All Status</span>
                      </div>
                      <img src="/image/Icon/ArrowDown.png" alt="" />
                      </div>
                  </div>
              </div>
          </div>
          <div className='overflow-y-auto scrollBarDash h-[20rem] pb-[5rem]'>
            <table className='w-full '>
              <thead className='text-formColor tableBordercolor'>
                <tr>
                  <th className='pr-[19.75rem] pb-[0.8125rem]'>Employee</th>
                  <th className='pr-[24.1875rem] pb-[0.8125rem]'>Review Type</th>
                  <th className='pr-[21.6875rem] pb-[0.8125rem]'>Rating</th>
                  <th className='pr-[10.3125rem] pb-[0.8125rem]'>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className=' text-limegray'>
                  <td className='pt-[2.4375rem]'>John Smith</td>
                  <td className='pt-[2.4375rem]'>Annual Review</td>
                  <td className='pt-[2.4375rem]'>4.5/5.0</td>
                  <td className='flex items-center gap-[2.5625rem] pt-[2.1875rem]'>
                      <button type="button" className='cursor-pointer'>
                         <img src="/image/Icon/Action/eye.png" alt="" />
                      </button>
                      <button type="button" className='cursor-pointer'>
                        <img src="/image/Icon/Action/pen.png" alt="" />
                      </button>
                      <button type="button" className='cursor-pointer'>
                        <img src="/image/Icon/Action/Export.png" alt="" />
                      </button>
                    </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default page