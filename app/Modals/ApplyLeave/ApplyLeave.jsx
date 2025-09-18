
import React, { useState } from 'react';
import { Dropdown } from '@/app/Components/DropDown';
import NumberInput from '@/app/Components/NumberInput';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';

const ApplyLeaveschema=z.object({
  StartDate: z.string().nonempty("Starting Date is required"),
  Duration:z.string().nonempty("Duration is required"),
  EndDate:z.string().nonempty("Ending Date is required"),
  LeaveType: z.string().min(1, "Leave type is required"),
  Reason:z.string().min(5,"Reason is required")
}).refine(
  (data) => {
    if (!data.StartDate || !data.EndDate) return true; // skip if empty (already handled)
    const start = new Date(data.StartDate);
    const end = new Date(data.EndDate);
    return end >= start;
  },
  {
    message: "Ending Date must be after Starting Date",
    path: ["EndDate"], // ❗ attaches error to EndDate field
  }
);

export default function ApplyLeave({ onClose }) {
  const [selectedLeave, setSelectedLeave] = useState('');
  const {
    register,control,handleSubmit,formState:{errors},
  }=useForm({
    resolver:zodResolver(ApplyLeaveschema),
    defaultValues:{
      StartDate:"",
      Duration:"",
      EndDate:"",
      LeaveType:"",
      Reason:"",
    },
    mode:"onChange",
     reValidateMode: "onChange",
  });
  const onSubmit=(data)=>{
    console.log('ApplyLeaves Data:', data);
    
    
  }
  return (
    <div className='px-[3rem] py-[2.875rem] space-y-[3.125rem] font-semibold'>
      {/* Header */}
      <div className='flex justify-between'>
        <div>
          <h1 className='textFormColor'>Leave Request</h1>
          <h4 className='text-limegray'>Add leave request for admin</h4>
        </div>
        <button onClick={onClose} className='rounded-full center-center cursor-pointer'>
            <img src="/image/Icon/Action/CloseCircle.png" alt="" />
        </button>
      </div>
      {/* Form */}
      <form
      onSubmit={handleSubmit(onSubmit)} 
      className='flex flex-col gap-[2.75rem]'>
        {/* Dropdowns */}
        <div className='flex  w-full gap-[1.125rem]'>
            <div className='w-[15.5625rem] space-y-[2.125rem]'>
                {/* Starting Date  */}
                <div className='flex flex-col gap-[1rem]'>
                    <label htmlFor="firstName" className='text-formColor'>Starting Date</label>
                    <input type="date"   className='inputMod pr-[1.5625rem]'
                    {...register("StartDate")}
                    />
                    {errors.StartDate && 
                          <span className='text-Error text-[1rem]'>{errors.StartDate.message}</span>
                    }
                </div>
                {/* Duration */}
                <div className='flex flex-col gap-[1rem]'>
                    <label htmlFor="firstName" className='text-formColor'>Duration</label>
                    <input type="number" placeholder='Duration'  className='inputMod pr-[1.5625rem]'
                    {...register("Duration")}
                    />
                    {errors.Duration && 
                    <span className='text-Error text-[1rem]'>
                      {errors.Duration.message}
                    </span>
                    }
                </div>
            </div>
            <div className='w-[15.5625rem] space-y-[2.125rem]'>
                {/* End DAte  */}
                <div className='flex flex-col gap-[1rem]'>
                    <label htmlFor="firstName" className='text-formColor'>Ending Date</label>
                    <input type="date"   className='inputMod pr-[1.5625rem]'
                    {...register("EndDate")}
                    />
                     {errors.EndDate && 
                    <span className='text-Error text-[1rem]'>
                      {errors.EndDate.message}
                    </span>
                    }
                </div>
                <div>
                  <Controller
                    name="LeaveType"
                    control={control}
                    render={({field}) => (
                      <Dropdown
                    label="Leave Type"
                   
                    options={['Engineering', 'Marketing', 'Finance']}
                    selected={field.value}
                    onSelect={field.onChange}
                    placeholder="Annual"
                    />
                    )}
                  /> 
                  {errors.LeaveType && (
                    <span className='text-Error text-[1rem]'>
                      {errors.LeaveType.message}
                    </span>
                  )
                  }          
                </div>
            </div>

        </div>
        <div className="flex flex-col gap-[1rem]">
          <label className="text-formColor">Reason</label>
          <textarea
            placeholder="Provide specific reason"
            className="text-formColor bg-inputBack rounded-[10px] placeholder-input pt-[0.59375rem] pl-[1.1875rem] resize-none h-[4.75rem]"
          {...register("Reason")}
          />
          {errors.Reason && 
          (
            <span className='text-Error text-[1rem]'>
              {errors.Reason.message}
            </span>
          )
          }
          <div className='w-full h-[3.4375rem] mt-[0.5rem]'>
          <button
            type="submit"
            className='w-full h-full bg-lemongreen rounded-[10px] cursor-pointer'
          >
            Submit 
          </button>
        </div>
        </div>
        {/* Submit Button */}
        
      </form>
    </div>
  );
}


