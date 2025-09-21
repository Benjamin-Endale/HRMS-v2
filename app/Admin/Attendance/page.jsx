import React from 'react'

const page = () => {
  return (
    <div className='font-semibold space-y-[3.5625rem]'>
      <div className='flex flex-col gap-[4.25rem]'>

        {/* InformationContainers */}
        <div className='flex gap-[1.25rem]'>
            <div className='carDash2'>
                <div className='h-full between flex-col'>
                <div className='flex justify-between'>
                    <div>
                        <img src="/image/Icon/ProfileWhiteIcon.png" alt="" />
                    </div>
                </div>
                <div className='flex flex-col'>
                    <span className='text-5xl text-formColor'>12</span>
                    <span className='text-formColor'>Total Requests</span>
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
                    <span className='text-5xl text-formColor'>234</span>
                    <span className='text-formColor'>Pending</span>
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
                        <span className='text-5xl text-formColor'>8</span>
                        <span className='text-formColor'>Approved</span>
                    </div>
                </div>
            </div>
        </div>
        {/* Maincontainer */}
        <div>
          <div className='between'>
            <div className='flex flex-col'>
              <h1 className='textWhite'>Leave Requests</h1>
              <h4 className='textLimegray'>Showing 3 of 3 requests</h4>
            </div>
            <div className='flex gap-[1.5rem]'>
              {/* filter */}
              <div className='w-[18.125rem] h-[3.4375rem]  between-center  rounded-[0.625rem] bg-[#151812] gap-[4.6875rem] px-[1.5625rem]'>
                <div className='flex items-center gap-[0.625rem]'>
                    <img src="/svg/SvgImage/Filter.svg" alt="" />
                  <span className='text-white'>All Status</span>
                </div>
                <img src="/image/Icon/ArrowDown.png" alt="" />
              </div>
              <div>
                <button type="button" className='cursor-pointer '>
                  <div className='center-center w-[10.8125rem] h-[3.125rem] rounded-[0.625rem] gap-[0.625rem] bg-lemongreen'>
                    <img src="/image/Icon/Export.png" alt="" />
                    <span className='text-black'>Export Report</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* table */}
      <div>
        <table className='w-full'>
          <thead className='border-b border-limegray'>
            <tr className='textFormColor1'>
              <th className='pb-[0.8125rem] pr-[16.5625rem]'>Employee Name</th>
              <th className='pb-[0.8125rem] pr-[13.4375rem]'>Clock In</th>
              <th className='pb-[0.8125rem] pr-[11.875rem]'>Clock Out</th>
              <th className='pb-[0.8125rem] pr-[16.625rem]'>Total Hours</th>
              <th className='pb-[0.8125rem] pr-[10.375rem]'>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='pt-[2.25rem]'>
                <h4 className='text-limegray'>Mikiyas Mulugeta</h4>
              </td>
              <td className='pt-[2.25rem]'>
                <h4 className='text-limegray'>09:00:00</h4>
              </td>
              <td className='pt-[2.25rem]'>
                <h4 className='text-limegray'>12:00:00</h4>
                </td>
              <td className='pt-[2.25rem]'>
                <h4 className='text-limegray'>7.5h</h4>
                </td>
              <td className='pt-[2.25rem]'>
                <div>
                  <span className='bg-[rgba(190,229,50,0.05)] text-sm px-[20px] py-[8px] rounded-full text-lemongreen'>Present</span>
                </div>
              </td>
            </tr>
            <tr>
              <td className='pt-[2.25rem]'>
                <h4 className='text-limegray'>Mikiyas Mulugeta</h4>
              </td>
              <td className='pt-[2.25rem]'>
                <h4 className='text-limegray'>09:00:00</h4>
              </td>
              <td className='pt-[2.25rem]'>
                <h4 className='text-limegray'>12:00:00</h4>
                </td>
              <td className='pt-[2.25rem]'>
                <h4 className='text-limegray'>7.5h</h4>
                </td>
              <td className='pt-[2.25rem]'>
                <div>
                  <span className='bg-[rgba(190,229,50,0.05)] text-sm px-[20px] py-[8px] rounded-full text-yellowCust'>late</span>
                </div>
              </td>
            </tr>
            <tr>
              <td className='pt-[2.25rem]'>
                <h4 className='text-limegray'>Mikiyas Mulugeta</h4>
              </td>
              <td className='pt-[2.25rem]'>
                <h4 className='text-limegray'>--</h4>
              </td>
              <td className='pt-[2.25rem]'>
                <h4 className='text-limegray'>--</h4>
                </td>
              <td className='pt-[2.25rem]'>
                <h4 className='text-limegray'>--</h4>
                </td>
              <td className='pt-[2.25rem]'>
                <div>
                  <span className='bg-[rgba(190,229,50,0.05)] text-sm px-[20px] py-[8px] rounded-full text-Error'>Absent</span>
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