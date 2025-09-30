import React from 'react'
import { Dropdown } from '../Components/DropDown'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { hrmsAPI } from '../lib/api/client';

const AddadminSchema = z.object({
    username: z.string().min(2, "User Name is required"),
    fullName: z.string().min(2, "Name is required"),
    email: z.string().min(2, "Email is required").email("Invalid email address"),
    phoneNumber: z.string().regex(/^\+?[0-9]{10,15}$/, "Enter a valid phone number"),
    password: z.string().min(2, "Default Password is required"),
})

export default function AddAdmin({ onClose }) {
    const router = useRouter();
    const { register, handleSubmit, control, formState: { errors }, } = useForm({
        resolver: zodResolver(AddadminSchema),
        defaultValues: {
            username: "",
            fullName: "",
            email: "",
            phoneNumber: "",
            password: "",
        },
    });
    

    // FIX: Added async and proper error handling
    const onSubmit = async (data) => {
        const payload = {
            ...data,
            role:"SuperAdmin"
        }
        try {
            // FIX: Assign to a variable or remove assignment if not needed
            const response = await hrmsAPI.createSuperadmin(payload)
            console.log('Admin created successfully:', response)
            router.push('/SuperAdmin/SuperAdmin');
            router.refresh()
        } catch (err) {
            console.log('Error creating admin:', err.message)
            // Add user-friendly error message
            if (err.message.includes('already in use')) {
                alert('Username or email already exists. Please use different credentials.')
            } else {
                alert('Failed to create admin. Please try again.')
            }
        }
    }

    return (
        <div className='px-[3rem] pt-[2.875rem] space-y-[3.125rem] font-semibold w-full '>
            <div className='flex justify-between'>
                <div className=''>
                    <h1 className='textFormColor'>Add Super Administrator</h1>
                    <h4 className='text-limegray'>Create a new super administrator account</h4>
                </div>
                <button onClick={onClose} className='rounded-full center-center cursor-pointer'>
                    <img src="/image/Icon/Action/CloseCircle.png" alt="" />
                </button>
            </div>
            {/* FormSection */}
            <div className=''>
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-[2.6875rem]'>
                    {/* formContainer */}
                    <div className='space-y-[1.9375rem]'>
                        <div className='flex flex-col gap-[1rem]'>
                            <label htmlFor="fullName" className='text-formColor'>Full Name</label>
                            <input id='fullName' type="text" placeholder='ex. John Don' className='inputMod'
                                {...register("fullName")}
                            />
                            {errors.fullName && (
                                <span className='text-Error text-[1rem]'>
                                    {errors.fullName.message}
                                </span>
                            )}
                        </div>
                       <div className='flex flex-col gap-[1rem]'>
                            <label htmlFor="username" className='text-formColor'>User Name</label>
                            <input id='username' type="text" placeholder='ex. John Don' className='inputMod'
                                {...register("username")}
                            />
                            {errors.username && (
                                <span className='text-Error text-[1rem]'>
                                    {errors.username.message}
                                </span>
                            )}
                        </div>
                        <div className='flex flex-col gap-[1rem]'>
                            <label htmlFor="emailAdd" className='text-formColor'>Email</label>
                            <input id='emailAdd' type="email" placeholder='ex. example@Gmail.com' className='inputMod'
                                {...register("email")}
                            />
                            {errors.email && (
                                <span className='text-Error text-[1rem]'>
                                    {errors.email.message}
                                </span>
                            )}
                        </div>
                        <div className='space-y-[2.125rem]'>      
                            <div className='flex flex-col gap-[1rem]'>
                                <label htmlFor="phoneNumber" className='text-formColor'>Phone</label>
                                <input id='phoneNumber' type="text" placeholder='+251987654321' className='inputMod'
                                    {...register("phoneNumber")}
                                />
                                {/* FIX: Corrected error field name */}
                                {errors.phoneNumber && (
                                    <span className='text-Error text-[1rem]'>
                                        {errors.phoneNumber.message}
                                    </span>
                                )}
                            </div>
                            <div className='flex flex-col gap-[1rem]'>
                                <label htmlFor="role" className='text-formColor'>Role</label>
                                <input id='role' disabled type="text" placeholder='SuperAdmin' className='inputMod'
                                />
                            </div>
                            <div className='flex flex-col gap-[1rem]'>
                                <label htmlFor="password" className='text-formColor'>Default password</label>
                                <input id='password' type="password" placeholder='admin1234' className='inputMod'
                                    {...register("password")}
                                />
                                {errors.password && (
                                    <span className='text-Error text-[1rem]'>
                                        {errors.password.message}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='w-full h-[3.4375rem]'>
                        <button type="submit" className='w-full h-full bg-lemongreen rounded-[10px] cursor-pointer'>
                            Add Administrator
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}