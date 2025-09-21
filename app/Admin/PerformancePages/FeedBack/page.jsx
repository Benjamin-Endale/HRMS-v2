'use client'
import React , { useState } from 'react'
import ModalContainerRequest from '@/app/Modals/AddRequest/ModalContainerRequest'
import AddRequest from '@/app/Modals/AddRequest/AddRequest'
import SubNavigation from '@/app/SubNavigation'

const page = () => {
  const [isOpen , setisOpen] = useState(false)
  return (
    <>
      <SubNavigation readPath='/PerformancePages/FeedBack'/>
      <div className='font-semibold space-y-[2.5625rem]'>
          {/* header */}
          <div className='between'>
              <div className='flex flex-col'>
                  <h1 className='textFormColor'>360° Feedback System</h1>
                  <h4 className='textLimegray'>Collect and manage multi-source feedback</h4>
              </div>
              <div>
                  <button type="button" className='cursor-pointer' onClick={()=>setisOpen(true)}>
                      <div className='center-center w-[12.125rem] h-[3.125rem] rounded-[0.625rem] gap-[0.625rem] bg-lemongreen'>
                        <img src="/svg/SvgImage/PlusSign.svg" alt="" />
                          <span className='text-black'>Request Feedback</span>
                      </div>
                  </button>
                  {/* Modal */}
                  <ModalContainerRequest  open={isOpen}>
                      <AddRequest onClose={() => setisOpen(false)} />
                  </ModalContainerRequest>
              </div>
          </div>
          
          <div className='flex flex-col gap-[3.375rem] h-[25rem] overflow-y-auto scrollBarDash'>
            <div className='text-formColor flex items-center gap-[5.1875rem]'>
              <div className= 'flex gap-[4.25rem] items-center'>
                <div className='flex gap-[1.0625rem] items-center'>
                  <div><h1>John Smith</h1></div>
                  <div className=''><h4 className='px-[1.53125rem] text-[14px] border-0 text-center rounded-[2.0625rem] bg-bgColor py-[0.5rem]'>Manager Feedback</h4></div>
                </div>
                <div className='text-formColor'>
                  <div className='flex gap-[10px] '>
                      <div>
                        <h4 className='text-limegray'>From: <span className='text-limeLight'>Mike Chen</span></h4>
                      </div>
                      <h4 className="before:content-['•'] before:mr-1 text-limegray">Jan 20, 2024</h4>
                  </div>  
                </div>
              </div>
              <div className=' text-limegray w-[49.6875rem]   '>
                <p>John has been doing excellent work on the new architecture. His attention to detail and problem-solving skills are outstanding.John has been doing excellent work on the new architecture. His attention to detail and problem-solving skills are outstanding.</p>
              </div>
            </div>

            
            <div className='text-formColor flex items-center gap-[5.1875rem] '>
              <div className= 'flex gap-[4.25rem] items-center'>
                <div className='flex gap-[1.0625rem] items-center'>
                  <div><h1>John Smith</h1></div>
                  <div className=''><h4 className='px-[1.53125rem] text-[14px] border-0 text-center rounded-[2.0625rem] bg-bgColor py-[0.5rem]'>Manager Feedback</h4></div>
                </div>
                <div className='text-formColor'>
                  <div className='flex gap-[10px] '>
                      <div>
                        <h4 className='text-limegray'>From: <span className='text-limeLight'>Mike Chen</span></h4>
                      </div>
                      <h4 className="before:content-['•'] before:mr-1 text-limegray">Jan 20, 2024</h4>
                  </div>  
                </div>
              </div>
              <div className=' text-limegray w-[49.6875rem]   '>
                <p>John has been doing excellent work on the new architecture. His attention to detail and problem-solving skills are outstanding.John has been doing excellent work on the new architecture. His attention to detail and problem-solving skills are outstanding.</p>
              </div>
            </div>
      
            <div className='text-formColor flex items-center gap-[5.1875rem]'>
              <div className= 'flex gap-[4.25rem] items-center'>
                <div className='flex gap-[1.0625rem] items-center'>
                  <div><h1>John Smith</h1></div>
                  <div className=''><h4 className='px-[1.53125rem] text-[14px] border-0 text-center rounded-[2.0625rem] bg-bgColor py-[0.5rem]'>Manager Feedback</h4></div>
                </div>
                <div className='text-formColor'>
                  <div className='flex gap-[10px] '>
                      <div>
                        <h4 className='text-limegray'>From: <span className='text-limeLight'>Mike Chen</span></h4>
                      </div>
                      <h4 className="before:content-['•'] before:mr-1 text-limegray">Jan 20, 2024</h4>
                  </div>  
                </div>
              </div>
              <div className=' text-limegray w-[49.6875rem]   '>
                <p>John has been doing excellent work on the new architecture. His attention to detail and problem-solving skills are outstanding.John has been doing excellent work on the new architecture. His attention to detail and problem-solving skills are outstanding.</p>
              </div>
            </div>

            
            <div className='text-formColor flex items-center gap-[5.1875rem]'>
              <div className= 'flex gap-[4.25rem] items-center'>
                <div className='flex gap-[1.0625rem] items-center'>
                  <div><h1>John Smith</h1></div>
                  <div className=''><h4 className='px-[1.53125rem] text-[14px] border-0 text-center rounded-[2.0625rem] bg-bgColor py-[0.5rem]'>Manager Feedback</h4></div>
                </div>
                <div className='text-formColor'>
                  <div className='flex gap-[10px] '>
                      <div>
                        <h4 className='text-limegray'>From: <span className='text-limeLight'>Mike Chen</span></h4>
                      </div>
                      <h4 className="before:content-['•'] before:mr-1 text-limegray">Jan 20, 2024</h4>
                  </div>  
                </div>
              </div>
              <div className=' text-limegray w-[49.6875rem]   '>
                <p>John has been doing excellent work on the new architecture. His attention to detail and problem-solving skills are outstanding.John has been doing excellent work on the new architecture. His attention to detail and problem-solving skills are outstanding.</p>
              </div>
            </div>
        
            <div className='text-formColor flex items-center gap-[5.1875rem]'>
              <div className= 'flex gap-[4.25rem] items-center'>
                <div className='flex gap-[1.0625rem] items-center'>
                  <div><h1>John Smith</h1></div>
                  <div className=''><h4 className='px-[1.53125rem] text-[14px] border-0 text-center rounded-[2.0625rem] bg-bgColor py-[0.5rem]'>Manager Feedback</h4></div>
                </div>
                <div className='text-formColor'>
                  <div className='flex gap-[10px] '>
                      <div>
                        <h4 className='text-limegray'>From: <span className='text-limeLight'>Mike Chen</span></h4>
                      </div>
                      <h4 className="before:content-['•'] before:mr-1 text-limegray">Jan 20, 2024</h4>
                  </div>  
                </div>
              </div>
              <div className=' text-limegray w-[49.6875rem]   '>
                <p>John has been doing excellent work on the new architecture. His attention to detail and problem-solving skills are outstanding.John has been doing excellent work on the new architecture. His attention to detail and problem-solving skills are outstanding.</p>
              </div>
            </div>

            
            <div className='text-formColor flex items-center gap-[5.1875rem]'>
              <div className= 'flex gap-[4.25rem] items-center'>
                <div className='flex gap-[1.0625rem] items-center'>
                  <div><h1>John Smith</h1></div>
                  <div className=''><h4 className='px-[1.53125rem] text-[14px] border-0 text-center rounded-[2.0625rem] bg-bgColor py-[0.5rem]'>Manager Feedback</h4></div>
                </div>
                <div className='text-formColor'>
                  <div className='flex gap-[10px] '>
                      <div>
                        <h4 className='text-limegray'>From: <span className='text-limeLight'>Mike Chen</span></h4>
                      </div>
                      <h4 className="before:content-['•'] before:mr-1 text-limegray">Jan 20, 2024</h4>
                  </div>  
                </div>
              </div>
              <div className=' text-limegray w-[49.6875rem]   '>
                <p>John has been doing excellent work on the new architecture. His attention to detail and problem-solving skills are outstanding.John has been doing excellent work on the new architecture. His attention to detail and problem-solving skills are outstanding.</p>
              </div>
            </div>
          </div>
      
      </div>
    </>
  )
}

export default page