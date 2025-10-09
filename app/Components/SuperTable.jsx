'use client'
import React, {useState} from 'react'
import AddAdmin from '@/app/Modals/AddAdmin'
import ModalContainer from '@/app//Modals/ModalContainer'





const SuperTableDatafetch = ({admins}) => {
  
  const [isOpen,setisOpen] = useState(false)
  
  const handleState = (status) => {
    switch (status) {
      case "Active":
        return "text-lemongreen";  
      case "InActive":
        return "text-Error";   
    }
  }
  
  return (
    // mainContainer
    <div className='font-semibold flex flex-col gap-[3.875rem]'>
      {/* dashHeader */}
      <div className='flex gap-[2rem]'>
        <div className='carDash1 bg-[url(/image/imageDashcard1.png)]'>
          <div className='h-full between flex-col'>
            <div className='flex justify-between'>
              <div>
                <img src="/image/Icon/ProfileIcon.png" alt="" />
              </div>
              <div className='border-none  rounded-full center-center bg-white w-[49px] h-[49px]'>
                <img src="/image/Icon/ArrowRightIcon.png" alt="" />
              </div>
            </div>
            <div className='flex flex-col'>
              <span className='text-5xl'>{admins.length}</span>
              <span>Total Super Admins</span>
            </div>
          </div>
        </div>
        <div className='carDash1 bg-[rgba(190,229,50,0.05)]'>
          <div className='h-full between flex-col'>
            <div className='flex justify-between'>
              <div>
                <img src="/image/Icon/TimeIcon.png" alt="" />
              </div>
              <div className='border-none  rounded-full center-center bg-white w-[49px] h-[49px]'>
                <img src="/image/Icon/ArrowRightIcon.png" alt="" />
              </div>
            </div>
            <div className='flex flex-col'>
              <span className='text-5xl text-formColor'>{admins.filter(admin => admin.isActive).length}</span>
              <span className='text-formColor'>Active Admins</span>
            </div>
          </div>
        </div>
        <div className='carDash1 bg-[rgba(190,229,50,0.05)]'>
          <div className='h-full between flex-col'>
            <div className='flex justify-between'>
              <div>
                <img src="/image/Icon/TimeIcon.png" alt="" />
              </div>
              <div className='border-none  rounded-full center-center bg-white w-[49px] h-[49px]'>
                <img src="/image/Icon/ArrowRightIcon.png" alt="" />
              </div>
            </div>
            <div className='flex flex-col'>
              <span className='text-5xl text-formColor'>5</span>
              <span className='text-formColor'>Recent Logins</span>
            </div>
          </div>
        </div>
      </div>


      {/* SecondSection */}
      <div className='flex flex-col gap-[2.0625rem]'>
        {/* AddOrganizationSection */}
        <div className='between'>
          <div className='flex flex-col'>
            <h1 className='textWhite'>Super Administrators</h1>
            <h4 className='textLimegray'>System administrators with elevated privileges</h4>
          </div>
          <div>
            <button onClick={()=>setisOpen(true)} type="button" className='cursor-pointer '>
              <div className='center-center w-[13.125rem] h-[3.125rem] rounded-[0.625rem] gap-[0.625rem] bg-lemongreen'>
                <img src="/svg/SvgImage/PlusSign.svg" alt="" />
                <span  className='text-black'>Add Admin</span>
              </div>
            </button>
            {/* Modal */}
            <ModalContainer  open={isOpen}>
              <AddAdmin onClose={() => setisOpen(false)} />
            </ModalContainer>
          </div>
        </div>
        {/* MainSectionContainer */}
        <div className='space-y-[3.0625rem]'>
          {/* SearchArea */}
          <div className='flex gap-[2.125rem]'>
            <div className='w-[71.9375rem] h-[3.4375rem]  flex items-center gap-[1.1875rem] bg-[#1D2015] rounded-[0.625rem] px-[1.4375rem] '>
              <img src="/image/Icon/SearchIcon.png" alt="" />
              <input type="search" placeholder="Search employee by name,email or ID" className='placeholder-input text-white  w-full h-full outline-0' name="" id="" />
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
        <div className='pb-[2.1875rem]'>
            <table className='w-full  '>
                <thead className=' text-formColor border-b border-limegray'>
                    <tr>
                        <th className='pr-[14.75rem] pb-[0.8125rem]'>Administrator</th>
                        <th className='pr-[16.125rem] pb-[0.8125rem]'>Role</th>
                        <th className='pr-[10.875rem] pb-[0.8125rem]'>Status</th>
                        <th className='pr-[11.75rem] pb-[0.8125rem]'>Last Login</th>
                        <th className='pr-[6.5rem] pb-[0.8125rem]'>Created</th>
                        <th className='pr-[8.9375rem] pb-[0.8125rem]'>Actions</th>
                    </tr>
                </thead>
                  <tbody >
                      {admins.map((ad) => (
                          <tr key={ad.id}>
                          <td className="pt-[2.1875rem]">
                              <div>
                              <h1 className="text-limeLight">{ad.fullName}</h1>
                              <h4 className="textLimegray">{ad.email}</h4>
                              </div>
                          </td>
                          <td className="pt-[2.1875rem]">
                              <h4 className="text-limegray">{ad.role}</h4>
                          </td>
                          <td className="pt-[2.1875rem]">
                              <span
                              className={`bg-[rgba(190,229,50,0.05)] px-[20px] py-[8px] rounded-full ${handleState(ad.isActive ? "Active" : "InActive")}`}
                              >
                              {ad.isActive ? "Active" : "InActive"}
                              </span>
                          </td>
                            <td className="pt-[2.1875rem] ">
                                <div>
                                    <h4 className="text-limegray">
                                    {ad.lastLoginUtc
                                        ? new Date(ad.lastLoginUtc).toLocaleDateString("en-GB")
                                        : "—"}
                                    </h4>
                                </div>
                            </td>
                            <td className="pt-[2.1875rem]">
                                <div>
                                    <h4 className="text-limegray">
                                    {ad.createdAt
                                        ? new Date(ad.createdAt).toLocaleDateString("en-GB") // DD/MM/YYYY
                                        : "—"}
                                    </h4>
                                </div>
                            </td>
                          <td className="flex items-center gap-[2.5625rem] pt-[2.75rem]">
                              <button type="button" className="cursor-pointer leading-none">
                                  <img src="/image/ellipsis.png" alt="" />
                              </button>
                          </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SuperTableDatafetch