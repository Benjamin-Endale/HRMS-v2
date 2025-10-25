'use client'

import React from 'react'
import { useRouter } from 'next/navigation';
import { Dropdown } from '@/app//Components/DropDown';
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAdminForm } from '@/app/Store/AdminFormContext';
import Employee from '@/public/svg/DashboardSvg/Employee';




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
    emergencyContactNumber: z.string().regex(/^\+?[0-9]{10,15}$/, "Enter a valid phone number"),
    emergencyContactName: z.string().min(3, "Contact file  is required"),
    jobTitle: z.string().nonempty("Job Title is required"),
    employeeEducationStatus:z.string().nonempty("Status Title is required"),
    employmentType: z.string().nonempty("Employment Type is required"),
hireDate: z
  .string()
  .min(1, { message: "Joining date is required" })
  .refine((date) => {
    const selected = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    selected.setHours(0, 0, 0, 0);
    return selected.getTime() === today.getTime();
  }, {
    message: "Joining date must be today",
  }),
    shiftDetails: z.string().nonempty('Shift is required'),
    workLocation: z.string().nonempty('Work Location is required'),
    certificationFile: z
        .any()
        .refine(file => file?.length > 0, 'Certification file is required'),
    photoUrl: z
        .any()
        .refine(file => file?.length > 0, 'emplyoee photo is required'),
});

