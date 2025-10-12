'use client'

import React, { useEffect, useState } from 'react' 
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAdminForm } from '@/app/Store/AdminFormContext';
import { hrmsAPI } from '@/app/lib/api/client'
import { toFormData } from '@/app/lib/utils/toFormData'

const schema = z
  .object({
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Invalid email address'),
    role: z.string().min(1, 'Role is required'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    ConfirmPassword: z.string().min(
      8,
      'Confirm Password must be at least 8 characters long'
    ),
  })
  .refine((data) => data.password === data.ConfirmPassword, {
    message: 'Passwords do not match',
    path: ['ConfirmPassword'],
  })

const Page = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false);
  const { employeeData, setEmployeeData, tenantData, compensationData } = useAdminForm()


  

const { register, handleSubmit, setValue, formState: { errors } } = useForm({
  resolver: zodResolver(schema),
  defaultValues: {
    email: employeeData?.Email || '',
    role:'SystemAdmin',
    password: '',
    contractFile: undefined
  },
})

useEffect(() => {
  if (employeeData?.email) setValue('email', employeeData.Email)
}, [employeeData, setValue])

console.log("employeeData:", employeeData);
console.log("compensationData:", compensationData);


const onSubmit = async (data) => {
  try {
    setLoading(true);

    // 1️⃣ Prepare tenant payload
    let tenantPayload = { ...tenantData };
    if (!tenantPayload.Domain || tenantPayload.Domain === employeeData.Email) {
      const randomSuffix = Math.floor(Math.random() * 10000);
      tenantPayload.Domain = `tenant${randomSuffix}@example.com`;
    }

    // 2️⃣ Create tenant
    const tenantRes = await hrmsAPI.createTenant(tenantPayload);
    const tenantId = tenantRes.id;

    // 3️⃣ Prepare employee FormData
    const employeePayload = new FormData();

    // Merge employeeData
    const requiredEmployeeFields = {
      FirstName: employeeData.FirstName || 'DefaultFirst',
      LastName: employeeData.LastName || 'DefaultLast',
      Email: employeeData.Email || data.email,
      Gender: employeeData.Gender || 'NotSpecified',
      Address: employeeData.Address || 'NotSpecified',
      JobTitle: employeeData.JobTitle || 'SystemAdmin',
      Nationality: employeeData.Nationality || 'NotSpecified',
      PhoneNumber: employeeData.PhoneNumber || '0000000000',
      MaritalStatus: employeeData.MaritalStatus || 'NotSpecified',
      EmploymentType: employeeData.EmploymentType || 'FullTime',
      EmergencyContactName: employeeData.EmergencyContactName || 'NotSpecified',
      EmergencyContactNumber: employeeData.EmergencyContactNumber || '0000000000',
      EmployeeEducationStatus: employeeData.EmployeeEducationStatus || 'NotSpecified',
      PhotoUrl: employeeData.PhotoUrl || 'https://dummyimage.com/1x1/000/fff', // placeholder
      ...employeeData, // merge any other optional fields
    };

    Object.entries(requiredEmployeeFields).forEach(([key, value]) => {
      if (value !== undefined) {
        if (value instanceof File) {
          employeePayload.append(key, value);
        } else {
          employeePayload.append(key, value);
        }
      }
    });

    // Merge compensation data
    Object.entries(compensationData).forEach(([key, value]) => {
      if (value !== undefined) {
        if (value instanceof File) employeePayload.append(key, value);
        else employeePayload.append(key, value);
      }
    });
Object.entries(employeeData).forEach(([key, value]) => {
  if (value !== undefined) {
    if (value instanceof FileList && value.length > 0) {
      employeePayload.append(key, value[0]); // ✅ send the first file
    } else if (value instanceof File) {
      employeePayload.append(key, value);
    } else {
      employeePayload.append(key, value);
    }
  }
});

    // Add tenant ID
    employeePayload.append('tenantId', tenantId);

    // 4️⃣ Send employee creation request
    const employeeRes = await hrmsAPI.createEmployee(employeePayload);
    const employeeId = employeeRes.id;

    // 5️⃣ Create user
    await hrmsAPI.createUser({
      tenantId,
      employeeId,
      email: data.email || employeeData.Email,
      password: data.password,
    });

    // 6️⃣ Update context
    setEmployeeData(prev => ({ ...prev, ...data, tenantId }));

    alert('Tenant, employee, and user created successfully!');
    router.push('/');
  } catch (err) {
    console.error(err);
    alert('Error: ' + (err.message || JSON.stringify(err)));
  } finally {
    setLoading(false);
  }
};




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
          <h4 className='textFormColor'>User Authorization</h4>
        </div>
      </div>

      {/* Main Form */}
      <div className='font-semibold flex flex-col gap-[4rem]'>
        <div className='between gap-[12.25rem]'>
          <div>
            <form
              className='flex flex-col gap-[2.5625rem]'
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* Two column layout */}
              <div className='flex gap-[2.5625rem]'>
                <div className='flex flex-col w-[23.1875rem] gap-[35px]'>
                  {/* Email */}
                  <div className='flex flex-col gap-[1rem]'>
                    <label className='text-formColor'>Email</label>
                      <input
                        type='email'
                        className='inputMod bg-gray-100'
                        placeholder={employeeData?.email || ''}
                        readOnly // ✅ allows it to stay uneditable but still part of form data
                        {...register('email')}
                      />
                      {errors.email && (
                        <span className='text-Error text-[1rem]'>{errors.email.message}</span>
                      )}

                  </div>
                  {/* Role */}
                  <div className='flex flex-col gap-[1rem]'>
                    <label className='text-formColor'>Role</label>
                    <input
                      type='text'
                      placeholder='SystemAdmin'
                      className='inputMod'

                      disabled
                      {...register('role')}
                    />
                  </div>
                </div>

                {/* Passwords */}
                <div className='flex flex-col w-[23.1875rem] gap-[35px]'>
                  <div className='flex flex-col gap-[1rem]'>
                    <label className='text-formColor'>Password</label>
                    <input
                      type='password'
                      placeholder='*************'
                      className='inputMod'
                      {...register('password')}
                    />
                    {errors.password && (
                      <span className='text-Error text-[1rem]'>
                        {errors.password.message}
                      </span>
                    )}
                  </div>

                  <div className='flex flex-col gap-[1rem]'>
                    <label className='text-formColor'>Confirm Password</label>
                    <input
                      type='password'
                      placeholder='*************'
                      className='inputMod'
                      {...register('ConfirmPassword')}
                    />
                    {errors.ConfirmPassword && (
                      <span className='text-Error text-[1rem]'>
                        {errors.ConfirmPassword.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className='w-full h-[3.4375rem] my-[4rem] px-[10px] flex gap-[2.5625rem]'>
                <button
                  type='button'
                  onClick={() =>
                    router.push('/SuperAdmin/CreateOrganization/Compensation')
                  }
                  className='w-[23.1875rem] border border-formColor text-formColor rounded-[10px] cursor-pointer'>
                  Back
                </button>
                <button
                  type='submit'
                  className='w-[23.1875rem] bg-lemongreen rounded-[10px] cursor-pointer'
                >
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
                <span className='textFormColor'>
                  <strong>Important:</strong>
                </span>
              </div>
              <div className='space-y-[2.25rem]'>
                <p className='textLimegray'>
                  Provide accurate information about your authorization
                  credentials. Double-check email and password before submitting.
                </p>
                <p className='textLimegray'>
                  <strong className='text-formColor'>Tip:</strong> Use a strong
                  password and confirm it carefully.
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
