'use client'
import React , {useState} from 'react'
import { Dropdown } from '@/app/Components/DropDown';
import { ProgressDashPerformance } from '@/app/Components/ProgressDashPerformance';

const page = () => {
  // Backup
  const [selectedB, setSelectedB] = useState()

  const TenatList = [
    {TenatName: 'Onyx Technology' , TenatEmail:'john@techcorp.com', TenatUsers: '1246', TenatStorage: '180Gb', Usage: 'Normal'},
    {TenatName: 'Bright Technology' , TenatEmail:'john@techcorp.com', TenatUsers: '1246', TenatStorage: '180Gb', Usage: 'Hard'},
    {TenatName: 'Africom Technology' , TenatEmail:'john@techcorp.com', TenatUsers: '1246', TenatStorage: '180Gb', Usage: 'Medium'},
  ]
    const handleState = (status) => {
      switch (status) {
        case "Normal":
          return "text-lemongreen";  
        case "Medium":
          return "text-yellowCust";
        case "Hard":
          return "text-Error";   
      }
    };

    const usage = [
    { Department:'Employee Management' ,  percentage: 85},
    { Department:'Recruitment' ,  percentage: 95},
    { Department:'Leave Management' ,  percentage: 65},
    { Department:'Performance' ,  percentage: 55},
    { Department:'Attendance' ,  percentage: 45},

    ];


  return (
    <div className='font-semibold flex flex-col  gap-[3.875rem]'>
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
              <span className='text-5xl'>18,247</span>
              <span>Total Active Users</span>
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
              <span className='text-5xl text-formColor'>1.92 TB</span>
              <span className='text-formColor'>Storage Used</span>
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
              <span className='text-5xl text-formColor'>+12.5%</span>
              <span className='text-formColor'>Growth Rate</span>
            </div>
          </div>
        </div>
      </div>


      {/* SecondSection */}
      <div className='flex flex-col gap-[4.125rem]'>
        {/* AddOrganizationSection */}
        <div className='between'>
          <div className='flex flex-col'>
            <h1 className='textWhite'>Module Usage Statistics</h1>
            <h4 className='textLimegray'>Adoption rate of different HRMS modules</h4>
          </div>
          <div className='flex gap-[1.5rem]'>
            <div className='w-[14.4375rem]'>
                <div>
                    <Dropdown
                    options={["last 6 month","last year","last 6 weak","last month"]}
                    selected={selectedB}
                    onSelect={setSelectedB}
                    placeholder="last 6 month"
                    />
                </div> 
            </div>
            <div>
              <button type="button" className='cursor-pointer ' onClick={()=>navigate('/AddNewemployee')}>
                <div className='center-center w-[13.125rem] h-[3.125rem] rounded-[0.625rem] gap-[0.625rem] bg-lemongreen'>
                  <img src="/image/Icon/Export.png" alt="" />
                  <span className='text-black'>Export Report</span>
                </div>
              </button>
            </div>
          </div>
        </div>
        {/* MainSectionContainer */}
        <div className='space-y-[3.0625rem]'>
            {/* headerSection */}
            {usage.map((usage,idx)=>(
              <div key={idx} className='space-y-[2.25rem] scrollBarDash  '>
                <div className='space-y-[1.1875rem]'>
                  <div className='between-center'>
                    <div className='flex space-x-[1.375rem]'>
                      <span className='text-limegray '>{usage.Department}</span>
                    </div>
                    <div>
                      <ul className='text-white flex gap-[1.75rem]'>
                        <li className='list-disc marker:text-lemongreen textLimegray'>{usage.percentage}%</li>
                      </ul>
                    </div>
                  </div>
                  {/* progressBar*/}
                  <ProgressDashPerformance percentage={usage.percentage} low={'bg-[#E3694A]'} high={'bg-[#DFDFDF]'} medium={'bg-[#F7AB1E]'}/>
                </div>
              </div>

            ))}
        </div>
    </div>
      <div className='space-y-[3.0625rem]'>
        {/* SearchArea */}
        <div>
          <div className='flex flex-col'>
            <h1 className='textWhite'>Module Usage Statistics</h1>
            <h4 className='textLimegray'>Adoption rate of different HRMS modules</h4>
          </div>
        </div>

        {/* listContentArea */}
        <div className='pb-[5.1875rem]'>
          <table className='w-full'>
            <thead className=' text-formColor border-b border-limegray'>
              <tr>
                <th className='pr-[23.375rem] pb-[0.8125rem]'>Organization</th>
                <th className='pr-[23.4375rem] pb-[0.8125rem] text-nowrap'>Active Users</th>
                <th className='pr-[14.75rem] pb-[0.8125rem] text-nowrap '>Storage (GB)</th>
                <th className='pr-[7.75rem] pb-[0.8125rem] text-nowrap'>Usage Level</th>
              </tr>
            </thead>
            <tbody >
              {TenatList.map((tenat) => (
                <tr key={tenat.TenatName}>
                  <td className='pt-[2.1875rem]'>
                    <div className='flex items-center gap-[0.9375rem]'>
                      <div className='w-[2.4375rem] h-[2.4375rem] bg-lemongreen rounded-full '></div>
                      <div>
                        <h1 className='text-limeLight'>{tenat.TenatName}</h1>
                        <h4 className='textLimegray'>{tenat.TenatEmail}</h4>
                      </div>
                    </div>
                  </td>
                  <td className='pt-[2.1875rem]'>
                      <div className='flex gap-[0.4375rem]'>
                        <img src="/image/Icon/Action/users.png" alt="" />
                        <span className='text-limegray'>{tenat.TenatUsers}</span>
                      </div>
                  </td>
                  <td className='pt-[2.1875rem]'>
                    <span className='text-limegray'>{tenat.TenatStorage}</span>
                  </td>
                  <td className='pt-[2.1875rem] '>
                    <div>
                      <span className={`bg-[rgba(190,229,50,0.05)] px-[20px] py-[8px] rounded-full ${handleState(tenat.Usage)}`}>{tenat.Usage} Usage</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default page