import React, {useState} from 'react'
import { Dropdown } from '../Components/DropDown'

export default function AddAdmin({onClose}) {
    const [selectedRole, setSelectedRole] = useState()
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
            <form action="" className='space-y-[2.6875rem]'>
                {/* formContainer */}
                <div className='space-y-[1.9375rem]'>
                    <div className='flex flex-col gap-[1rem]'>
                        <label htmlFor="fullName" className='text-formColor'>Name</label>
                        <input id='fullName' type="text" placeholder='ex. John Don' className='inputMod'/>
                    </div>
                    <div className='flex flex-col gap-[1rem]'>
                        <label htmlFor="emailAdd" className='text-formColor'>Email</label>
                        <input id='emailAdd' type="email" placeholder='ex. example@Gmail.com' className='inputMod'/>
                    </div>
                    <div className='space-y-[2.125rem]'>      
                        <div className='flex flex-col gap-[1rem]'>
                            <label htmlFor="phoneNumber" className='text-formColor'>Phone</label>
                            <input id='phoneNumber' type="text" placeholder='ex. example@Gmail.com' className='inputMod'/>
                        </div>
                        {/* Role */}
                        <div>
                            <Dropdown
                            label="Role"
                            options={['Employee','Admin','HR','CTO']}
                            selected={selectedRole}
                            onSelect={setSelectedRole}
                            placeholder="Employee"
                            />
                        </div> 
                        <div className='flex flex-col gap-[1rem]'>
                            <label htmlFor="password" className='text-formColor'>Default password</label>
                            <input id='password' type="password" placeholder='admin1234' className='inputMod'/>
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
