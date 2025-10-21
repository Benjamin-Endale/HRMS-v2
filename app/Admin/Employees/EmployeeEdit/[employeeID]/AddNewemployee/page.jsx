'use client'

import React from 'react'
import { useRouter } from 'next/navigation';
import { Dropdown } from '@/app//Components/DropDown';
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAdminForm } from '@/app/Store/AdminFormContext';

const schema = z.object({
    firstName: z.string().min(3, "First name is required"),  
    lastName: z.string().min(2, "Last name is required"),
    dateOfBirth: z.
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
    nationality: z.string().nonempty("Nationality is required"),
    email: z.string().email("Enter a valid email"),
    address: z.string().min(3, "Address is required"),
    gender: z.string().nonempty("Gender is required"),
    maritalStatus: z.string().nonempty("Marital status is required"),
    phoneNumber: z.string().regex(/^\+?[0-9]{10,15}$/, "Enter a valid phone number"),
    emergencyContactName: z.string().min(3, "Contact Name  is required"),
    employeeEducationStatus:z.string().nonempty("Status Title is required"),
    emergencyContactNumber: z.string().regex(/^\+?[0-9]{10,15}$/, "Enter a valid phone number"),
    photoUrl: z
        .any()
        .refine(file => file?.length > 0, 'Certification file is required'),

});

const Page = () => {
    const router = useRouter();
    const { addEmployee, setAddEmployee } = useAdminForm();


    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            firstName: addEmployee.firstName || "",
            lastName: addEmployee.lastName || "",
            dateOfBirth: addEmployee.dateOfBirth || "",
            nationality: addEmployee.nationality || "",
            email: addEmployee.email || "",
            address: addEmployee.address || "",
            gender: addEmployee.gender || "",
            maritalStatus: addEmployee.maritalStatus || "",
            phoneNumber: addEmployee.phoneNumber || "",
            emergencyContactName:addEmployee.emergencyContactName || "",
            emergencyContactNumber: addEmployee.emergencyContactNumber || "",
            employeeEducationStatus: addEmployee.employeeEducationStatus || "",
            photoUrl: addEmployee.photoUrl || '',


        },
    });
    console.log(errors)
    const onSubmit = (data) => {
        setAddEmployee(data);
        console.log("Form Data", data);
        router.push('/Admin/EmployeeRegistration/AddNewemployeesecond');         
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
                              <input type="text" placeholder='John' className='inputMod' {...register("firstName")} />
                              {errors.firstName && <span className='text-Error text-[1rem]'>{errors.firstName.message}</span>}
                            </div>

                            {/* Date of Birth */}
                            <div className='flex flex-col gap-[1rem] '>
                              <label className='text-formColor'>Date Of Birth</label>
                              <input type="date" className='inputMod pr-[1.5625rem]' {...register("dateOfBirth")} />
                              {errors.dateOfBirth && <span className='text-Error text-[1rem]'>{errors.dateOfBirth.message}</span>}
                            </div>

                            {/* Nationality */}
                            <div>
                              <Controller
                                control={control}
                                name="nationality"
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
                              {errors.nationality && <span className='text-Error text-[1rem]'>{errors.nationality.message}</span>}
                            </div>

                            {/* Email */}
                            <div className='flex flex-col gap-[1rem]'>
                              <label className='text-formColor'>Email</label>
                              <input type="email" placeholder='example@gmail.com' className='inputMod' {...register("email")} />
                              {errors.email && <span className='text-Error text-[1rem]'>{errors.email.message}</span>}
                            </div>

                            {/* EmergencyContactName */}
                            <div className='flex flex-col gap-[1rem] ] relative'>
                                <label className='text-formColor'>Emergency Contact Name</label>
                                <input type="text" placeholder='Benjamin Endale' className='inputMod' {...register("emergencyContactName")} />
                                {errors.emergencyContactName && <span className='text-Error text-[1rem] absolute bottom-[-2rem]'>{errors.emergencyContactName.message}</span>}
                            </div>

                            {/* Photo */}
                            <div className='flex flex-col gap-[1rem] relative'>
                                <label className='text-formColor'>Employee picture</label>
                                <label className='inputModfile cursor-pointer border-none'>
                                    <img src='/image/Icon/File.png' alt='' />
                                    <span className='text-limeLight'>Upload Photo</span>
                                    <input type='file' className='hidden' {...register('photoUrl')} />
                                </label>
                                {errors.photoUrl && <span className='text-Error text-[1rem] absolute bottom-[-2rem]'>{errors.photoUrl.message}</span>}
                            </div>
                            <div className='flex flex-col gap-[1rem] relative'>
                                <label className='text-formColor'>Employee Education Status</label>
                                <input 
                                type="text" 
                                placeholder='e.g. Senior Developer' 
                                className='inputMod' 
                                {...register("employeeEducationStatus")}
                                />
                                {errors.employeeEducationStatus && <span className="text-Error absolute bottom-[-2rem]">{errors.employeeEducationStatus.message}</span>}
                            </div>
                          </div>

                          {/* Right Column */}
                          <div className='w-[23.1875rem] flex flex-col gap-[35px]'>
                            {/* Last Name */}
                            <div className='flex flex-col gap-[1rem]'>
                              <label className='text-formColor'>Last Name</label>
                              <input type="text" placeholder='Doe' className='inputMod' {...register("lastName")} />
                              {errors.lastName && <span className='text-Error text-[1rem]'>{errors.lastName.message}</span>}
                            </div>

                            {/* Gender */}
                            <div>
                              <Controller
                                control={control}
                                name="gender"
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
                              {errors.gender && <span className='text-Error text-[1rem]'>{errors.gender.message}</span>}
                            </div>

                            {/* Marital Status */}
                            <div>
                              <Controller
                                control={control}
                                name="maritalStatus"
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
                              {errors.maritalStatus && <span className='text-Error text-[1rem]'>{errors.maritalStatus.message}</span>}
                            </div>

                            {/* Phone */}
                            <div className='flex flex-col gap-[1rem]'>
                              <label className='text-formColor'>Phone Number</label>
                              <input type="text" placeholder='+251987654321' className='inputMod' {...register("phoneNumber")} />
                              {errors.phoneNumber && <span className='text-Error text-[1rem]'>{errors.phoneNumber.message}</span>}
                            </div>

                            {/* Emergency Contact */}
                            <div className='flex flex-col gap-[1rem]'>
                              <label className='text-formColor'>Emergency Contact</label>
                              <input type="text" placeholder='+251987654321' className='inputMod' {...register("emergencyContactNumber")} />
                              {errors.emergencyContactNumber && <span className='text-Error'>{errors.emergencyContactNumber.message}</span>}
                            </div>
                            <div className='flex flex-col gap-[1rem]'>
                              <label className='text-formColor'>Address</label>
                              <input type="text" placeholder='Bole, Addis Ababa' className='inputMod' {...register("address")} />
                              {errors.address && <span className='text-Error text-[1rem]'>{errors.address.message}</span>}
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
