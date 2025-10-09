'use client'
import React, { useState } from 'react'
import { Dropdown } from '@/app/Components/DropDown';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { authAPI } from '@/app/lib/api/client';

// ✅ Schema
const AddorgSchema = z.object({
  Name: z.string().min(4, "Organization is required"),
  Domain: z.string().min(4, "Domain is required"),
  Industry: z.string().min(4, "Industry is required"),
  CompanySize: z.string().nonempty("Company is required"),
  Description: z.string().min(10, "Description is required"),
  AdminFirstName: z.string().min(3, "First Name is required"),
  AdminLastName: z.string().min(3, "Last Name is required"),
  AdminEmail: z.string().min(3, "Email is required").email("Invalid Email Address"),
  AdminPhone: z.string().regex(/^\+?[0-9]{10,15}$/, "Enter a valid phone number"),
  Country: z.string().nonempty("Country is required"),
  TimeZone: z.string().nonempty("TimeZone is required"),
});

const Page = () => {
  const router = useRouter();
  const { register, control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(AddorgSchema),
    defaultValues: {
      Name: "", Domain: "", Industry: "", CompanySize: "", Description: "",
      AdminFirstName: "", AdminLastName: "", AdminEmail: "", AdminPhone: "", Country: "", TimeZone: ""
    },
  });

  // ✅ Toggles
  const [toggleOn, setToggleOn] = useState([true, false, false]); 
  const [toggleOn2, setToggleOn2] = useState([false, false, false]);

  const handleToggle = (index) => {
    if (index === 0) return;
    setToggleOn(prev => {
      const newToggles = [...prev];
      newToggles[index] = !newToggles[index];
      return newToggles;
    });
  };

  const handleToggle2 = (index) => {
    setToggleOn2(prev => {
      const newToggles = [...prev];
      newToggles[index] = !newToggles[index];
      return newToggles;
    });
  };

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      employeeManagement: toggleOn[0],
      attendanceTracking: toggleOn[1],
      leaveManagement: toggleOn[2],
      recruitment: toggleOn2[0],
      performance: toggleOn2[1],
      training: toggleOn2[2],
    };

    try {
      const savedTenant = await authAPI.createTenant(payload);
      console.log("Tenant saved:", savedTenant);
      router.push("/SuperAdmin/AllOrganization");
    } catch (err) {
      console.error("Error saving tenant:", err.message);
    }
  };

  return (
    <>
    {/* Progress Bar */}
    <div className='mb-[2.4375rem] flex flex-col gap-[4.125rem]'>
        <div className='grid grid-cols-4'>
            <div className='rounded-[0.53125rem] bg-lemongreen w-[22.625rem] h-[5px]'></div>
            <div className='rounded-[0.53125rem] bg-[rgba(223,223,223,0.26)] w-[22.625rem] h-[5px]'></div>
            <div className='rounded-[0.53125rem] bg-[rgba(223,223,223,0.26)] w-[22.625rem] h-[5px]'></div>
            <div className='rounded-[0.53125rem] bg-[rgba(223,223,223,0.26)] w-[22.625rem] h-[5px]'></div>
        </div>
        <div>
          <h4 className='textFormColor'>Create Tenant</h4>
        </div>
    </div>
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-[7.0625rem] font-semibold mb-[5rem] ">
      
      {/* Left Section */}
      <div className="w-[42.5625rem]">
        <div className="flex flex-col gap-[4.5625rem]">

          {/* Organization Details */}
          <div className="flex flex-col gap-[2.4375rem] mb-[2rem]">
            <div className="flex flex-col gap-[0.5625rem]">
              <div className="flex items-center gap-[0.4375rem]">
                <img src="/image/building.png" alt="" />
                <span className="textWhite">Tenant Details</span>
              </div>
              <h4 className="text-limegray leading-none">
                Basic information about the organization
              </h4>
            </div>

            {/* Form Fields */}
            <div className="flex flex-col gap-[2.875rem]">
              <div className="flex gap-[2.1875rem]">
                {/* Left Column */}
                <div className="w-[20.1875rem] flex flex-col gap-[2.875rem]">
                  <div className="flex flex-col gap-[1rem]">
                    <label className="text-formColor">Tenant Name*</label>
                    <input type="text" placeholder="Enter Tenant Name" className="inputMod" {...register("Name")} />
                    {errors.Name && <span className="text-Error text-[1rem]">{errors.Name.message}</span>}
                  </div>
                  <div>
                    <Controller
                      control={control}
                      name="Industry"
                      render={({ field }) => (
                        <Dropdown label="Industry" options={['Industry1', 'Industry2']} selected={field.value} onSelect={field.onChange} placeholder="Select Industry" />
                      )}
                    />
                    {errors.Industry && <span className="text-Error text-[1rem]">{errors.Industry.message}</span>}
                  </div>
                </div>

                {/* Right Column */}
                <div className="w-[20.1875rem] flex flex-col gap-[2.875rem]">
                  <div className="flex flex-col gap-[1rem]">
                    <label className="text-formColor">Domain*</label>
                    <input type="text" placeholder="Enter Organization Domain" className="inputMod" {...register("Domain")} />
                    {errors.Domain && <span className="text-Error text-[1rem]">{errors.Domain.message}</span>}
                  </div>
                  <div>
                    <Controller
                      control={control}
                      name="CompanySize"
                      render={({ field }) => (
                        <Dropdown label="Company Size" options={['100', '200']} selected={field.value} onSelect={field.onChange} placeholder="Company Size" />
                      )}
                    />
                    {errors.CompanySize && <span className="text-Error text-[1rem]">{errors.CompanySize.message}</span>}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="flex flex-col gap-[1rem]">
                <label className="text-formColor">Description</label>
                <textarea placeholder="Brief description of the organization" className="text-formColor bg-inputBack rounded-[10px] placeholder-input pt-[1.75rem] pl-[1.1875rem] resize-none h-[8.4375rem]" {...register("Description")}></textarea>
                {errors.Description && <span className="text-Error text-[1rem]">{errors.Description.message}</span>}
              </div>
              <div className='space-y-[2.1875rem]'>
                <div className="flex flex-col gap-[0.5625rem]">
                  <div className="flex items-center gap-[0.4375rem]">
                    <img src="/image/building.png" alt="" />
                    <span className="textWhite">Regional Settings</span>
                  </div>
                  <h4 className="text-limegray leading-none">
                    Timezone and location settings
                  </h4>
                </div>
                <div className='space-y-[3.5rem]'>
                  <div>
                    <Controller
                      control={control}
                      name="Industry"
                      render={({ field }) => (
                        <Dropdown label="Country" options={['Ethiopia', 'USA']} selected={field.value} onSelect={field.onChange} placeholder="Select Country" />
                      )}
                    />
                    {errors.Country && <span className="text-Error text-[1rem]">{errors.Country.message}</span>}
                  </div>
                  <div>
                    <Controller
                      control={control}
                      name="Time Zone"
                      render={({ field }) => (
                        <Dropdown label="Time Zone" options={['GMC', 'ETh']} selected={field.value} onSelect={field.onChange} placeholder="Select Time Zone" />
                      )}
                    />
                    {errors.TimeZone && <span className="text-Error text-[1rem]">{errors.TimeZone.message}</span>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-[42.5625rem] space-y-[10.5625rem]">
        <div className="flex flex-col">
          <div className="flex flex-col gap-[0.5625rem]">
            <div className="flex items-center gap-[0.4375rem]">
              <img src="/image/building.png" alt="" />
              <span className="textWhite">Module Selection</span>
            </div>
            <h4 className="text-limegray leading-none">
              Choose which modules to enable for this organization
            </h4>
          </div>

          <div className='space-y-[2.875rem]'>
              {/* Left Modules */}
              <div className="space-y-[2.875rem] mt-[73px]">
                {[
                  { title: 'Employee Management', desc: 'Core employee data and profiles' },
                  { title: 'Attendance & Time Tracking', desc: 'Clock in/out and time management' },
                  { title: 'Leave Management', desc: 'Leave requests and approvals' }
                ].map((item, i) => (
                  <div key={i} className="flex between-center justify-between items-center">
                    <div>
                      <h1 className="text-formColor flex items-center gap-2">
                        {item.title}
                        {i === 0 && <span className="text-lemongreen text-sm font-medium bg-limegray/10 px-2 py-1 rounded-md">Default</span>}
                      </h1>
                      <h4 className="text-limegray">{item.desc}</h4>
                    </div>
                    <div
                      onClick={() => handleToggle(i)}
                      className={`${toggleOn[i] ? 'bg-lemongreen' : 'bg-limegray'} w-[4.0625rem] h-[2.1875rem] rounded-full border relative flex items-center py-[3px] cursor-pointer`}
                    >
                      <div className={`${toggleOn[i] ? 'translate-x-full' : 'translate-x-0'} mx-[4px] absolute w-[1.8125rem] h-[1.8125rem] bg-white rounded-full transition-transform ease-in-out duration-300`}></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Modules */}
              <div className="space-y-[2.875rem]">
                {[
                  { title: 'Recruitment & ATS', desc: 'Job postings and candidate tracking' },
                  { title: 'Performance Management', desc: 'Goals and performance reviews' },
                  { title: 'Training & Development', desc: 'Learning programs and courses' }
                ].map((item, j) => (
                  <div key={j} className="flex between-center justify-between items-center">
                    <div>
                      <h1 className="text-formColor">{item.title}</h1>
                      <h4 className="text-limegray">{item.desc}</h4>
                    </div>
                    <div
                      onClick={() => handleToggle2(j)}
                      className={`${toggleOn2[j] ? 'bg-lemongreen' : 'bg-limegray'} w-[4.0625rem] h-[2.1875rem] rounded-full border relative flex items-center py-[3px] cursor-pointer`}
                    >
                      <div className={`${toggleOn2[j] ? 'translate-x-full' : 'translate-x-0'} mx-[4px] absolute w-[1.8125rem] h-[1.8125rem] bg-white rounded-full transition-transform ease-in-out duration-300`}></div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Buttons */}
          </div>
          <div className="w-full h-[3.4375rem] flex gap-[2.5625rem] mt-[5.1875rem]">
            <button type="button" className="w-[19.875rem] border border-formColor text-formColor rounded-[10px] cursor-pointer">Cancel</button>
            <button type="submit" className="w-[19.875rem] bg-lemongreen rounded-[10px] cursor-pointer">Next</button>
          </div>
        </div>
      </div>
    </form>
    </>
  );
};

export default Page;
