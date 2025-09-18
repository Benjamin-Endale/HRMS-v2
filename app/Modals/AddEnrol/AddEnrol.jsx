'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Dropdown } from '@/app/Components/DropDown';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Zod schema for validation
const enrolSchema = z.object({
  employee: z.string().min(1, 'Employee is required'),
  trainingProgram: z.string().min(1, 'Training program is required'),
  note: z.string().min(1, 'Enrolment note is required'),
  sendNotification: z.boolean().optional(),
  notifyManager: z.boolean().optional(),
});

export default function AddEnrol({ onClose }) {
  const router = useRouter();
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedTraining, setSelectedTraining] = useState('');

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(enrolSchema),
    defaultValues: {
      employee: '',
      trainingProgram: '',
      note: '',
      sendNotification: false,
      notifyManager: false,
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
            {/* Employee Dropdown */}
            <div className='flex-1'>
              <Controller
                name='employee'
                control={control}
                render={({ field }) => (
                  <Dropdown
                    label='Employee'
                    options={['Engineering', 'Marketing', 'Finance']}
                    selected={selectedEmployee}
                    onSelect={(value) => {
                      setSelectedEmployee(value);
                      field.onChange(value);
                    }}
                    placeholder='Select employee'
                  />
                )}
              />
              {errors.employee && (
                <p className='text-Error text-[1rem]'>{errors.employee.message}</p>
              )}
            </div>

            {/* Training Program Dropdown */}
            <div className='flex-1'>
              <Controller
                name='trainingProgram'
                control={control}
                render={({ field }) => (
                  <Dropdown
                    label='Training Program'
                    options={['Engineering', 'Marketing', 'Finance']}
                    selected={selectedTraining}
                    onSelect={(value) => {
                      setSelectedTraining(value);
                      field.onChange(value);
                    }}
                    placeholder='Select training program'
                  />
                )}
              />
              {errors.trainingProgram && (
                <p className='text-Error text-[1rem]'>{errors.trainingProgram.message}</p>
              )}
            </div>
          </div>

          {/* Enrolment Note */}
          <div className='flex flex-col gap-[1rem]'>
            <label className='text-formColor'>Enrolment Note</label>
            <textarea
              placeholder='Provide specific instruction or focus area for the feedback'
              className='text-formColor bg-inputBack rounded-[10px] placeholder-input pt-[0.59375rem] pl-[1.1875rem] resize-none h-[5.5rem]'
              {...register('note')}
            />
            {errors.note && <p className='text-Error text-[1rem]'>{errors.note.message}</p>}
          </div>

          {/* Checkboxes */}
          <div className='flex flex-col gap-[0.5rem]'>
            <label className='inline-flex items-center cursor-pointer'>
              <input
                type='checkbox'
                className='peer hidden'
                {...register('sendNotification')}
              />
              <span className='w-[1.3125rem] h-[1.3125rem] inline-block border rounded-[5px] border-[#1D2015] bg-[#1D2015] peer-checked:bg-[#BEE532] peer-checked:border-[#BEE532]'></span>
              <span className='textLimeGray1 ml-[0.75rem]'>Send notification to employee</span>
            </label>

            <label className='inline-flex items-center cursor-pointer'>
              <input
                type='checkbox'
                className='peer hidden'
                {...register('notifyManager')}
              />
              <span className='w-[1.3125rem] h-[1.3125rem] inline-block border rounded-[5px] border-[#1D2015] bg-[#1D2015] peer-checked:bg-[#BEE532] peer-checked:border-[#BEE532]'></span>
              <span className='textLimeGray1 ml-[0.75rem]'>Notify employee’s manager</span>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className='w-full h-[3.4375rem] mt-[0.5rem]'>
          <button
            type='submit'
            className='w-full h-full bg-lemongreen rounded-[10px] cursor-pointer'
          >
            Enroll Employee
          </button>
        </div>
      </form>
    </div>
  );
}
