import React, {useState} from 'react'
import AddAdmin from '../../Modals/AddAdmin'
import ModalContainer from '../../Modals/ModalContainer'


const page = () => {
  const [isOpen,setisOpen] = useState(false)
  return (
    // mainContainer
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
              <span className='text-5xl'>32</span>
              <span>Total Super Admins</span>
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
              <span className='text-5xl text-formColor'>23</span>
              <span className='text-formColor'>Active Admins</span>
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
                <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M10.5 20C16.0228 20 20.5 15.5228 20.5 10C20.5 4.47715 16.0228 0 10.5 0C4.97715 0 0.5 4.47715 0.5 10C0.5 15.5228 4.97715 20 10.5 20ZM11.25 7C11.25 6.58579 10.9142 6.25 10.5 6.25C10.0858 6.25 9.75 6.58579 9.75 7V9.25H7.5C7.08579 9.25 6.75 9.5858 6.75 10C6.75 10.4142 7.08579 10.75 7.5 10.75H9.75V13C9.75 13.4142 10.0858 13.75 10.5 13.75C10.9142 13.75 11.25 13.4142 11.25 13V10.75H13.5C13.9142 10.75 14.25 10.4142 14.25 10C14.25 9.5858 13.9142 9.25 13.5 9.25H11.25V7Z" fill="#0D0F11"/>
                </svg>
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
              <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.0625 18.375C14.6534 18.375 18.375 14.6534 18.375 10.0625C18.375 5.47163 14.6534 1.75 10.0625 1.75C5.47163 1.75 1.75 5.47163 1.75 10.0625C1.75 14.6534 5.47163 18.375 10.0625 18.375Z" stroke="#5D6150" stroke-width="1.3125"/>
    <path d="M17.5 17.5L19.25 19.25" stroke="#5D6150" stroke-width="1.3125" stroke-linecap="round"/>
              </svg>
              <input type="search" placeholder="Search employee by name,email or ID" className='placeholder-input text-white  w-full h-full outline-0' name="" id="" />
            </div>

            {/* filter */}
            <div className='w-[18.125rem] h-[3.4375rem]  between-center  rounded-[0.625rem] bg-[#151812] gap-[4.6875rem] px-[1.5625rem]'>
              <div className='flex items-center gap-[0.625rem]'>
                <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.8334 1.5H4.16675C2.98824 1.5 2.39898 1.5 2.03286 1.8435C1.66675 2.187 1.66675 2.73985 1.66675 3.84555V4.4204C1.66675 5.28527 1.66675 5.7177 1.88308 6.07618C2.09941 6.43467 2.49464 6.65715 3.2851 7.10213L5.71261 8.46867C6.24296 8.76717 6.50814 8.9165 6.69801 9.08133C7.09341 9.42458 7.33681 9.82792 7.44711 10.3227C7.50008 10.5602 7.50008 10.8382 7.50008 11.3941V13.6187C7.50008 14.3767 7.50008 14.7556 7.71001 15.0511C7.91996 15.3465 8.29281 15.4922 9.03858 15.7838C10.6041 16.3958 11.3868 16.7018 11.9435 16.3537C12.5001 16.0055 12.5001 15.2099 12.5001 13.6187V11.3941C12.5001 10.8382 12.5001 10.5602 12.5531 10.3227C12.6633 9.82792 12.9067 9.42458 13.3022 9.08133C13.492 8.9165 13.7572 8.76717 14.2876 8.46867L16.7151 7.10213C17.5055 6.65715 17.9007 6.43467 18.1171 6.07618C18.3334 5.7177 18.3334 5.28527 18.3334 4.4204V3.84555C18.3334 2.73985 18.3334 2.187 17.9673 1.8435C17.6012 1.5 17.0119 1.5 15.8334 1.5Z" stroke="#5D6150" stroke-width="1.5"/>
                </svg>
                <span className='text-white'>All Status</span>
              </div>
              <svg width="16" height="8" viewBox="0 0 16 8" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M15 1L8 7L1 1" stroke="#BEE532" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>

          {/* listContentArea */}
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
                <tr>
                  <td className='pt-[2.1875rem]'>
                    <div>
                      <h1 className='text-limeLight'>Benjamin Endale</h1>
                      <h4 className='textLimegray'>john@techcrop.com</h4>
                    </div>
                  </td>
                <td className='pt-[2.1875rem]'>
                    <h4 className='text-limegray'>Super Administrator</h4>
                  </td>
                  <td className='pt-[2.1875rem]'>
                    <span className='bg-[rgba(190,229,50,0.05)] px-[20px] py-[8px] rounded-full text-lemongreen'>Active</span>
                  </td>
                  <td className='pt-[2.1875rem] '>
                    <div>
                        <h4 className='text-limegray'>1/15/2024</h4>
                    </div>
                  </td>
                  <td className='pt-[2.1875rem]'>
                    <div>
                      <h4 className='text-limegray'>1/15/2024</h4>
                    </div>
                  </td>
                  <td className='flex items-center gap-[2.5625rem] pt-[2.75rem]  '>
                    <button type="button" className='cursor-pointe leading-none'>
                      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.9998 11.9167C11.5061 11.9167 11.9165 11.5063 11.9165 11C11.9165 10.4938 11.5061 10.0834 10.9998 10.0834C10.4936 10.0834 10.0832 10.4938 10.0832 11C10.0832 11.5063 10.4936 11.9167 10.9998 11.9167Z" stroke="#BEE532" stroke-width="1.375" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M17.4165 11.9167C17.9228 11.9167 18.3332 11.5063 18.3332 11C18.3332 10.4938 17.9228 10.0834 17.4165 10.0834C16.9102 10.0834 16.4998 10.4938 16.4998 11C16.4998 11.5063 16.9102 11.9167 17.4165 11.9167Z" stroke="#BEE532" stroke-width="1.375" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M4.58317 11.9167C5.08943 11.9167 5.49984 11.5063 5.49984 11C5.49984 10.4938 5.08943 10.0834 4.58317 10.0834C4.07691 10.0834 3.6665 10.4938 3.6665 11C3.6665 11.5063 4.07691 11.9167 4.58317 11.9167Z" stroke="#BEE532" stroke-width="1.375" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className='pt-[2.1875rem]'>
                    <div>
                      <h1 className='text-limeLight'>Benjamin Endale</h1>
                      <h4 className='textLimegray'>john@techcrop.com</h4>
                    </div>
                  </td>
                <td className='pt-[2.1875rem]'> 
                    <h4 className='text-limegray'>Super Administrator</h4>
                  </td>
                  <td className='pt-[2.1875rem]'>
                    <span className='bg-[rgba(190,229,50,0.05)] px-[20px] py-[8px] rounded-full text-Error'>inActive</span>
                  </td>
                  <td className='pt-[2.1875rem] '>
                    <div>
                        <h4 className='text-limegray'>1/15/2024</h4>
                    </div>
                  </td>
                  <td className='pt-[2.1875rem]'>
                    <div>
                      <h4 className='text-limegray'>1/15/2024</h4>
                    </div>
                  </td>
                  <td className='flex items-center gap-[2.5625rem] pt-[2.75rem]'>
                    <button type="button" className='cursor-pointe leading-none'>
                      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.9998 11.9167C11.5061 11.9167 11.9165 11.5063 11.9165 11C11.9165 10.4938 11.5061 10.0834 10.9998 10.0834C10.4936 10.0834 10.0832 10.4938 10.0832 11C10.0832 11.5063 10.4936 11.9167 10.9998 11.9167Z" stroke="#BEE532" stroke-width="1.375" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M17.4165 11.9167C17.9228 11.9167 18.3332 11.5063 18.3332 11C18.3332 10.4938 17.9228 10.0834 17.4165 10.0834C16.9102 10.0834 16.4998 10.4938 16.4998 11C16.4998 11.5063 16.9102 11.9167 17.4165 11.9167Z" stroke="#BEE532" stroke-width="1.375" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M4.58317 11.9167C5.08943 11.9167 5.49984 11.5063 5.49984 11C5.49984 10.4938 5.08943 10.0834 4.58317 10.0834C4.07691 10.0834 3.6665 10.4938 3.6665 11C3.6665 11.5063 4.07691 11.9167 4.58317 11.9167Z" stroke="#BEE532" stroke-width="1.375" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </button>
                  </td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page