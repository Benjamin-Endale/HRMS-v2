'use client'
import React , {useState} from 'react'
import SubNavigation from '@/app/SubNavigation'
import ModalContainerAuth from '@/app/Modals/AddAuth/ModalContainerAuth'
import AddAuth from '@/app/Modals/AddAuth/AddAuth'
import { useSearchFilter } from '@/app/Components/useSearchFilter';
import { hrmsAPI } from '@/app/lib/api/client'
import { toPascal } from '@/app/lib/utils/toPascal';
import { useRouter } from 'next/navigation'

const UncategorizedPage = ({employees , token , tenantId , departmentId}) => {
  const router = useRouter()

  const { searchTerm, setSearchTerm, filteredItems } = useSearchFilter(employees, [
    "firstName",
    "lastName",
    "employeeCode",
    "email"
  ],[(employees) => `${employees.firstName} ${employees.lastName}`]);
  const [isOpen,setisOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  
  const handleAssign = async   (emp) => {
    try {
      // ✅ API call
      console.log("lol my departmentID,: " , departmentId)
      const employee = await hrmsAPI.updateEmployeeDepartment(emp.employeeID,departmentId);
      console.log("✅ Department saved:", employee);

      router.refresh();
    } catch (err) {
      console.error("❌ Error saving Department:", err.message || err);
    } finally {
      // setIsSubmitting(false);
    }
  };


  return (
      <div className='font-semibold'>
        <SubNavigation readPath= {`/Admin/AssignDepartment/${departmentId}/Uncategorized`}/>
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
              <thead className=' text-formColor text-nowrap border-b border-limegray'>
                <tr> 
                  <th className='pr-[6.75rem] pb-[0.8125rem]'>Employee ID</th>
                  <th className='pr-[11.625rem] pb-[0.8125rem]'>Employee Name</th>
                  <th className='pr-[15.9375rem] pb-[0.8125rem]'>Position</th>
                  <th className='pr-[20.8125rem] pb-[0.8125rem]'>Email</th>
                  <th className='pr-[15.25rem] pb-[0.8125rem]'>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.length > 0 ? (filteredItems.map((emp)=> (
                  <tr key={emp.employeeCode}>
                    <td className='pt-[2.25rem]'>
                        <h1 className='textLimegray1'>{emp.employeeCode}</h1>
                    </td>
                    <td className='pt-[2.25rem]'>
                        <h1 className='textLimegray1'>{emp.firstName} {emp.lastName}</h1>
                    </td>
                    <td className='pt-[2.25rem]'>
                        <h1 className='textLimegray1'>{emp.jobTitle || "--"} </h1>
                    </td>
                    <td className='pt-[2.25rem] '>
                        <h1 className='textLimegray1'>{emp.email}</h1>
                    </td>
                    <td className="flex items-center gap-[2.5625rem] pt-[2.25rem]">
                      <button
                        type="button"
                        onClick={() => handleAssign(emp)} // ✅ Fix: pass emp to the function
                        className="cursor-pointer"
                      >
                        <div className="flex items-center border rounded-full border-[#303030] gap-[0.375rem] px-[0.9375rem] py-[6px]">
                          <img src="/image/Icon/Action/Department.png" alt="" />
                          <span className="text-lemongreen text-sm">
                            Assign Department
                          </span>
                        </div>
                      </button>
                  </td>
                  </tr>
                ))) : (
                  <tr>
                    <td colSpan="5" className='text-Error text-center text-nowrap pt-10'>No Employees without Department</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
      </div>
  )
}

export default UncategorizedPage