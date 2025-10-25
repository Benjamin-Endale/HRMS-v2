'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Dropdown } from '@/app/Components/DropDown';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Zod Schema for Validation
const allowedDomains=[
  "zoom.us",
  "meet.google.com",
  "teams.microsoft.com"
]
const scheduleSchema = z.object({
  candidate: z.string().min(1, 'Candidate name is required'),
  interviewType: z.string().min(1, 'Interview type is required'),
  date: z.string()
  .min(1, 'Date is required')
  .refine(
      (value) => {
        if (!value) return false;
        const today = new Date();
        const date = new Date(value);
        return date >= today;
      },
      { message: 'Date must be today or later' }
    ),
  interviewer: z.string().min(1, 'Interviewer is required'),
  duration: z.string().min(1, 'Duration is required'),
  time: z.string()
  .min(1, 'Time is required')
   .regex(/^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/i, "Invalid time format (hh:mm AM/PM)"),
  location:z.union([
    // Physical location: just a non-empty string
    z.string().min(1, "Location is required"),

    // Online meeting link: must be a valid URL and include allowed domains
    z.string()
      .url("Invalid URL format")
      .refine(
        (val) => allowedDomains.some(domain => val.includes(domain)),
        { message: "Meeting link must be Zoom, Google Meet, or Teams" }
      )
  ])
});

export default function AddSchedule({ onClose }) {
  const router = useRouter();
  const [selectedDuration, setSelectedDuration] = useState('');
  const [selectedInterviewer, setSelectedInterviewer] = useState('');
  const [selectedInterview, setSelectedInterview] = useState('');

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(scheduleSchema),
    defaultValues: {
      candidate: '',
      interviewType: '',   
      date: '',
      interviewer: '',     
      duration: '',     
      time: '',
      location: '',
      note: '',
    },
  });

  const onSubmit = (data) => {
    console.log('Form Data:', data);
    router.push('/'); // redirect after submit
  };

  return (
    <div className="px-[3rem] py-[2.875rem] space-y-[3.125rem] font-semibold w-full">
      {/* Header */}
      <div className="flex justify-between">
        <div>
          <h1 className="textFormColor">Schedule New Interview</h1>
          <h4 className="text-limegray">Set up an interview with a candidate</h4>
        </div>
        <button
          onClick={onClose}
          className="rounded-full center-center cursor-pointer"
        >
          <img src="/image/Icon/Action/CloseCircle.png" alt="close" />
        </button>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-[2.375rem]">
        <div className="w-full flex gap-[1.125rem]">
          {/* Left side */}
          <div className="flex flex-col gap-[2.375rem] w-[15.5625rem]">
            {/* Candidate */}
            <div className="flex flex-col w-full gap-[1rem] relative">
              <label className="textFormColor1">Candidate</label>
              <input
                type="text"
                placeholder="e.x Frontend developer"
                className="inputMod pr-[1.5625rem]"
                {...register('candidate')}
              />
              {errors.candidate && (
                <p className="text-Error text-[1rem] absolute bottom-[-2rem]">
                  {errors.candidate.message}
                </p>
              )}
            </div>

            {/* Interview Type */}
            <div className='relative'>
              <Controller
              name="interviewType"
              control={control}
              render={({ field }) => (
                <Dropdown
                  label="Interview Type"
                  options={[
                    'Behavioral Interview',
                    'Technical Interview',
                    'Panel Interview',
                  ]}
                  selected={selectedInterview}
                  onSelect={(value) => {
                    setSelectedInterview(value);
                    field.onChange(value);
                  }}
                  placeholder="Select Interview Type"
                />
              )}
            />
            {errors.interviewType && (
              <p className="text-Error text-[1rem] absolute bottom-[-2rem]">
                {errors.interviewType.message}
              </p>
            )}
            </div>

            {/* Date */}
            <div className="flex flex-col w-full gap-[1rem] relative">
              <label className="textFormColor1">Date</label>
              <input
                type="date"
                className="inputMod pr-[1.5625rem]"
                {...register('date')}
              />
              {errors.date && (
                <p className="text-Error text-[1rem] absolute bottom-[-2rem]">{errors.date.message}</p>
              )}
            </div>
          </div>

          {/* Right side */}
          <div className="w-[15.5625rem] flex flex-col gap-[2.375rem]">
          <div className='relative'>
            {/* Interviewer */}
            <Controller
              name="interviewer"
              control={control}
              render={({ field }) => (
                <Dropdown
                  label="Interviewer"
                  options={['Bereket Daniel', 'Benjamin Endale', 'Kaleb Seifu']}
                  selected={selectedInterviewer}
                  onSelect={(value) => {
                    setSelectedInterviewer(value);
                    field.onChange(value);
                  }}
                  placeholder="Select Interviewer"
                />
              )}
            />
            {errors.interviewer && (
              <p className="text-Error text-[1rem] absolute bottom-[-2rem]">
                {errors.interviewer.message}
              </p>
            )}
          </div>
            {/* Duration */}
            <div className='relative'> 
            <Controller
              name="duration"
              control={control}
              render={({ field }) => (
                <Dropdown
                  label="Duration"
                  options={['4pm-6pm', '2pm-3pm', '2pm-5pm']}
                  selected={selectedDuration}
                  onSelect={(value) => {
                    setSelectedDuration(value);
                    field.onChange(value);
                  }}
                  placeholder="Select Duration"
                />
              )}
            />
            {errors.duration && (
              <p className="text-Error text-[1rem] absolute bottom-[-2rem]">{errors.duration.message}</p>
            )}
            </div>          
            {/* Time */}
            <div className="flex flex-col w-full gap-[1rem] relative">
              <label className="textFormColor1">Time</label>
              <input
                type="text"
                placeholder="e.x 10:00 AM"
                className="inputMod pr-[1.5625rem]"
                {...register('time')}
              />
              {errors.time && (
                <p className="text-Error text-[1rem] absolute bottom-[-2rem]">{errors.time.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Location / Note */}
        <div>
          <div className="flex flex-col gap-[2.375rem]">
            <div className="flex flex-col gap-[1rem] relative">
              <label className="text-formColor">Location / Meeting Link</label>
              <textarea
                placeholder="Conference Room or Zoom link"
                className="text-formColor bg-inputBack rounded-[10px] placeholder-input pt-[0.59375rem] pl-[1.1875rem] resize-none h-[5.5rem]"
                {...register('location')}
              />
              {errors.location && (
                <p className="text-Error text-[1rem] absolute bottom-[-2rem]">
                  {errors.location.message}
                </p>
              )}
            </div>

            {/* Interview Note */}
<div className="flex flex-col gap-[1rem] relative">
  <label className="text-formColor">Interview Note</label>
  <textarea
    placeholder="Add any special instructions or notes"
    className="text-formColor bg-inputBack rounded-[10px] placeholder-input pt-[0.59375rem] pl-[1.1875rem] resize-none h-[5.5rem]"
    {...register('note')}
  />
  {errors.note && (
    <p className="text-Error text-[1rem] absolute bottom-[-2rem]">{errors.note.message}</p>
  )}
</div>

          </div>
        </div>

        {/* Submit Button */}
        <div className="w-full h-[3.4375rem] mt-[0.5rem]">
          <button
            type="submit"
            className="w-full h-full bg-lemongreen rounded-[10px] cursor-pointer"
          >
            Complete
          </button>
        </div>
      </form>
    </div>
  );
}
