'use client'
import React, {useState} from 'react'
import SubNavigation from '@/app/SubNavigation'
import ModalContainerRevoke from '@/app/Modals/Revoke/ModalContainerRevoke'
import Revoke from '@/app/Modals/Revoke/Revoke'
import { useRouter } from 'next/navigation'
import { useSearchFilter } from '@/app/Components/useSearchFilter';
import { hrmsAPI } from '@/app/lib/api/client';
import ModalContainerDep from '@/app/Modals/AssignEmpSub/ModalContainerEmp'
import ModalContainerEmp from '@/app/Modals/AssignEmpSub/ModalContainerEmp'
import AddEmp from '@/app/Modals/AssignEmpSub/AddEmp'
const page = ({employeesDepartment, token , departmentId , subDepartments}) => {

  console.log("BEnjamin ENedale ",employeesDepartment)

    const [isOpen,setisOpen] = useState(false)
    const [isOpen1,setisOpen1] = useState(false)

        const [employeeList, setEmployeeList] = useState(employeesDepartment || []); 
    
    const router = useRouter()
    const [selectedUser,setSelectedUser] = useState()
    const [users, setUsers] = useState(employeesDepartment || []);

  const { searchTerm, setSearchTerm, filteredItems: filteredUsers } = useSearchFilter(employeesDepartment, [
    "firstName",
    "lastName",
    "employeeCode",
    "fullName"
  ]);


  const handleRevoke = async (usr) => {
    try {
      console.log("MY User", usr.employeeID);
      await hrmsAPI.deleteEmployeeDepartmentId(usr.employeeID);

      // Remove from local state instantly
      setEmployeeList(prev => prev.filter(emp => emp.employeeID !== usr.employeeID));
      setisOpen(false);
    } catch (err) {
      console.error("❌ Error saving Employee:", err.message || err);
    }
  };

    


  return (
      <div className='font-semibold'>
        <SubNavigation readPath= {`/Admin/AssignDepartment/${departmentId}/Categorized`}/>
        <div className='flex w-full gap-[2.125rem] mt-[3.6875rem] '>
            <div className='w-full h-[3.4375rem]  bg-[rgba(21,24,18,1)] flex items-center gap-[1.1875rem] rounded-[0.625rem] px-[1.4375rem] '>
              <img src="/svg/SvgImage/Search.svg" alt="" />
                <input type="search" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search employee by name, email or ID" className='placeholder-input text-white  w-full h-full outline-0' name="" id="" />
            </div>
        </div>

          <div className='pb-[2.1875rem] pt-[4.25rem]'>
            <table className='w-full '>
              <thead className=' text-formColor border-b border-limegray'>
                <tr>
                  <th className='pr-27 pb-[0.8125rem]'>Employee ID</th>
                  <th className='pr-46.5 pb-[0.8125rem]'>Employee Name</th>
                  <th className='pr-63.75 pb-[0.8125rem]'>Position</th>
                  <th className='pr-75.25 pb-[0.8125rem]'>Email</th>
                  <th className='pr-69 pb-[0.8125rem]'>Action</th>
                </tr>
              </thead>
              <tbody>
                {employeeList.length > 0 ? (employeeList.map((usr)=> (
                  <tr key={usr.email}>
                    <td className='pt-[2.25rem]'>
                        <h1 className='textLimegray1'>{usr.employeeCode}</h1>
                    </td>
                    <td className='pt-[2.25rem]'>
                        <h1 className='textLimegray1'>{usr.firstName} {usr.lastName}</h1>
                    </td>
                    <td className='pt-[2.25rem] '>
                        <h1 className='textLimegray1'>{usr.email}</h1>
                    </td>
                    <td className='pt-[2.25rem]'>
                        <h1 className='textLimegray1'>{usr.jobTitle || '--'}</h1>
                    </td>

                    <td className='flex items-center gap-13.25 pt-[2.25rem]'>
                      <button
                        type="button"
                         onClick={()=>setisOpen1(true)}
                        className="cursor-pointer"
                      >
                        <div className="flex items-center border rounded-full border-[#303030] gap-[0.375rem] px-[0.9375rem] py-[6px]">
                          <img src="/image/Icon/Action/Department.png" alt="" />
                          <span className="text-lemongreen text-sm text-nowrap">
                            Assign Sub Department
                          </span>
                        </div>
                      </button>
                      <ModalContainerEmp open={isOpen1}>
                        <AddEmp subDepartments={subDepartments} employeeID={usr.employeeID}   departmentId={departmentId}  onClose={() => setisOpen1(false)}/>
                      </ModalContainerEmp>



                    </td>
                  </tr>
                ))) : (
                  <tr>
                    <td colSpan="6" className='text-Error text-center text-nowrap pt-10'>No Employees in The Department</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
      </div>
  )
}

export default page