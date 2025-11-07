'use client'
import { useForm } from 'react-hook-form';
import React, { useState } from 'react'
import SubNavigation from '@/app/SubNavigation'
import { Dropdown } from '@/app//Components/DropDown';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { hrmsAPI } from '@/app/lib/api/client';
import { auth } from '@/app/auth';
// ✅ Schema: toggles are optional now (no required validation)
const CoreSchema = z.object({
  Name: z.string().min(2, "Name is required"),
  MaxDays: z.number()
    .refine((val) => !isNaN(val), "Day must be a valid number"),
  Description: z.string().min(5, "Description is required"),
  IsPaid: z.boolean().optional(),
  CarryForward: z.boolean().optional(),
});

const page = ({tenantId,token}) => {
  const [isLoading, setLoading] = useState(false)
  const [isIp, setIsIp] = useState('')
  const [time, setTime] = useState('09:00');
  const [time2, setTime2] = useState('09:00');
  const [IsPaid, setIsPaid] = useState(false);
  const [CarryForward, setIsCarryForward] = useState(false);

  const formatTime = (timeStr) => {
    const [hours, minutes] = timeStr.split(':');
    const h = parseInt(hours, 10);
    const suffix = h >= 12 ? 'PM' : 'AM';
    const formatted = `${((h + 11) % 12 + 1)}:${minutes} ${suffix}`;
    return formatted;
  };



  const { register, handleSubmit, formState: { errors, isSubmitting }, setValue } = useForm({
    resolver: zodResolver(CoreSchema),
    defaultValues: {
      Name: '',
      MaxDays: '',
      Description: '',
      IsPaid: false,
      CarryForward: false,
    }
  });

    console.log(errors)
  console.log(tenantId)
  const onSubmit = async (data) => {
    

    try {
      setLoading(true);
      const Leavetype = {
        TenantId:tenantId,
        ...data

      }
          console.log("✅ Form submitted:", Leavetype);
      console.log("✅ Form submitted:", data);
      const LeaveType = await hrmsAPI.createLeaveType(Leavetype,token)
    console.log("✅ Form submitted:", LeaveType);
    } catch (err) {
      alert('Error: ' + (err.message || 'Something went wrong. Please try again.'));
    } finally {
      setLoading(false);
    }
  };

  // ✅ Sync toggle values to form
  React.useEffect(() => {
    setValue("IsPaid", IsPaid);
    setValue("CarryForward", CarryForward);
  }, [IsPaid, CarryForward, setValue]);

  return (
    <>
      <SubNavigation readPath='/Admin/SettingPages/Core' />
      <div className='mt-[2.625rem] font-semibold flex gap-[5.1875rem]'>

        {/* Left Side */}
        <div className='w-[23.5rem] space-y-[2.1875rem] '>
          <div className='space-y-[2.625rem]'>
            <div>
              <h1 className='textFormColor'>Attendance</h1>
              <h4 className='textLimegray'>Shifts, geofence, overtime</h4>
            </div>
            <div className='space-y-[1.1875rem]'>
              <Dropdown
                label="IP Restrictions (CIDR)"
                options={["GMT", "AMT", "EST"]}
                selected={isIp}
                onSelect={setIsIp}
                placeholder="e.g., 192.168.1.0/24, 10.0.0.0/8"
              />
              <span className='textLimegray'>List allowed IP addresses </span>
            </div>
          </div>

          <div className='flex flex-col gap-[1rem] relative'>
            <label className='text-formColor'>Grace Minutes</label>
            <input type="number" placeholder='10' className='inputMod' />
          </div>

          <div className='flex flex-col gap-[1rem] relative'>
            <label className='text-formColor'>End Shift Start</label>
            <input
              type="time"
              className="inputMod pr-[1.1875rem]"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

          <div className='flex flex-col gap-[1rem] relative'>
            <label className='text-formColor'>Default Shift Start</label>
            <input
              type="time"
              className="inputMod pr-[1.1875rem]"
              value={time2}
              onChange={(e) => setTime2(e.target.value)}
            />
          </div>
        </div>

        {/* Middle Section */}
        <div className='w-[23.5rem]'>
          <div className='space-y-[2.625rem]'>
            <div>
              <h1 className='textFormColor'>Employees</h1>
              <h4 className='textLimegray'>ID pattern</h4>
            </div>
            <div className='flex flex-col gap-[1rem] relative'>
              <label className='text-formColor'>Employee ID Pattern</label>
              <input type="text" placeholder='EMP-(0000)' className='inputMod' />
            </div>
          </div>
        </div>

        {/* Right Section (Leave Management) */}
        <div className='w-[35.4375rem] '>
          <div className='space-y-[2.625rem]'>
            <div>
              <h1 className='textFormColor'>Leave Management</h1>
              <h4 className='textLimegray'>Add Leave Types</h4>
            </div>

            <div className='space-y-[2.125rem]'>
              <form className='space-y-[2.125rem]' onSubmit={handleSubmit(onSubmit)}>
                <div className='space-y-[2.5625rem]'>

                  {/* Toggle 1 */}
                  <div className="flex justify-between items-center">
                    <div className='space-y-[0.5rem]'>
                      <h1 className="text-formColor">Paid Leave</h1>
                      <h4 className="text-limegray">If there is a paid please turn on</h4>
                    </div>
                    <div
                      onClick={() => setIsPaid((prev) => !prev)}
                      className={`w-[4.0625rem] h-[2.1875rem] rounded-full border flex items-center px-[4px] cursor-pointer transition-all duration-300 ${IsPaid ? 'bg-lemongreen justify-end' : 'bg-limegray justify-start'}`}
                    >
                      <div className="w-[1.8125rem] h-[1.8125rem] bg-white rounded-full transition-all duration-300 shadow-md"></div>
                    </div>
                  </div>

                  {/* Toggle 2 */}
                  <div className="flex justify-between items-center">
                    <div className='space-y-[0.5rem]'>
                      <h1 className="text-formColor">Carry Forward</h1>
                      <h4 className="text-limegray">Unused days roll over to next year</h4>
                    </div>
                    <div
                      onClick={() => setIsCarryForward((prev) => !prev)}
                      className={`w-[4.0625rem] h-[2.1875rem] rounded-full border flex items-center px-[4px] cursor-pointer transition-all duration-300 ${CarryForward ? 'bg-lemongreen justify-end' : 'bg-limegray justify-start'}`}
                    >
                      <div className="w-[1.8125rem] h-[1.8125rem] bg-white rounded-full transition-all duration-300 shadow-md"></div>
                    </div>
                  </div>
                </div>

                {/* Inputs */}
                <div className='space-y-[2.5625rem]'>
                  <div className='flex gap-[2.0625rem]'>
                    <div className='flex flex-col gap-[1rem] relative w-[16.8125rem]'>
                      <label className='text-formColor'>Name</label>
                      <input
                        type="text"
                        placeholder='Enter Name'
                        className='inputMod'
                        {...register("Name")}
                      />
                      {errors.Name && <span className='text-Error text-[1rem] absolute bottom-[-2rem]'>{errors.Name.message}</span>}
                    </div>

                    <div className='flex flex-col gap-[1rem] relative w-[16.8125rem] '>
                      <label className='text-formColor'>Day</label>
                      <input
                        type="number"
                        placeholder='30'
                        className='inputMod'
                        {...register("MaxDays", { valueAsNumber: true })}
                      />
                      {errors.MaxDays && <span className='text-Error text-[1rem] absolute bottom-[-2rem]'>{errors.MaxDays.message}</span>}
                    </div>
                  </div>

                  <div className="flex flex-col gap-[1rem] relative">
                    <label className="text-formColor">Description</label>
                    <textarea
                      placeholder="Brief description of the organization"
                      className="text-formColor bg-inputBack rounded-[10px] placeholder-input pt-[1.75rem] pl-[1.1875rem] resize-none h-[8.4375rem]"
                      {...register("Description")}
                    ></textarea>
                    {errors.Description && <span className='text-Error text-[1rem] absolute bottom-[-2rem]'>{errors.Description.message}</span>}
                  </div>

                  <div className='flex flex-col gap-7'>
                    <div className='flex flex-col gap-2'>
                      <div className="bg-lemongreen w-full h-13.75 flex items-center justify-center rounded-[0.3125rem]">
                        <button
                          className="w-full h-full rounded-[0.3125rem] hover:outline-lemongreen cursor-pointer disabled:opacity-50"
                          type="submit"
                          disabled={isSubmitting || isLoading}
                        >
                          {isLoading ? 'Creating...' : 'Add Leave Type'}
                        </button>
                      </div>
                    </div>

                    <div className='flex flex-col gap-2'>
                      <div className="bg-inherit border border-limegray w-full h-13.75 flex items-center justify-center rounded-[0.3125rem]">
                        <button
                          className="w-full h-full rounded-[0.3125rem] hover:outline-inherit text-formColor border border-limegray cursor-pointer disabled:opacity-50"
                          type="button"
                        >
                          See Detail
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default page
