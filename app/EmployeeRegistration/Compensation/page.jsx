'use client'
import React , {useState} from 'react'
import { useRouter } from 'next/navigation'
import { Dropdown } from '@/app/Components/DropDown'

const page = () => {
    const router =useRouter ()
    const [selectedPayments, setSelectedPayments] = useState()
    const [selectedCurrencies, setSelectedCurrencies] = useState()
    const [selectedBenefits, setSelectedBenefits] = useState() 
  return (
    <div className='font-semibold flex flex-col gap-[4rem]'>
        <div className='flex flex-col gap-[2.5rem]'>
            {/* Header */}
            <div className='flex items-center gap-[0.9375rem]'>
                <img onClick={()=>router.push('/EmployeeREgistration/AddNewemployeesecond')} src="/image/Icon/ArrowLeft.png" alt="" />
                <li className='textWhite list-none'>3. Compensation & Legal</li>
            </div>

            {/* ProgressBar */}
            <div>
                <div className='grid grid-cols-4'>
                <div className='rounded-[0.53125rem] bg-lemongreen w-[22.625rem] h-[5px] '></div>
                <div className='rounded-[0.53125rem] bg-lemongreen w-[22.625rem] h-[5px] '></div>
                <div className='rounded-[0.53125rem] bg-lemongreen w-[22.625rem] h-[5px] '></div>
                <div className='rounded-[0.53125rem] bg-[rgba(223,223,223,0.26)] w-[22.625rem] h-[5px] '></div>
                </div>
            </div>
        </div>
        {/* MainContainer */}
        <div className='between gap-[12.25rem]'>
            <div className='w-[49.5625rem] h-[36.3125rem] overflow-y-auto scrollBarDash'>
                <form action="" className='flex gap-[2.5625rem] px-[10px]'>
                    <div className='flex flex-col w-[23.1875rem] gap-[35px]'>
                        {/* Salary */}
                        <div className='flex flex-col gap-[1rem]'>
                            <label htmlFor="Salary" className='text-formColor'>Salary</label>
                            <input id='Salary' type="number" placeholder='e.x 1000.00 $' className='inputMod'/>
                        </div>
                        {/* Payment */}
                        <div>
                            <Dropdown
                                label="Payment Method"
                                options={['Bank Transfer', 'Hard Cash', 'ATM', 'Agenet']}
                                selected={selectedPayments}
                                onSelect={setSelectedPayments}
                                placeholder="Bank Transfer"
                                className=''
                            />
                        </div>
                        {/* Tax */}
                        <div className='flex flex-col gap-[1rem]'>
                            <label htmlFor="Salary" className='text-formColor'>Tax Identification Number</label>
                            <input type="number" placeholder='e.x 78567578' className='inputMod'/>
                        </div>
                        {/* Passport */}
                        <div className='flex flex-col gap-[1rem]'>
                            <label htmlFor="Passport" className='text-formColor'>Passport Number</label>
                            <input id='Passport' type="number" placeholder='e.x 1000 234 153 6855' className='inputMod'/>
                        </div>
                        {/* contact */}
                        <div className='flex flex-col gap-[1rem]'>
                            <label htmlFor="Contact" className='text-formColor'>Contact File</label>
                            <label htmlFor="Contact" className='inputModfile cursor-pointer' >
                                <img src="/image/Icon/File.png" alt="" />
                                <span className='text-limeLight'>Upload Contract File</span>
                            </label>
                            <input type="file" id='Contact' className='hidden'/>
                        </div>
                    </div>
                    <div className='w-[23.1875rem]'>
                        <div className='flex flex-col w-full gap-[35px]'>
                            {/* Curruncy */}
                            <div>
                                <Dropdown
                                    label="Curruncy"
                                    options={['USD', 'EURO', 'BIRR']}
                                    selected={selectedCurrencies}
                                    onSelect={setSelectedCurrencies}
                                    placeholder="USD"
                                    className=''
                                />
                            </div>
                            {/* BankAccount */}
                            <div className='flex flex-col gap-[1rem]'>
                                <label htmlFor="Salary" className='text-formColor'>Bank Account Number</label>
                                <input type="number" placeholder='e.x 1000 234 153 6855' className='inputMod'/>
                            </div>
                            {/* Benefits */}
                            <div>
                                <Dropdown
                                    label="Benefits Enrollment"
                                    options={['Health Insurance', 'Utility Insurance', 'Life insurance']}
                                    selected={selectedBenefits}
                                    onSelect={setSelectedBenefits}
                                    placeholder="Health Insurance"
                                    className=''
                                />
                            </div>
                            <div className='flex flex-col gap-[1rem]'>
                                <label htmlFor="Resume" className='text-formColor'>Resume</label>
                                <label htmlFor="Resume" className='inputModfile cursor-pointer'>
                                    <img src="/image/Icon/File.png" alt="" />
                                    <span className='text-limeLight'>Upload Cv</span>
                                </label>
                                <input type="file"  id='Resume' className='hidden w-full h-full'/>
                            </div>
                        </div>   
                    </div>
                </form>
                <div className='w-full h-[3.4375rem] my-[4rem] px-[10px]  flex gap-[2.5625rem]'>
                    <button type="button" onClick={()=>router.push('/EmployeeRegistration/AddNewemployeesecond')} className='w-[23.1875rem] border border-formColor text-formColor rounded-[10px] cursor-pointer'>Back</button>
                    <button type="submit" onClick={()=>router.push('/EmployeeRegistration/System')} className='w-[23.1875rem] bg-lemongreen rounded-[10px] cursor-pointer'>Next</button>
                </div>
            </div>
            <div className='flex-1'>
                <div className='border border-limegray w-[31rem]  rounded-[1.1875rem] px-[2.25rem] pt-[1.5625rem] pb-[1.9375rem]'>
                <div className='flex items-center gap-[10px] pb-[0.8125rem]'>
                    <img src="/image/Icon/Alert.png" alt="" />
                    <span className='textFormColor'><strong>Important:</strong></span>
                </div>
                <div className='space-y-[2.25rem]'>
                    <p className='textLimegray'>Provide accurate information about your current employment status, including your job title, employer's name, and contact information. This helps establish your professional background and may be necessary for verification or eligibility purposes.</p>
                    <p className='textLimegray'><strong className='text-formColor'>Tip:</strong> Make sure to list your employer's official name and provide a valid work email or phone number if requested.</p>
                </div>
                </div>           
            </div>
        </div>
    </div>
  )
}

export default page