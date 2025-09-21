'use client'

import React from 'react'
import { useRouter } from 'next/navigation';
import { Dropdown } from '../../Components/DropDown';
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
    FirstName: z.string().min(1, "First name is required").min(3,"First Name must be at least 3 characters"),
    LastName: z.string().min(2, "Last name is required").min(3,"Last Name must be at least 3 characters"),
    DateofBirth: z.
    string()
    .min(1, { message: "Date of Birth is required" }) 
    .refine((value) => {
    if (!value) return false;
    const today = new Date();
    const dob = new Date(value);
    const age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    const dayDiff = today.getDate() - dob.getDate();

    // adjust if birthday hasn't occurred yet this year
    const exactAge = monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0) ? age : age - 1;
    return exactAge >= 18;
  }, {
    message: "You must be at least 18 years old",
  }),
    Nationality: z.string().nonempty("Nationality is required"),
    Email: z.string().email("Enter a valid email").min(3,"Email must be at least 3 characters"),
    Address: z.string().min(3, "Address is required").min(3,"Address must be at least 3 characters"),
    Gender: z.string().nonempty("Gender is required"),
    Marital: z.string().nonempty("Marital status is required"),
    Phone: z.string().regex(/^\+?[0-9]{10,15}$/, "Enter a valid phone number").min(3,"Phone must be at least 3 characters"),
    EmergencyContact: z.string().regex(/^\+?[0-9]{10,15}$/, "Enter a valid phone number").min(3,"Emergency Contact must be at least 3 characters"),
});

