'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Dropdown } from '@/app/Components/DropDown'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

// Zod schema for validation
const schema = z.object({
Salary: z.coerce
  .number({
    invalid_type_error: 'Salary is required',
  })
  .min(1000, 'Salary must be at least 1000 birr'),
  PaymentMethod: z.string().nonempty('Payment Method is required'),
TaxID: z
  .string()
  .length(10, 'Tax Identification Number must be exactly 10 digits')
  .regex(/^\d+$/, 'Tax Identification Number must contain only digits'),
  Passport: z
    .string()
    .min(1, 'Passport number is required'),   
  BankAccount: z
  .string()
  .length(13, 'Bank Account Number must be exactly 13 digits')
  .regex(/^\d+$/, 'Bank Account Number must contain only digits'),
  Currency: z.string().nonempty('Currency is required'),
  Benefits: z.string().nonempty('Benefits Enrollment is required'),
  ContractFile: z
    .any()
    .refine(file => file?.length > 0, 'Contract file is required'),
  Resume: z
    .any()
    .refine(file => file?.length > 0, 'Resume file is required'),
})

const Page = () => {
  const router = useRouter()
 

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      Salary: '',
      PaymentMethod: '',
      TaxID: '',
      Passport: '',
      BankAccount: '',
      Currency: '',
      Benefits: '',
      ContractFile: null,
      Resume: null,
    },
  })

  const onSubmit = (data) => {
    console.log('Form Data:', data)
    router.push('/SuperAdmin/CreateOrganization/Work')
  }

  return (
    <>
    {/* Progress Bar */}
    <div className='mb-[2.4375rem] flex flex-col gap-[4.125rem]'>
        <div className='grid grid-cols-4'>
            <div className='rounded-[0.53125rem] bg-lemongreen w-[22.625rem] h-[5px]'></div>
            <div className='rounded-[0.53125rem] bg-lemongreen w-[22.625rem] h-[5px]'></div>
            <div className='rounded-[0.53125rem] bg-lemongreen w-[22.625rem] h-[5px]'></div>
            <div className='rounded-[0.53125rem] bg-lemongreen w-[22.625rem] h-[5px]'></div>
        </div>
        <div>
          <h4 className='textFormColor'>User Authorization </h4>
        </div>
    </div>    
    <div className='font-semibold flex flex-col gap-[4rem]'>
      <div className='between gap-[12.25rem]'>
        {/* Form */}
        <div>
          <form className='flex flex-col gap-[2.5625rem] ' onSubmit={handleSubmit(onSubmit)}>
              {/* two column */}
            <div className='flex gap-[2.5625rem]'> 
              <div className='flex flex-col w-[23.1875rem] gap-[35px]'>
                {/* Email */}
                <div className='flex flex-col gap-[1rem]'>
                  <label className='text-formColor'>Email</label>
                  <input
                    type='email'
                    placeholder='e.x bereketdan@gmail.com'
                    className='inputMod'
                    {...register('Email')}
                  />
                  {errors.Email && <span className='text-Error text-[1rem]'>{errors.Email.message}</span>}
                </div>

                {/* Role */}
                <div className='flex flex-col gap-[1rem]'>
                  <label className='text-formColor'>Role</label>
                  <input
                    type='text'
                    placeholder='SystemAdmin'
                    className='inputMod disabled'
                  />                
                  </div>
              </div>
              <div className='flex flex-col w-[23.1875rem] gap-[35px]'>
                {/* password */}
                <div className='flex flex-col gap-[1rem]'>
                  <label className='text-formColor'>Password</label>
                  <input
                    type='password'
                    placeholder='*************'
                    className='inputMod'
                    {...register('Password')}
                  />
                  {errors.Password && <span className='text-Error text-[1rem]'>{errors.Password.message}</span>}
                </div>

                {/* Change Password  */}
                <div className='flex flex-col gap-[1rem]'>
                  <label className='text-formColor'>Confirm Password</label>
                  <input
                    type='password'
                    placeholder='e.x 1000 234 153 6855'
                    className='inputMod'
                    {...register('ConfirmPassword')}
                  />
                  {errors.ConfirmPassword && <span className='text-Error text-[1rem]'>{errors.ConfirmPassword.message}</span>}
                </div>
              </div>
            </div>
              {/* Buttons */}
              <div className='w-full h-[3.4375rem] my-[4rem] px-[10px] flex gap-[2.5625rem]'>
                <button
                  type='button'
                  onClick={() => router.push('/SuperAdmin/CreateOrganization/RegisterAdmin')}
                  className='w-[23.1875rem] border border-formColor text-formColor rounded-[10px] cursor-pointer'
                >
                  Back
                </button>
                <button type='submit' className='w-[23.1875rem] bg-lemongreen rounded-[10px] cursor-pointer'>
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
                Provide accurate information about your compensation and legal documents. Upload the necessary files and ensure all details are correct.
              </p>
              <p className='textLimegray'>
                <strong className='text-formColor'>Tip:</strong> Double-check numbers and uploaded documents before submitting.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Page
