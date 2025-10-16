'use client'
import React , {useState} from 'react'
import { Dropdown } from '@/app/Components/DropDown'
import { useRouter } from 'next/navigation'
import { useAdminForm } from '@/app/Store/AdminFormContext';
const page = () => {
    // Okta, OneLogin, Microsoft Entra ID, Auth0, JumpCloud
    const [selectedSSO, setSelectedSSO] = useState()
 
    // passwordPolicy
    const [selectedPass, setSelectedPass] = useState()

    // sessionTimer
    const [selectedSt, setSelectedSt] = useState()

    // Backup
    const [selectedB, setSelectedB] = useState('daily')

    // Default Export Format
    const [selectedEf, setSelectedEf] = useState()


    const [edit, setEdit] = useState(true)

    const router = useRouter()

    const [toggleOn, settoggleOn] = useState(false);
    const [toggleOnA, settoggleOnA] = useState(false);
    const [toggleOnD, settoggleOnD] = useState(false);
    const [toggleOnR, settoggleOnR] = useState(true);
    const { tenantSettings } = useAdminForm()

    // NotificationArea
    const [toggleOnN, settoggleOnN] = useState([false,false,false,true]);
    const handleToggleN = (index) => {
      settoggleOnN((prev) => {
        const newToggles = [...prev];
        newToggles[index] = !newToggles[index];
        return newToggles;
      });
    };
  return (
    <div className='flex gap-[7.0625rem] font-semibold'>
        <div className='w-[43.5625rem]'>
            <div className='flex flex-col gap-[4.5625rem]'>
                <div className='flex flex-col gap-[5rem]'>
                    <div className='flex flex-col gap-[2.4375rem]'>
                        {/* 1stSection */}
                        {/* Title */}
                        <div className='flex flex-col gap-[0.5625rem]'>
                            <div className='flex items-center gap-[0.4375rem]'>
                                <img src="/image/shield.png" alt="" />
                                <span className='textFormColor'>Security Settings</span>
                            </div>
                            <h4 className='textLimegray leading-none'>Manage authentication, access, and audit logging.</h4>
                        </div>
                        {/* Toggle */}
                        <div className='flex between-center'>
                            <div>
                                <h1 className='textFormColor1'>Enable Single Sign-On (SSO)</h1>
                                <h4 className='textLimegray'>Allow users to login with SSO providers</h4>
                            </div>
                            <div onClick={() => settoggleOn(!toggleOn)}  className={`${toggleOn ? ' bg-lemongreen' : ' bg-limegray'} w-[4.0625rem] h-[2.1875rem] rounded-full border  relative flex items-center py-[3px]`}>
                                <div className={`${toggleOn ? 'translate-x-full' : 'translate-x-0 '} mx-[4px] absolute w-[1.8125rem] h-[1.8125rem] bg-white rounded-full  transition-transform ease-in-out duration-300`}></div>
                            </div>
                        </div>
                        <form action="" className='space-y-[2.4375rem]'>
                            {/* SSO */}
                            <div>
                                <Dropdown
                                label="SSO Provider"
                                options={["Google Workspace", "Okta", "OneLogin", "Microsoft" , "Entra ID", "Auth0", "JumpCloud"]}
                                selected={selectedSSO}
                                onSelect={setSelectedSSO}
                                placeholder="Google Workspace"
                                />
                            </div>
                        </form>
                        {/* SSO provider */}
                    </div>
                    {/* 2ndSection */}
                    <div className=''>
                        {/* secondSectionHeader */}
                        <div className='space-y-[2.875rem]'>
                            <div className='flex flex-col gap-[0.5625rem]'>
                                <div className='flex items-center gap-[0.4375rem]'>
                                    <img src="/image/bell.png" alt="" />
                                <span className='textFormColor'>Notification Settings</span>
                                </div>
                                <h4 className='textLimegray leading-none'>Configure how your organization receives system notifications.</h4>
                            </div>
                        {/* ModuleSelection */}
                        <div className='space-y-[9.1875rem]'>
                            <div className='space-y-[2.875rem]'>
                                {
                                [
                                    { title: 'Email Notifications', desc: 'Send system alerts and updates via email.' },
                                    { title: 'Push Notifications', desc: 'Enable in-app push notifications for real-time updates.' },
                                    { title: 'Critical Alerts Only', desc: 'Only send notifications for high-priority system events.' }
                                ].map((item,i) => (

                                    <div key={i} className='flex between-center'>
                                    <div>
                                        <h1 className='textFormColor1'>{item.title}</h1>
                                        <h4 className='textLimegray'>{item.desc}</h4>
                                    </div>
                                    <div onClick={()=>handleToggleN(i)} className={`${toggleOnN[i] ? ' bg-lemongreen' : ' bg-limegray'} w-[4.0625rem] h-[2.1875rem] rounded-full border  relative flex items-center py-[3px]`}>
                                        <div className={`${toggleOnN[i] ? 'translate-x-full' : 'translate-x-0 '} mx-[4px] absolute w-[1.8125rem] h-[1.8125rem] bg-white rounded-full  transition-transform ease-in-out duration-300`}></div>
                                    </div>
                                    </div>

                                ))
                                }
                            </div>
                            <div className='mb-[4.125rem] w-full'>
                            {edit ? (
                                <div className='w-full h-[3.4375rem] flex gap-[2.5625rem]'>
                                <button
                                    type="button"
                                    onClick={() => {
                                    // Reset settings logic if needed
                                    setEdit(true);
                                    router.push('/');
                                    }}
                                    className='w-[19.875rem] border border-formColor textFormColor1 rounded-[10px] cursor-pointer'
                                >
                                    Reset to Defaults
                                </button>
                                <button
                                    type="submit"
                                    onClick={() => {
                                    // Save logic here
                                    setEdit(false); // After saving, switch to Edit mode button
                                    }}
                                    className='w-[19.875rem] bg-lemongreen rounded-[10px] cursor-pointer'
                                >
                                    Save Changes
                                </button>
                                </div>
                            ) : (
                                <div className='w-full h-[3.4375rem]'>
                                <button
                                    type="button"
                                    onClick={() => setEdit(true)} // Switch back to editing
                                    className='w-full h-[3.4375rem] bg-lemongreen rounded-[10px] cursor-pointer'
                                >
                                    Edit Settings
                                </button>
                                </div>
                            )}
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* 2ndPart */}
        <div className='w-[43.5625rem] space-y-[7.25rem]'>
            {/* 2nd firstPart */}
            <div className='space-y-[5.125rem]'>
                <div className='space-y-[2.375rem]'>
                    <div className='space-y-[2.375rem]'>
                        <div className='flex between-center'>
                            <div>
                                <h1 className="text-formColor flex items-center gap-2">
                                    Require Two-Factor Authentication
                                    <span className="text-lemongreen text-sm font-medium bg-limegray/10 px-2 py-1 rounded-md">Default</span>
                                </h1>
                                <h4 className='textLimegray'>Require 2FA for all admin users.</h4>
                            </div>
                            <div onClick={()=>settoggleOnR(true)} className={`${toggleOnR ? ' bg-lemongreen' : ' bg-limegray'} w-[4.0625rem] h-[2.1875rem] rounded-full border  relative flex items-center py-[3px]`}>
                                <div className={`${toggleOnR ? 'translate-x-full' : 'translate-x-0 '} mx-[4px] absolute w-[1.8125rem] h-[1.8125rem] bg-white rounded-full  transition-transform ease-in-out duration-300`}></div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <form action="" className='space-y-[2.875rem]'>
                            <div className='flex gap-[2.1875rem]' >
                                {/* Session Timeout (minutes) */}
                                <div className='w-full'>
                                    <div className='w-full'>
                                        <Dropdown
                                        label="Session Timeout (minutes)"
                                        options={["60sec","120sec","20sec","30sec"]}
                                        selected={selectedSt}
                                        onSelect={setSelectedSt}
                                        placeholder="60sec"
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className='flex between-center'>
                    <div>
                        <h4 className='textFormColor1'>Enable Audit Logging</h4>
                        <h4 className='textLimegray'>Track all system activities for compliance and security.</h4>
                    </div>
                    <div onClick={() => settoggleOnA(!toggleOnA)}  className={`${toggleOnA ? ' bg-lemongreen' : ' bg-limegray'} w-[4.0625rem] h-[2.1875rem] rounded-full border  relative flex items-center py-[3px]`}>
                        <div className={`${toggleOnA ? 'translate-x-full' : 'translate-x-0 '} mx-[4px] absolute w-[1.8125rem] h-[1.8125rem] bg-white rounded-full  transition-transform ease-in-out duration-300`}></div>
                    </div>
                </div>
            </div>
            {/* 2nd secondPart */}
            <div className='space-y-[3.0625rem]'>
                <div className='space-y-[2.4375rem]'>
                    <div className='flex flex-col gap-[0.5625rem]'>
                        <div className='flex items-center gap-[0.4375rem]'>
                            <img src="/image/database.png" alt="" />
                        <span className='textFormColor1'>Data & Backup</span>
                        </div>
                        <h4 className='textLimegray leading-none'>Manage data storage, backup, and retention policies.</h4>
                    </div>
                    <div>
                        <form action="" className='space-y-[2.875rem]'>
                            <div>
                                <div className='flex gap-[2.1875rem]'>
                                    {/* Backup Frequency  */}
                                    <div className='w-[20.1875rem]'>
                                        <div>
                                            <Dropdown
                                            label="Backup Frequency"
                                            options={["daily","weak","month","year"]}
                                            selected={selectedB}
                                            onSelect={setSelectedB}
                                            placeholder="daily"
                                            />
                                        </div> 
                                    </div>

                                    {/* Data Retention (Years) */}
                                    <div className='flex flex-col gap-[1rem] w-[20.1875rem]'>
                                        <label htmlFor="organizationName" className='textFormColor1'>Data Retention (Years)</label>
                                        <input type="number" placeholder='5' className='inputMod pr-[1.5625rem] ' />
                                    </div>
                                </div>
                            </div>
                            {/* Default Export Format */}
                            <div>
                                <Dropdown
                                label="Default Export Format"
                                options={["CSV","CSV1","CSV2","CSV3"]}
                                selected={selectedEf}
                                onSelect={setSelectedEf}
                                placeholder="CSV"
                                />
                            </div> 
                        </form>
                    </div>
                </div>
                <div className='flex between-center'>
                    <div>
                        <h4 className='textFormColor1'>Data Encryption at Rest</h4>
                        <h4 className='textLimegray'>Ensure all stored data is encrypted for maximum security.</h4>
                    </div>
                    <div onClick={() => settoggleOnD(!toggleOnD)}  className={`${toggleOnD ? ' bg-lemongreen' : ' bg-limegray'} w-[4.0625rem] h-[2.1875rem] rounded-full border  relative flex items-center py-[3px]`}>
                        <div className={`${toggleOnD ? 'translate-x-full' : 'translate-x-0 '} mx-[4px] absolute w-[1.8125rem] h-[1.8125rem] bg-white rounded-full  transition-transform ease-in-out duration-300`}></div>
                    </div>
                </div>

            </div>
        </div>
    </div>
  )
}

export default page