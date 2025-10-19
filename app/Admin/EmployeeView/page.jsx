'use client'

import { useRouter } from 'next/navigation'
import React from 'react'


const Page = () => {
const router = useRouter()
  return (
    <div className='font-semibold'>
        <div className='flex gap-[3.375rem]'>
            <div className='w-[19.125rem] flex flex-col gap-[1.25rem]'>
                <div className='space-y-[2.125rem] bg-[rgba(190,229,50,0.05)] px-[0.9375rem] pt-[0.9375rem] pb-[1.625rem] rounded-[1rem] w-full'>
                    <div className='w-[17.25rem] h-[17.25rem]'>
                        <img src="/image/Employee.png" className='w-full h-full rounded-[1rem]'   alt="EmployeeImage" />
                    </div>
                    <div className='flex justify-between '>
                        <div>
                            <div className='flex gap-[0.8125rem]'>
                                <h4 className='text-formColor'>Bereket Daniel</h4>
                                <span className="before:content-['•'] before:text-lemongreen before:mr-[0.5rem] text-limegray">2y</span>
                            </div>
                            <h4 className='text-limegray'>CXO - Senior Designer</h4>
                        </div>
                        <div className='flex items-end'>
                            <h4 className='text-limegray'>EMP001</h4>
                        </div>
                    </div>
                </div>
                <div className='bg-[rgba(190,229,50,0.05)] h-[4.375rem] w-full rounded-[1rem] flex  items-center pl-[1.4375rem]'>
                    <div className='flex gap-[0.8125rem] items-center'>
                        <div className='w-[6px] h-[6px] bg-formColor rounded-full'></div>
                        <h4 className="text-limegray font-medium">Engineering Department </h4>
                    </div>
                </div>
                <div className='font-medium space-y-[2.625rem] rounded-[1rem] bg-[rgba(190,229,50,0.05)] px-[1.5rem] pt-[1.5rem] pb-[1.8rem]'>
                    <div className='flex flex-col gap-[0.75rem]'>
                        <h4 className='text-limegray'>Email</h4>
                        <h4 className='text-formColor'>Benjaminendale@gmail.com</h4>
                    </div>
                    <div className='flex flex-col gap-[0.75rem]'>
                        <h4 className='text-limegray'>Phone</h4>
                        <h4 className='text-formColor'>0927279927</h4>
                    </div>
                    <div className='flex flex-col gap-[0.75rem]'>
                        <h4 className='text-limegray'>Address</h4>
                        <h4 className='text-formColor'>Addiss Abeba</h4>
                    </div>
                </div>
            </div>
            <div className='w-full space-y-[5.0625rem]'> 
                <div className='flex flex-col gap-[2.5rem]'>
                    <div className='between'>
                        <div className='flex items-center gap-[0.9375rem]'>
                            <img onClick={() => router.push('/Admin/Employees')} className='cursor-pointer' src="/image/Icon/ArrowLeft.png" alt="Back" />
                            <h1 className='textWhite'>Employees Details</h1>
                        </div>
                        <div className='flex items-center gap-[10px]'>
                            <img src="/image/Icon/Action/Pen.png" alt="" />
                            <span className='text-lemongreen'>Edit</span>
                        </div>

                    </div>
                    <div className='w-full'>
                        <div className='w-full pl-[2.6875rem] flex  items-center border border-[rgba(93,97,80,0.42)] rounded-[1rem] h-[7.625rem]'>
                            <div className='font-medium flex gap-[4.9375rem]'>
                                <div className='flex flex-col gap-[0.75rem] w-[11.8125rem]'>
                                    <h4 className='text-limegray'>Nationality</h4>
                                    <h4 className='text-formColor'>Ethiopia</h4>
                                </div>
                                <div className='flex flex-col gap-[0.75rem] w-[11.8125rem]'>
                                    <h4 className='text-limegray'>Date Of Birth</h4>
                                    <h4 className='text-formColor'>15/08/2002</h4>
                                </div>
                                <div className='flex flex-col gap-[0.75rem] w-[11.8125rem]'>
                                    <h4 className='text-limegray'>Gender</h4>
                                    <h4 className='text-formColor'>Male</h4>
                                </div>
                                <div className='flex flex-col gap-[0.75rem] w-[11.8125rem]'>
                                    <h4 className='text-limegray'>Marital Status</h4>
                                    <h4 className='text-formColor'>Single</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-full'>
                        <div className='w-full pl-[2.6875rem] flex  items-center border border-[rgba(93,97,80,0.42)] rounded-[1rem] h-[7.625rem]'>
                            <div className='font-medium flex gap-[4.9375rem]'>
                                <div className='flex flex-col gap-[0.75rem] w-[11.8125rem]'>
                                    <h4 className='text-limegray'>Emergency Contact Name</h4>
                                    <h4 className='text-formColor'>Daniel Gizachew</h4>
                                </div>
                                <div className='flex flex-col gap-[0.75rem] w-[11.8125rem]'>
                                    <h4 className='text-limegray'>Emergency Contact</h4>
                                    <h4 className='text-formColor'>+251987654321</h4>
                                </div>
                                <div className='flex flex-col gap-[0.75rem] w-[11.8125rem]'>
                                    <h4 className='text-limegray'>Education Status</h4>
                                    <h4 className='text-formColor'>Degree</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full space-y-[1.625rem]'>
                    <div className='flex items-center gap-[0.8125rem]'>
                        <div className='w-[6px] h-[6px] bg-lemongreen rounded-full'></div>
                        <h4 className='text-limegray font-bold'>Employment Details</h4>
                    </div>
                    <div className='w-full'>
                        <div className='w-full pl-[2.6875rem] flex  items-center border border-[rgba(93,97,80,0.42)] rounded-[1rem] h-[7.625rem]'>
                            <div className='font-medium flex gap-[4.9375rem]'>
                                <div className='flex flex-col gap-[0.75rem] w-[11.8125rem]'>
                                    <h4 className='text-limegray'>Employment Type</h4>
                                    <h4 className='text-formColor'>Full Time</h4>
                                </div>
                                <div className='flex flex-col gap-[0.75rem] w-[11.8125rem]'>
                                    <h4 className='text-limegray'>Department Head </h4>
                                    <h4 className='text-formColor'>Roba Kasahun </h4>
                                </div>
                                <div className='flex flex-col gap-[0.75rem] w-[11.8125rem]'>
                                    <h4 className='text-limegray'>Joining Date</h4>
                                    <h4 className='text-formColor'>15/08/2002</h4>
                                </div>
                                <div className='flex flex-col gap-[0.75rem] w-[11.8125rem]'>
                                    <h4 className='text-limegray'>Sub Department</h4>
                                    <h4 className='text-formColor'>Engineering division 1</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full space-y-[1.625rem]'>
                    <div className='flex items-center gap-[0.8125rem]'>
                        <div className='w-[6px] h-[6px] bg-lemongreen rounded-full'></div>
                        <h4 className='text-limegray font-bold'>Compensation & Legal</h4>
                    </div>
                    <div className='w-full'>
                        <div className='w-full pl-[2.6875rem] flex  items-center border border-[rgba(93,97,80,0.42)] rounded-[1rem] h-[7.625rem]'>
                            <div className='font-medium flex gap-[4.9375rem]'>
                                <div className='flex flex-col gap-[0.75rem] w-[11.8125rem]'>
                                    <h4 className='text-limegray'>Salary</h4>
                                    <h4 className='text-formColor'>25,000.00</h4>
                                </div>
                                <div className='flex flex-col gap-[0.75rem] w-[11.8125rem]'>
                                    <h4 className='text-limegray'>Currency </h4>
                                    <h4 className='text-formColor'>USD</h4>
                                </div>
                                <div className='flex flex-col gap-[0.75rem] w-[11.8125rem]'>
                                    <h4 className='text-limegray'>Payment Method</h4>
                                    <h4 className='text-formColor'>Bank Transfer</h4>
                                </div>
                                <div className='flex flex-col gap-[0.75rem] w-[11.8125rem]'>
                                    <h4 className='text-limegray'>Bank Account Number</h4>
                                    <h4 className='text-formColor'>1000782634624</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-full'>
                        <div className='w-full pl-[2.6875rem] flex  items-center border border-[rgba(93,97,80,0.42)] rounded-[1rem] h-[7.625rem]'>
                            <div className='font-medium flex gap-[4.9375rem]'>
                                <div className='flex flex-col gap-[0.75rem] w-[11.8125rem]'>
                                    <h4 className='text-limegray'>Tax Identification Number</h4>
                                    <h4 className='text-formColor'>E09-101-F0D</h4>
                                </div>
                                <div className='flex flex-col gap-[0.75rem] w-[11.8125rem]'>
                                    <h4 className='text-limegray'>Benefits Enrollment </h4>
                                    <h4 className='text-formColor'>Health Insurance</h4>
                                </div>
                                <div className='flex flex-col gap-[0.75rem] w-[11.8125rem]'>
                                    <h4 className='text-limegray'>Passport Number</h4>
                                    <h4 className='text-formColor'>Bank Transfer</h4>
                                </div>
                                <div className='flex flex-col gap-[0.75rem] w-[11.8125rem]'>
                                    <h4 className='text-lemongreen'>Resume - View</h4>
                                    <h4 className='text-lemongreen'>Contract File - View</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full space-y-[1.625rem]'>
                    <div className='flex items-center gap-[0.8125rem]'>
                        <div className='w-[6px] h-[6px] bg-lemongreen rounded-full'></div>
                        <h4 className='text-limegray font-bold'>System Access & Work Details</h4>
                    </div>
                    <div className='w-full'>
                        <div className='w-full pl-[2.6875rem] flex  items-center border border-[rgba(93,97,80,0.42)] rounded-[1rem] h-[7.625rem]'>
                            <div className='font-medium flex gap-[4.9375rem]'>
                                <div className='flex flex-col gap-[0.75rem] w-[11.8125rem]'>
                                    <h4 className='text-limegray'>Shift Details</h4>
                                    <h4 className='text-formColor'>Morning Shift</h4>
                                </div>
                                <div className='flex flex-col gap-[0.75rem] w-[11.8125rem]'>
                                    <h4 className='text-limegray'>Work Location </h4>
                                    <h4 className='text-formColor'>Office</h4>
                                </div>
                                <div className='flex flex-col gap-[0.75rem] w-[11.8125rem]'>
                                    <h4 className='text-lemongreen'>Certification - View</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>

                </div>
            </div>
        </div>
    </div> 
  )
}

export default Page