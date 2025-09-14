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
                <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.875 8.75C9.808 8.75 11.375 7.183 11.375 5.25C11.375 3.317 9.808 1.75 7.875 1.75C5.942 1.75 4.375 3.317 4.375 5.25C4.375 7.183 5.942 8.75 7.875 8.75Z" stroke="#0D0F11" stroke-width="1.5"/>
<path d="M13.125 7.875C14.5748 7.875 15.75 6.69974 15.75 5.25C15.75 3.80026 14.5748 2.625 13.125 2.625" stroke="#0D0F11" stroke-width="1.5" stroke-linecap="round"/>
<path d="M7.875 18.375C11.2577 18.375 14 16.808 14 14.875C14 12.942 11.2577 11.375 7.875 11.375C4.49226 11.375 1.75 12.942 1.75 14.875C1.75 16.808 4.49226 18.375 7.875 18.375Z" stroke="#0D0F11" stroke-width="1.5"/>
<path d="M15.75 12.25C17.2849 12.5866 18.375 13.439 18.375 14.4375C18.375 15.3381 17.488 16.12 16.1875 16.5116" stroke="#0D0F11" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
              </div>
              <div className='border-none  rounded-full center-center bg-white w-[49px] h-[49px]'>
                <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.5 15.5L15.5 5.5M15.5 5.5H8M15.5 5.5V13" stroke="#3E4B0E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
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
                <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.75 6.125H1.75" stroke="#DFDFDF" stroke-width="1.3125" stroke-linecap="round"/>
                <path d="M7 10.5H1.75" stroke="#DFDFDF" stroke-width="1.3125" stroke-linecap="round"/>
                <path d="M8.75 14.875H1.75" stroke="#DFDFDF" stroke-width="1.3125" stroke-linecap="round"/>
                <path d="M14.875 14.875C17.2912 14.875 19.25 12.9162 19.25 10.5C19.25 8.08375 17.2912 6.125 14.875 6.125C12.4588 6.125 10.5 8.08375 10.5 10.5C10.5 12.9162 12.4588 14.875 14.875 14.875Z" stroke="#DFDFDF" stroke-width="1.3125"/>
                <path d="M14.875 8.75V10.3654L15.75 11.375" stroke="#DFDFDF" stroke-width="1.3125" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div className='border-none  rounded-full center-center bg-white w-[49px] h-[49px]'>
                <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.5 15.5L15.5 5.5M15.5 5.5H8M15.5 5.5V13" stroke="#3E4B0E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
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
                <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.75 6.125H1.75" stroke="#DFDFDF" stroke-width="1.3125" stroke-linecap="round"/>
                <path d="M7 10.5H1.75" stroke="#DFDFDF" stroke-width="1.3125" stroke-linecap="round"/>
                <path d="M8.75 14.875H1.75" stroke="#DFDFDF" stroke-width="1.3125" stroke-linecap="round"/>
                <path d="M14.875 14.875C17.2912 14.875 19.25 12.9162 19.25 10.5C19.25 8.08375 17.2912 6.125 14.875 6.125C12.4588 6.125 10.5 8.08375 10.5 10.5C10.5 12.9162 12.4588 14.875 14.875 14.875Z" stroke="#DFDFDF" stroke-width="1.3125"/>
                <path d="M14.875 8.75V10.3654L15.75 11.375" stroke="#DFDFDF" stroke-width="1.3125" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div className='border-none  rounded-full center-center bg-white w-[49px] h-[49px]'>
                <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.5 15.5L15.5 5.5M15.5 5.5H8M15.5 5.5V13" stroke="#3E4B0E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
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
                  <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.5 20C16.0228 20 20.5 15.5228 20.5 10C20.5 4.47715 16.0228 0 10.5 0C4.97715 0 0.5 4.47715 0.5 10C0.5 15.5228 4.97715 20 10.5 20ZM11.25 7C11.25 6.58579 10.9142 6.25 10.5 6.25C10.0858 6.25 9.75 6.58579 9.75 7V9.25H7.5C7.08579 9.25 6.75 9.5858 6.75 10C6.75 10.4142 7.08579 10.75 7.5 10.75H9.75V13C9.75 13.4142 10.0858 13.75 10.5 13.75C10.9142 13.75 11.25 13.4142 11.25 13V10.75H13.5C13.9142 10.75 14.25 10.4142 14.25 10C14.25 9.5858 13.9142 9.25 13.5 9.25H11.25V7Z" fill="#0D0F11"/>
                  </svg>
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