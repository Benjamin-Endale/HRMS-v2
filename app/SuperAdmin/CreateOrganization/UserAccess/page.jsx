'use client'

import React, { useEffect, useState } from 'react' 
import { useRouter} from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAdminForm } from '@/app/Store/AdminFormContext';
import { hrmsAPI } from '@/app/lib/api/client'
import { toPascal } from '@/app/lib/utils/toPascal';
import Successful from '@/app/Modals/Successfully/Successful'
import ModalContainerSuccessful from '@/app/Modals/Successfully/ModalContainerSuccessful'

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
  const [isOpen , setisOpen] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  

const { register, handleSubmit, setValue, formState: { errors } } = useForm({
  resolver: zodResolver(schema),
  defaultValues: {
    email: employeeData?.email || '',
    role:'SystemAdmin',
    password: '',
  },
})

useEffect(() => {
  if (employeeData?.email) setValue('email', employeeData.email)
}, [employeeData, setValue])

const employeePayload = {...employeeData , ...compensationData};

      // Convert keys to PascalCase
const pascalEmployee = toPascal(employeePayload);


const onSubmit = async (data) => {
  try {
    setLoading(true);

    // --- Prepare Tenant Payload ---
    let tenantPayload = { ...tenantData };
    if (!tenantPayload.Domain || tenantPayload.Domain === employeeData?.Email) {
      tenantPayload.Domain = `tenant${Math.floor(Math.random() * 10000)}@example.com`;
    }
    console.log(tenantPayload)

    // --- Create Tenant ---
    const tenantRes = await hrmsAPI.createTenant(tenantPayload);
    console.log("Tenant response:", tenantRes);

    const tenantId = tenantRes?.tenant?.id;
    if (!tenantId) throw new Error('Tenant creation failed: tenantId missing');



    // --- Prepare Employee Payload ---
    const plainEmployee = JSON.parse(JSON.stringify(employeeData || {}));
    const plainCompensation = JSON.parse(JSON.stringify(compensationData || {}));

    const rawEmployee = {
      ...plainEmployee,
      ...plainCompensation,
      TenantId: tenantId,
    };

    // Convert keys to PascalCase (matches your backend DTO)
    const pascalEmployee = toPascal(rawEmployee);

    // --- Convert to FormData ---
    const formData = new FormData();

    for (const key in pascalEmployee) {
      if (!pascalEmployee.hasOwnProperty(key)) continue;

      const value = pascalEmployee[key];

      if (value instanceof FileList) {
        for (let i = 0; i < value.length; i++) {
          formData.append(key, value[i]);
        }
      } else if (value !== undefined && value !== null) {
        formData.append(key, value.toString());
      }
    }


    // --- Create Employee ---
    const employeeRes = await hrmsAPI.createEmployee(formData);

    const employeeId = employeeRes?.employeeID;
    const employeeName = employeeRes?.employeeName;

    // --- Create User ---
    const user= await hrmsAPI.createUser({
      tenantId,
      employeeId,
      email: data.email || employeeData.Email,
      password: data.password,
      role: data.role,
      fullName: employeeName
    });



    // --- Update Local State ---
    setEmployeeData((prev) => ({ ...prev, ...data, tenantId }));

    setisOpen(true)
  } catch (err) {
    console.error('Submission Error:', err);
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
                {/* Passwords */}
<div className='flex flex-col w-[23.1875rem] gap-[35px]'>
  {/* Password Field */}
  <div className='flex flex-col gap-[1rem] relative'>
    <label className='text-formColor'>Password</label>
    <input
      type={showPassword ? 'text' : 'password'}
      placeholder='*************'
      className='inputMod pr-16'
      {...register('password')}
    />
    <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-[70%] -translate-y-[50%]"
              >
                <img
                  src={showPassword ? "/image/Icon/Action/HideEye.png" : "/image/Icon/Action/eye.png"}
                  alt={showPassword ? "Hide Password" : "Show Password"}
                />
              </button>
    {errors.password && (
      <span className='text-Error text-[1rem]'>
        {errors.password.message}
      </span>
    )}
  </div>

  {/* Confirm Password Field */}
  <div className='flex flex-col gap-[1rem] relative'>
    <label className='text-formColor'>Confirm Password</label>
    <input
      type={showConfirmPassword ? 'text' : 'password'}
      placeholder='*************'
      className='inputMod pr-16'
      {...register('ConfirmPassword')}
    />
   <button
                type="button"
                onClick={() => setshowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-[70%] -translate-y-[50%]"
              >
                <img
                  src={showConfirmPassword ? "/image/Icon/Action/HideEye.png" : "/image/Icon/Action/eye.png"}
                  alt={showConfirmPassword ? "Hide Password" : "Show Password"}
                />
              </button>
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
        {isOpen && (
          <ModalContainerSuccessful open={isOpen}>
            <Successful
              Header="Successfully Created"
              Parag="Tenant is created Successfully"
              onNavigate={() => {
                setisOpen(false);
                router.push('/');
              }}

            />
          </ModalContainerSuccessful>
        )}
    </>
  )
}

export default Page
