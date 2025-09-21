'use client'
import React, {useState}from 'react'
import ModalContainerAnnounce from '@/app/Modals/AddAnnounce/ModalContainerAnnounce'
import AddAnnounce from '@/app/Modals/AddAnnounce/AddAnnounce'

const page = () => {
  const [isOpen , setisOpen] = useState(false)
  return (
    <div className='font-semibold'>
      <div className='space-y-[3.25rem]'>
        {/* InformationContainers */}
        <div className='flex gap-[1.25rem]  font-semibold'>
          <div className='carDash2'>
              <div className='h-full between flex-col'>
              <div className='flex justify-between'>
                  <div>
                    <img src="/image/Icon/ProfileWhiteIcon.png" alt="" />
                  </div>
              </div>
              <div className='flex flex-col'>
                  <span className='text-5xl text-formColor'>12</span>
                  <span className='text-formColor'>Total Announcements</span>
              </div>
              </div>
          </div>
          <div className='carDash2'>
              <div className='h-full between flex-col'>
              <div className='flex justify-between'>
                  <div>
                    <img src="/image/Icon/Close.png" alt="" />
                  </div>
              </div>
              <div className='flex flex-col'>
                  <span className='text-5xl text-formColor'>123</span>
                  <span className='text-formColor'>Currently published</span>
              </div>
              </div>
          </div>
          <div className='carDash2'>
              <div className='h-full between flex-col'>
              <div className='flex justify-between'>
                  <div>
                    <img src="/svg/SvgImage/cardIcon.svg" alt="" />
                  </div>
              </div>
              <div className='flex flex-col'>
                  <span className='text-5xl text-formColor'>74%</span>
                  <span className='text-formColor'>Total reach</span>
              </div>
              </div>
          </div>
        </div>
        <div className='flex w-full flex-col gap-[3.625rem]'>
            <div className='space-y-[2.25rem]'>
                {/* header */}
                <div className='between-center'>
                    <div className='flex flex-col'>
                        <h1 className='textFormColor'>Recent Announcements</h1>
                    </div>
                    <div>
                        <button type="button" className='cursor-pointer' onClick={()=>setisOpen(true)}>
                            <div className='center-center w-[14.0625rem] h-[3.125rem] rounded-[0.625rem] gap-[0.625rem] bg-lemongreen'>
                                  <img src="/svg/SvgImage/plusSign.svg" alt="" />
                                <span className='text-black font-semibold'>New Announcement</span>
                            </div>
                        </button>
                        {/* Modal */}
                        <ModalContainerAnnounce  open={isOpen}>
                            <AddAnnounce onClose={() => setisOpen(false)} />
                        </ModalContainerAnnounce>
                    </div>
                </div>
                {/* SearchArea */}
                <div className='flex gap-[2.125rem]'>
                    <div className='w-[71.9375rem] h-[3.4375rem]  flex items-center gap-[1.1875rem] bg-[#1D2015] rounded-[0.625rem] px-[1.4375rem] '>
                        <img src="/image/Icon/SearchIcon.png" alt="" />
                        <input type="search" placeholder="Search Announcements" className='placeholder-input text-white  w-full h-full outline-0' name="" id="" />
                    </div>

                {/* filter */}
                <div className='w-[18.125rem] h-[3.4375rem]  between-center  rounded-[0.625rem] bg-[#151812] gap-[4.6875rem] px-[1.5625rem]'>
                    <div className='flex items-center gap-[0.625rem]'>
                        <img src="/svg/SvgImage/Filter.svg" alt="" />
                        <span className='text-white'>Category </span>
                    </div>
                        <img src="/image/Icon/ArrowDown.png" alt="" />
                    </div>
                </div>
            </div>
        </div>
      </div>
      <div>
        <table>
          <thead className='customBorder1'>
            <tr className='text-formColor'>
              <th className='pr-[21.0625rem] pt-[4.0625rem] pb-[0.8125rem]'>Title</th>
              <th className='pr-[14.1875rem] pt-[4.0625rem] pb-[0.8125rem]'>Announcement</th>
              <th className='pr-[13rem] pt-[4.0625rem] pb-[0.8125rem]'>Destination</th>
              <th className='pr-[11.125rem] pt-[4.0625rem] pb-[0.8125rem]'>Categories</th>
              <th className='pr-[10.9375rem] pt-[4.0625rem] pb-[0.8125rem]'>Action</th>
            </tr>
          </thead>
          <tbody className='space-y-[2.125rem]'>
            <tr>
              <td className='pt-[2.0625rem]'><h4 className='textLimeGray1'>Open Enrollment 2025 is Live (Nov 1-15)</h4></td>
              <td className='pt-[2.0625rem]'><h4 className='textLimeGray1'>Its time to select your 2025 be...</h4></td>
              <td className='pt-[2.0625rem]'><h4 className='py-[0.5rem] px-[1.125rem] backgroundColor font-normal text-[14px] text-formColor w-fit rounded-[33px]'>Marketing Department</h4> </td>
              <td className='pt-[2.0625rem]'><h4 className='textFormColor1'>Urgent</h4></td>
              <td className='pt-[2.0625rem]'>
                  <div className='flex items-start gap-[2.5625rem] '>
                      <button type="button" className='cursor-pointer'>
                        <img src="/image/Icon/Action/eye.png" alt="" />
                      </button>
                      <button type="button" className='cursor-pointer'>
                        <img src="/image/Icon/Action/pen.png" alt="" />
                      </button>
                      <button type="button" className='cursor-pointer'>
                        <img src="/image/Icon/Action/Trash.png" alt="" />
                      </button>
                  </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default page