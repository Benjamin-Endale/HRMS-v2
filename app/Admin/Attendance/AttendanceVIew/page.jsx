import React from 'react'

// {
//     "date": "2025-10-30T00:00:00+03:00",
//     "presentToday": 0,
//     "absentToday": 0,
//     "lateToday": 1,
//     "clockedOutEmployees": [
//         {
//             "fullName": "Shalom Mesfin",
//             "clockIn": "2025-10-30T17:29:30.86",
//             "clockOut": "2025-10-30T17:29:34.832",
//             "totalHours": 0.0011034715277777778,
//             "status": "Late (Half Day)"
//         }
//     ]
// }

const page = ({AttendanceDetail}) => {
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
                    <span className='text-5xl text-formColor'>{AttendanceDetail.presentToday}</span>
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
                    <span className='text-5xl text-formColor'>{AttendanceDetail.absentToday}</span>
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
                        <span className='text-5xl text-formColor'>{AttendanceDetail.lateToday}</span>
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
              <h4 className='textLimegray'>Showing attendance for 7/17/2025</h4>
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
            {AttendanceDetail.clockedOutEmployees?.map((adc,index) => (
                <tr key={index}>
                <td className='pt-[2.25rem]'>
                    <h4 className='text-limegray'>{adc.fullName}</h4>
                </td>
                <td className='pt-[2.25rem]'>
                    <h4 className='text-limegray'>{adc.clockIn ? new Date(adc.clockIn).toLocaleDateString("en-GB").replace(/\//g,'-') : '--'}</h4>
                </td>
                <td className='pt-[2.25rem]'>
                    <h4 className='text-limegray'>{adc.clockOut ? new Date(adc.clockOut).toLocaleDateString("en-GB").replace(/\//g,'-') : '--'}</h4>
                    </td>
                <td className='pt-[2.25rem]'>
                    <h4 className='text-limegray'>{adc.totalHours || '-'}h</h4>
                    </td>
                <td className="pt-[1.875rem]">
                  <div>
                    <span
                      className={`bg-[rgba(190,229,50,0.05)] text-sm px-[20px] py-[8px] rounded-full 
                        ${adc.status === 'Present'
                          ? 'text-lemongreen'
                          : adc.status === 'Late'
                          ? 'text-yellowCust'
                          : 'text-Error'}`}
                    >
                      {adc.status}
                    </span>
                  </div>
                </td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>
      
    </div>
  )
}

export default page