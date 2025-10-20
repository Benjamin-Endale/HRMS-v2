// app/Admin/Employees/EmployeesPage.jsx
"use client";

import React , {useState} from 'react'
import { useRouter } from "next/navigation";
import { useSearchFilter } from '@/app/Components/useSearchFilter';
const EmployeesPage = ({ employees }) => {
  const router = useRouter();


// const filteredUsers = employees.filter((emp) => {
//   const term = searchTerm.trim().toLowerCase();

//   return (
//     emp.firstName?.toLowerCase().includes(term) ||
//     emp.lastName?.toLowerCase().includes(term) ||
//     `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(term) ||
//     emp.email?.toLowerCase().includes(term) ||
//     emp.employeeCode?.toLowerCase().includes(term) // <-- convert to lowercase
//   );
// });

  const { searchTerm, setSearchTerm, filteredItems: filteredUsers } = useSearchFilter(employees, [
    "firstName",
    "lastName",
    "employeeCode",
  ],[(employees) => `${employees.firstName} ${employees.lastName}`]);

  return (
    <div className='font-semibold flex flex-col gap-[3.9375rem]'>
      {/* headerSearcharea */}
      <div className='flex items-center gap-[2.125rem]'>
        <div className='w-[71.9375rem] h-[3.4375rem] flex items-center gap-[1.1875rem] bg-[#1D2015] rounded-[0.625rem] px-[1.4375rem]'>
          <img src="/image/Icon/SearchIcon.png" alt="" />
          <input
          
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}

            placeholder="Search employee by name,email or ID"
            className='placeholder-input text-white w-full h-full outline-0'
          />
        </div>
        <div className='w-[18.125rem] h-[3.4375rem] flex items-center justify-center rounded-[0.625rem] bg-[#151812] gap-[4.6875rem]'>
          <div className='flex items-center gap-[0.625rem]'>
            <img src="/svg/SvgImage/Filter.svg" alt="" />
            <span className='text-white'>All Department</span>
          </div>
          <img src="/image/Icon/ArrowDown.png" alt="" />
        </div>
      </div>

      {/* headerSection2 */}
      <div className='between'>
        <div>
          <h1 className='textWhite'>Employees Directory</h1>
          <h4 className='textLimegray'>
            Manage employee profiles, roles, and organization structure
          </h4>
        </div>
        <button
          type="button"
          className='cursor-pointer'
          onClick={() => router.push("EmployeeRegistration/AddNewemployee")}
        >
          <div className='center-center w-[12.75rem] h-[3.125rem] rounded-[0.625rem] gap-[0.625rem] bg-lemongreen'>
            <img src="/svg/SvgImage/PlusSign.svg" alt="" />
            <span className='text-black'>Add Employees</span>
          </div>
        </button>
      </div>

      {/* mainContentArea */}
      <div className='h-[31.25rem] overflow-y-auto scrollBarDash'>
        <table className='w-full text-left'>
          <thead className='text-white border-b border-limegray'>
            <tr>
              <th className='pb-[0.8125rem] pr-[7.5rem]'>Employee ID</th>
              <th className='pb-[0.8125rem] pr-[7.5rem]'>Employee Name</th>
              <th className='pb-[0.8125rem] pr-[7.5rem]'>Department</th>
              <th className='pb-[0.8125rem] pr-[16.875rem]'>Position</th>
              <th className='pb-[0.8125rem] pr-[10.5625rem]'>Action</th>
            </tr>
          </thead>
          <tbody className='text-input'>
            {filteredUsers && filteredUsers.length > 0 ? (
              filteredUsers.map((emp) => (
                <tr key={emp.employeeCode}>
                  <td className='pt-[2.25rem]'>
                    {emp.employeeCode}

                  </td>
                  <td className='pt-[2.25rem]'>{emp.firstName} {emp.lastName}</td>
                  <td className='pt-[2.25rem]'>{emp.department || "--"}</td>
                  <td className='pt-[2.25rem]'>{emp.position || "--"}</td>
                  <td className='flex items-center gap-[2.5625rem] pt-[2.25rem]'>
                    <button className='cursor-pointer' onClick={() => router.push(`/Admin/EmployeeView/${emp.employeeID}`)}>
                      <img src="/image/Icon/Action/eye.png" alt="" />
                    </button>
                    <button>
                      <img src="/image/Icon/Action/pen.png" alt="" />
                    </button>
                    <button>
                      <img src="/image/Icon/Action/Trash.png" alt="" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
             
              <tr><td colSpan="5" className="pt-[2rem] text-center text-gray-400">No employees found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeesPage;
