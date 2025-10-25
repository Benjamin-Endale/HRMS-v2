'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Zod schema for validation
const departmentSchema = z.object({
  departmentName: z.string().min(1, 'Department Name is required'),
  departmentHead: z.string().min(1, 'Department Head is required'),
  initialEmployeeCount: z
    .string()
    .min(1, 'Initial Employee Count is required')
    .regex(/^\d+$/, 'Employee Count must be a number'),
  description: z.string().min(1, 'Department Description is required'),
});

const AddDep = ({ onClose }) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(departmentSchema),
    defaultValues: {
      departmentName: '',
      departmentHead: '',
      initialEmployeeCount: '',
      description: '',
    },
  });

  const onSubmit = (data) => {
    console.log('Form Data:', data);
    router.push('/'); // redirect after submit
  };

  return (
    <div className='px-[3rem] py-[2.875rem] space-y-[3.125rem] font-semibold w-full'>
      {/* Header */}
      <div className='flex justify-between'>
        <div>
          <h1 className='textFormColor'>Create New Department</h1>
          <h4 className='text-limegray'>Add a new department and its basic information.</h4>
        </div>
        <button onClick={onClose} className='rounded-full center-center cursor-pointer'>
          <img src='/image/Icon/Action/CloseCircle.png' alt='close' />
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-[2.375rem]'>
        <div className='w-full flex gap-[1.125rem]'>
          <div className='flex flex-col gap-[2.375rem] w-full'>
            {/* Department Name */}
            <div className='flex flex-col w-full gap-[1rem] relative'>
              <label className='textFormColor1'>Department Name</label>
              <input
                type='text'
                placeholder='ex. Marketing'
                className='inputMod pr-[1.5625rem]'
                {...register('departmentName')}
              />
              {errors.departmentName && (
                <p className='text-Error text-[1rem] absolute bottom-[-2rem]'>{errors.departmentName.message}</p>
              )}
            </div>

            {/* Department Head */}
            <div className='flex flex-col w-full gap-[1rem] relative'>
              <label className='textFormColor1'>Department Head</label>
              <input
                type='text'
                placeholder='ex. John Doe'
                className='inputMod pr-[1.5625rem]'
                {...register('departmentHead')}
              />
              {errors.departmentHead && (
                <p className='text-Error text-[1rem] absolute bottom-[-2rem]'>{errors.departmentHead.message}</p>
              )}
            </div>

            {/* Initial Employee Count */}
            <div className='flex flex-col w-full gap-[1rem] relative'>
              <label className='textFormColor1'>Initial Employee Count</label>
              <input
                type='text'
                placeholder='ex. 10'
                className='inputMod pr-[1.5625rem]'
                {...register('initialEmployeeCount')}
              />
              {errors.initialEmployeeCount && (
                <p className='text-Error text-[1rem] absolute bottom-[-2rem]'>{errors.initialEmployeeCount.message}</p>
              )}
            </div>

            {/* Department Description */}
            <div className='flex flex-col gap-[1rem] relative'>
              <label className='text-formColor'>Department Description</label>
              <textarea
                placeholder='Enter department description ..'
                className='text-formColor bg-inputBack rounded-[10px] placeholder-input pt-[0.59375rem] pl-[1.1875rem] resize-none h-[5.5rem]'
                {...register('description')}
              />
              {errors.description && (
                <p className='text-Error text-[1rem] absolute bottom-[-2rem]'>{errors.description.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className='w-full h-[3.4375rem] mt-[0.5rem]'>
          <button
            type='submit'
            className='w-full h-full bg-lemongreen rounded-[10px] cursor-pointer'
          >
            Create Department
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDep;
