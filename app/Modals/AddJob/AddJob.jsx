'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Dropdown } from '@/app/Components/DropDown';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { hrmsAPI } from "@/app/lib/api/client";


const jobSchema = z.object({
  jobTitle: z.string().min(3, 'Job Title is required'),
  location: z.string().min(2, 'Location is required'),
  salaryRange: z
    .string()
    .min(1, 'Salary range is required')
    .regex(/^\d{1,3}(,\d{3})*\s*-\s*\d{1,3}(,\d{3})*$/, 'Invalid format. Example: 10,000 - 15,000'),
  department: z.string().min(1, 'Department is required'),
  jobType: z.string().min(1, 'Job Type is required'),
  deadline: z
    .string()
    .min(1, { message: "Application Deadline is required" }) 
    .refine(
      (value) => {
        if (!value) return false;
        const today = new Date();
        const deadline = new Date(value);
        return deadline >= today;
      },
      { message: 'Deadline must be today or later' }
    ),
  description: z.string().min(5, 'Job Description is required'),
  requirement: z.string().min(5, 'Requirement is required'),
});

export default function AddJob({ onClose , tenantId, token  }) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      jobTitle: '',
      location: '',
      salaryRange: '',
      department: '',
      jobType: '',
      deadline: '',
      description: '',
      requirement: '',
    },
    mode: 'onChange', // 👈 live validation
  });

  const onSubmit = async (data) => {
    try {

      const job = {
        ...data,
        TenantId: tenantId,
        DepartmentName:data.department,
        JobDescription:data.description,
        applicationDeadline:data.deadline
      };



      // ✅ API call
      const JobData = await hrmsAPI.createJob(job,token);
      console.log("✅ Department saved:", JobData);


      router.refresh();
      onClose();
    } catch (err) {
      console.error("❌ Error saving Department:", err.message || err);
    } finally {
    }
  };

  return (
    <div className="px-[3rem] py-[2.875rem] space-y-[3.125rem] font-semibold w-full">
      {/* Header */}
      <div className="flex justify-between">
        <div>
          <h1 className="textFormColor">Create New Job Posting</h1>
          <h4 className="text-limegray">Fill in the details to create a new job posting</h4>
        </div>
        <button onClick={onClose} className="rounded-full center-center cursor-pointer">
          <img src="/image/Icon/Action/CloseCircle.png" alt="Close" />
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[2.375rem]">
        <div className="w-full flex gap-[1.125rem]">
          {/* Left Column */}
          <div className="flex flex-col gap-[2.375rem] w-[15.5625rem]">
            {/* Job Title */}
            <div className="flex flex-col w-full gap-[1rem]">
              <label className="textFormColor1">Job Title</label>
              <input
                type="text"
                placeholder="e.x Frontend developer"
                className="inputMod pr-[1.5625rem]"
                {...register('jobTitle')}
              />
              {errors.jobTitle && <p className="text-Error text-[1rem]">{errors.jobTitle.message}</p>}
            </div>

            {/* Location */}
            <div className="flex flex-col w-full gap-[1rem]">
              <label className="textFormColor1">Location</label>
              <input
                type="text"
                placeholder="e.x Addis Abeba"
                className="inputMod pr-[1.5625rem]"
                {...register('location')}
              />
              {errors.location && <p className="text-Error text-[1rem]">{errors.location.message}</p>}
            </div>

            {/* Salary Range */}
            <div className="flex flex-col w-full gap-[1rem]">
              <label className="textFormColor1">Salary Range</label>
              <input
                type="text"
                placeholder="e.g 10,000 - 15,000"
                className="inputMod pr-[1.5625rem]"
                {...register('salaryRange')}
              />
              {errors.salaryRange && <p className="text-Error text-[1rem]">{errors.salaryRange.message}</p>}
            </div>
          </div>

          {/* Right Column */}
          <div className="w-[15.5625rem] flex flex-col gap-[2.375rem]">
            {/* Department Dropdown */}
            <div>
              <Controller
                name="department"
                control={control}
                render={({ field }) => (
                  <Dropdown
                    label="Department"
                    options={['Engineering', 'Marketing', 'Finance']}
                    selected={field.value}
                    onSelect={field.onChange}
                    placeholder="Select Department"
                  />
                )}
              />
              {errors.department && <p className="text-Error text-[1rem]">{errors.department.message}</p>}
            </div>

            {/* Job Type Dropdown */}
            <div className="flex flex-col gap-[1rem] relative">
              <Controller
                name="jobType"
                control={control}
                render={({ field }) => (
                  <Dropdown
                    label="Job Type"
                    options={['Full Time', 'Half Time', 'Remote']}
                    selected={field.value}
                    onSelect={field.onChange}
                    placeholder="Select Job"
                  />
                )}
              />
              {errors.jobType && <p className="text-Error text-[1rem]">{errors.jobType.message}</p>}
            </div>

            {/* Application Deadline */}
            <div className="flex flex-col w-full gap-[1rem]">
              <label className="textFormColor1">Application Deadline</label>
              <input type="date" className="inputMod pr-[1.5625rem]" {...register('deadline')} />
              {errors.deadline && <p className="text-Error text-[1rem]">{errors.deadline.message}</p>}
            </div>
          </div>
        </div>

        {/* Description & Requirement */}
        <div className="flex flex-col gap-[2.375rem]">
          <div className="flex flex-col gap-[1rem]">
            <label className="text-formColor">Job Description</label>
            <textarea
              placeholder="Enter detailed job description..."
              className="text-formColor bg-inputBack rounded-[10px] placeholder-input pt-[0.59375rem] pl-[1.1875rem] resize-none h-[5.5rem]"
              {...register('description')}
            />
            {errors.description && <p className="text-Error text-[1rem]">{errors.description.message}</p>}
          </div>

          <div className="flex flex-col gap-[1rem]">
            <label className="text-formColor">Requirement</label>
            <textarea
              placeholder="List required skills, experience and qualification"
              className="text-formColor bg-inputBack rounded-[10px] placeholder-input pt-[0.59375rem] pl-[1.1875rem] resize-none h-[5.5rem]"
              {...register('requirement')}
            />
            {errors.requirement && <p className="text-Error text-[1rem]">{errors.requirement.message}</p>}
          </div>
        </div>

        {/* Submit Button */}
        <div className="w-full h-[3.4375rem] mt-[0.5rem]">
          <button type="submit" className="w-full h-full bg-lemongreen rounded-[10px] cursor-pointer">
            Complete
          </button>
        </div>
      </form>
    </div>
  );
}
