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
  const [selectedPayments, setSelectedPayments] = useState('')
  const [selectedCurrencies, setSelectedCurrencies] = useState('')
  const [selectedBenefits, setSelectedBenefits] = useState('')

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
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
    router.push('/EmployeeRegistration/System')
  }

  return (
    <div className='font-semibold flex flex-col gap-[4rem]'>
      {/* Header */}
      <div className='flex flex-col gap-[2.5rem]'>
        <div className='flex items-center gap-[0.9375rem]'>
          <img
            onClick={() => router.push('/EmployeeRegistration/AddNewemployeesecond')}
            src='/image/Icon/ArrowLeft.png'
            alt='Back'
          />
          <li className='textWhite list-none'>3. Compensation & Legal</li>
        </div>

        {/* ProgressBar */}
        <div className='grid grid-cols-4'>
          <div className='rounded-[0.53125rem] bg-lemongreen w-[22.625rem] h-[5px]'></div>
          <div className='rounded-[0.53125rem] bg-lemongreen w-[22.625rem] h-[5px]'></div>
          <div className='rounded-[0.53125rem] bg-lemongreen w-[22.625rem] h-[5px]'></div>
          <div className='rounded-[0.53125rem] bg-[rgba(223,223,223,0.26)] w-[22.625rem] h-[5px]'></div>
        </div>
      </div>

      <div className='between gap-[12.25rem]'>
        {/* Form */}
        <div className='w-[49.5625rem] h-[36.3125rem] overflow-y-auto scrollBarDash'>
          <form className='flex gap-[2.5625rem] px-[10px] flex-wrap' onSubmit={handleSubmit(onSubmit)}>
             {/* two column */}
          <div className='flex gap-[2.5625rem]'> 
            <div className='flex flex-col w-[23.1875rem] gap-[35px]'>
              {/* Salary */}
              <div className='flex flex-col gap-[1rem]'>
                <label className='text-formColor'>Salary</label>
                <input
                  type='number'
                  placeholder='e.x 1000.00 $'
                  className='inputMod'
                  {...register('Salary')}
                />
                {errors.Salary && <span className='text-Error text-[1rem]'>{errors.Salary.message}</span>}
              </div>

              {/* Payment Method */}
              <div>
                <Controller
                  control={control}
                  name='PaymentMethod'
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
                {errors.PaymentMethod && <span className='text-Error text-[1rem]'>{errors.PaymentMethod.message}</span>}
              </div>

              {/* Tax ID */}
              <div className='flex flex-col gap-[1rem]'>
                <label className='text-formColor'>Tax Identification Number</label>
                <input
                  type='number'
                  placeholder='e.x 78567578'
                  className='inputMod'
                  {...register('TaxID')}
                />
                {errors.TaxID && <span className='text-Error text-[1rem]'>{errors.TaxID.message}</span>}
              </div>

              {/* Passport */}
              <div className='flex flex-col gap-[1rem]'>
                <label className='text-formColor'>Passport Number</label>
                <input
                  type='text'
                  placeholder='e.x 1000 234 153 6855'
                  className='inputMod'
                  {...register('Passport')}
                />
                {errors.Passport && <span className='text-Error text-[1rem]'>{errors.Passport.message}</span>}
              </div>

              {/* Contract File */}
              <div className='flex flex-col gap-[1rem]'>
                <label className='text-formColor'>Contract File</label>
                <label className='inputModfile cursor-pointer border-none'>
                  <img src='/image/Icon/File.png' alt='' />
                  <span className='text-limeLight'>Upload Contract File</span>
                  <input type='file' className='hidden' {...register('ContractFile')} />
                </label>
                {errors.ContractFile && <span className='text-Error text-[1rem]'>{errors.ContractFile.message}</span>}
              </div>
            </div>

            <div className='w-[23.1875rem] flex flex-col gap-[35px]'>
              {/* Currency */}
              <div>
                <Controller
                  control={control}
                  name='Currency'
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
                {errors.Currency && <span className='text-Error text-[1rem]'>{errors.Currency.message}</span>}
              </div>

              {/* Bank Account */}
              <div className='flex flex-col gap-[1rem]'>
                <label className='text-formColor'>Bank Account Number</label>
                <input
                  type='text'
                  placeholder='e.x 1000 234 153 6855'
                  className='inputMod'
                  {...register('BankAccount')}
                />
                {errors.BankAccount && <span className='text-Error text-[1rem]'>{errors.BankAccount.message}</span>}
              </div>

              {/* Benefits */}
              <div>
                <Controller
                  control={control}
                  name='Benefits'
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
                {errors.Benefits && <span className='text-Error text-[1rem]'>{errors.Benefits.message}</span>}
              </div>

              {/* Resume */}
              <div className='flex flex-col gap-[1rem]'>
                <label className='text-formColor'>Resume</label>
                <label className='inputModfile cursor-pointer border-none'>
                  <img src='/image/Icon/File.png' alt='' />
                  <span className='text-limeLight'>Upload CV</span>
                  <input type='file' className='hidden' {...register('Resume')} />
                </label>
                {errors.Resume && <span className='text-Error text-[1rem]'>{errors.Resume.message}</span>}
              </div>
            </div>
</div>
            {/* Buttons */}
            <div className='w-full h-[3.4375rem] my-[4rem] px-[10px] flex gap-[2.5625rem]'>
              <button
                type='button'
                onClick={() => router.push('/EmployeeRegistration/AddNewemployeesecond')}
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
  )
}

export default Page
