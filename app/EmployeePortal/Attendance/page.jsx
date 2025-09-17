'use client'
import React, { useState } from 'react'

const Page = () => {
  const [isClockedIn, setIsClockedIn] = useState(false)

  const handleClockIn = () => setIsClockedIn(true)
  const handleClockOut = () => setIsClockedIn(false)

  return (
    <div className="font-semibold space-y-[4.5rem]">
      <div className="between">
        <div>
          <div className="space-y-[1rem]">
            <h1 className="text-5xl text-formColor">09:25 AM</h1>
            <h4 className="text-limegray">Monday, Sept 12, 2025</h4>
          </div>
        </div>

        <div className="flex gap-[1.25rem]">
          {/* Clock In */}
          <button
            onClick={handleClockIn}
            disabled={isClockedIn}
            className={`w-[16.3125rem] h-[3.4375rem] center-center rounded-[10px] 
              ${isClockedIn ? 'bg-[rgba(190,229,50,0.25)]' : 'bg-lemongreen'}`}
          >
            <div className="center-center gap-[0.625rem]">
              <img src="/Image/Icon/Export.png" alt="" />
              <span className="text-black">Clock In</span>
            </div>
          </button>

          {/* Clock Out */}
          <button
            onClick={handleClockOut}
            disabled={!isClockedIn}
            className={`w-[16.3125rem] h-[3.4375rem] center-center rounded-[10px] 
              ${!isClockedIn ? 'bg-[rgba(190,229,50,0.25)]' : 'bg-lemongreen'}`}
          >
            <div className="center-center gap-[0.625rem]">
              <img src="/Image/Icon/Export.png" alt="" />
              <span className="text-black">Clock Out</span>
            </div>
          </button>
        </div>
      </div>
      <div>
        <table>
            <thead className='tableBordercolor'>
                <tr className='text-formColor'>
                    <th className='pr-[21.6875rem] pb-[0.8125rem]'>Date</th>
                    <th className='pr-[13.4375rem] pb-[0.8125rem]'>Clock In</th>
                    <th className='pr-[11.875rem] pb-[0.8125rem]'>Clock Out</th>
                    <th className='pr-[16.625rem] pb-[0.8125rem]'>Total Hours</th>
                    <th className='pr-[10.375rem] pb-[0.8125rem]'>Status</th>
                </tr>
            </thead>
            <tbody>
                <tr className='text-limeLight'>
                    <td className='pt-[2.25rem]'>
                        <h4>02-43-2025</h4>
                    </td>
                    <td className='pt-[2.25rem]'>09:00:00</td>
                    <td className='pt-[2.25rem]'>12:00:00</td>
                    <td className='pt-[2.25rem]'>7.5h</td>
                    <td className='pt-[1.875rem]'>
                        <div>
                            <span className='bg-[rgba(190,229,50,0.05)] text-sm px-[20px] py-[8px] rounded-full text-lemongreen'>Present</span>
                        </div>
                    </td>
                </tr>
                <tr className='text-limeLight'>
                    <td className='pt-[2.25rem]'>
                        <h4>02-43-2025</h4>
                    </td>
                    <td className='pt-[2.25rem]'>09:00:00</td>
                    <td className='pt-[2.25rem]'>12:00:00</td>
                    <td className='pt-[2.25rem]'>7.5h</td>
                    <td className='pt-[1.875rem]'>
                        <div>
                            <span className='bg-[rgba(190,229,50,0.05)] text-sm px-[20px] py-[8px] rounded-full text-yellowCust'>Late</span>
                        </div>
                    </td>
                </tr>
                <tr className='text-limeLight'>
                    <td className='pt-[2.25rem]'>
                        <h4>02-43-2025</h4>
                    </td>
                    <td className='pt-[2.25rem]'>09:00:00</td>
                    <td className='pt-[2.25rem]'>12:00:00</td>
                    <td className='pt-[2.25rem]'>7.5h</td>
                    <td className='pt-[1.875rem]'>
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

export default Page
