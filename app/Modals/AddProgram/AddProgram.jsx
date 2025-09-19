'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Dropdown } from '@/app/Components/DropDown';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Zod schema for validation
const programSchema = z.object({
  programTitle: z.string().min(1, 'Program Title is required'),
  level: z.string().min(1, 'Level is required'),
  category: z.string().min(1, 'Category is required'),
  instructor: z.string().min(1, 'Instructor is required'),
  startDate: z.string().min(1, 'Start Date is required'),
  endDate: z.string().min(1, 'End Date is required'),
  duration: z.string().min(1, 'Duration is required'),
  maxEnrollment: z
    .string()
    .min(1, 'Max enrollment is required')
    .regex(/^\d+$/, 'Max enrollment must be a number'),
  description: z.string().min(1, 'Description is required'),
}).refine((data) => {
  if (!data.startDate || !data.endDate) return true;
  return new Date(data.startDate) <= new Date(data.endDate);
}, {
  message: 'End Date must be after Start Date',
  path: ['endDate'],
});

export default function AddProgram({ onClose }) {
  const router = useRouter();
  const [selectedProgram, setSelectedProgram] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(programSchema),
    defaultValues: {
      programTitle: '',
      level: '',
      category: '',
      instructor: '',
      startDate: '',
      endDate: '',
      duration: '',
      maxEnrollment: '',
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
          <h1 className='textFormColor'>Create Training Program</h1>
          <h4 className='text-limegray'>Set up a new training program or course</h4>
        </div>
        <button onClick={onClose} className='rounded-full center-center cursor-pointer'>
          <img src="/image/Icon/Action/CloseCircle.png" alt="close" />
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-[2.4375rem]'>
        <div className='space-y-[2.0625rem]'>
          <div className='flex gap-[1.125rem]'>
            {/* Left column */}
            <div className='w-[15.5625rem] flex flex-col gap-[1.75rem]'>
              {/* Program Title */}
              <Controller
                name='programTitle'
                control={control}
                render={({ field }) => (
                  <Dropdown
                    label='Program Title'
                    options={['Engineering', 'Marketing', 'Finance']}
                    selected={selectedProgram}
                    onSelect={(value) => {
                      setSelectedProgram(value);
                      field.onChange(value);
                    }}
                    placeholder='Select program'
                  />
                )}
              />
              {errors.programTitle && <p className='text-Error text-[1rem]'>{errors.programTitle.message}</p>}

              {/* Level */}
              <Controller
                name='level'
                control={control}
                render={({ field }) => (
                  <Dropdown
                    label='Level'
                    options={['Beginner', 'Intermediate', 'Advanced']}
                    selected={selectedLevel}
                    onSelect={(value) => {
                      setSelectedLevel(value);
                      field.onChange(value);
                    }}
                    placeholder='Select Level'
                  />
                )}
              />
              {errors.level && <p className='text-Error text-[1rem]'>{errors.level.message}</p>}

              {/* Instructor */}
              <div className='flex flex-col w-full gap-[1rem]'>
                <label className='textFormColor1'>Instructor</label>
                <input
                  type='text'
                  placeholder='Instructor Name'
                  className='inputMod pr-[1.5625rem]'
                  {...register('instructor')}
                />
                {errors.instructor && <p className='text-Error text-[1rem]'>{errors.instructor.message}</p>}
              </div>

              {/* Start Date */}
              <div className='flex flex-col w-full gap-[1rem]'>
                <label className='textFormColor1'>Start Date</label>
                <input
                  type='date'
                  className='inputMod pr-[1.5625rem]'
                  {...register('startDate')}
                />
                {errors.startDate && <p className='text-Error text-[1rem]'>{errors.startDate.message}</p>}
              </div>
            </div>

            {/* Right column */}
            <div className='w-[15.5625rem] flex flex-col gap-[1.75rem]'>
              {/* Category */}
              <Controller
                name='category'
                control={control}
                render={({ field }) => (
                  <Dropdown
                    label='Category'
                    options={['Engineering', 'Marketing', 'Finance']}
                    selected={selectedCategory}
                    onSelect={(value) => {
                      setSelectedCategory(value);
                      field.onChange(value);
                    }}
                    placeholder='Select category'
                  />
                )}
              />
              {errors.category && <p className='text-Error text-[1rem]'>{errors.category.message}</p>}

              {/* Duration */}
              <div className='flex flex-col w-full gap-[1rem]'>
                <label className='textFormColor1'>Duration</label>
                <input
                  type='text'
                  placeholder='e.g. 5 Hours'
                  className='inputMod pr-[1.5625rem]'
                  {...register('duration')}
                />
                {errors.duration && <p className='text-Error text-[1rem]'>{errors.duration.message}</p>}
              </div>

              {/* Max Enrollment */}
              <div className='flex flex-col w-full gap-[1rem]'>
                <label className='textFormColor1'>Max Enrollment</label>
                <input
                  type='number'
                  placeholder='30'
                  className='inputMod pr-[1.5625rem]'
                  {...register('maxEnrollment')}
                />
                {errors.maxEnrollment && <p className='text-Error text-[1rem]'>{errors.maxEnrollment.message}</p>}
              </div>

              {/* End Date */}
              <div className='flex flex-col w-full gap-[1rem]'>
                <label className='textFormColor1'>End Date</label>
                <input
                  type='date'
                  className='inputMod pr-[1.5625rem]'
                  {...register('endDate')}
                />
                {errors.endDate && <p className='text-Error text-[1rem]'>{errors.endDate.message}</p>}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className='flex flex-col gap-[1rem]'>
            <label className='text-formColor'>Description</label>
            <textarea
              placeholder='Detailed description of the Program and expected outcomes..'
              className='text-formColor bg-inputBack rounded-[10px] placeholder-input pt-[0.59375rem] pl-[1.1875rem] resize-none h-[5.5rem]'
              {...register('description')}
            />
            {errors.description && <p className='text-Error text-[1rem]'>{errors.description.message}</p>}
          </div>
        </div>

        {/* Submit Button */}
        <div className='w-full h-[3.4375rem] mt-[0.5rem]'>
          <button
            type='submit'
            className='w-full h-full bg-lemongreen rounded-[10px] cursor-pointer'
          >
            Create Program
          </button>
        </div>
      </form>
    </div>
  );
}
