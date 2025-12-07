'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { hrmsAPI } from "@/app/lib/api/client";

const AddEmp = ({ onClose, employeeID, subDepartments }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedSub, setSelectedSub] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // ✅ Filter the sub-departments based on search term
  const filteredSub = subDepartments.filter((sub) =>
    sub.subDepartmentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ Handle form submit
  const onSubmit = async (e) => {
    e.preventDefault(); // prevent page reload
    try {
      setIsSubmitting(true);

      if (!selectedSub) {
        alert("Please select a Sub Department from search.");
        return;
      }

      const depData = {
        EmployeeId: employeeID,
        DepartmentName: selectedSub.subDepartmentName, // ✅ only name
      };

      console.log("Submitting Data:", depData);

      const AssignSub = await hrmsAPI.updateEmployeeSubDepartment(depData);
      console.log("Submitting Data:", AssignSub);

      onClose();
    } catch (err) {
      console.error("❌ Error saving Department:", err.message || err);
      alert("Failed to assign employee. Check console for details.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="px-[3rem] py-[2.875rem] space-y-[3.125rem] font-semibold w-full">
      {/* Header */}
      <div className="flex justify-between">
        <div>
          <h1 className="textFormColor">Assign Employee To Sub Department</h1>
          <h4 className="text-limegray">
            Add a new Employee to sub department
          </h4>
        </div>
        <button
          onClick={onClose}
          className="rounded-full center-center cursor-pointer"
        >
          <img src="/image/Icon/Action/CloseCircle.png" alt="close" />
        </button>
      </div>

      {/* Form */}
      <form onSubmit={onSubmit} className="flex flex-col gap-[2.375rem]">
        <div className="w-full flex gap-[1.125rem]">
          <div className="flex flex-col gap-[2.375rem] w-full">
            {/* Sub Department Search */}
            <div className="relative w-full flex flex-col">
              <label className="text-formColor mb-[1rem]">Sub Department Name</label>
              <div className="w-full h-[3.4375rem] flex items-center gap-[1.1875rem] bg-[#1D2015] rounded-[0.625rem] px-[1.4375rem]">
                <img src="/image/Icon/SearchIcon.png" alt="" />
                <input
                  type="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search sub department by name"
                  className="placeholder-input text-white w-full h-full outline-0 bg-transparent"
                />
              </div>

              {/* Dropdown search results */}
              {searchTerm && filteredSub.length > 0 && (
                <div className="absolute top-[6rem] z-10 w-full bg-[#25281B] border border-[#3a3a3a] mt-1 rounded-md max-h-[200px] overflow-y-auto">
                  {filteredSub.map((sub) => (
                    <div
                      key={sub.subDepartmentName}
                      onClick={() => {
                        setSelectedSub(sub);
                        setSearchTerm('');
                      }}
                      className="p-2 hover:bg-[#343726] cursor-pointer text-white"
                    >
                      {sub.subDepartmentName}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Selected Sub Department Display */}
            <div className="flex flex-col w-full gap-[1rem]">
              <label className="textFormColor1">Selected Sub Department</label>
              <input
                type="text"
                value={selectedSub ? selectedSub.subDepartmentName : ''}
                readOnly
                className="inputMod pr-[1.5625rem] bg-[#2a2c1f] text-white"
              />
              {!selectedSub && (
                <p className="text-Error text-[1rem]">
                  Select a Sub Department from search
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="w-full h-[3.4375rem] mt-[0.5rem]">
          <button
            type="submit"
            className="w-full h-full bg-lemongreen rounded-[10px] cursor-pointer disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Assigning Employee..." : "Assign Employee"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEmp;
