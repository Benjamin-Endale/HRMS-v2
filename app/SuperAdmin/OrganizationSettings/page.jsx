'use client'
import React, { useState } from 'react'
import { Dropdown } from '@/app/Components/DropDown'
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const OrgSettingSchema = z.object({
    SSOProvider: z.string().nonempty("SSO Provider is required"),
    IPRestriction: z.string().nonempty("IP Restriction is required"),
    SessionTimeout: z.string().nonempty("Session Timeout is required"),
    PasswordPolicy: z.string().nonempty("Password Policy is required"),
    BackupFrequency: z.string().nonempty("Backup Frequency is required"),
    DataRetention: z.string().nonempty("Data Retention is required"),
    ExportFormat: z.string().nonempty("Export Format is required"),
});

const Page = () => {
    const [toggleOn, settoggleOn] = useState(false);
    const [toggleOnA, settoggleOnA] = useState(false);
    const [toggleOnD, settoggleOnD] = useState(false);
    const [toggleOnN, settoggleOnN] = useState([false, false, false]);

    const handleToggleN = (index) => {
        settoggleOnN(prev => {
            const newToggles = [...prev];
            newToggles[index] = !newToggles[index];
            return newToggles;
        });
    };

    const { register, handleSubmit, control, formState: { errors } } = useForm({
        resolver: zodResolver(OrgSettingSchema),
        defaultValues: {
            SSOProvider: "",
            IPRestriction: "",
            SessionTimeout: "",
            PasswordPolicy: "",
            BackupFrequency: "",
            DataRetention: "",
            ExportFormat: "",
        },
    });

    const onSubmit = (data) => {
        console.log("Form Data:", data);
        console.log("SSO Enabled:", toggleOn);
        console.log("Audit Logging:", toggleOnA);
        console.log("Data Encryption:", toggleOnD);
        console.log("Notifications:", toggleOnN);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex gap-[7.0625rem] font-semibold'>

            {/* Left Section */}
            <div className='w-[43.5625rem]'>
                <div className='flex flex-col gap-[4.5625rem]'>

                    {/* Security Settings */}
                    <div className='flex flex-col gap-[2.4375rem]'>
                        <div className='flex flex-col gap-[0.5625rem]'>
                            <div className='flex items-center gap-[0.4375rem]'>
                                <img src="/image/shield.png" alt="" />
                                <span className='textFormColor1'>Security Settings</span>
                            </div>
                            <h4 className='textLimegray leading-none'>Manage authentication, access, and audit logging.</h4>
                        </div>

                        {/* Toggle SSO */}
                        <div className='flex between-center'>
                            <div>
                                <h1 className='textFormColor1'>Enable Single Sign-On (SSO)</h1>
                                <h4 className='textLimegray'>Allow users to login with SSO providers</h4>
                            </div>
                            <div onClick={() => settoggleOn(!toggleOn)} className={`${toggleOn ? ' bg-lemongreen' : ' bg-limegray'} w-[4.0625rem] h-[2.1875rem] rounded-full border relative flex items-center py-[3px] cursor-pointer`}>
                                <div className={`${toggleOn ? 'translate-x-full' : 'translate-x-0'} mx-[4px] absolute w-[1.8125rem] h-[1.8125rem] bg-white rounded-full transition-transform ease-in-out duration-300`}></div>
                            </div>
                        </div>

                        {/* SSO Provider & IP Restriction */}
                        <div className='space-y-[2.4375rem]'>
                            <Controller
                                name="SSOProvider"
                                control={control}
                                render={({ field }) => (
                                    <Dropdown
                                        label="SSO Provider"
                                        options={["Google Workspace", "Okta", "OneLogin", "Microsoft", "Entra ID", "Auth0", "JumpCloud"]}
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        placeholder="Google Workspace"
                                    />
                                )}
                            />
                            {errors.SSOProvider && <p className="text-Error text-[1rem]">{errors.SSOProvider.message}</p>}

                            <Controller
                                name="IPRestriction"
                                control={control}
                                render={({ field }) => (
                                    <Dropdown
                                        label="IP Restrictions (CIDR)"
                                        options={["192", "168", "244", "344", "555", "661", "777", "none"]}
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        placeholder="e.g., 192.168.1.0/24"
                                    />
                                )}
                            />
                            {errors.IPRestriction && <p className="text-Error text-[1rem]">{errors.IPRestriction.message}</p>}
                        </div>
                    </div>
                    {/* Notification Settings */}
                    <div className='space-y-[2.875rem]'>
                        <div className='flex flex-col gap-[0.5625rem]'>
                            <div className='flex items-center gap-[0.4375rem]'>
                                <img src="/image/bell.png" alt="" />
                                <span className='textFormColor1'>Notification Settings</span>
                            </div>
                            <h4 className='textLimegray leading-none'>Configure how your organization receives system notifications.</h4>
                        </div>

                        {[
                            { title: 'Email Notifications', desc: 'Send system alerts and updates via email.' },
                            { title: 'Push Notifications', desc: 'Enable in-app push notifications for real-time updates.' },
                            { title: 'Critical Alerts Only', desc: 'Only send notifications for high-priority system events.' }
                        ].map((item, i) => (
                            <div key={i} className='flex between-center'>
                                <div>
                                    <h1 className='textFormColor1'>{item.title}</h1>
                                    <h4 className='textLimegray'>{item.desc}</h4>
                                </div>
                                <div onClick={() => handleToggleN(i)} className={`${toggleOnN[i] ? ' bg-lemongreen' : ' bg-limegray'} w-[4.0625rem] h-[2.1875rem] rounded-full border relative flex items-center py-[3px] cursor-pointer`}>
                                    <div className={`${toggleOnN[i] ? 'translate-x-full' : 'translate-x-0'} mx-[4px] absolute w-[1.8125rem] h-[1.8125rem] bg-white rounded-full transition-transform ease-in-out duration-300`}></div>
                                </div>
                            </div>
                        ))}

                        <div className="w-full h-[3.4375rem] flex gap-[2.5625rem] mb-[4.125rem]">
                            <button type="button" className="w-[19.875rem] border border-formColor textFormColor1 rounded-[10px] cursor-pointer">Reset into Defaults</button>
                            <button type="submit" className="w-[19.875rem] bg-lemongreen rounded-[10px] cursor-pointer">Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Section */}
            <div className='w-[43.5625rem] space-y-[7.25rem]'>
                {/* 2FA & Security Policies */}
                <div className='space-y-[5.125rem]'>
                    <div className='space-y-[2.375rem]'>
                        <div>
                            <h1 className='textFormColor1'>Require Two-Factor Authentication</h1>
                            <h4 className='textLimegray'>Require 2FA for all admin users.</h4>
                        </div>
                        <div className='flex gap-[2.1875rem]'>
                            <div className='w-[20.1875rem]'>
                                <Controller
                                    name="SessionTimeout"
                                    control={control}
                                    render={({ field }) => (
                                        <Dropdown
                                            label="Session Timeout (minutes)"
                                            options={["60sec", "120sec", "20sec", "30sec"]}
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            placeholder="60sec"
                                        />
                                    )}
                                />
                                {errors.SessionTimeout && <span className="text-Error text-[1rem]">{errors.SessionTimeout.message}</span>}
                            </div>
                            <div className='w-[20.1875rem]'>
                                <Controller
                                    name="PasswordPolicy"
                                    control={control}
                                    render={({ field }) => (
                                        <Dropdown
                                            label="Password Policy"
                                            options={["8+ chars, mixed case, numbers1","8+ chars, mixed case, numbers2","8+ chars, mixed case, numbers3"]}
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            placeholder="8+ chars, mixed case"
                                        />
                                    )}
                                />
                                {errors.PasswordPolicy && <span className="text-Error text-[1rem]">{errors.PasswordPolicy.message}</span>}
                            </div>
                        </div>

                        <div className='flex between-center'>
                            <div>
                                <h4 className='textFormColor1'>Enable Audit Logging</h4>
                                <h4 className='textLimegray'>Allow users to login with SSO providers</h4>
                            </div>
                            <div onClick={() => settoggleOnA(!toggleOnA)} className={`${toggleOnA ? ' bg-lemongreen' : ' bg-limegray'} w-[4.0625rem] h-[2.1875rem] rounded-full border relative flex items-center py-[3px] cursor-pointer`}>
                                <div className={`${toggleOnA ? 'translate-x-full' : 'translate-x-0'} mx-[4px] absolute w-[1.8125rem] h-[1.8125rem] bg-white rounded-full transition-transform ease-in-out duration-300`}></div>
                            </div>
                        </div>
                    </div>

                    {/* Data & Backup */}
                    <div className='space-y-[3.0625rem]'>
                        <div className='flex flex-col gap-[0.5625rem]'>
                            <div className='flex items-center gap-[0.4375rem]'>
                                <img src="/image/database.png" alt="" />
                                <span className='textFormColor1'>Data & Backup</span>
                            </div>
                            <h4 className='textLimegray leading-none'>Manage data storage, backup, and retention policies.</h4>
                        </div>

                        <div className='flex gap-[2.1875rem]'>
                            <div className='w-[20.1875rem]'>
                                <Controller
                                    name='BackupFrequency'
                                    control={control}
                                    render={({ field }) => (
                                        <Dropdown
                                            label="Backup Frequency"
                                            options={["daily","weak","month","year"]}
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            placeholder="daily"
                                        />
                                    )}
                                />
                                {errors.BackupFrequency && <span className='text-Error text-[1rem]'>{errors.BackupFrequency.message}</span>}
                            </div>
                            <div className='w-[20.1875rem] flex flex-col gap-[1rem]'>
                                <label className='textFormColor1'>Data Retention (Years)</label>
                                <input type="number" placeholder='5' className='inputMod pr-[1.5625rem]' {...register("DataRetention")} />
                                {errors.DataRetention && <span className='text-Error text-[1rem]'>{errors.DataRetention.message}</span>}
                            </div>
                        </div>

                        <div>
                            <Controller
                                name='ExportFormat'
                                control={control}
                                render={({ field }) => (
                                    <Dropdown
                                        label="Default Export Format"
                                        options={["CSV","CSV1","CSV2","CSV3"]}
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        placeholder="CSV"
                                    />
                                )}
                            />
                            {errors.ExportFormat && <span className='text-Error text-[1rem]'>{errors.ExportFormat.message}</span>}
                        </div>

                        <div className='flex between-center'>
                            <div>
                                <h4 className='textFormColor1'>Data Encryption at Rest</h4>
                                <h4 className='textLimegray'>Ensure all stored data is encrypted for maximum security.</h4>
                            </div>
                            <div onClick={() => settoggleOnD(!toggleOnD)} className={`${toggleOnD ? ' bg-lemongreen' : ' bg-limegray'} w-[4.0625rem] h-[2.1875rem] rounded-full border relative flex items-center py-[3px] cursor-pointer`}>
                                <div className={`${toggleOnD ? 'translate-x-full' : 'translate-x-0'} mx-[4px] absolute w-[1.8125rem] h-[1.8125rem] bg-white rounded-full transition-transform ease-in-out duration-300`}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </form>
    )
}

export default Page
