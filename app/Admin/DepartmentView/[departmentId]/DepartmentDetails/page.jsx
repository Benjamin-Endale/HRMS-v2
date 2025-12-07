'use client'
import ModalContainerSub from '@/app/Modals/AddSub/ModalContainerSup'
import AddSub from '@/app/Modals/AddSub/AddSup'
import { useRouter } from 'next/navigation'
import React , {useState} from 'react'
// import { useSearchFilter } from '@/app/Components/useSearchFilter';
import { useSearchFilter } from '@/app/Components/useSearchFilter';
import ModalContainerDep from '@/app/Modals/AddDep/ModalContainerDep'
import AddDep from '@/app/Modals/AddDep/AddDep'
import ModalContainerRevoke from '@/app/Modals/Revoke/ModalContainerRevoke'
import Revoke from '@/app/Modals/Revoke/Revoke'
import { hrmsAPI } from '@/app/lib/api/client'


const page = ({dep , departmentId , employees , tenantId}) => {
    const router = useRouter()
    const [isOpen,setIsOpen] = useState(false)
        const [isOpen2,setIsOpen2] = useState(false)
    const [selectedUser,setSelectedUser] = useState()
    const [EmpinDepList, setEmployeeDep] = useState(dep.employees || []); 

    const [isOpen1,setIsOpen1] = useState(false)
//   const { searchTerm, setSearchTerm, filteredItems } = useSearchFilter(employees, [
//     "firstName",
//     "lastName",
//     "employeeCode",
//     "email"
//   ],[(employees) => `${employees.firstName} ${employees.lastName}`]);


  const handleRevoke = async (dep) => {
    try {
      console.log("MY User", dep.employeeID);
      await hrmsAPI.deleteEmployeeDepartmentId(dep.employeeID);

      // Remove from local state instantly
      setEmployeeDep(prev => prev.filter(emp => emp.employeeID !== dep.employeeID));
      setIsOpen2(false);
    } catch (err) {
      console.error("❌ Error saving Employee:", err.message || err);
    }
  };

  const { searchTerm, setSearchTerm, filteredItems: filteredUsers } = useSearchFilter(dep.employees, [
    "firstName",
    "lastName",
    "employeeCode",
  ],[(dep) => `${dep.employees.firstName} ${dep.employees.lastName}`]);
  return (
    <div className='font-semibold '>
        <div className=' flex flex-col gap-[3.3125rem]'>
            <div className='between'>
                <div className='flex items-center gap-[0.9375rem]'>
                    <img onClick={() => router.back()} className='cursor-pointer' src="/image/Icon/ArrowLeft.png" alt="Back" />
                    <h1 className='textWhite'>{dep.departmentName} Department</h1>
                </div>
                <div className='flex gap-[1.5rem]' >
                    <button type="button" className='cursor-pointer' onClick={()=>setIsOpen1(true)} >
                        <div className='center-center w-[12.75rem] h-[3.125rem] rounded-[0.625rem] border border-limegray gap-[0.625rem] bg-inherit'>
                        <img src="/image/Icon/Action/Penx.png" alt="" />
                        <span className='text-formColor '>Edit Department</span>
                        </div>
                    </button>
                    <ModalContainerDep open={isOpen1}>
                        <AddDep tenantId={tenantId} addSub={'Sub'} addSubSmall={'sub'}   dep={dep} employees={employees} departmentId={departmentId}  onClose={() => setIsOpen1(false)} />
                    </ModalContainerDep>
                    <button type="button" className='cursor-pointer'>
                        <div className='center-center w-[12.75rem] h-[3.125rem] rounded-[0.625rem] border border-limegray gap-[0.625rem] bg-inherit' onClick={()=>router.push(`/Admin/AssignDepartment/${departmentId}/Uncategorized`)}>
                            <img src="/image/AddCircle.png" alt="" />
                            <span className='text-formColor' >Add Existing Employee</span>
                        </div>
                    </button>
                    <button type="button" className='cursor-pointer'>
                        <div className='center-center w-[12.75rem] h-[3.125rem] rounded-[0.625rem] gap-[0.625rem] bg-lemongreen' onClick={()=>router.push(`/Admin/DepartmentEmployeeRegistration/${departmentId}/AddNewemployee`)}>
                        <img src="/svg/Svgimage/PlusSign.svg" alt="" />
                        <span className='text-black'>Add Employees</span>
                        </div>
                    </button>
                </div>

            </div>
            {/* InformationContainers */}
            <div className='flex gap-[1.25rem] justify-between'>
                <div className='carDash2'>
                    <div className='h-full between flex-col'>
                    <div className='flex justify-between'>
                        <div>
                            <img src="/image/Icon/ProfileWhiteIcon.png" alt="" />
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <span className='text-5xl text-formColor'>{dep.totalEmployees}</span>
                        <span className='text-formColor'>Total Employee</span>
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
                        <span className='text-5xl text-formColor'>{dep.newHires}</span>
                        <span className='text-formColor'>New hires this month</span>
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
                            <span className='text-5xl text-formColor'>{dep.goalStatistics}%</span>
                            <span className='text-formColor'>Goal Achieved</span>
                        </div>
                    </div>
                </div>
            </div>
          <div className='between'>
            <div className='flex flex-col'>
              <h1 className='textFormColor'>Department Employees</h1>
            </div>
            <div className='flex gap-[1.5625rem]'>
                <button type="button" className='cursor-pointer' onClick={()=>router.push(`/Admin/DepartmentView/${departmentId}/SubDepartmentView`)}>
                    <div className='center-center w-[12.75rem] h-[3.125rem] rounded-[0.625rem] border border-limegray gap-[0.625rem] bg-inherit'>
                    <img src="/image/Icon/Action/eye.png" alt="" />
                    <span className='text-formColor '>Sub Departments</span>
                    </div>
                </button>
                <button type="button" className='cursor-pointer' onClick={()=>setIsOpen(true)}>
                    <div className='center-center w-[15.125rem] h-[3.125rem] rounded-[0.625rem] gap-[0.625rem] bg-lemongreen'>
                    <img src="/svg/Svgimage/PlusSign.svg" alt="" />
                    <span className='text-black'>Add Sub Department</span>
                    </div>
                </button>
              {/* Modal */}
                <ModalContainerSub  open={isOpen}>
                     <AddSub tenantId={tenantId}   dep={dep} employees={employees} departmentId={departmentId} onClose={() => setIsOpen(false)} />
                </ModalContainerSub>
            </div>
          </div>
            {/* SearchArea */}
            <div className='flex gap-[2.125rem] pb-[3.3125rem]'>
              <div className='w-[71.9375rem] h-[3.4375rem]  flex items-center gap-[1.1875rem] bg-[#1D2015] rounded-[0.625rem] px-[1.4375rem] '>
                <img src="/image/Icon/SearchIcon.png" alt="" />
                <input type="search" placeholder="Search employee by name,email or ID" className='placeholder-input text-white  w-full h-full outline-0' name="" id="" />
              </div>

              {/* filter */}
              <div className='w-[18.125rem] h-[3.4375rem]  between-center  rounded-[0.625rem] bg-[#151812] gap-[4.6875rem] px-[1.5625rem]'>
                <div className='flex items-center gap-[0.625rem]'>
                  <img src="/svg/SvgImage/Filter.svg" alt="" />
                  <span className='text-white text-nowrap'>All Sub Department</span>
                </div>
                <img src="/image/Icon/ArrowDown.png" alt="" />
              </div>
            </div>
        </div>
        <div className='h-[25.625rem]'>
            <table className='w-full'>
            <thead className=' text-formColor border-b border-limegray'>
                <tr className='text-nowrap'>
                <th className='pr-[9.375rem] pb-[0.8125rem]'>Employee Name</th>
                <th className='pr-[14.8125rem] pb-[0.8125rem]'>Position</th>
                <th className='pr-[17.8125rem] pb-[0.8125rem]'>Email</th>
                <th className='pr-[6.1875rem] pb-[0.8125rem]'>Sub department </th>
                <th className='pr-[10.125rem] pb-[0.8125rem]'>Phone</th>
                <th className='pr-[11.75rem] pb-[0.8125rem]'>Action</th>
                </tr>
            </thead>
            <tbody className=''>
            {EmpinDepList && EmpinDepList.length > 0 ? (
              EmpinDepList.map((dep) => (
                <tr key={dep.employeeID}>
                    <td className='pt-[2.25rem]'>
                        <h4 className='text-limegray'>{dep.employeeName}</h4>
                    </td>
                    <td className='pt-[2.25rem]'>
                        <h4 className='text-limegray'>{dep.jobTitle}</h4>
                    </td>
                    <td className='pt-[2.25rem]'>
                        <h4 className='text-limegray'>{dep.email}</h4>
                    </td>
                    <td className='pt-[2.25rem]'>
                        <h4 className='text-limegray'>{dep.departmentName || '--'}</h4>
                    </td>
                    <td className='pt-[2.25rem]'>
                        <h4 className='text-limegray'>{dep.phoneNumber || '--'}</h4>
                    </td>
                    <td className='flex items-center gap-[2.5625rem] pt-[1.9375rem]'>
                        <button className='cursor-pointer' onClick={() => router.push(`/Admin/EmployeeEdit/${emp.employeeID}`)}>
                        <img src="/image/Icon/Action/pen.png" alt="" />
                        </button>
                      <button onClick={() => {
                      setSelectedUser(dep);setIsOpen2(true);}} type="button" className='cursor-pointer'>
                        <div>
                            <img src="/image/Icon/Action/Trash.png" alt="" />
                        </div>
                      </button>
                      {/* Modal */}
                        <ModalContainerRevoke open={isOpen2}>
                            <Revoke
                            Header='Are you sure?'
                            Parag={`Are you sure you want to revoke ${selectedUser?.firstName || 'this user'}?`}
                            confirmation='Revoke'
                            onNavigate={() => setIsOpen2(false)}
                            onConfirm={()=>handleRevoke(dep)}
                            color='bg-Error'
                            />
                        </ModalContainerRevoke>
                    </td>
                </tr>
              ))
            ) : (
             
              <tr><td colSpan="5" className="pt-[2rem] text-center text-Error">No employees found</td></tr>
            )}
            </tbody>
            </table>

        </div>
    </div>
  )
}

export default page