const Page = () => {
    const router = useRouter();
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            FirstName: "",
            LastName: "",
            DateofBirth: "",
            Nationality: "",
            Email: "",
            Address: "",
            Gender: "",
            Marital: "",
            Phone: "",
            EmergencyContact: "",
        },
    });

    const onSubmit = (data) => {
        console.log("Form Data", data);
        router.push('/EmployeeRegistration/AddNewemployeesecond');         
    };

    return (
        <div className='font-semibold flex flex-col gap-[4rem]'>

            {/* Header */}
            <div className='flex flex-col gap-[2.5rem]'>
                <div className='flex items-center gap-[0.9375rem]'>
                    <img onClick={() => router.back()} src="/image/Icon/ArrowLeft.png" alt="Back" />
                    <li className='textWhite list-decimal'>Personal Information</li>
                </div>

                {/* Progress Bar */}
                <div>
                    <div className='grid grid-cols-4'>
                        <div className='rounded-[0.53125rem] bg-lemongreen w-[22.625rem] h-[5px]'></div>
                        <div className='rounded-[0.53125rem] bg-[rgba(223,223,223,0.26)] w-[22.625rem] h-[5px]'></div>
                        <div className='rounded-[0.53125rem] bg-[rgba(223,223,223,0.26)] w-[22.625rem] h-[5px]'></div>
                        <div className='rounded-[0.53125rem] bg-[rgba(223,223,223,0.26)] w-[22.625rem] h-[5px]'></div>
                    </div>
                </div>
            </div>

            {/* Main Container */}
            <div className='between gap-[12.25rem]'>
                <div className='w-[49.5625rem] h-[37.3125rem] overflow-y-auto scrollBarDash'> 
                    {/*  Use handleSubmit properly */}
                    <form className='flex flex-col gap-[2.5625rem] px-[10px]' onSubmit={handleSubmit(onSubmit)}>

  {/* Two columns */}
  <div className='flex gap-[2.5625rem]'>
    {/* Left Column */}
    <div className='flex flex-col w-[23.1875rem] gap-[35px]'>
      {/* First Name */}
      <div className='flex flex-col gap-[1rem]'>
        <label className='text-formColor'>First Name</label>
        <input type="text" placeholder='John' className='inputMod' {...register("FirstName")} />
        {errors.FirstName && <span className='text-Error text-[1rem]'>{errors.FirstName.message}</span>}
      </div>

      {/* Date of Birth */}
      <div className='flex flex-col gap-[1rem]'>
        <label className='text-formColor'>Date Of Birth</label>
        <input type="date" className='inputMod' {...register("DateofBirth")} />
        {errors.DateofBirth && <span className='text-Error text-[1rem]'>{errors.DateofBirth.message}</span>}
      </div>

      {/* Nationality */}
      <div>
        <Controller
          control={control}
          name="Nationality"
          render={({ field }) => (
            <Dropdown
              label="Nationality"
              options={["Ethiopia", "Kenya", "Nigeria", "South Africa"]}
              selected={field.value}
              onSelect={field.onChange}
              placeholder="Select Nationality"
            />
          )}
        />
        {errors.Nationality && <span className='text-Error text-[1rem]'>{errors.Nationality.message}</span>}
      </div>

      {/* Email */}
      <div className='flex flex-col gap-[1rem]'>
        <label className='text-formColor'>Email</label>
        <input type="email" placeholder='example@gmail.com' className='inputMod' {...register("Email")} />
        {errors.Email && <span className='text-Error text-[1rem]'>{errors.Email.message}</span>}
      </div>

      {/* Address */}
      <div className='flex flex-col gap-[1rem]'>
        <label className='text-formColor'>Address</label>
        <input type="text" placeholder='Bole, Addis Ababa' className='inputMod' {...register("Address")} />
        {errors.Address && <span className='text-Error text-[1rem]'>{errors.Address.message}</span>}
      </div>
    </div>

    {/* Right Column */}
    <div className='w-[23.1875rem] flex flex-col gap-[35px]'>
      {/* Last Name */}
      <div className='flex flex-col gap-[1rem]'>
        <label className='text-formColor'>Last Name</label>
        <input type="text" placeholder='Doe' className='inputMod' {...register("LastName")} />
        {errors.LastName && <span className='text-Error text-[1rem]'>{errors.LastName.message}</span>}
      </div>

      {/* Gender */}
      <div>
        <Controller
          control={control}
          name="Gender"
          render={({ field }) => (
            <Dropdown
              label="Gender"
              options={["Male", "Female"]}
              selected={field.value}
              onSelect={field.onChange}
              placeholder="Select Gender"
            />
          )}
        />
        {errors.Gender && <span className='text-Error text-[1rem]'>{errors.Gender.message}</span>}
      </div>

      {/* Marital Status */}
      <div>
        <Controller
          control={control}
          name="Marital"
          render={({ field }) => (
            <Dropdown
              label="Marital Status"
              options={["Unmarried", "Married", "Divorced"]}
              selected={field.value}
              onSelect={field.onChange}
              placeholder="Select Marital Status"
            />
          )}
        />
        {errors.Marital && <span className='text-Error text-[1rem]'>{errors.Marital.message}</span>}
      </div>

      {/* Phone */}
      <div className='flex flex-col gap-[1rem]'>
        <label className='text-formColor'>Phone Number</label>
        <input type="text" placeholder='+251987654321' className='inputMod' {...register("Phone")} />
        {errors.Phone && <span className='text-Error text-[1rem]'>{errors.Phone.message}</span>}
      </div>

      {/* Emergency Contact */}
      <div className='flex flex-col gap-[1rem]'>
        <label className='text-formColor'>Emergency Contact</label>
        <input type="text" placeholder='+251987654321' className='inputMod' {...register("EmergencyContact")} />
        {errors.EmergencyContact && <span className='text-Error'>{errors.EmergencyContact.message}</span>}
      </div>
    </div>
  </div>

  {/* ✅ Button under form */}
  <div className='w-[calc(100%-0.625rem)] h-[3.4375rem] mt-[2.5625rem]  pl-[10px]'>
    <button
      type="submit"
      className='w-full h-[3.4375rem] bg-lemongreen rounded-[10px] cursor-pointer'>
      Next
    </button>
  </div>
</form>
                </div>
                {/* Sidebar */}
                <div className='flex-1'>
                    <div className='border border-limegray w-[31rem] rounded-[1.1875rem] px-[2.25rem] pt-[1.5625rem] pb-[1.9375rem]'>
                        <div className='flex items-center gap-[10px] pb-[0.8125rem]'>
                            <img src="/image/Icon/Alert.png" alt="" />
                            <span className='textFormColor'><strong>Important:</strong></span>
                        </div>
                        <div className='space-y-[2.25rem]'>
                            <p className='textLimegray'>Essential personal identification and key contact information — including your full name, address, phone number, and email — are required. These details help verify your identity and prevent delays.</p>
                            <p className='textLimegray'><strong className='text-formColor'>Tip:</strong> Double-check your spelling and numbers before submitting.</p>
                        </div>
                    </div>           
                </div>
            </div>
        </div>
    )
}

export default Page;
