'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Dropdown } from '@/app/Components/DropDown';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Zod schema
const schema = z.object({
  Shift: z.string().nonempty('Shift is required'),
  WorkLocation: z.string().nonempty('Work Location is required'),
  Certification: z
    .any()
    .refine(file => file?.length > 0, 'Certification file is required'),
});
const Page = () => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      Shift: '',
      WorkLocation: '',
      Certification: null,
    },
  });

  const onSubmit = (data) => {
    console.log('Form Data:', data);
    router.push('/'); // Redirect after form completion
  };

  return (
    <div className='font-semibold flex flex-col gap-[4rem]'>
      {/* Header */}
      <div className='flex flex-col gap-[2.5rem]'>
        <div className='flex items-center gap-[0.9375rem]'>
          <img
            onClick={() => router.push('/EmployeeRegistration/Compensation')}
            src='/image/Icon/ArrowLeft.png'
            alt='Back'
          />
          <li className='textWhite list-none'>4. Work Details</li>
        </div>

        {/* ProgressBar */}
        <div className='grid grid-cols-4'>
          <div className='rounded-[0.53125rem] bg-lemongreen w-[22.625rem] h-[5px]'></div>
          <div className='rounded-[0.53125rem] bg-lemongreen w-[22.625rem] h-[5px]'></div>
          <div className='rounded-[0.53125rem] bg-lemongreen w-[22.625rem] h-[5px]'></div>
          <div className='rounded-[0.53125rem] bg-lemongreen w-[22.625rem] h-[5px]'></div>
        </div>
      </div>

      <div className='between gap-[12.25rem]'>
        {/* Form */}
        <div className='w-[52.5625rem] h-[36.3125rem] overflow-y-auto scrollBarDash'>
          
          <form
            className='flex gap-[2.5625rem] px-[10px] flex-wrap'
            onSubmit={handleSubmit(onSubmit)}
          >
             {/* two column */}
          <div className='flex gap-[2.5625rem]'> 
            <div className='flex flex-col w-[23.1875rem] gap-[35px]'>

              {/* Work Location */}
              <div>
                <Controller
                  control={control}
                  name='WorkLocation'
                  render={({ field }) => (
                    <Dropdown
                      label='Work Location'
                      options={['Office', 'Home']}
                      selected={field.value}
                      onSelect={field.onChange}
                      placeholder='Office'
                    />
                  )}
                />
                {errors.WorkLocation && <span className='text-Error text-[1rem]'>{errors.WorkLocation.message}</span>}
              </div>

              {/* Certification */}
              <div className='flex flex-col gap-[1rem]'>
                <label className='text-formColor'>Certification</label>
                <label className='inputModfile cursor-pointer border-none'>
                   <img src='/image/Icon/File.png' alt='' />
                  <span className='text-limeLight'>Upload Certification</span>
                  <input type='file' className='hidden' {...register('Certification')} />
                </label>
                {errors.Certification && <span className='text-Error text-[1rem]'>{errors.Certification.message}</span>}
              </div>

            </div>

            <div className='w-[23.1875rem] flex flex-col gap-[35px]'>
              {/* Shift */}
              <div>
                <Controller
                  control={control}
                  name='Shift'
                  render={({ field }) => (
                    <Dropdown
                      label='Shift Details'
                      options={['Morning Shift', 'Night Shift']}
                      selected={field.value}
                      onSelect={field.onChange}
                      placeholder='Morning Shift'
                    />
                  )}
                />
                {errors.Shift && <span className='text-Error text-[1rem]'>{errors.Shift.message}</span>}
              </div>



            </div>
          </div>
            {/* Buttons */}
            <div className='w-full h-[3.4375rem] my-[4rem] px-[10px] flex gap-[2.5625rem]'>
              <button
                type='button'
                onClick={() => router.push('/EmployeeRegistration/Compensation')}
                className='w-[23.1875rem] border border-formColor text-formColor rounded-[10px] cursor-pointer'
              >
                Back
              </button>
              <button
                type='submit'
                className='w-[23.1875rem] bg-lemongreen rounded-[10px] cursor-pointer'
              >
                Complete
              </button>
            </div>
          </form>
        </div>

        {/* Sidebar */}
        <div className='flex-1'>
          <div className='border border-limegray w-[31rem] rounded-[1.1875rem] px-[2.25rem] pt-[1.5625rem] pb-[1.9375rem]'>
            <div className='flex items-center gap-[10px] pb-[0.8125rem]'>
              <img src='/image/Icon/Alert.png' alt='Alert' />
              <span className='textFormColor'><strong>Important:</strong></span>
            </div>
            <div className='space-y-[2.25rem]'>
              <p className='textLimegray'>
                Provide accurate information about your system access and work details, including username, role, shift, and work location.
              </p>
              <p className='textLimegray'>
                <strong className='text-formColor'>Tip:</strong> Ensure uploaded certification files are valid and up-to-date.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
