import React, {useState} from 'react'
import { Dropdown } from '../Components/DropDown'
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
const AddadminSchema=z.object({
    Name:z.string().min(2,"Name is required"),
    Email:z.string().min(2,"Email is required").email("Invalid email address"),
    Phone:z.string().regex(/^\+?[0-9]{10,15}$/, "Enter a valid phone number"),
    Role:z.string().min(2,"Role is required"),
    DefaultPass:z.string().min(2,"Default Password is required"),
})
export default function AddAdmin({onClose}) {
    const [selectedRole, setSelectedRole] = useState()
    const{register,handleSubmit,control,formState:{errors},}=useForm({
        resolver:zodResolver(AddadminSchema),
        defaultValues:{
            Name:"",
            Email:"",
            Phone:"",
            Role:"",
            DefaultPass:"",
        },
    });
    const onSubmit=(data) => {
        console.log("Add admin form:" , data);
        router.push ('/SuperAdmin/SuperAdmin');
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
            <form onSubmit={handleSubmit(onSubmit)} action="" className='space-y-[2.6875rem]'>
                {/* formContainer */}
                <div className='space-y-[1.9375rem]'>
                    <div className='flex flex-col gap-[1rem]'>
                        <label htmlFor="fullName" className='text-formColor'>Name</label>
                        <input id='fullName' type="text" placeholder='ex. John Don' className='inputMod'
                        {...register("Name")}
                        />
                        {errors.Name && (
                            <span className='text-Error text-[1rem]'>
                                {errors.Name.message}
                            </span>
                        )}
                    </div>
                    <div className='flex flex-col gap-[1rem]'>
                        <label htmlFor="emailAdd" className='text-formColor'>Email</label>
                        <input id='emailAdd' type="email" placeholder='ex. example@Gmail.com' className='inputMod'
                        {...register("Email")}
                        />
                        {errors.Email && (
                            <span className='text-Error text-[1rem]'>
                                {errors.Email.message}
                            </span>
                        )}
                    </div>
                    <div className='space-y-[2.125rem]'>      
                        <div className='flex flex-col gap-[1rem]'>
                            <label htmlFor="phoneNumber" className='text-formColor'>Phone</label>
                            <input id='phoneNumber' type="text" placeholder='+251987654321' className='inputMod'
                            {...register("Phone")}
                            />
                            {errors.Phone && (
                                <span className='text-Error text-[1rem]'>
                                    {errors.Phone.message}
                                </span>
                            )}
                        </div>
                        {/* Role */}
                        <div>
                            <Controller
                            control={control}
                            name='Role'
                            render={({field}) => (
                                <Dropdown
                            label="Role"
                            options={['Employee','Admin','HR','CTO']}
                            selected={field.value}
                            onSelect={field.onChange}
                            placeholder="Employee"
                            />
                            )}
                            />
                            {errors.Role  && (
                                <span className='text-Error text-[1rem]'>
                                    {errors.Role.message}
                                </span>
                            )}
                        </div> 
                        <div className='flex flex-col gap-[1rem]'>
                            <label htmlFor="password" className='text-formColor'>Default password</label>
                            <input id='password' type="password" placeholder='admin1234' className='inputMod'
                            {...register("DefaultPass")}
                            />
                            {errors.DefaultPass && (
                                <span className='text-Error text-[1rem]'>
                                    {errors.DefaultPass.message}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
                <div className='w-full h-[3.4375rem]'>
                    <button type="submit" onClick={()=>navigate('/')} className='w-full h-full bg-lemongreen rounded-[10px] cursor-pointer'>Add Administrator</button>
                </div>
            </form>
        </div>
    </div>
  )
}
