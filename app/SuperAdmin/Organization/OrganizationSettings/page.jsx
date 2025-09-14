import React , {useState} from 'react'

const page = () => {
    // Okta, OneLogin, Microsoft Entra ID, Auth0, JumpCloud
    const [dropdownOpenS, setDropdownOpenS] = useState(false);
    const [selectedSSO, setSelectedSSO] = useState('Google Workspace')
    const SSO = ["Google Workspace", "Okta", "OneLogin", "Microsoft" , "Entra ID", "Auth0", "JumpCloud"]

    // ipAddress
    const [dropdownOpenP, setDropdownOpenP] = useState(false);
    const [selectedIp, setSelectedIp] = useState('e.g., 192.168.1.0/24, 10.0.0.0/8')
    const IP = ["192", "168", "244", "344" , "555", "661", "777" , 'none']

    // passwordPolicy
    const [dropdownOpenPass, setDropdownOpenPass] = useState(false);
    const [selectedPass, setSelectedPass] = useState('8+ chars, mixed case, numbers')
    const Policy = ["8+ chars, mixed case, numbers1", "8+ chars, mixed case, numbers2", "8+ chars, mixed case, number3"]

    // sessionTimer
    const [dropdownOpenSt, setDropdownOpenSt] = useState(false);
    const [selectedSt, setSelectedSt] = useState('60sec')
    const sessionTime = ["60sec","120sec","20sec","30sec"]

    // Backup
    const [dropdownOpenB, setDropdownOpenB] = useState(false);
    const [selectedB, setSelectedB] = useState('daily')
    const Backup = ["daily","weak","month","year"]

    // Default Export Format
    const [dropdownOpenEf, setDropdownOpenEf] = useState(false);
    const [selectedEf, setSelectedEf] = useState('CSV')
    const exportFormat = ["CSV","CSV1","CSV2","CSV3"]





    const [toggleOn, settoggleOn] = useState(false);
    const [toggleOnA, settoggleOnA] = useState(false);
    const [toggleOnD, settoggleOnD] = useState(false);

    // NotificationArea
    const [toggleOnN, settoggleOnN] = useState([false,false,false]);
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
                                <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.5 11.9167C17.5 16.5 14.4375 18.7917 10.7975 20.1209C10.6069 20.1885 10.3998 20.1853 10.2113 20.1117C6.5625 18.7917 3.5 16.5 3.5 11.9167V5.50003C3.5 5.25691 3.59219 5.02375 3.75628 4.85184C3.92038 4.67994 4.14294 4.58336 4.375 4.58336C6.125 4.58336 8.3125 3.48336 9.835 2.09003C10.0204 1.92411 10.2562 1.83295 10.5 1.83295C10.7438 1.83295 10.9796 1.92411 11.165 2.09003C12.6963 3.49253 14.875 4.58336 16.625 4.58336C16.8571 4.58336 17.0796 4.67994 17.2437 4.85184C17.4078 5.02375 17.5 5.25691 17.5 5.50003V11.9167Z" stroke="#BEE532" stroke-width="1.375" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <span className='textFormColor1'>Security Settings</span>
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
                            <div className='flex flex-col gap-[1rem] relative'>
                                <label htmlFor="firstName" className='textFormColor1'>SSO Provider</label>
                                <div className='inputMod flex items-center justify-between pr-[1.5625rem]' >
                                    <button type="button" className='textFormColor1 text-left' onClick={() => setDropdownOpenS(!dropdownOpenS)}>{selectedSSO}</button>
                                    <svg onClick={() => setDropdownOpenS(!dropdownOpenS)} className={`transition-transform duration-200 ${dropdownOpenS ? 'rotate-180' : ''}`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 9L12 15L5 9" stroke="#BEE532" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </div>
                                <div className={`${dropdownOpenS ? 'flex' : 'hidden'} bg-inputBack rounded-[10px]   w-full top-[6.3125rem] absolute z-10 textFormColor1 flex-col center-center border border-limeLight h-[12.5rem] overflow-auto scrollBarDash`}>
                                    <ul className='flex flex-col space-y-5 py-5 h-full '>
                                        {SSO.map(sso => (
                                        <li key={sso} className={`cursor-pointer w-full text-center ${selectedSSO === sso ? 'text-lemongreen font-bold' : ''}`}
                                        onClick={() => {
                                            setSelectedSSO(sso)
                                            setDropdownOpenS(false)
                                        }}>
                                        {sso}
                                        </li>
                                    ))}
                                    </ul>
                                </div>
                            </div>
                            {/* IP Restrictions (CIDR) */}
                            <div className='flex flex-col gap-[1rem] relative'>
                                <label htmlFor="firstName" className='textFormColor1'>IP Restrictions (CIDR)</label>
                                <div className='inputMod flex items-center justify-between pr-[1.5625rem]' >
                                    <button type="button" className='textFormColor1 text-left' onClick={() => setDropdownOpenP(!dropdownOpenP)}>{selectedIp}</button>
                                    <svg onClick={() => setDropdownOpenP(!dropdownOpenP)} className={`transition-transform duration-200 ${dropdownOpenP ? 'rotate-180' : ''}`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 9L12 15L5 9" stroke="#BEE532" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </div>
                                <div className={`${dropdownOpenP ? 'flex' : 'hidden'} bg-inputBack rounded-[10px]   w-full top-[6.3125rem] absolute z-10 textFormColor1 flex-col center-center border border-limeLight h-[12.5rem] overflow-auto scrollBarDash`}>
                                    <ul className='flex flex-col space-y-5 py-5 h-full'>
                                        {IP.map(ip => (
                                        <li key={ip} className={`cursor-pointer w-full text-center ${selectedIp === ip ? 'text-lemongreen font-bold' : ''}`}
                                        onClick={() => {
                                            setSelectedIp(ip)
                                            setDropdownOpenP(false)
                                        }}>
                                        {ip}
                                        </li>
                                    ))}
                                    </ul>
                                </div>
                                <h4 className='textLimegray'>List allowed IP addresses or CIDR blocks, one per line. Leave empty for no restrictions.</h4>
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
                                    <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.98459 19.25C9.13819 19.5287 9.35911 19.7601 9.62513 19.921C9.89116 20.0819 10.1929 20.1666 10.5001 20.1666C10.8073 20.1666 11.109 20.0819 11.3751 19.921C11.6411 19.7601 11.862 19.5287 12.0156 19.25M2.85434 14.0489C2.74004 14.1801 2.6646 14.3433 2.63722 14.5187C2.60983 14.694 2.63167 14.8739 2.70009 15.0365C2.7685 15.1991 2.88054 15.3373 3.02257 15.4344C3.1646 15.5315 3.3305 15.5832 3.50009 15.5834H17.5001C17.6697 15.5834 17.8356 15.5319 17.9777 15.435C18.1198 15.3381 18.232 15.2 18.3006 15.0375C18.3692 14.875 18.3913 14.6952 18.3641 14.5198C18.3369 14.3445 18.2617 14.1812 18.1476 14.0498C16.9838 12.793 15.7501 11.4575 15.7501 7.33337C15.7501 5.87468 15.197 4.47574 14.2124 3.44429C13.2278 2.41284 11.8925 1.83337 10.5001 1.83337C9.10771 1.83337 7.77235 2.41284 6.78778 3.44429C5.80322 4.47574 5.25009 5.87468 5.25009 7.33337C5.25009 11.4575 4.01547 12.793 2.85434 14.0489Z" stroke="#BEE532" stroke-width="1.375" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                <span className='textFormColor1'>Notification Settings</span>
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
                            <div className='w-full h-[3.4375rem] flex gap-[2.5625rem] mb-[4.125rem]'>
                                <button type="button" onClick={()=>navigate('/AddNewemployeesecond')} className='w-[19.875rem] border border-formColor textFormColor1 rounded-[10px] cursor-pointer'>Rest into Defaults</button>
                                <button type="submit" onClick={()=>navigate('/System')} className='w-[19.875rem] bg-lemongreen rounded-[10px] cursor-pointer'>Save Changes</button>
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
                    <div>
                        <h1 className='textFormColor1'>Require Two-Factor Authentication</h1>
                        <h4 className='textLimegray'>Require 2FA for all admin users.</h4>
                    </div>
                    <div>
                        <form action="" className='space-y-[2.875rem]'>
                            <div className='flex gap-[2.1875rem]'>
                                {/* Session Timeout (minutes) */}
                                <div className='w-[20.1875rem]'>
                                <div className='flex flex-col gap-[1rem] relative'>
                                    <label htmlFor="firstName" className='textFormColor1'>Session Timeout (minutes)</label>
                                    <div className='inputMod flex items-center justify-between pr-[1.5625rem]' >
                                        <button type="button" className='textFormColor1 text-left' onClick={() => setDropdownOpenSt(!dropdownOpenSt)}>{selectedSt}</button>
                                        <svg onClick={() => setDropdownOpenSt(!dropdownOpenSt)} className={`transition-transform duration-200 ${dropdownOpenSt ? 'rotate-180' : ''}`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 9L12 15L5 9" stroke="#BEE532" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </div>
                                    <div className={`${dropdownOpenSt ? 'flex' : 'hidden'} bg-inputBack rounded-[10px]   w-full top-[6.3125rem] absolute z-10 textFormColor1 flex-col center-center border border-limeLight`}>
                                        <ul className='flex flex-col space-y-5 py-5 '>
                                            {sessionTime.map(st => (
                                            <li key={st} className={`cursor-pointer w-full text-center ${selectedSt === st ? 'text-lemongreen font-bold' : ''}`}
                                            onClick={() => {
                                                setSelectedSt(st)
                                                setDropdownOpenSt(false)
                                            }}>
                                            {st}
                                            </li>
                                        ))}
                                        </ul>
                                    </div>
                                </div>
                                </div>

                                {/* Password Policy */}
                                <div className='w-[20.1875rem]'>
                                <div className='flex flex-col gap-[1rem] relative'>
                                    <label htmlFor="firstName" className='textFormColor1'>Password Policy</label>
                                    <div className='inputMod flex items-center justify-between pr-[1.5625rem]' >
                                        <button type="button" className='textFormColor1 text-left' onClick={() => setDropdownOpenPass(!dropdownOpenPass)}>{selectedPass}</button>
                                        <svg onClick={() => setDropdownOpenPass(!dropdownOpenPass)} className={`transition-transform duration-200 ${dropdownOpenPass ? 'rotate-180' : ''}`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 9L12 15L5 9" stroke="#BEE532" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </div>
                                    <div className={`${dropdownOpenPass ? 'flex' : 'hidden'} bg-inputBack rounded-[10px]   w-full top-[6.3125rem] absolute z-10 textFormColor1 flex-col center-center border border-limeLight`}>
                                        <ul className='flex flex-col space-y-5 py-5 '>
                                            {Policy.map(pass => (
                                            <li key={pass} className={`cursor-pointer w-full text-center ${selectedPass === pass ? 'text-lemongreen font-bold' : ''}`}
                                            onClick={() => {
                                                setSelectedPass(pass)
                                                setDropdownOpenPass(false)
                                            }}>
                                            {pass}
                                            </li>
                                        ))}
                                        </ul>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className='flex between-center'>
                    <div>
                        <h4 className='textFormColor1'>Enable Audit Logging</h4>
                        <h4 className='textLimegray'>Allow users to login with SSO providers</h4>
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
                            <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.375 4.58337C18.375 6.10216 14.8492 7.33337 10.5 7.33337C6.15076 7.33337 2.625 6.10216 2.625 4.58337M18.375 4.58337C18.375 3.06459 14.8492 1.83337 10.5 1.83337C6.15076 1.83337 2.625 3.06459 2.625 4.58337M18.375 4.58337V17.4167C18.375 18.1461 17.5453 18.8455 16.0685 19.3613C14.5916 19.877 12.5886 20.1667 10.5 20.1667C8.41142 20.1667 6.40838 19.877 4.93153 19.3613C3.45469 18.8455 2.625 18.1461 2.625 17.4167V4.58337M2.625 11C2.625 11.7294 3.45469 12.4289 4.93153 12.9446C6.40838 13.4603 8.41142 13.75 10.5 13.75C12.5886 13.75 14.5916 13.4603 16.0685 12.9446C17.5453 12.4289 18.375 11.7294 18.375 11" stroke="#BEE532" stroke-width="1.375" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
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
                                        <div className='flex flex-col gap-[1rem] relative'>
                                            <label htmlFor="firstName" className='textFormColor1'>Backup Frequency </label>
                                            <div className='inputMod flex items-center justify-between pr-[1.5625rem]' >
                                                <button type="button" className='textFormColor1 text-left' onClick={() => setDropdownOpenB(!dropdownOpenB)}>{selectedB}</button>
                                                <svg onClick={() => setDropdownOpenB(!dropdownOpenB)} className={`transition-transform duration-200 ${dropdownOpenB ? 'rotate-180' : ''}`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 9L12 15L5 9" stroke="#BEE532" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                </svg>
                                            </div>
                                            <div className={`${dropdownOpenB ? 'flex' : 'hidden'} bg-inputBack rounded-[10px]   w-full top-[6.3125rem] absolute z-10 textFormColor1 flex-col center-center border border-limeLight`}>
                                                <ul className='flex flex-col space-y-5 py-5 '>
                                                    {Backup.map(back => (
                                                    <li key={back} className={`cursor-pointer w-full text-center ${selectedB === back ? 'text-lemongreen font-bold' : ''}`}
                                                    onClick={() => {
                                                        setSelectedB(back)
                                                        setDropdownOpenB(false)
                                                    }}>
                                                    {back}
                                                    </li>
                                                ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Data Retention (Years) */}
                                    <div className='flex flex-col gap-[1rem] w-[20.1875rem]'>
                                        <label htmlFor="organizationName" className='textFormColor1'>Data Retention (Years)</label>
                                        <input type="number" placeholder='Enter Organization Name' className='inputMod pr-[1.5625rem] ' />
                                    </div>
                                </div>
                            </div>
                            {/* Default Export Format */}
                            <div className='flex flex-col gap-[1rem] relative'>
                                <label htmlFor="firstName" className='textFormColor1'>Default Export Format</label>
                                <div className='inputMod flex items-center justify-between pr-[1.5625rem]' >
                                    <button type="button" className='textFormColor1 text-left' onClick={() => setDropdownOpenEf(!dropdownOpenEf)}>{selectedEf}</button>
                                    <svg onClick={() => setDropdownOpenEf(!dropdownOpenEf)} className={`transition-transform duration-200 ${dropdownOpenEf ? 'rotate-180' : ''}`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 9L12 15L5 9" stroke="#BEE532" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </div>
                                <div className={`${dropdownOpenEf ? 'flex' : 'hidden'} bg-inputBack rounded-[10px]   w-full top-[6.3125rem] absolute z-10 textFormColor1 flex-col center-center border border-limeLight h-[12.5rem] overflow-auto scrollBarDash`}>
                                    <ul className='flex flex-col space-y-5 py-5 h-full'>
                                        {exportFormat.map(ef => (
                                        <li key={ef} className={`cursor-pointer w-full text-center ${selectedEf === ef ? 'text-lemongreen font-bold' : ''}`}
                                        onClick={() => {
                                            setSelectedEf(ef)
                                            setDropdownOpenEf(false)
                                        }}>
                                        {ef}
                                        </li>
                                    ))}
                                    </ul>
                                </div>
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