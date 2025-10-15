'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Dropdown } from '@/app/Components/DropDown'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAdminForm } from '@/app/Store/AdminFormContext';

// Zod schema for validation
const schema = z.object({
salary: z.coerce
  .number({
    invalid_type_error: 'Salary is required',
  })
  .min(1000, 'Salary must be at least 1000 birr'),
  paymentMethod: z.string().nonempty('Payment Method is required'),
taxIdentificationNumber: z
  .string()
  .length(10, 'Tax Identification Number must be exactly 10 digits')
  .regex(/^\d+$/, 'Tax Identification Number must contain only digits'),
  passportNumber: z
    .string()
    .min(1, 'Passport number is required'),   
  bankAccountNumber: z
  .string()
  .length(13, 'Bank Account Number must be exactly 13 digits')
  .regex(/^\d+$/, 'Bank Account Number must contain only digits'),
  currency: z.string().nonempty('Currency is required'),
  benefitsEnrollment: z.string().nonempty('Benefits Enrollment is required'),
  contractFile: z
    .any()
    .refine(file => file?.length > 0, 'Contract file is required'),
  resumeFile: z
    .any()
    .refine(file => file?.length > 0, 'Resume file is required'),
})

const Page = () => {
  const router = useRouter()
    const { compensationData, setCompensationData } = useAdminForm();
  

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
      defaultValues: {
        salary: compensationData.salary || '',
        paymentMethod: compensationData.paymentMethod || '',
        taxIdentificationNumber: compensationData.taxIdentificationNumber || '',
        passportNumber: compensationData.passportNumber || '',
        bankAccountNumber: compensationData.bankAccountNumber || '',
        currency: compensationData.currency || '',
        benefitsEnrollment: compensationData.benefitsEnrollment || '',
        contractFile: compensationData.contractFile || '',
        resumeFile: compensationData.resumeFile || '',
      }

  })

const onSubmit = (data) => {

  setCompensationData(data); // store for later steps
  router.push('/SuperAdmin/CreateOrganization/UserAccess');
};


console.log(errors)
  return (
    <>
    {/* Progress Bar */}
    <div className='mb-[2.4375rem] flex flex-col gap-[4.125rem]'>
        <div className='grid grid-cols-4'>
            <div className='rounded-[0.53125rem] bg-lemongreen w-[22.625rem] h-[5px]'></div>
            <div className='rounded-[0.53125rem] bg-lemongreen w-[22.625rem] h-[5px]'></div>
            <div className='rounded-[0.53125rem] bg-lemongreen w-[22.625rem] h-[5px]'></div>
            <div className='rounded-[0.53125rem] bg-[rgba(223,223,223,0.26)] w-[22.625rem] h-[5px]'></div>
        </div>
        <div>
          <h4 className='textFormColor'>Compensation & Legal</h4>
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
                {/* Salary */}
                <div className='flex flex-col gap-[1rem] relative'>
                  <label className='text-formColor'>Salary</label>
                  <input
                    type='number'
                    placeholder='e.x 1000.00 $'
                    className='inputMod'
                    {...register('salary')}
                  />
                  {errors.salary && <span className='text-Error text-[1rem] absolute bottom-[-2rem] '>{errors.salary.message}</span>}
                </div>

                {/* Payment Method */}
                <div className='relative'>
                  <Controller
                    control={control}
                    name='paymentMethod'
                    render={({ field }) => (
                      <Dropdown
                        label='Payment Method'
                        options={['Bank Transfer', 'Hard Cash', 'ATM', 'Agent']}
                        selected={field.value}
                        onSelect={field.onChange}
                        placeholder='Bank Transfer'
                      />
                    )}
                  />
                  {errors.paymentMethod && <span className='text-Error text-[1rem] absolute bottom-[-2rem]'>{errors.paymentMethod.message}</span>}
                </div>

                {/* Tax ID */}
                <div className='flex flex-col gap-[1rem] relative'>
                  <label className='text-formColor'>Tax Identification Number</label>
                  <input
                    type='number'
                    placeholder='e.x 78567578'
                    className='inputMod'
                    {...register('taxIdentificationNumber')}
                  />
                  {errors.taxIdentificationNumber && <span className='text-Error text-[1rem] absolute bottom-[-2rem]'>{errors.taxIdentificationNumber.message}</span>}
                </div>

                {/* Passport */}
                <div className='flex flex-col gap-[1rem] relative'>
                  <label className='text-formColor'>Passport Number</label>
                  <input
                    type='text'
                    placeholder='e.x 1000 234 153 6855'
                    className='inputMod'
                    {...register('passportNumber')}
                  />
                  {errors.passportNumber && <span className='text-Error text-[1rem] absolute bottom-[-2rem]'>{errors.passportNumber.message}</span>}
                </div>

                {/* Contract File */}
                <div className='flex flex-col gap-[1rem] relative'>
                  <label className='text-formColor'>Contract File</label>
                  <label className='inputModfile cursor-pointer border-none'>
                    <img src='/image/Icon/File.png' alt='' />
                    <span className='text-limeLight'>Upload Contract File</span>
                    <input type='file' className='hidden' {...register('contractFile')} />
                  </label>
                  {errors.contractFile && <span className='text-Error text-[1rem] absolute bottom-[-2rem]'>{errors.contractFile.message}</span>}
                </div>
              </div>

              <div className='w-[23.1875rem] flex flex-col gap-[35px]'>
                {/* Currency */}
                <div className='relative'>
                  <Controller
                    control={control}
                    name='currency'
                    render={({ field }) => (
                      <Dropdown
                        label='Currency'
                        options={['USD', 'EURO', 'BIRR']}
                        selected={field.value}
                        onSelect={field.onChange}
                        placeholder='USD'
                      />
                    )}
                  />
                  {errors.currency && <span className='text-Error text-[1rem] absolute bottom-[-2rem]'>{errors.currency.message}</span>}
                </div>

                {/* Bank Account */}
                <div className='flex flex-col gap-[1rem] relative'>
                  <label className='text-formColor'>Bank Account Number</label>
                  <input
                    type='text'
                    placeholder='e.x 1000 234 153 6855'
                    className='inputMod'
                    {...register('bankAccountNumber')}
                  />
                  {errors.bankAccountNumber && <span className='text-Error text-[1rem] absolute bottom-[-2rem]'>{errors.bankAccountNumber.message}</span>}
                </div>

                {/* Benefits */}
                <div className='relative'>
                  <Controller
                    control={control}
                    name='benefitsEnrollment'
                    render={({ field }) => (
                      <Dropdown
                        label='Benefits Enrollment'
                        options={['Health Insurance', 'Utility Insurance', 'Life Insurance']}
                        selected={field.value}
                        onSelect={field.onChange}
                        placeholder='Health Insurance'
                      />
                    )}
                  />
                  {errors.benefitsEnrollment && <span className='text-Error text-[1rem] absolute bottom-[-2rem]'>{errors.benefitsEnrollment.message}</span>}
                </div>

                {/* Resume */}
                <div className='flex flex-col gap-[1rem] relative'>
                  <label className='text-formColor'>Resume</label>
                  <label className='inputModfile cursor-pointer border-none'>
                    <img src='/image/Icon/File.png' alt='' />
                    <span className='text-limeLight'>Upload CV</span>
                    <input type='file' className='hidden' {...register('resumeFile')} />
                  </label>
                  {errors.resumeFile && <span className='text-Error text-[1rem] absolute bottom-[-2rem]'>{errors.resumeFile.message}</span>}
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
                  Next
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
