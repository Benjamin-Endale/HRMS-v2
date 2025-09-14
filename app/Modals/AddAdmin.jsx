import React, {useState} from 'react'


export default function AddAdmin({onClose}) {
    const [dropdownOpenR, setDropdownOpenR] = useState(false);
    const [selectedRole, setSelectedRole] = useState('Employee')
    const Role = ['Employee','Admin','HR','CTO']
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
                        <div className='flex flex-col gap-[1rem] relative'>
                            <label htmlFor="firstName" className='text-formColor'>Role</label>
                            <div className='inputMod flex items-center justify-between pr-[1.5625rem]' >
                                <button type="button" className='text-formColor text-left' onClick={() => setDropdownOpenR(!dropdownOpenR)}>{selectedRole}</button>
                                <svg onClick={() => setDropdownOpenR(!dropdownOpenR)} className={`transition-transform duration-200 ${dropdownOpenR ? 'rotate-180' : ''}`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 9L12 15L5 9" stroke="#BEE532" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                            <div className={`${dropdownOpenR ? 'flex' : 'hidden'} bg-inputBack rounded-[10px] h-[11.25rem]  w-full top-[6.3125rem] absolute z-10 text-formColor flex-col center-center border border-limeLight scrollBarDash overflow-y-auto `}>
                                <ul className='flex flex-col  gap-[2.1875rem] h-full pt-[1.3125rem]'>
                                    {Role.map(role => (
                                    <li key={role} className={`cursor-pointer w-full text-center ${selectedRole === role ? 'text-lemongreen font-bold' : ''}`}
                                    onClick={() => {
                                        setSelectedRole(role)
                                        setDropdownOpenR(false)
                                    }}>
                                    {role}
                                    </li>
                                ))}
                                </ul>
                            </div>
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
