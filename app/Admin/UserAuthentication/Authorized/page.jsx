'use client'
import React, {useState} from 'react'
import SubNavigation from '@/app/SubNavigation'
import ModalContainerRevoke from '@/app/Modals/Revoke/ModalContainerRevoke'
import Revoke from '@/app/Modals/Revoke/Revoke'
import { useRouter } from 'next/navigation'
const Page = () => {

  const employee = [
    {EmployeeId: 'EMP001' , EmployeeName:'Benjamin Endale', Email: 'rabbitedhole@gmail.com', Role: 'SystemAdmin' , Position:'Senior Software Dev'},
    {EmployeeId: 'EMP002' , EmployeeName:'Benjamin Endale', Email: 'rabbitedhole@gmail.com', Role: 'HR' , Position:'Senior Software Dev'}

  ]
    const [isOpen,setisOpen] = useState(false)
    const router = useRouter()

  return (
      <div className='font-semibold'>
        <SubNavigation readPath= '/Admin/UserAuthentication/Authorized'/>
        <div className='flex w-full gap-[2.125rem] mt-[3.6875rem] '>
            <div className='w-full h-[3.4375rem]  bg-[rgba(21,24,18,1)] flex items-center gap-[1.1875rem] rounded-[0.625rem] px-[1.4375rem] '>
              <img src="/svg/SvgImage/Search.svg" alt="" />
                <input type="search" placeholder="Search employee by name, email or ID" className='placeholder-input text-white  w-full h-full outline-0' name="" id="" />
            </div>
        </div>

          <div className='pb-[2.1875rem] pt-[4.25rem]'>
            <table className='w-full '>
              <thead className=' text-formColor border-b border-limegray'>
                <tr>
                  <th className='pr-[4.3125rem] pb-[0.8125rem]'>Employee ID</th>
                  <th className='pr-[11.375rem] pb-[0.8125rem]'>Employee Name</th>
                  <th className='pr-[20.5rem] pb-[0.8125rem]'>Email</th>
                  <th className='pr-[13.5rem] pb-[0.8125rem]'>Position</th>
                  <th className='pr-[10.125rem] pb-[0.8125rem]'>Role</th>
                  <th className='pr-[8.6875rem] pb-[0.8125rem]'>Action</th>
                </tr>
              </thead>
              <tbody>
                {employee.map((emp)=> (
                  <tr key={emp.EmployeeId}>
                    <td className='pt-[2.25rem]'>
                        <h1 className='textLimegray1'>{emp.EmployeeId}</h1>
                    </td>
                    <td className='pt-[2.25rem]'>
                        <h1 className='textLimegray1'>{emp.EmployeeName}</h1>
                    </td>
                    <td className='pt-[2.25rem] '>
                        <h1 className='textLimegray1'>{emp.Email}</h1>
                    </td>
                    <td className='pt-[2.25rem]'>
                        <h1 className='textLimegray1'>{emp.Position}</h1>
                    </td>
                    <td className='pt-[2.25rem]'>
                        <h1 className='textLimegray1'>{emp.Role}</h1>
                    </td>
                    <td className='flex items-center gap-[2.5625rem] pt-[2.25rem]'>
                      <button onClick={()=>setisOpen(true)} type="button" className='cursor-pointer'>
                        <div className='flex items-center border rounded-full  border-[#303030] gap-[0.375rem] px-[0.9375rem] py-[6px]'>
                            <img src="/image/Icon/Action/X.png" alt="" />
                            <span className='text-Error text-sm'>Revoke</span>
                        </div>
                      </button>
                      {/* Modal */}
                      <ModalContainerRevoke open={isOpen}>
                        <Revoke
                          Header="Are you sure "
                          Parag="Are you sure you want to revoke this user?"
                          onNavigate={() => {
                            setisOpen(false);
                            router.push('/Admin/UserAuthentication/Authorized');
                          }}
                          confirmation="Revoke"

                        />
                      </ModalContainerRevoke>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      </div>
  )
}

export default Page