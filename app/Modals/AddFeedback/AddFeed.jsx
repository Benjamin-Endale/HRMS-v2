'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'

const feedbackSchema = z.object({
  instruction: z.string().min(6, "Instruction for Reviewer is required"),
})

export default function AddFeed({ onClose }) {
  const router = useRouter()
  const [selectedDept, setSelectedDept] = useState('')
  const [selectedJob, setSelectedJob] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      instruction: '',
    },
  })

  // Form submission handler
  const onSubmit = (data) => {
    console.log('Form Data:', data)
    // Navigate after successful submission
    router.push('/approved')
  }

  return (
    <div className='px-[3rem] py-[2.875rem] space-y-[3.125rem] font-semibold w-full'>
      <div className='flex justify-between'>
        <div>
          <h1 className='textFormColor'>Request 360° Feedback</h1>
          <h4 className='text-limegray'>Set up a feedback collection cycle</h4>
        </div>
        <button onClick={onClose} className='rounded-full center-center cursor-pointer'>
          <img src="/image/Icon/Action/CloseCircle.png" alt="Close" />
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-[2.375rem]'>
        <div className='flex flex-col gap-[1rem] relative'>
          <label htmlFor='instruction' className='text-formColor'>
            Instructions for Reviewers
          </label>
          <textarea
            id='instruction'
            placeholder='Provide specific instruction or focus area for the feedback'
            className='text-formColor bg-inputBack rounded-[10px] placeholder-input pt-[0.59375rem] pl-[1.1875rem] resize-none h-[19.0625rem]'
            {...register('instruction')}
          />
          {errors.instruction && (
            <span className='text-Error text-[1rem] absolute bottom-[-2rem]'>{errors.instruction.message}</span>
          )}
        </div>

        <div className='w-full h-[3.4375rem] mt-[0.5rem]'>
          <button
            type='submit'
            className='w-full h-full bg-lemongreen rounded-[10px] cursor-pointer'
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}
