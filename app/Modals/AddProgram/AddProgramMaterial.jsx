'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'

// Zod schema
const addProgramMaterialSchema = z.object({
  documentLink: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  contractFile: z
    .any()
    .refine((file) => file && file.length > 0, 'Contract file is required'),
})

export default function AddProgramMaterial({ onClose }) {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addProgramMaterialSchema),
    defaultValues: {
      documentLink: '',
      contractFile: null,
    },
  });

  const onSubmit = (data) => {
    console.log('Form Data:', data)
    // Navigate to next page after successful upload
    router.push('/nextPage') // change to your actual next page
  }

  return (
    <div className="px-[3rem] py-[2.875rem] space-y-[3.125rem] font-semibold w-full">
      <div className="flex justify-between">
        <div>
          <h1 className="textFormColor">Upload Material</h1>
          <h4 className="text-limegray">Please upload training material</h4>
        </div>
        <button onClick={onClose} className="rounded-full center-center cursor-pointer">
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M25.5 13C25.5 19.9035 19.9035 25.5 13 25.5C6.09644 25.5 0.5 19.9035 0.5 13C0.5 6.09644 6.09644 0.5 13 0.5C19.9035 0.5 25.5 6.09644 25.5 13ZM9.21204 9.21206C9.57815 8.84595 10.1717 8.84595 10.5379 9.21206L13 11.6741L15.462 9.21209C15.8281 8.84597 16.4218 8.84597 16.7879 9.21209C17.154 9.5782 17.154 10.1718 16.7879 10.5379L14.3258 13L16.7879 15.462C17.154 15.8281 17.154 16.4218 16.7879 16.7879C16.4218 17.154 15.8281 17.154 15.462 16.7879L13 14.3259L10.5379 16.7879C10.1718 17.154 9.57818 17.154 9.21206 16.7879C8.84595 16.4218 8.84595 15.8281 9.21206 15.4621L11.6741 13L9.21204 10.5379C8.84591 10.1718 8.84591 9.57818 9.21204 9.21206Z"
              fill="#BEE532"
            />
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[2.4375rem]">
        <div className="space-y-[2.0625rem]">
          <div className="flex gap-[1.125rem]">
            <div className="flex-1">
              {/* Document / Video Link */}
              <div className="flex flex-col w-full gap-[1rem]">
                <label className="textFormColor1">Document / Video Link</label>
                <input
                  type="text"
                  placeholder="e.g. Improve Code Review Process"
                  className="inputMod pr-[1.5625rem]"
                  {...register('documentLink')}
                />
                {errors.documentLink && (
                  <p className="text-Error text-[1rem]">{errors.documentLink.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Contract File */}
          <div className="flex flex-col gap-[1rem]">
            <label htmlFor="contractFile" className="text-formColor">
              Contract File
            </label>
            <label htmlFor="contractFile" className="inputModfile cursor-pointer flex items-center gap-2">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12.8337 1.83301V5.49967C12.8337 5.9859 13.0268 6.45222 13.3706 6.79604C13.7144 7.13985 14.1808 7.33301 14.667 7.33301H18.3337M9.16699 8.24967H7.33366M14.667 11.9163H7.33366M14.667 15.583H7.33366M13.7503 1.83301H5.50033C5.0141 1.83301 4.54778 2.02616 4.20396 2.36998C3.86015 2.7138 3.66699 3.18011 3.66699 3.66634V18.333C3.66699 18.8192 3.86015 19.2856 4.20396 19.6294C4.54778 19.9732 5.0141 20.1663 5.50033 20.1663H16.5003C16.9866 20.1663 17.4529 19.9732 17.7967 19.6294C18.1405 19.2856 18.3337 18.8192 18.3337 18.333V6.41634L13.7503 1.83301Z"
                  stroke="#BEE532"
                  strokeWidth="1.375"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-limeLight">Upload Document File</span>
            </label>
            <input type="file" id="contractFile" className="hidden" {...register('contractFile')} />
            {errors.contractFile && (
              <p className="text-Error text-[1rem]">{errors.contractFile.message}</p>
            )}
          </div>
        </div>

        <div className="w-full h-[3.4375rem] mt-[0.5rem]">
          <button
            type="submit"
            className="w-full h-full bg-lemongreen rounded-[10px] cursor-pointer"
          >
            Upload
          </button>
        </div>
      </form>
    </div>
  )
}