const Page = () => {
    const router = useRouter();
    const { employeeData, setEmployeeData } = useAdminForm();

    const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
        firstName: employeeData.firstName || "",
        lastName: employeeData.lastName || "",
        dateOfBirth: employeeData.dateOfBirth || "",
        nationality: employeeData.nationality || "",
        email: employeeData.email || "",
        address: employeeData.address || "",
        gender: employeeData.gender || "",
        maritalStatus: employeeData.maritalStatus || "",
        phoneNumber: employeeData.phoneNumber || "",
        emergencyContactName:employeeData.emergencyContactName || "",
        emergencyContactNumber: employeeData.emergencyContactNumber || "",
        jobTitle: employeeData.jobTitle || "",
        employmentType: employeeData.employmentType || "",
        hireDate: employeeData.hireDate || "",
        shiftDetails: employeeData.shiftDetails || "",
        workLocation: employeeData.workLocation || "",
        employeeEducationStatus: employeeData.employeeEducationStatus || "",
        certificationFile: employeeData.certificationFile || "",
        photoUrl: employeeData.photoUrl || '',
    },
    });


        console.log(errors)
        const onSubmit = (data) => {
            setEmployeeData(data);
            router.push('/SuperAdmin/CreateOrganization/Compensation');
        };


    return (
        <>
        <div className='font-semibold flex flex-col gap-[2.3125rem]'>

            {/* Progress Bar */}
            <div className='  flex flex-col gap-[4.125rem]'>
                <div className='grid grid-cols-4'>
                    <div className='rounded-[0.53125rem] bg-lemongreen w-[22.625rem] h-[5px]'></div>
                    <div className='rounded-[0.53125rem] bg-lemongreen w-[22.625rem] h-[5px]'></div>
                    <div className='rounded-[0.53125rem] bg-[rgba(223,223,223,0.26)] w-[22.625rem] h-[5px]'></div>
                    <div className='rounded-[0.53125rem] bg-[rgba(223,223,223,0.26)] w-[22.625rem] h-[5px]'></div>
                </div>  
                <div>
                    <h4 className='textFormColor'>Register System Admin</h4>
                </div>
            </div>
            {/* Main Container */}
            <div className='between gap-[12.25rem]'>
                <div className='w-[49.5625rem]'> 
                    {/*  Use handleSubmit properly */}
                    <form className='flex flex-col gap-[2.5625rem]' onSubmit={handleSubmit(onSubmit)}>

                        {/* Two columns */}
                        <div className='flex gap-[2.5625rem]'>
                            {/* Left Column */}
                            <div className='flex flex-col w-[23.1875rem] gap-[35px]'>
                            {/* First Name */}
                            <div className='flex flex-col gap-[1rem] relative'>
                                <label className='text-formColor'>First Name</label>
                                <input type="text" placeholder='John' className='inputMod' {...register("firstName")} />
                                {errors.firstName && <span className='text-Error text-[1rem] absolute bottom-[-2rem]'>{errors.firstName.message}</span>}
                            </div>

                            {/* Date of Birth */}
                            <div className='flex flex-col gap-[1rem] relative'>
                                <label className='text-formColor'>Date Of Birth</label>
                                <input type="date" className='inputMod pr-[1.1875rem]' {...register("dateOfBirth")} />
                                {errors.dateOfBirth && <span className='text-Error text-[1rem] absolute bottom-[-2rem]'>{errors.dateOfBirth.message}</span>}
                            </div>

                            {/* Nationality */}
                            <div className='relative'>
                                <Controller
                                control={control}
                                name="nationality"
                                render={({ field }) => (
                                    <Dropdown
                                    label="nationality"
                                    options={["Ethiopia", "Kenya", "Nigeria", "South Africa"]}
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    placeholder="Select Nationality"
                                    />
                                )}
                                />
                                {errors.nationality && <span className='text-Error text-[1rem] absolute bottom-[-2rem]'>{errors.nationality.message}</span>}
                            </div>

                            {/* Email */}
                            <div className='flex flex-col gap-[1rem] relative'>
                                <label className='text-formColor'>Email</label>
                                <input type="email" placeholder='example@gmail.com' className='inputMod' {...register("email")} />
                                {errors.email && <span className='text-Error text-[1rem] absolute bottom-[-2rem]'>{errors.email.message}</span>}
                            </div>

                             {/* Emergency Contanct */}
                                <div className='flex flex-col gap-[1rem] mb-[4.5rem] relative'>
                                    <label className='text-formColor'>Emergency Contact Name</label>
                                    <input type="text" placeholder='Benjamin Endale' className='inputMod' {...register("emergencyContactName")} />
                                    {errors.emergencyContactName && <span className='text-Error text-[1rem] absolute bottom-[-2rem]'>{errors.emergencyContactName.message}</span>}
                                </div>
                                <div>
                                    <h1 className='textFormColor'>Employment Details</h1>
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className='w-[23.1875rem] flex flex-col gap-[35px]'>
                            {/* Last Name */}
                            <div className='flex flex-col gap-[1rem] relative'>
                                <label className='text-formColor'>Last Name</label>
                                <input type="text" placeholder='Doe' className='inputMod' {...register("lastName")} />
                                {errors.lastName && <span className='text-Error text-[1rem] absolute bottom-[-2rem]'>{errors.lastName.message}</span>}
                            </div>

                            {/* Gender */}
                            <div className='relative'>
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
                                {errors.gender && <span className='text-Error text-[1rem] absolute bottom-[-2rem]'>{errors.gender.message}</span>}
                            </div>

                            {/* Marital Status */}
                            <div className='relative'>
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
                                {errors.maritalStatus && <span className='text-Error text-[1rem] absolute bottom-[-2rem]'>{errors.maritalStatus.message}</span>}
                            </div>

                            {/* Phone */}
                            <div className='flex flex-col gap-[1rem] relative'>
                                <label className='text-formColor'>Phone Number</label>
                                <input type="text" placeholder='+251987654321' className='inputMod' {...register("phoneNumber")} />
                                {errors.phoneNumber && <span className='text-Error text-[1rem] absolute bottom-[-2rem] '>{errors.phoneNumber.message}</span>}
                            </div>


                            <div className='flex flex-col gap-[1rem] mb-[4.5rem] relative'>
                                <label className='text-formColor'>Emergency Contact Number</label>
                                <input type="text" placeholder='+251987654321' className='inputMod' {...register("emergencyContactNumber")} />
                                {errors.emergencyContactNumber && <span className='text-Error absolute bottom-[-2rem]'>{errors.emergencyContactNumber.message}</span>}
                            </div>
                            </div>
                        </div>

                        {/* two column */}
                        <div className='flex gap-[2.5625rem]'>  
                            {/* Left Column */}
                            <div className='flex flex-col w-[23.1875rem] gap-[35px]'>
                                {/* Job Title */}
                                <div className='flex flex-col gap-[1rem] relative'>
                                    <label className='text-formColor'>Job Title</label>
                                    <input 
                                    type="text" 
                                    placeholder='e.g. Senior Developer' 
                                    className='inputMod' 
                                    {...register("jobTitle")}
                                    />
                                    {errors.jobTitle && <span className="text-Error absolute bottom-[-2rem]">{errors.jobTitle.message}</span>}
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

                            
                                    {/* Address */}
                                    <div className='flex flex-col gap-[1rem] mb-[4.5rem] relative'>
                                        <label className='text-formColor'>Address</label>
                                        <input type="text" placeholder='Bole, Addis Ababa' className='inputMod' {...register("address")} />
                                        {errors.address && <span className='text-Error text-[1rem] absolute bottom-[-2rem]'>{errors.address.message}</span>}
                                    </div>
                                    {/* Certification */}
                                    <div className='flex flex-col gap-[1rem] relative'>
                                        <label className='text-formColor'>Certification</label>
                                        <label className='inputModfile cursor-pointer border-none'>
                                            <img src='/image/Icon/File.png' alt='' />
                                            <span className='text-limeLight'>Upload Certification</span>
                                            <input type='file' className='hidden' {...register('certificationFile')} />
                                        </label>
                                        {errors.certificationFile && <span className='text-Error text-[1rem] absolute bottom-[-2rem]'>{errors.certificationFile.message}</span>}
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
                            </div>

                            {/* Right Column */}
                            <div className='w-[23.1875rem] flex flex-col gap-[35px]'>

                                {/* Joining Date */}
                                <div className='flex flex-col gap-[1rem] relative'>
                                    <label className='text-formColor'>Hire Date</label>
                                    <input 
                                    type="date" 
                                    className='inputMod pr-[1.5625rem]' 
                                    {...register("hireDate")}
                                    />
                                    {errors.hireDate && <span className="text-Error text-[1rem] absolute bottom-[-2rem]">{errors.hireDate.message}</span>}
                                </div>
                            {/* Work Location */}
                            <div className='relative'>
                                <Controller
                                    control={control}
                                    name='workLocation'
                                    render={({ field }) => (
                                    <Dropdown
                                        label='Work Location'
                                        options={['Office', 'Home']}
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        placeholder='Office'
                                    />
                                    )}
                                />
                                {errors.workLocation && <span className='text-Error text-[1rem] absolute bottom-[-2rem]'>{errors.workLocation.message}</span>}
                                </div>
                            {/* Employment Type */}
                            <div className='relative mb-[4.5rem]'>
                                <Controller
                                control={control}
                                name="employmentType"
                                render={({ field }) => (
                                    <Dropdown
                                    label="Employment Type"
                                    options={['Full Time','Half Time','Remote']}
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    placeholder="Select Employment Type"
                                    />
                                )}
                                />
                                {errors.employmentType && <span className="text-Error text-[1rem] absolute bottom-[-2rem]">{errors.employmentType.message}</span>}
                            </div>
                                                            {/* Shift */}
                                <div className='relative'>
                                    <Controller
                                        control={control}
                                        name='shiftDetails'
                                        render={({ field }) => (
                                        <Dropdown
                                            label='Shift Details'
                                            options={['Morning Shift', 'Night Shift']}
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            placeholder='Morning Shift'
                                        />
                                        )}
                                    />
                                    {errors.shiftDetails && <span className='text-Error text-[1rem] absolute bottom-[-2rem]'>{errors.shiftDetails.message}</span>}
                                </div>
                            </div>
                                            
                            

                        </div>
                        {/* ✅ Button under form */}
                        <div className="w-full h-[3.4375rem] flex gap-[2.5625rem] mt-[5.1875rem]">
                            <button type="button" onClick={()=>router.push("/SuperAdmin/CreateOrganization/CreateTenant")}  className="w-full border border-formColor text-formColor rounded-[10px] cursor-pointer">Back</button>
                            <button type="submit" className="w-full bg-lemongreen rounded-[10px] cursor-pointer">Next</button>
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
        </>
    )
}

export default Page;
