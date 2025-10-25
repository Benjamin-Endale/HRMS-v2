'use client'
import React from 'react'
import { Dropdown } from '@/app/Components/DropDown';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useAdminForm } from '@/app/Store/AdminFormContext';



const AddorgSchema = z.object({

  name: z.string().min(4, "Tenant is required"),
 domain: z
  .string()
  .min(4, "Domain is required")
  .refine((val) => val.trim().toLowerCase().endsWith(".com"), {
    message: "Domain must end with .com",
  }),
  industry: z.string().min(3, "Industry is required"),
  location: z.string().min(3, "Location is required"),
  description: z.string().min(10, "Description is required"),
  country: z.string().nonempty("Country is required"),
  timeZone: z.string().nonempty("TimeZone is required"),
  employeeManagement: z.boolean(),
  attendanceTracking: z.boolean(),
  leaveManagement: z.boolean(),
  recruitment: z.boolean(),
  performanceManagement: z.boolean(),
  trainingDevelopment: z.boolean(),
});


const Page = () => {
  
  const { tenantData, setTenantData } = useAdminForm();
  const router = useRouter();

  const { register, control, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(AddorgSchema),
    defaultValues: {
      name: tenantData.name || "",
      domain: tenantData.domain || "",
      industry: tenantData.industry || "",
      location: tenantData.location || "",
      description: tenantData.description || "",
      country: tenantData.country || "",
      timeZone: tenantData.timeZone || "",
      employeeManagement: true,
      attendanceTracking: tenantData.attendanceTracking ?? false,
      leaveManagement: tenantData.leaveManagement ?? false,
      recruitment: tenantData.recruitment ?? false,
      performanceManagement: tenantData.performanceManagement ?? false,
      trainingDevelopment: tenantData.trainingDevelopment ?? false,
    },
  });




  const onSubmit = (data) => {
    setTenantData(data); // store tenant info
    router.push('/SuperAdmin/CreateOrganization/RegisterAdmin');
  };

  const onCancel = () => {
    router.push('/');
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

      <form className="flex gap-[7.0625rem] font-semibold mb-[5rem]" onSubmit={handleSubmit(onSubmit)}>

        {/* Left Section */}
        <div className="w-[42.5625rem]">
          <div className="flex flex-col gap-[4.5625rem]">
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

              <div className="flex flex-col gap-[2.875rem]">
                <div className="flex gap-[2.1875rem]">
                  <div className="w-[20.1875rem] flex flex-col gap-[2.875rem]">
                    <div className="flex flex-col gap-[1rem] relative ">
                      <label className="text-formColor">Tenant Name*</label>
                      <input type="text" placeholder="Enter Tenant Name" className="inputMod" {...register("name")} />
                      {errors.name && <span className="text-Error absolute bottom-[-2rem] text-[1rem]">{errors.name.message}</span>}
                    </div>
                    <div className=' relative '>
                      <Controller
                        control={control}
                        name="industry"
                        render={({ field }) => (
                          <Dropdown label="Industry" options={['Industry1', 'Industry2']} selected={field.value} onSelect={field.onChange} placeholder="Select Industry" />
                        )}
                      />
                      {errors.industry && <span className="text-Error text-[1rem] absolute bottom-[-2rem]">{errors.industry.message}</span>}
                    </div>
                  </div>

                  <div className="w-[20.1875rem] flex flex-col gap-[2.875rem]">
                    <div className="flex flex-col gap-[1rem] relative">
                      <label className="text-formColor">Domain*</label>
                      <input type="text" placeholder="Enter Organization domain" className="inputMod" {...register("domain")} />
                      {errors.domain && <span className="text-Error text-[1rem] absolute bottom-[-2rem]">{errors.domain.message}</span>}
                    </div>
                    {/* Address */}
                    <div className='flex flex-col gap-[1rem] mb-[4.5rem] relative'>
                        <label className='text-formColor'>Location</label>
                        <input type="text" placeholder='Bole, Addis Ababa' className='inputMod' {...register("location")} />
                        {errors.location && <span className='text-Error text-[1rem] absolute bottom-[-2rem]'>{errors.location.message}</span>}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-[1rem] relative">
                  <label className="text-formColor">Description</label>
                  <textarea
                    placeholder="Brief description of the organization"
                    className="text-formColor bg-inputBack rounded-[10px] placeholder-input pt-[1.75rem] pl-[1.1875rem] resize-none h-[8.4375rem]"
                    {...register("description")}
                  ></textarea>
                  {errors.description && <span className="text-Error text-[1rem] absolute bottom-[-2rem]">{errors.description.message}</span>}
                </div>

                <div className='space-y-[2.1875rem]'>
                  <div className="flex flex-col gap-[0.5625rem]">
                    <div className="flex items-center gap-[0.4375rem]">
                      <img src="/image/building.png" alt="" />
                      <span className="textWhite">Regional Settings</span>
                    </div>
                    <h4 className="text-limegray leading-none">Timezone and location settings</h4>
                  </div>
                  <div className='space-y-[3.5rem]'>
                    <div className='relative'>
                      <Controller
                        control={control}
                        name="country"
                        render={({ field }) => (
                          <Dropdown label="Country" options={['Ethiopia', 'USA']} selected={field.value} onSelect={field.onChange} placeholder="Select Country" />
                        )}
                      />
                      {errors.country && <span className="text-Error text-[1rem] absolute bottom-[-2rem]">{errors.country.message}</span>}
                    </div>
                    <div className='relative'>
                      <Controller
                        control={control}
                        name="timeZone"
                        render={({ field }) => (
                          <Dropdown label="Time Zone" options={['GMT', 'EAT']} selected={field.value} onSelect={field.onChange} placeholder="Select Time Zone" />
                        )}
                      />
                      {errors.timeZone && <span className="text-Error text-[1rem] absolute bottom-[-2rem]">{errors.timeZone.message}</span>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-[42.5625rem] space-y-[10.5625rem]">
          <div className="flex flex-col gap-[3.3125rem]">
            <div className="flex flex-col gap-[0.5625rem]">
              <div className="flex items-center gap-[0.4375rem]">
                <img src="/image/building.png" alt="" />
                <span className="textWhite">Module Selection</span>
              </div>
              <h4 className="text-limegray leading-none">
                Choose which modules to enable for this organization
              </h4>
            </div>
          {/* Module Selection */}
            <div className='flex flex-col gap-[2.875rem]'>
              {/* Employee Management */}
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-formColor flex items-center gap-2">
                    Employee Management
                    <span className="text-lemongreen text-sm font-medium bg-limegray/10 px-2 py-1 rounded-md">Default</span>
                  </h1>
                  <h4 className="text-limegray">Core employee data and profiles</h4>
                </div>
                <div
                  className={`w-[4.0625rem] h-[2.1875rem] rounded-full border flex items-center px-[4px] bg-lemongreen justify-end cursor-not-allowed`}
                >
                  <div className="w-[1.8125rem] h-[1.8125rem] bg-white rounded-full shadow-md"></div>
                </div>
              </div>


              {/* Attendance Tracking */}
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-formColor">Attendance & Time Tracking</h1>
                  <h4 className="text-limegray">Clock in/out and time management</h4>
                </div>
                <div
                  onClick={() => setValue("attendanceTracking", !watch("attendanceTracking"))}
                  className={`w-[4.0625rem] h-[2.1875rem] rounded-full border flex items-center px-[4px] cursor-pointer transition-all duration-300 ${watch("attendanceTracking") ? 'bg-lemongreen justify-end' : 'bg-limegray justify-start'}`}
                >
                  <div className="w-[1.8125rem] h-[1.8125rem] bg-white rounded-full transition-all duration-300 shadow-md"></div>
                </div>
              </div>

              {/* Leave Management */}
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-formColor">Leave Management</h1>
                  <h4 className="text-limegray">Leave requests and approvals</h4>
                </div>
                <div
                  onClick={() => setValue("leaveManagement", !watch("leaveManagement"))}
                  className={`w-[4.0625rem] h-[2.1875rem] rounded-full border flex items-center px-[4px] cursor-pointer transition-all duration-300 ${watch("leaveManagement") ? 'bg-lemongreen justify-end' : 'bg-limegray justify-start'}`}
                >
                  <div className="w-[1.8125rem] h-[1.8125rem] bg-white rounded-full transition-all duration-300 shadow-md"></div>
                </div>
              </div>

              {/* Recruitment */}
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-formColor">Recruitment & ATS</h1>
                  <h4 className="text-limegray">Job postings and candidate tracking</h4>
                </div>
                <div
                  onClick={() => setValue("recruitment", !watch("recruitment"))}
                  className={`w-[4.0625rem] h-[2.1875rem] rounded-full border flex items-center px-[4px] cursor-pointer transition-all duration-300 ${watch("recruitment") ? 'bg-lemongreen justify-end' : 'bg-limegray justify-start'}`}
                >
                  <div className="w-[1.8125rem] h-[1.8125rem] bg-white rounded-full transition-all duration-300 shadow-md"></div>
                </div>
              </div>

              {/* Performance Management */}
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-formColor">Performance Management</h1>
                  <h4 className="text-limegray">Goals and performance reviews</h4>
                </div>
                <div
                  onClick={() => setValue("performanceManagement", !watch("performanceManagement"))}
                  className={`w-[4.0625rem] h-[2.1875rem] rounded-full border flex items-center px-[4px] cursor-pointer transition-all duration-300 ${watch("performanceManagement") ? 'bg-lemongreen justify-end' : 'bg-limegray justify-start'}`}
                >
                  <div className="w-[1.8125rem] h-[1.8125rem] bg-white rounded-full transition-all duration-300 shadow-md"></div>
                </div>
              </div>

              {/* Training & Development */}
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-formColor">Training & Development</h1>
                  <h4 className="text-limegray">Learning programs and courses</h4>
                </div>
                <div
                  onClick={() => setValue("trainingDevelopment", !watch("trainingDevelopment"))}
                  className={`w-[4.0625rem] h-[2.1875rem] rounded-full border flex items-center px-[4px] cursor-pointer transition-all duration-300 ${watch("trainingDevelopment") ? 'bg-lemongreen justify-end' : 'bg-limegray justify-start'}`}
                >
                  <div className="w-[1.8125rem] h-[1.8125rem] bg-white rounded-full transition-all duration-300 shadow-md"></div>
                </div>
              </div>
            </div>


            {/* Buttons */}
            <div className="w-full h-[3.4375rem] flex gap-[2.5625rem] mt-[5.1875rem]">
              <button type="button" onClick={onCancel} className="w-[19.875rem] border border-formColor text-formColor rounded-[10px] cursor-pointer">Cancel</button>
              <button type="submit" className="w-[19.875rem] bg-lemongreen rounded-[10px] cursor-pointer">Next</button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Page;
