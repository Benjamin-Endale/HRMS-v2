'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Dropdown } from '@/app/Components/DropDown';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import DropDownSearch from '@/app/Components/DropDownSearch'

// Zod Schema for Validation
const allowedDomains=[
  "zoom.us",
  "meet.google.com",
  "teams.microsoft.com"
]
 
const scheduleSchema = z.object({
  applicantEmail: z.string().email("Invalid candidate email"),
  jobTitle: z.string().min(1, "Job title required"),

  scheduledDate: z.string()
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
  scheduledTime: z.string().min(1, "Time required"),

  duration: z.string().min(1, "Duration is required"),
  locationOrMeetingUrl: z.string().min(1, "Location or Meeting URL required"),

  interviewerEmail: z.string().email("Invalid interviewer email"),
  interviewNote: z.string().optional(),
  mode: z.string().min(1, "Mode is required"),
});


export default function AddSchedule({ onClose , addSub , ShortlIst , users }) {
  const router = useRouter();
  const [selectedDuration, setSelectedDuration] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState('');
  const [selectedInterviewer, setSelectedInterviewer] = useState('');
    const [selectedInterview, setSelectedInterview] = useState('');
  const [isIp, setIsIp] = useState('')
  const [time, setTime] = useState('09:00');
    const [searchTerm, setSearchTerm] = useState('');
  

 

  const {
    register,
    setValue,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(scheduleSchema),
    defaultValues: {
      applicantEmail: "",
      jobTitle: "",
      scheduledDate: "",
      scheduledTime: "",
      duration: "",
      locationOrMeetingUrl: "",
      interviewerEmail: "",
      interviewNote: "",
      mode: "",
    },
  });
  
  console.log(errors)
  const onSubmit = (data) => {
    console.log('Form Data:', data);
    router.push('/'); // redirect after submitS
  };

    // ✅ Search filtering for employees
  const filteredUsers = ShortlIst.shortlistedApplicants.filter((cand) => {
    const fullName = `${cand.name}`.toLowerCase();
    return (
      cand.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fullName.includes(searchTerm.toLowerCase())
    );
  }); 
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
        className="flex flex-col gap-[2.375rem]"
      >
            {/* Candidate Head Search */}
            <div className="relative w-full flex flex-col ">
            <label className='text-formColor mb-[1rem]' htmlFor="">Search Candidate</label>
              <div className="w-full h-12.5 flex items-center gap-[1.1875rem] bg-[#1D2015] rounded-[0.625rem] px-[1.4375rem]">
                <img src="/image/Icon/SearchIcon.png" alt="" />
                <input
                  type="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search employee by email or name"
                  className="placeholder-input text-white w-full h-full outline-0"
                />
              </div>

              {/* Dropdown search results */}
              {searchTerm && filteredUsers.length > 0 && (
                <div className="absolute top-[6rem] z-10 w-full bg-[#25281B] border border-[#3a3a3a] mt-1 rounded-md max-h-[200px] overflow-y-auto">
                  {filteredUsers.map((user) => (
                    <div
                      key={user.email}
                      onClick={() => {
                        setSelectedCandidate(user);
                        setSearchTerm('');
                      }}
                      className="p-2 hover:bg-[#343726] cursor-pointer text-white"
                    >
                      <div className="font-medium">
                        {user.name}
                      </div>
                      <div className="text-sm text-gray-400">{user.email}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
        <div className="w-full flex gap-[1.125rem]">
          {/* Left side */}
          <div className="flex flex-col gap-[2.375rem] w-[15.5625rem]">
            {/* Candidate */}
 
            <div className="flex flex-col w-full  relative gap-[1rem]">
              <label className="textFormColor1">{addSub} Candidate</label>
              <input
                type="text"
                placeholder="Select from search above"
                value={selectedCandidate ? `${selectedCandidate.name}` : ''}
                readOnly
                className="inputMod pr-[1.5625rem] bg-[#2a2c1f] text-white "
                {...register('candidate')}
              />
              {!selectedCandidate && (
                <p className="text-Error absolute bottom-[-2rem] text-[1rem]">
                  Select a   Candidate   from search
                </p>
              )}
            </div>

            {/* Interview Type */}
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
                  selected={selectedInterviewer}
                  onSelect={(value) => {
                    setSelectedInterviewer(value);
                    field.onChange(value);
                  }}
                  placeholder="Select Interview Type"
                />
              )}
            />
            {errors.interviewType && (
              <p className="text-Error text-[1rem]">
                {errors.interviewType.message}
              </p>
            )}

            {/* Date */}
            <div className="flex flex-col w-full gap-[1rem]">
              <label className="textFormColor1">Date</label>
              <input
                type="date"
                className="inputMod pr-[1.5625rem]"
                {...register('date')}
              />
              {errors.date && (
                <p className="text-Error text-[1rem]">{errors.date.message}</p>
              )}
            </div>
          </div>

          {/* Right side */}
          <div className="w-[15.5625rem] flex flex-col gap-[2.375rem]">
            {/* Interviewer */}
            <Controller
              name="interviewer"
              control={control}
              render={({ field }) => (
              <DropDownSearch
                label="Interviewer"
                options={users.map((u) => ({
                  label: (
                    <div>
                      <div className="font-medium">{u.fullName}</div>
                      <div className="text-sm text-limegray">{u.email}</div>
                    </div>
                  ),
                  labelText: `${u.fullName} ${u.email}`, // for search
                  value: u.fullName,
                }))}
  
                selected={selectedInterview}
                onSelect={(name) => {
                  setSelectedInterview(name);
                  field.onChange(name);
                }}
                placeholder="Search interviewer..."
              />

              )}
            />
            {errors.interviewer && (
              <p className="text-Error text-[1rem]">
                {errors.interviewer.message}
              </p>
            )}

            {/* Duration */}
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
              <p className="text-Error text-[1rem]">{errors.duration.message}</p>
            )}

          <div className='flex flex-col gap-[1rem] relative'>
            <label className='text-formColor'>Time</label>
            <input
              type="time"
              className="inputMod pr-[1.1875rem]"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
          </div>
        </div>

        {/* Location / Note */}
        <div>
          <div className="flex flex-col gap-[2.375rem]">
            <div className="flex flex-col gap-[1rem]">
              <label className="text-formColor">Location / Meeting Link</label>
              <textarea
                placeholder="Conference Room or Zoom link"
                className="text-formColor bg-inputBack rounded-[10px] placeholder-input pt-[0.59375rem] pl-[1.1875rem] resize-none h-[5.5rem]"
                {...register('location')}
              />
              {errors.location && (
                <p className="text-Error text-[1rem]">
                  {errors.location.message}
                </p>
              )}
            </div>
 
            {/* Interview Note */}
            <div className="flex flex-col gap-[1rem]">
              <label className="text-formColor">Interview Note</label>
              <textarea
                placeholder="Add any special instructions or notes"
                className="text-formColor bg-inputBack rounded-[10px] placeholder-input pt-[0.59375rem] pl-[1.1875rem] resize-none h-[5.5rem]"
                {...register('note')}
              />
              {errors.note && (
                <p className="text-Error text-[1rem]">{errors.note.message}</p>
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
