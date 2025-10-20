'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Dropdown } from '@/app/Components/DropDown';
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAdminForm } from '@/app/Store/AdminFormContext';

const schema = z.object({
  jobTitle: z.string().nonempty("Job Title is required"),
  employmentType: z.string().nonempty("Employment Type is required"),
  hireDate: z.string().nonempty("Joining Date is required"),
});

const Page = () => {
  const router = useRouter();
const {addEmployeeSecond, setAddEmployeeSecond} = useAdminForm();
  

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
        jobTitle: addEmployeeSecond.jobTitle || "",
        employmentType: addEmployeeSecond.employmentType || "",
        hireDate: addEmployeeSecond.hireDate || "",
    },
  });

  const onSubmit = (data) => {
    setAddEmployeeSecond(data)
    console.log("Form Data", data);
    router.push('/Admin/EmployeeRegistration/Compensation');         
  };

  
  return (
    <div className='font-semibold flex flex-col gap-[4rem]'>
      {/* Header */}
      <div className='flex flex-col gap-[2.5rem]'>
        <div className='flex items-center gap-[0.9375rem]'>
          <img 
            onClick={() => router.push('/EmployeeRegistration/AddNewemployee')} 
            src="/image/Icon/ArrowLeft.png" 
            alt="Back" 
          />
          <li className='textWhite list-none'>2. Employment Details</li>
        </div>

        {/* ProgressBar */}
        <div className='grid grid-cols-4'>
          <div className='rounded-[0.53125rem] bg-lemongreen w-[22.625rem] h-[5px]'></div>
          <div className='rounded-[0.53125rem] bg-lemongreen w-[22.625rem] h-[5px]'></div>
          <div className='rounded-[0.53125rem] bg-[rgba(223,223,223,0.26)] w-[22.625rem] h-[5px]'></div>
          <div className='rounded-[0.53125rem] bg-[rgba(223,223,223,0.26)] w-[22.625rem] h-[5px]'></div>
        </div>
      </div>

      <div className='between gap-[12.25rem]'>
        {/* Main Form */}
        <div className='w-[52.5625rem] h-[36.3125rem] overflow-y-auto scrollBarDash'>
          <form className='flex gap-[2.5625rem] px-[10px] flex-wrap' onSubmit={handleSubmit(onSubmit)}>
         {/* two column */}
          <div className='flex gap-[2.5625rem]'>  
            {/* Left Column */}
            <div className='flex flex-col w-[23.1875rem] gap-[35px]'>
              {/* Job Title */}
              <div className='flex flex-col gap-[1rem]'>
                <label className='text-formColor'>Job Title</label>
                <input 
                  type="text" 
                  placeholder='e.g. Senior Developer' 
                  className='inputMod' 
                  {...register("jobTitle")}
                />
                {errors.jobTitle && <span className="text-Error">{errors.jobTitle.message}</span>}
              </div>

              {/* Employment Type */}
              <div>
                <Controller
                  control={control}
                  name="employmentType"
                  render={({ field }) => (
                    <Dropdown
                      label="Employment Type"
                      options={['Full Time','Half Time','Remote']}
                      selected={field.value}
                      onSelect={field.onChange}
                      placeholder="Select Employment Type"
                    />
                  )}
                />
                {errors.employmentType && <span className="text-Error text-[1rem]">{errors.employmentType.message}</span>}
              </div>
            </div>
            <div className='flex flex-col w-[23.1875rem] gap-[35px]'>
              {/* Joining Date */}
              <div className='flex flex-col gap-[1rem]'>
                <label className='text-formColor'>Joining Date</label>
                <input 
                  type="date" 
                  className='inputMod pr-[1.5625rem]' 
                  {...register("hireDate")}
                />
                {errors.hireDate && <span className="text-Error text-[1rem]">{errors.hireDate.message}</span>}
              </div>
            </div>
          </div>
            {/* Buttons */}
            <div className='w-full h-[3.4375rem] mt-[4rem] flex gap-[2.5625rem]'>
              <button 
                type="button" 
                onClick={() => router.push('/Admin/EmployeeRegistration/AddNewemployee')} 
                className='w-[23.1875rem] border border-formColor text-formColor rounded-[10px] cursor-pointer'
              >
                Back
              </button>
              <button 
                type="submit" 
                className='w-[23.1875rem] bg-lemongreen rounded-[10px] cursor-pointer'
              >
                Next
              </button>
            </div>
          </form>
        </div>

        {/* Sidebar */}
        <div className='flex-1'>
          <div className='border border-limegray w-[31rem] rounded-[1.1875rem] px-[2.25rem] pt-[1.5625rem] pb-[1.9375rem]'>
            <div className='flex items-center gap-[10px] pb-[0.8125rem]'>
              <img src="/image/Icon/Alert.png" alt="Alert" />
              <span className='textFormColor'><strong>Important:</strong></span>
            </div>
            <div className='space-y-[2.25rem]'>
              <p className='textLimegray'>
                Provide accurate information about your current employment status, including your job title, department, and joining date.
              </p>
              <p className='textLimegray'>
                <strong className='text-formColor'>Tip:</strong> Double-check before submitting to avoid errors.
              </p>
            </div>
          </div>           
        </div>
      </div>
    </div>
  )
}

export default Page;
