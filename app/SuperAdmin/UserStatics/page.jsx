'use client'
import React , {useState} from 'react'

const page = () => {
  // Backup
  const [dropdownOpenB, setDropdownOpenB] = useState(false);
  const [selectedB, setSelectedB] = useState('last 6 month')
  const Backup = ["last 6 month","last year","last 6 weak","last month"]

  return (
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
                <div className='flex flex-col gap-[1rem] relative'>
                    <div className='inputMod flex items-center justify-between pr-[1.5625rem]' >
                        <button type="button" className='textFormColor1 text-left' onClick={() => setDropdownOpenB(!dropdownOpenB)}>{selectedB}</button>
                        <svg onClick={() => setDropdownOpenB(!dropdownOpenB)} className={`transition-transform duration-200 ${dropdownOpenB ? 'rotate-180' : ''}`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 9L12 15L5 9" stroke="#BEE532" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <div className={`${dropdownOpenB ? 'flex' : 'hidden'} bg-inputBack rounded-[10px]   w-full top-[6.3125rem] absolute z-10 textFormColor1 flex-col center-center border border-limeLight`}>
                        <ul className='flex flex-col space-y-5 py-5 '>
                            {Backup.map(back => (
                            <li key={back} className={`cursor-pointer w-full text-center ${selectedB === back ? 'text-lemongreen font-bold' : ''}`}
                            onClick={() => {
                                setSelectedB(back)
                                setDropdownOpenB(false)
                            }}>
                            {back}
                            </li>
                        ))}
                        </ul>
                    </div>
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
          <div className='space-y-[2.25rem] scrollBarDash '>
            <div className='space-y-[1.1875rem]'>
              <div className='between-center'>
                <div className='flex space-x-[1.375rem]'>
                  <span className='text-limegray '>Engineering</span>
                </div>
                <div>
                  <ul className='text-white flex gap-[1.75rem]'>
                    <li className='list-disc marker:text-lemongreen textLimegray'>95%</li>
                  </ul>
                </div>
              </div>
              {/* progressBar*/}
              <div className='h-[5px] w-full bg-white rounded-[30px]'></div>
            </div>
            <div className='space-y-[1.1875rem]'>
              <div className='between-center'>
                <div className='flex space-x-[1.375rem]'>
                  <span className='text-limegray '>Recruitment </span>
                </div>
                <div>
                  <ul className='text-white flex gap-[1.75rem]'>
                    <li className='list-disc marker:text-lemongreen textLimegray'>95%</li>
                  </ul>
                </div>
              </div>
              {/* progressBar*/}
              <div className='h-[5px] w-full bg-white rounded-[30px]'></div>
            </div>
            <div className='space-y-[1.1875rem]'>
              <div className='between-center'>
                <div className='flex space-x-[1.375rem]'>
                  <span className='text-limegray '>Leave Management</span>
                </div>
                <div>
                  <ul className='text-white flex gap-[1.75rem]'>
                    <li className='list-disc marker:text-lemongreen textLimegray'>95%</li>
                  </ul>
                </div>
              </div>
              {/* progressBar*/}
              <div className='h-[5px] w-full bg-white rounded-[30px]'></div>
            </div>
            <div className='space-y-[1.1875rem]'>
              <div className='between-center'>
                <div className='flex space-x-[1.375rem]'>
                  <span className='text-limegray '>Performance </span>
                </div>
                <div>
                  <ul className='text-white flex gap-[1.75rem]'>
                    <li className='list-disc marker:text-lemongreen textLimegray'>95%</li>
                  </ul>
                </div>
              </div>
              {/* progressBar*/}
              <div className='h-[5px] w-full bg-white rounded-[30px]'></div>
            </div>
            <div className='space-y-[1.1875rem]'>
              <div className='between-center'>
                <div className='flex space-x-[1.375rem]'>
                  <span className='text-limegray '>Attendance</span>
                </div>
                <div>
                  <ul className='text-white flex gap-[1.75rem]'>
                    <li className='list-disc marker:text-lemongreen textLimegray'>95%</li>
                  </ul>
                </div>
              </div>
              {/* progressBar*/}
              <div className='h-[5px] w-full bg-white rounded-[30px]'></div>
            </div>
          </div>
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
              <tr>
                <td className='pt-[2.1875rem]'>
                  <div className='flex items-center gap-[0.9375rem]'>
                    <div className='w-[2.4375rem] h-[2.4375rem] bg-lemongreen rounded-full '></div>
                    <div>
                      <h1 className='text-limeLight'>Onyx Technology</h1>
                      <h4 className='textLimegray'>onyxtech.hrms.com</h4>
                    </div>
                  </div>
                </td>
                <td className='pt-[2.1875rem]'>
                    <div className='flex gap-[0.4375rem]'>
                      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M14.6666 19.25V17.4167C14.6666 16.4442 14.2803 15.5116 13.5927 14.8239C12.9051 14.1363 11.9724 13.75 11 13.75H5.49998C4.52752 13.75 3.59489 14.1363 2.90725 14.8239C2.21962 15.5116 1.83331 16.4442 1.83331 17.4167V19.25M14.6666 2.86733C15.4529 3.07117 16.1493 3.53033 16.6464 4.17272C17.1434 4.81512 17.4132 5.6044 17.4132 6.41667C17.4132 7.22894 17.1434 8.01821 16.6464 8.66061C16.1493 9.30301 15.4529 9.76216 14.6666 9.966M20.1666 19.25V17.4167C20.166 16.6042 19.8956 15.815 19.3979 15.173C18.9002 14.5309 18.2033 14.0723 17.4166 13.8692M11.9166 6.41667C11.9166 8.44171 10.275 10.0833 8.24998 10.0833C6.22494 10.0833 4.58331 8.44171 4.58331 6.41667C4.58331 4.39162 6.22494 2.75 8.24998 2.75C10.275 2.75 11.9166 4.39162 11.9166 6.41667Z" stroke="#5D6150" stroke-width="1.375" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                      <span className='text-limegray'>1125</span>
                    </div>
                </td>
                <td className='pt-[2.1875rem]'>
                  <span className='text-limegray'>180GB</span>
                </td>
                <td className='pt-[2.1875rem] '>
                  <div>
                    <span className='bg-[rgba(190,229,50,0.05)] px-[20px] py-[8px] rounded-full text-yellowCust'>Medium Usage</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td className='pt-[2.1875rem]'>
                  <div className='flex items-center gap-[0.9375rem]'>
                    <div className='w-[2.4375rem] h-[2.4375rem] bg-lemongreen rounded-full '></div>
                    <div>
                      <h1 className='text-limeLight'>Onyx Technology</h1>
                      <h4 className='textLimegray'>onyxtech.hrms.com</h4>
                    </div>
                  </div>
                </td>
                <td className='pt-[2.1875rem]'>
                    <div className='flex gap-[0.4375rem]'>
                      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M14.6666 19.25V17.4167C14.6666 16.4442 14.2803 15.5116 13.5927 14.8239C12.9051 14.1363 11.9724 13.75 11 13.75H5.49998C4.52752 13.75 3.59489 14.1363 2.90725 14.8239C2.21962 15.5116 1.83331 16.4442 1.83331 17.4167V19.25M14.6666 2.86733C15.4529 3.07117 16.1493 3.53033 16.6464 4.17272C17.1434 4.81512 17.4132 5.6044 17.4132 6.41667C17.4132 7.22894 17.1434 8.01821 16.6464 8.66061C16.1493 9.30301 15.4529 9.76216 14.6666 9.966M20.1666 19.25V17.4167C20.166 16.6042 19.8956 15.815 19.3979 15.173C18.9002 14.5309 18.2033 14.0723 17.4166 13.8692M11.9166 6.41667C11.9166 8.44171 10.275 10.0833 8.24998 10.0833C6.22494 10.0833 4.58331 8.44171 4.58331 6.41667C4.58331 4.39162 6.22494 2.75 8.24998 2.75C10.275 2.75 11.9166 4.39162 11.9166 6.41667Z" stroke="#5D6150" stroke-width="1.375" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                      <span className='text-limegray'>1125</span>
                    </div>
                </td>
                <td className='pt-[2.1875rem]'>
                  <span className='text-limegray'>180GB</span>
                </td>
                <td className='pt-[2.1875rem] '>
                  <div>
                    <span className='bg-[rgba(190,229,50,0.05)] px-[20px] py-[8px] rounded-full text-lemongreen'>Normal Usage</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td className='pt-[2.1875rem]'>
                  <div className='flex items-center gap-[0.9375rem]'>
                    <div className='w-[2.4375rem] h-[2.4375rem] bg-lemongreen rounded-full '></div>
                    <div>
                      <h1 className='text-limeLight'>Onyx Technology</h1>
                      <h4 className='textLimegray'>onyxtech.hrms.com</h4>
                    </div>
                  </div>
                </td>
                <td className='pt-[2.1875rem]'>
                    <div className='flex gap-[0.4375rem]'>
                      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M14.6666 19.25V17.4167C14.6666 16.4442 14.2803 15.5116 13.5927 14.8239C12.9051 14.1363 11.9724 13.75 11 13.75H5.49998C4.52752 13.75 3.59489 14.1363 2.90725 14.8239C2.21962 15.5116 1.83331 16.4442 1.83331 17.4167V19.25M14.6666 2.86733C15.4529 3.07117 16.1493 3.53033 16.6464 4.17272C17.1434 4.81512 17.4132 5.6044 17.4132 6.41667C17.4132 7.22894 17.1434 8.01821 16.6464 8.66061C16.1493 9.30301 15.4529 9.76216 14.6666 9.966M20.1666 19.25V17.4167C20.166 16.6042 19.8956 15.815 19.3979 15.173C18.9002 14.5309 18.2033 14.0723 17.4166 13.8692M11.9166 6.41667C11.9166 8.44171 10.275 10.0833 8.24998 10.0833C6.22494 10.0833 4.58331 8.44171 4.58331 6.41667C4.58331 4.39162 6.22494 2.75 8.24998 2.75C10.275 2.75 11.9166 4.39162 11.9166 6.41667Z" stroke="#5D6150" stroke-width="1.375" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                      <span className='text-limegray'>1125</span>
                    </div>
                </td>
                <td className='pt-[2.1875rem]'>
                  <span className='text-limegray'>180GB</span>
                </td>
                <td className='pt-[2.1875rem] '>
                  <div>
                    <span className='bg-[rgba(190,229,50,0.05)] px-[20px] py-[8px] rounded-full text-Error'>High Usage</span>
                  </div>
                </td>
              </tr>
                
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default page