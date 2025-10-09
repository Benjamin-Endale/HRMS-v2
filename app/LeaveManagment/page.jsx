'use client'
import React , {useState} from 'react'

const page = () => {
  const [dropdownOpenB, setDropdownOpenB] = useState(false);
  const [selectedB, setSelectedB] = useState('last 6 month')
  const Backup = ["last 6 month","last year","last 6 weak","last month"]

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
                    <span className='text-formColor'>Present Today</span>
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
                    <span className='text-formColor'>Absent Today</span>
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
                        <span className='text-formColor'>Late Arrivals</span>
                    </div>
                </div>
            </div>
        </div>
        {/* Maincontainer */}
        <div>
          <div className='between'>
            <div className='flex flex-col'>
              <h1 className='textWhite'>Daily Attendance Records</h1>
              <h4 className='textLimegray'>Showing attendance for 7/17/2025</h4>
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
              <th className='pb-[0.8125rem] pr-[11.5rem]'>Employee Name</th>
              <th className='pb-[0.8125rem] pr-[11.8125rem]'>Leave Type</th>
              <th className='pb-[0.8125rem] pr-[8.625rem]'>Duration</th>
              <th className='pb-[0.8125rem] pr-[13.375rem]'>Reason</th>
              <th className='pb-[0.8125rem] pr-[10.0625rem]'>Status</th>
              <th className='pb-[0.8125rem] pr-[11.375rem]'>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='pt-[2.25rem]'>
                <h4 className='text-limegray'>Mikiyas Mulugeta</h4>
              </td>
              <td className='pt-[2.25rem]'>
                <h4 className='text-limegray'>Annual Leave</h4>
              </td>
              <td className='pt-[2.25rem]'>
                <h4 className='text-limegray'>5 days</h4>
                </td>
              <td className='pt-[2.25rem]'>
                <h4 className='text-limegray'>Family vacation</h4>
                </td>
              <td className='pt-[2.25rem]'>
                <div>
                  <span className='bg-[rgba(190,229,50,0.05)] text-sm px-[20px] py-[8px] rounded-full text-lemongreen'>Approved</span>
                </div>
              </td>
              <td className='pt-[1.875rem]'>
                <div className='flex gap-[1.6875rem]'>
                  <div className='flex items-center border rounded-full  border-[#303030] gap-[0.375rem] px-[12px] py-[6px]'>
                    <img src="/image/Icon/Action/Right.png" alt="" />
                    <span className='text-lemongreen text-sm'>Accept</span>
                  </div>
                <div className='flex items-center border rounded-full  border-[#303030] gap-[0.375rem] px-[12px] py-[6px]'>
                    <img src="/image/Icon/Action/X.png" alt="" />
                    <span className='text-Error text-sm'>Reject</span>
                  </div>
                </div>
              </td>

            </tr>
            <tr>
              <td className='pt-[2.25rem]'>
                <h4 className='text-limegray'>Mikiyas Mulugeta</h4>
              </td>
              <td className='pt-[2.25rem]'>
                <h4 className='text-limegray'>Annual Leave</h4>
              </td>
              <td className='pt-[2.25rem]'>
                <h4 className='text-limegray'>5 days</h4>
                </td>
              <td className='pt-[2.25rem]'>
                <h4 className='text-limegray'>Family vacation</h4>
                </td>
              <td className='pt-[2.25rem]'>
                <div>
                  <span className='bg-[rgba(190,229,50,0.05)] text-sm px-[20px] py-[8px] rounded-full text-yellowCust'>pending</span>
                </div>
              </td>
              <td className='pt-[1.875rem]'>
                <div className='flex gap-[1.6875rem]'>
                  <div className='flex items-center border rounded-full  border-[#303030] gap-[0.375rem] px-[12px] py-[6px]'>
                    <img src="/image/Icon/Action/Right.png" alt="" />
                    <span className='text-lemongreen text-sm'>Accept</span>
                  </div>
                <div className='flex items-center border rounded-full  border-[#303030] gap-[0.375rem] px-[12px] py-[6px]'>
                    <img src="/image/Icon/Action/X.png" alt="" />
                    <span className='text-Error text-sm'>Reject</span>
                  </div>
                </div>
              </td>

            </tr>
            <tr>
              <td className='pt-[2.25rem]'>
                <h4 className='text-limegray'>Mikiyas Mulugeta</h4>
              </td>
              <td className='pt-[2.25rem]'>
                <h4 className='text-limegray'>Annual Leave</h4>
              </td>
              <td className='pt-[2.25rem]'>
                <h4 className='text-limegray'>5 days</h4>
                </td>
              <td className='pt-[2.25rem]'>
                <h4 className='text-limegray'>Family vacation</h4>
                </td>
              <td className='pt-[2.25rem]'>
                <div>
                  <span className='bg-[rgba(190,229,50,0.05)] text-sm px-[20px] py-[8px] rounded-full text-Error'>rejected</span>
                </div>
              </td>
              <td className='pt-[1.875rem]'>
                <div className='flex gap-[1.6875rem]'>
                  <div className='flex items-center border rounded-full  border-[#303030] gap-[0.375rem] px-[12px] py-[6px]'>
                    <img src="/image/Icon/Action/Right.png" alt="" />
                    <span className='text-lemongreen text-sm'>Accept</span>
                  </div>
                <div className='flex items-center border rounded-full  border-[#303030] gap-[0.375rem] px-[12px] py-[6px]'>
                    <img src="/image/Icon/Action/X.png" alt="" />
                    <span className='text-Error text-sm'>Reject</span>
                  </div>
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