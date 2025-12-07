'use client';

import React, { useState , useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchFilter } from '@/app/Components/useSearchFilter';
import { hrmsAPI } from "@/app/lib/api/client";

// ✅ Validation Schema
const departmentSchema = z.object({
  DepartmentName: z.string().min(1, 'Department Name is required'),
  Description: z.string().min(1, 'Department Description is required'),
});

const AddDep = ({ onClose, tenantId, org, employees , dep , addSub , addSubSmall, departmentId}) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedHead, setSelectedHead] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');


    // ✅ Pre-fill department head if updating
  useEffect(() => {
    if (dep?.departmentHeadEmail) {
      const existingHead = employees.find(
        (emp) => emp.email === dep.departmentHeadEmail
      );
      if (existingHead) setSelectedHead(existingHead);
    }
  }, [dep, employees]);
  // ✅ react-hook-form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(departmentSchema),
    defaultValues: {
      DepartmentName:dep?.departmentName ||  '',
      Description:dep?.description ||  '',
    },
  });

  // ✅ Search filtering for employees
  const filteredUsers = employees.filter((emp) => {
    const fullName = `${emp.firstName} ${emp.lastName}`.toLowerCase();
    return (
      emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fullName.includes(searchTerm.toLowerCase())
    );
  }); 

const onSubmit = async (data) => {
  try {
    setIsSubmitting(true);
 

    if (!selectedHead) {
      alert("Please select a Department Head from search.");
      return;
    }

    const depData = {
      departmentName: data.DepartmentName,
      description: data.Description,
      tenantId: tenantId,
      departmentHeadEmail: selectedHead.email,
    
    };

    console.log("Department Data:  " , depData)
    let result;
    if (departmentId) {
      // Update existing department
      console.log
      result = await hrmsAPI.updateDepartment(departmentId, depData);
      console.log("✅ Department updated:", result);
    } else {
      // Create new department
      result = await hrmsAPI.createDepartment(depData);
      console.log("✅ Department created:", result);
    }

    router.refresh();
    onClose();
  } catch (err) {
    console.error("❌ Error saving Department:", err.message || err);
  } finally {
    setIsSubmitting(false);
  }
};


  return (
    <div className="px-[3rem] py-[2.875rem] space-y-[3.125rem] font-semibold w-full">
      {/* Header */}
      <div className="flex justify-between">
        <div>
          <h1 className="textFormColor">Create New  {addSub} Department</h1>
          <h4 className="text-limegray">
            Add a new {addSubSmall} department and its basic information.
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-[2.375rem]"
      >
        <div className="w-full flex gap-[1.125rem]">
          <div className="flex flex-col gap-[2.375rem] w-full">
            {/* Department Name */}
            <div className="flex flex-col w-full gap-[1rem]">
              <label className="textFormColor1">{addSub} Department Name</label>
              <input
                type="text"
                placeholder="ex. Marketing"
                className="inputMod pr-[1.5625rem]"
                {...register('DepartmentName')}
              />
              {errors.DepartmentName && (
                <p className="text-Error text-[1rem]">
                  {errors.DepartmentName.message}
                </p>
              )}
            </div>

            {/* Department Head Search */}
            <div className="relative w-full flex flex-col ">
            <label className='text-formColor mb-[1rem]' htmlFor="">Search {addSub} Department Head</label>
              <div className="w-full h-[3.4375rem] flex items-center gap-[1.1875rem] bg-[#1D2015] rounded-[0.625rem] px-[1.4375rem]">
                <img src="/image/Icon/SearchIcon.png" alt="" />
                <input
                  type="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search employee by email or name"
                  className="placeholder-input text-white w-full h-full outline-0"
                />
              </div>

              {/* Dropdown search results */}
              {searchTerm && filteredUsers.length > 0 && (
                <div className="absolute top-[6rem] z-10 w-full bg-[#25281B] border border-[#3a3a3a] mt-1 rounded-md max-h-[200px] overflow-y-auto">
                  {filteredUsers.map((user) => (
                    <div
                      key={user.email}
                      onClick={() => {
                        setSelectedHead(user);
                        setSearchTerm('');
                      }}
                      className="p-2 hover:bg-[#343726] cursor-pointer text-white"
                    >
                      <div className="font-medium">
                        {user.firstName} {user.lastName}
                      </div>
                      <div className="text-sm text-gray-400">{user.email}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Department Head Display */}
            <div className="flex flex-col w-full gap-[1rem]">
              <label className="textFormColor1">{addSub} Department Head</label>
              <input
                type="text"
                placeholder="Select from search above"
                value={selectedHead ? `${selectedHead.firstName} ${selectedHead.lastName}` : ''}
                readOnly
                className="inputMod pr-[1.5625rem] bg-[#2a2c1f] text-white "
              />
              {!selectedHead && (
                <p className="text-Error text-[1rem]">
                  Select a {addSubSmall} Department Head from search
                </p>
              )}
            </div>

            {/* Department Description */}
            <div className="flex flex-col gap-[1rem]">
              <label className="text-formColor">{addSub} Department Description</label>
              <textarea
                placeholder="Enter department description .."
                className="text-formColor bg-inputBack rounded-[10px] placeholder-input pt-[0.59375rem] pl-[1.1875rem] resize-none h-[5.5rem]"
                {...register('Description')}
              />
              {errors.Description && (
                <p className="text-Error text-[1rem]">
                  {errors.Description.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="w-full h-[3.4375rem] mt-[0.5rem]">
          <button
            type="submit"
            className="w-full h-full bg-lemongreen rounded-[10px] cursor-pointer"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating Department..." : "Create Department"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDep;
