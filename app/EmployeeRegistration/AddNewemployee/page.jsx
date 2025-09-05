'use client'

import React , {useState} from 'react'
import { useRouter } from 'next/navigation';
import { Dropdown } from '../../Components/DropDown';

const page = () => {
    const [selectedCountries, setSelectedCountries] = useState()
    const [selectedGender, setSelectedGender] = useState()
    const [selectedMartial, setSelectedMartial] = useState()
     const router = useRouter();

    const handleSubmit = () => {
        // example: navigate to employee list after submitting
        router.push('/Employees');
    };
    return (
        <div className='font-semibold flex flex-col gap-[4rem]'>
            {/* headerContainer */}
            <div className='flex flex-col gap-[2.5rem]'>
                {/* Header */}
                <div className='flex items-center gap-[0.9375rem]'>
                    <img onClick={handleSubmit} src="/image/Icon/ArrowLeft.png" alt="" />
                    <li className='textWhite list-decimal'>Personal Information</li>
                </div>

                {/* ProgressBar */}
                <div>
                    <div className='grid grid-cols-4'>
                    <div className='rounded-[0.53125rem] bg-lemongreen w-[22.625rem] h-[5px] '></div>
                    <div className='rounded-[0.53125rem] bg-[rgba(223,223,223,0.26)] w-[22.625rem] h-[5px] '></div>
                    <div className='rounded-[0.53125rem] bg-[rgba(223,223,223,0.26)] w-[22.625rem] h-[5px] '></div>
                    <div className='rounded-[0.53125rem] bg-[rgba(223,223,223,0.26)] w-[22.625rem] h-[5px] '></div>
                    </div>
                </div>
            </div>

            {/* MainContainer */}
            <div className='between gap-[12.25rem]'>
            {/* mainContent */}
                <div className='w-[49.5625rem] h-[37.3125rem] overflow-y-auto scrollBarDash' > 
                    <form action="" className='flex gap-[2.5625rem] px-[10px]'>
                        <div className=' flex flex-col w-[23.1875rem] gap-[35px]'>
                            {/* firstName */}
                            <div className='flex flex-col gap-[1rem]'>
                                <label htmlFor="firstName" className='text-formColor'>First Name</label>
                                <input type="text" placeholder='John' className='inputMod'/>
                            </div>
                            {/* dateOfbirth */}
                            <div className='flex flex-col gap-[1rem]'>
                                <label htmlFor="firstName" className='text-formColor'>Date Of Birth</label>
                                <input type="date"   className='inputMod pr-[1.5625rem]'/>
                            </div>
                            {/*DropDown */}
                            <div>
                                <Dropdown
                                    label="Nationality"
                                    options={['Ethiopia', 'Kenya', 'Nigeria','South Africa','South Africa']}
                                    selected={selectedCountries}
                                    onSelect={setSelectedCountries}
                                    placeholder="Select Nationality"
                                    className=''
                                />
                            </div>
                            <div className='flex flex-col gap-[1rem]'>
                                <label htmlFor="firstName" className='text-formColor'>Email</label>
                                <input type="email"  placeholder='example@gmail.com'  className='inputMod  pr-[1.5625rem]'/>
                            </div>
                            <div className='flex flex-col gap-[1rem]'>
                                <label htmlFor="firstName" className='text-formColor'>Address</label>
                                <input type="text"  placeholder='Bole,Addis abeba'  className='inputMod  pr-[1.5625rem]'/>
                            </div>
                        </div>
                        <div className='w-[23.1875rem]'>
                            <div className='flex flex-col w-full gap-[35px]'>
                                <div className='flex flex-col gap-[1rem]'>
                                    <label htmlFor="firstName" className='text-formColor'>Last Name</label>
                                    <input type="text" placeholder='John' className='inputMod'/>
                                </div>
                                {/*DropDown */}
                                <div>
                                    <Dropdown
                                        label="Gender"
                                        options={['Male', 'Female']}
                                        selected={selectedGender}
                                        onSelect={setSelectedGender}
                                        placeholder="Select Gender"
                                        className=''
                                    />
                                </div>
                                <div>
                                    <Dropdown
                                        label="Martial"
                                        options={['Married','Divorce','Unmarried']}
                                        selected={selectedMartial}
                                        onSelect={setSelectedMartial}
                                        placeholder="Select Martial"
                                        className=''
                                    />
                                </div>
                            <div className='flex flex-col gap-[1rem]'>
                                <label htmlFor="firstName" className='text-formColor'>Phone Number</label>
                                <input type="text" placeholder='+251987654321' className='inputMod pr-[1.5625rem]'/>
                            </div>
                            <div className='flex flex-col gap-[1rem]'>
                                <label htmlFor="firstName" className='text-formColor'>Emergancy Contant</label>
                                <input type="text" placeholder='+251987654321' className='inputMod pr-[1.5625rem]'/>
                            </div>
                            </div>
                        </div>
                    </form>
                    <div className='w-[calc(100%-0.625rem)] h-[3.4375rem] mt-[2.5625rem] pl-[10px]'>
                        <button type="submit" onClick={()=>router.push('/EmployeeRegistration/AddNewemployeesecond')} className='w-full  h-full  bg-lemongreen rounded-[10px] cursor-pointer'>Next</button>
                    </div>
                </div>
            <div className='flex-1'>
                <div className='border border-limegray w-[31rem]  rounded-[1.1875rem] px-[2.25rem] pt-[1.5625rem] pb-[1.9375rem]'>
                <div className='flex items-center gap-[10px] pb-[0.8125rem]'>
                    <img src="/image/Icon/Alert.png" alt="" />
                    <span className='textFormColor'><strong>Important:</strong></span>
                </div>
                <div className='space-y-[2.25rem]'>
                    <p className='textLimegray'>Essential personal identification and key contact information — including your full name, address, phone number, and email — are required. These details help verify your identity, ensure smooth communication, and prevent delays or errors in processing your request.</p>
                    <p className='textLimegray'><strong className='text-formColor'>Tip:</strong> Double-check your spelling and numbers before submitting to avoid missed messages or verification issues</p>
                </div>
                </div>           
            </div>
            </div>
        </div>
        )
}

export default page