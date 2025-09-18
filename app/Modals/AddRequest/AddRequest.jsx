'use client'

import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dropdown } from '@/app/Components/DropDown'

// Zod schema
const addRequestSchema = z.object({
  employee: z.string().min(3, 'Employee name is required'),
  feedbackDeadline: z.string()
  .min(1,'Feedback deadline is required')
  .refine(
      (value) => {
        if (!value) return false;
        const today = new Date();
        const date = new Date(value);
        return date >= today;
      },
      { message: 'Date must be today or later' }
    ),
  feedbackSource: z.string().nonempty('Feedback source is required'),
  instructions: z.string().max(500, 'Max 500 characters').optional(),
})

export default function AddRequest({ onClose }) {
  const [selectedRequest, setSelectedRequest] = useState('')

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addRequestSchema),
    defaultValues: {
      employee: '',
      feedbackDeadline: '',
      feedbackSource: '',
      instructions: '',
    },
  })

  const onSubmit = (data) => {
    console.log('Form Data:', data)
    // Navigate or send data to API
    // router.push('/next-page')
  }

  return (
    <div className="px-[3rem] py-[2.875rem] space-y-[3.125rem] font-semibold w-full">
      <div className="flex justify-between">
        <div>
          <h1 className="textFormColor">Request 360° Feedback</h1>
          <h4 className="text-limegray">Set up a feedback collection cycle</h4>
        </div>
        <button onClick={onClose} className="rounded-full center-center cursor-pointer">
          <img src="/image/Icon/Action/CloseCircle.png" alt="Close" />
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[2.375rem]">
        <div className="w-full flex gap-[1.125rem]">
          {/* Employee */}
          <div className="flex flex-col w-full gap-[1rem]">
            <label className="textFormColor1">Employee</label>
            <input
              type="text"
              placeholder="Select employee"
              className="inputMod pr-[1.5625rem]"
              {...register('employee')}
            />
            {errors.employee && <p className="text-Error text-[1rem]">{errors.employee.message}</p>}
          </div>

          {/* Feedback Deadline */}
          <div className="flex flex-col w-full gap-[1rem]">
            <label className="textFormColor1">Feedback Deadline</label>
            <input
              type="date"
              placeholder="Pick a date"
              className="inputMod pr-[1.5625rem]"
              {...register('feedbackDeadline')}
            />
            {errors.feedbackDeadline && (
              <p className="text-Error text-[1rem]">{errors.feedbackDeadline.message}</p>
            )}
          </div>
        </div>

        {/* Feedback Sources */}
        <div className="flex flex-col gap-[2.375rem]">
          <Controller
            control={control}
            name="feedbackSource"
            render={({ field }) => (
              <Dropdown
                label="Feedback Sources"
                options={['Engineering', 'Marketing', 'Finance']}
                selected={selectedRequest}
                onSelect={(value) => {
                  field.onChange(value)
                  setSelectedRequest(value)
                }}
                placeholder="All Department"
              />
            )}
          />
          {errors.feedbackSource && (
            <p className="text-Error text-[1rem]">{errors.feedbackSource.message}</p>
          )}

          {/* Instructions */}
          <div className="flex flex-col gap-[1rem]">
            <label className="text-formColor">Instructions for Reviewers</label>
            <textarea
              placeholder="Provide specific instruction or focus area for the feedback"
              className="text-formColor bg-inputBack rounded-[10px] placeholder-input pt-[0.59375rem] pl-[1.1875rem] resize-none h-[5.5rem]"
              {...register('instructions')}
            ></textarea>
            {errors.instructions && (
              <p className="text-Error text-[1rem]">{errors.instructions.message}</p>
            )}
          </div>
        </div>

        <div className="w-full h-[3.4375rem] mt-[0.5rem]">
          <button
            type="submit"
            className="w-full h-full bg-lemongreen rounded-[10px] cursor-pointer"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  )
}
