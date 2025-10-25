'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Dropdown } from '@/app/Components/DropDown';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const AnnounceSchema = z.object({
  Destination: z.string().min(2, "Destination is required"),
  AnnouncementCategory: z.string().min(2, "Announcement category is required"),
  Title: z.string().min(2, "Title is required"),
  Announcement: z.string().min(2, "Announcement is required"),
});

export default function AddAnnounce({ onClose }) {
//   const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(AnnounceSchema),
    defaultValues: {
      Destination: "",
      AnnouncementCategory: "",
      Title: "",
      Announcement: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    // router.push('/AddAnnounce/AddAnnounce'); // redirect after submit
  };

    return (
    <div className='px-[3rem] py-[2.875rem] space-y-[3.125rem] font-semibold w-full'>
        <div className='flex justify-between'>
        <div>
          <h1 className='textFormColor'>Create New Announcement</h1>
          <h4 className='text-limegray'>Set up a new announcement</h4>
        </div>
        <button onClick={onClose} className='rounded-full center-center cursor-pointer'>
          <img src="/image/Icon/Action/CloseCircle.png" alt="Close" />
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-[2.375rem]'>
        {/* Destination */}
        <div className='flex-1 relative'>
          <Controller
            control={control}
            name='Destination'
            render={({ field }) => (
              <Dropdown
                label="Destination"
                options={['Engineering', 'Marketing', 'Finance']}
                selected={field.value}
                onSelect={field.onChange}
                placeholder="All Destination"
              />
            )}
          />
          {errors.Destination && <span className='text-Error text-[1rem] absolute bottom-[-2rem]'>{errors.Destination.message}</span>}
        </div>

        {/* Announcement Category */}
        <div className='flex-1 relative'>
          <Controller
            control={control}
            name='AnnouncementCategory'
            render={({ field }) => (
              <Dropdown
                label="Announcement categories"
                options={['Engineering', 'Marketing', 'Finance']}
                selected={field.value}
                onSelect={field.onChange}
                placeholder="Urgent"
              />
            )}
          />
          {errors.AnnouncementCategory && <span className='text-Error text-[1rem] absolute bottom-[-2rem]'>{errors.AnnouncementCategory.message}</span>}
        </div>

        {/* Title */}
        <div className='flex flex-col w-full gap-[1rem] relative'>
          <label className='textFormColor1'>Title</label>
          <input
            type="text"
            placeholder='Add header'
            className='inputMod pr-[1.5625rem]'
            {...register("Title")}
          />
          {errors.Title && <span className='text-Error text-[1rem] absolute bottom-[-2rem]'>{errors.Title.message}</span>}
        </div>

        {/* Announcement */}
        <div className='flex flex-col gap-[1rem] relative'>
          <label className='textFormColor'>Announcement</label>
          <textarea
            placeholder='Detailed description of the Program and expected outcomes..'
            className='textFormColor bg-inputBack rounded-[10px] placeholder-input placeholder:text-[15px] pt-[0.59375rem] pl-[1.1875rem] resize-none h-[5.5rem]'
            {...register("Announcement")}
          />
          {errors.Announcement && <span className='text-Error text-[1rem] absolute bottom-[-2rem]'>{errors.Announcement.message}</span>}
        </div>
        {/* Submit Button */}
        <div className='w-full h-[3.4375rem] mt-[0.5rem]'>
          <button type="submit" className='w-full h-full bg-lemongreen rounded-[10px] cursor-pointer'>
            Create Announcement
          </button>
        </div>
      </form>
    </div>
  );
}
