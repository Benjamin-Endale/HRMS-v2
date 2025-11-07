'use client'

import { useRouter } from 'next/navigation'
import React, {useEffect,useState} from 'react'


const EmployeeDetail = ({employees}) => {
const router = useRouter({})
if (!employees) return <div>No employee data</div>;

console.log(employees.photoUrl)
// const [time, setTime] = useState('');
// const hireDate = new Date(employees.hireDate).toLocaleDateString();


//   useEffect(() => {
//     const getTime = (hireDateString) => {
//       const [day, month, year] = hireDateString.split('/').map(Number);
//       const hire = new Date(year, month - 1, day);
//       const now = new Date();

//       const diffDays = Math.floor((now - hire) / (1000 * 60 * 60 * 24));
//       const years = Math.floor(diffDays / 365);
//       const remainingDays = diffDays % 365;
//       const months = Math.floor(remainingDays / 30);
//       const days = remainingDays % 30;

//       if (years > 0) return `${years} year${years > 1 ? 's' : ''} ${months} month${months > 1 ? 's' : ''}`;
//       if (months > 0) return `${months} month${months > 1 ? 's' : ''}`;
//       return `${days} day${days > 1 ? 's' : ''}`;
//     };

//     setTime(getTime(hireDate));
//   }, [hireDate]);

  return (
    <div className='font-semibold'>
        <div className='flex gap-[3.375rem]'>
            <div className='w-[19.125rem] flex flex-col gap-[1.25rem]'>
                <div className='space-y-[2.125rem] bg-[rgba(190,229,50,0.05)] px-[0.9375rem] pt-[0.9375rem] pb-[1.625rem] rounded-[1rem] w-full'>
                    <div className='w-[17.25rem] h-[17.25rem] flex items-center'>
                        <img src={employees.photoUrl === "" 
                            ? '/image/photoTemplate.png' 
                            : employees.photoUrl}  alt="" />
                   
                    </div>
                    <div className='between '>
                        <div>
                            <div className='flex gap-[0.8125rem]'>
                                <h4 className='text-formColor'>{employees.firstName} {employees.lastName}</h4>
                                <span className="before:content-['•'] before:text-lemongreen before:mr-[0.5rem] text-limegray">2y</span>
                            </div>
                            <h4 className='text-limegray'>CXO - Senior Designer</h4>
                        </div>
                        <div className='flex items-end'>
                            <h4 className='text-limegray'>{employees.employeeCode}</h4>
                        </div>
                    </div>
                </div>
                <div className='bg-[rgba(190,229,50,0.05)] h-[4.375rem] w-full rounded-[1rem] flex  items-center pl-[1.4375rem]'>
                    <div className='flex gap-[0.8125rem] items-center'>
                        <div className='w-[6px] h-[6px] bg-formColor rounded-full'></div>
                        <h4 className="text-limegray font-medium">{employees.department || "No Department"} </h4>
                    </div>
                </div>
                <div className='font-medium space-y-[2.625rem] rounded-[1rem] bg-[rgba(190,229,50,0.05)] px-[1.5rem] pt-[1.5rem] pb-[1.8rem]'>
                    <div className='flex flex-col gap-[0.75rem]'>
                        <h4 className='text-limegray'>Email</h4>
                        <h4 className='text-formColor'>{employees.email}</h4>
                    </div>
                    <div className='flex flex-col gap-[0.75rem]'>
                        <h4 className='text-limegray'>Phone</h4>
                        <h4 className='text-formColor'>{employees.phoneNumber}</h4>
                    </div>
                    <div className='flex flex-col gap-[0.75rem]'>
                        <h4 className='text-limegray'>Address</h4>
                        <h4 className='text-formColor'>{employees.address}</h4>
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
                                    <h4 className='text-formColor'>{employees.nationality}</h4>
                                </div>
                                <div className='flex flex-col gap-[0.75rem] w-[11.8125rem]'>
                                    <h4 className='text-limegray'>Date Of Birth</h4>
                                    <h4 className='text-formColor'>{new Date(employees.dateOfBirth).toLocaleDateString()}</h4>
                                </div>
                                <div className='flex flex-col gap-[0.75rem] w-[11.8125rem]'>
                                    <h4 className='text-limegray'>Gender</h4>
                                    <h4 className='text-formColor'>{employees.gender}</h4>
                                </div>
                                <div className='flex flex-col gap-[0.75rem] w-[11.8125rem]'>
                                    <h4 className='text-limegray'>Marital Status</h4>
                                    <h4 className='text-formColor'>{employees.maritalStatus}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-full'>
                        <div className='w-full pl-[2.6875rem] flex  items-center border border-[rgba(93,97,80,0.42)] rounded-[1rem] h-[7.625rem]'>
                            <div className='font-medium flex gap-[4.9375rem]'>
                                <div className='flex flex-col gap-[0.75rem] w-[11.8125rem]'>
                                    <h4 className='text-limegray'>Emergency Contact Name</h4>
                                    <h4 className='text-formColor'>{employees.emergencyContactName}</h4>
                                </div>
                                <div className='flex flex-col gap-[0.75rem] w-[11.8125rem]'>
                                    <h4 className='text-limegray'>Emergency Contact</h4>
                                    <h4 className='text-formColor'>{employees.emergencyContactNumber}</h4>
                                </div>
                                <div className='flex flex-col gap-[0.75rem] w-[11.8125rem]'>
                                    <h4 className='text-limegray'>Education Status</h4>
                                    <h4 className='text-formColor'>{employees.employeeEducationStatus}</h4>
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
                                    <h4 className='text-formColor'>{employees.employmentType}</h4>
                                </div>
                                <div className='flex flex-col gap-[0.75rem] w-[11.8125rem]'>
                                    <h4 className='text-limegray'>Department Head </h4>
                                    <h4 className='text-formColor'>--</h4>
                                </div>
                                <div className='flex flex-col gap-[0.75rem] w-[11.8125rem]'>
                                    <h4 className='text-limegray'>Joining Date</h4>
                                    <h4 className='text-formColor'>{new Date(employees.hireDate).toLocaleDateString()}</h4>
                                </div>
                                <div className='flex flex-col gap-[0.75rem] w-[11.8125rem]'>
                                    <h4 className='text-limegray'>Sub Department</h4>
                                    <h4 className='text-formColor'>--</h4>
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
                                    <h4 className='text-formColor'>{employees.salary}</h4>
                                </div>
                                <div className='flex flex-col gap-[0.75rem] w-[11.8125rem]'>
                                    <h4 className='text-limegray'>Currency </h4>
                                    <h4 className='text-formColor'>{employees.currency}</h4>
                                </div>
                                <div className='flex flex-col gap-[0.75rem] w-[11.8125rem]'>
                                    <h4 className='text-limegray'>Payment Method</h4>
                                    <h4 className='text-formColor'>{employees.paymentMethod}</h4>
                                </div>
                                <div className='flex flex-col gap-[0.75rem] w-[11.8125rem]'>
                                    <h4 className='text-limegray'>Bank Account Number</h4>
                                    <h4 className='text-formColor'>{employees.bankAccountNumber}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-full'>
                        <div className='w-full pl-[2.6875rem] flex  items-center border border-[rgba(93,97,80,0.42)] rounded-[1rem] h-[7.625rem]'>
                            <div className='font-medium flex gap-[4.9375rem]'>
                                <div className='flex flex-col gap-[0.75rem] w-[11.8125rem]'>
                                    <h4 className='text-limegray'>Tax Identification Number</h4>
                                    <h4 className='text-formColor'>{employees.taxIdenitificationNumber || "--"}</h4>
                                </div>
                                <div className='flex flex-col gap-[0.75rem] w-[11.8125rem]'>
                                    <h4 className='text-limegray'>Benefits Enrollment </h4>
                                    <h4 className='text-formColor'>{employees.benefitsEnrollment}</h4>
                                </div>
                                <div className='flex flex-col gap-[0.75rem] w-[11.8125rem]'>
                                    <h4 className='text-limegray'>Passport Number</h4>
                                    <h4 className='text-formColor'>{employees.passportNumber}</h4>
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
                                    <h4 className='text-formColor'>{employees.shiftDetails}</h4>
                                </div>
                                <div className='flex flex-col gap-[0.75rem] w-[11.8125rem]'>
                                    <h4 className='text-limegray'>Work Location </h4>
                                    <h4 className='text-formColor'>{employees.workLocation}</h4>
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

export default EmployeeDetail