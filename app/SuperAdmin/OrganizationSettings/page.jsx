'use client'

import React, { useState } from 'react'
import { Dropdown } from '@/app/Components/DropDown'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller } from 'react-hook-form'

const orgSettingSchema = z.object({
  ssoProvider: z.string().optional(),
  sessionTimer: z.string().nonempty("Session Timer is required"),
  backupFrequency: z.string().nonempty("Backup Frequency is required"),
  dataRetention: z.string().nonempty("Data Retention is required"),
  exportFormat: z.string().nonempty("Default Export Format is required"),
  enableSSO: z.boolean(),
  enableDoubleAuthentication: z.boolean(),
  enableEncryption: z.boolean(),
  pushNotifications: z.boolean(),
  emailNotifications: z.boolean(),
  criticalAlertsOnly: z.boolean(),
}).superRefine((data, ctx) => {
  if (data.enableSSO && (!data.ssoProvider || data.ssoProvider.trim() === "")) {
    ctx.addIssue({
      path: ["SSOProvider"],
      message: "SSO Provider is required when SSO is enabled",
      code: z.ZodIssueCode.custom,
    })
  }
})


const Page = () => {
  const router = useRouter()

  // Local state for dropdown selections
  const [selectedSSO, setSelectedSSO] = useState()
  const [selectedSt, setSelectedSt] = useState()
  const [selectedB, setSelectedB] = useState()
  const [selectedEf, setSelectedEf] = useState()
  const [edit, setEdit] = useState(true)


  const { register, handleSubmit, control, setValue, watch, formState: { errors } } = useForm({
    resolver: zodResolver(orgSettingSchema),
    defaultValues: {
      ssoProvider: '',
      sessionTimer: '',
      backupFrequency: '',
      dataRetention: '',
      exportFormat: '',
      enableSSO: false,
      enableDoubleAuthentication: true,
      enableEncryption: false,
      emailNotifications: false,
      pushNotifications: false,
      criticalAlertsOnly: false,
      // notifications: [false, false, false],
    },
  })

  console.log(errors)

  const onSubmit = (data) => {
    if (!data.enableSSO) {
      data.ssoProvider = null
    }
    console.log("✅ Submitted Data:", data)
    setEdit(false)
  }

  // Watch toggles
  const enableSSO = watch("enableSSO")
  const enableDoubleAuthentication = watch("enableDoubleAuthentication")
  const enableEncryption = watch("enableEncryption")
  const emailNotifications = watch("emailNotifications")
  const pushNotifications = watch("pushNotifications")
  const criticalAlertsOnly = watch("criticalAlertsOnly")

  // const notifications = watch("notifications")

  // const handleToggleN = (index) => {
  //   const newNotifications = [...notifications]
  //   newNotifications[index] = !newNotifications[index]
  //   setValue("notifications", newNotifications)
  // }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex gap-[7.0625rem] font-semibold'>
      {/* LEFT SIDE */}
      <div className='w-[43.5625rem]'>
        <div className='flex flex-col gap-[4.5625rem]'>
          <div className='flex flex-col gap-[5rem]'>

            {/* SECURITY SETTINGS */}
            <div className='flex flex-col gap-[2.4375rem]'>
              <div className='flex flex-col gap-[0.5625rem]'>
                <div className='flex items-center gap-[0.4375rem]'>
                  <img src="/image/shield.png" alt="" />
                  <span className='textFormColor'>Security Settings</span>
                </div>
                <h4 className='textLimegray leading-none'>
                  Manage authentication, access, and audit logging.
                </h4>
              </div>

 
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-formColor">Enable Single Sign-On (SSO)</h1>
                  <h4 className="text-limegray">Allow users to login with SSO providers</h4>
                </div>
                <div onClick={() => setValue("enableSSO", !enableSSO)} className={`${enableSSO ? ' bg-lemongreen' : ' bg-limegray'} w-[4.0625rem] h-[2.1875rem] rounded-full border relative flex items-center py-[3px]`}>
                  <div className={`${enableSSO ? 'translate-x-full' : 'translate-x-0 '} mx-[4px] absolute w-[1.8125rem] h-[1.8125rem] bg-white rounded-full transition-transform ease-in-out duration-300`}></div>
                </div>
              </div>

              {/* SSO PROVIDER */}
              <div   className={`relative transition-all ${!enableSSO ? 'opacity-50 pointer-events-none select-none' : ''}`}>
                <Controller
                  name="ssoProvider"
                  control={control}
                  render={({ field }) => (
                    <Dropdown
                      label="SSO Provider"
                      options={["Google Workspace", "Okta", "OneLogin", "Microsoft", "Entra ID", "Auth0", "JumpCloud"]}
                      selected={selectedSSO}
                      onSelect={(value) => {
                        setSelectedSSO(value)
                        field.onChange(value)
                      }}
                      placeholder="Google Workspace"
                      disabled={!enableSSO}
                    />
                  )}
                />
                {errors.ssoProvider && <span className='text-Error text-[1rem] absolute bottom-[-2rem]'>{errors.ssoProvider.message}</span>}
              </div>
            </div>

            {/* NOTIFICATION SETTINGS */}
            <div className=''>
              <div className='space-y-[2.875rem]'>
                <div className='flex flex-col gap-[0.5625rem]'>
                  <div className='flex items-center gap-[0.4375rem]'>
                    <img src="/image/bell.png" alt="" />
                    <span className='textFormColor'>Notification Settings</span>
                  </div>
                  <h4 className='textLimegray leading-none'>
                    Configure how your organization receives system notifications.
                  </h4>
                </div>

                <div className='space-y-[9.1875rem]'>
                  <div className='space-y-[2.875rem]'>
                      <div className="flex justify-between items-center">
                        <div>
                          <h1 className="text-formColor">Email Notifications</h1>
                          <h4 className="text-limegray">Send system alerts and updates via email.</h4>
                        </div>
                        <div onClick={() => setValue("emailNotifications", !emailNotifications)} className={`${emailNotifications ? ' bg-lemongreen' : ' bg-limegray'} w-[4.0625rem] h-[2.1875rem] rounded-full border relative flex items-center py-[3px]`}>
                          <div className={`${emailNotifications ? 'translate-x-full' : 'translate-x-0 '} mx-[4px] absolute w-[1.8125rem] h-[1.8125rem] bg-white rounded-full transition-transform ease-in-out duration-300`}></div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <h1 className="text-formColor">Push Notifications</h1>
                          <h4 className="text-limegray">Enable in-app push notifications for real-time updates.</h4>
                        </div>
                        <div onClick={() => setValue("pushNotifications", !pushNotifications)} className={`${pushNotifications ? ' bg-lemongreen' : ' bg-limegray'} w-[4.0625rem] h-[2.1875rem] rounded-full border relative flex items-center py-[3px]`}>
                          <div className={`${pushNotifications ? 'translate-x-full' : 'translate-x-0 '} mx-[4px] absolute w-[1.8125rem] h-[1.8125rem] bg-white rounded-full transition-transform ease-in-out duration-300`}></div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <h1 className="text-formColor">Critical Alerts Only</h1>
                          <h4 className="text-limegray">Only send notifications for high-priority system events.</h4>
                        </div>
                        <div onClick={() => setValue("criticalAlertsOnly", !criticalAlertsOnly)} className={`${criticalAlertsOnly ? ' bg-lemongreen' : ' bg-limegray'} w-[4.0625rem] h-[2.1875rem] rounded-full border relative flex items-center py-[3px]`}>
                          <div className={`${criticalAlertsOnly ? 'translate-x-full' : 'translate-x-0 '} mx-[4px] absolute w-[1.8125rem] h-[1.8125rem] bg-white rounded-full transition-transform ease-in-out duration-300`}></div>
                        </div>
                      </div>
                  </div>
                  {/* Save / Reset Buttons */}
                  <div className='mb-[4.125rem] w-full'>
                    {edit ? (
                      <div className='w-full h-[3.4375rem] flex gap-[2.5625rem]'>
                        <button
                          type="button"
                          onClick={() => {
                            setEdit(true)
                            router.push('/')
                          }}
                          className='w-[19.875rem] border border-formColor textFormColor1 rounded-[10px] cursor-pointer'
                        >
                          Reset to Defaults
                        </button>
                        <button
                          type="submit"
                          className='w-[19.875rem] bg-lemongreen rounded-[10px] cursor-pointer'
                        >
                          Save Changes
                        </button>
                      </div>
                    ) : (
                      <div className='w-full h-[3.4375rem]'>
                        <button
                          type="button"
                          onClick={() => setEdit(true)}
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

      {/* RIGHT SIDE */}
      <div className='w-[43.5625rem] space-y-[7.25rem]'>

        {/* SESSION SETTINGS */}
        <div className='space-y-[5.125rem]'>
          <div className='space-y-[2.375rem]'>
            <div className='flex between-center'>
              <div>
                <h1 className="text-formColor flex items-center gap-2">
                  Require Two-Factor Authentication
                  <span className="text-lemongreen text-sm font-medium bg-limegray/10 px-2 py-1 rounded-md">Default</span>
                </h1>
                <h4 className='textLimegray'>Require 2FA for all admin users.</h4>
              </div>
              <div  className=' bg-lemongreen    w-[4.0625rem] h-[2.1875rem] rounded-full border relative flex items-center py-[3px]'>
                <div className='translate-x-full    mx-[4px] absolute w-[1.8125rem] h-[1.8125rem] bg-white rounded-full transition-transform ease-in-out duration-300'></div>
              </div>
            </div>

            <div className='flex gap-[2.1875rem]'>
              <div className='w-full relative'>
                <Controller
                  name="sessionTimer"
                  control={control}
                  render={({ field }) => (
                    <Dropdown
                      label="Session Timeout (minutes)"
                      options={["60sec", "120sec", "20sec", "30sec"]}
                      selected={selectedSt}
                      onSelect={(value) => {
                        setSelectedSt(value)
                        field.onChange(value)
                      }}
                      placeholder="60sec"
                    />
                  )}
                />
                {errors.sessionTimer && <span className='text-Error text-[1rem] absolute bottom-[-2rem]'>{errors.sessionTimer.message}</span>}
              </div>
            </div>
          </div>

          {/* DATA & BACKUP SETTINGS */}
          <div className='space-y-[3.0625rem]'>
            <div className='space-y-[2.4375rem]'>
              <div className='flex flex-col gap-[0.5625rem]'>
                <div className='flex items-center gap-[0.4375rem]'>
                  <img src="/image/database.png" alt="" />
                  <span className='textFormColor1'>Data & Backup</span>
                </div>
                <h4 className='textLimegray leading-none'>
                  Manage data storage, backup, and retention policies.
                </h4>
              </div>

              <div className='flex gap-[2.1875rem]'>
                <div className='w-[20.1875rem] relative'>
                  <Controller
                    name="backupFrequency"
                    control={control}
                    render={({ field }) => (
                      <Dropdown
                        label="Backup Frequency"
                        options={["Daily", "Weekly", "Month", "Year"]}
                        selected={selectedB}
                        onSelect={(value) => {
                          setSelectedB(value)
                          field.onChange(value)
                        }}
                        placeholder="Daily"
                      />
                    )}
                  />
                  {errors.backupFrequency && <span className='text-Error text-[1rem] absolute bottom-[-2rem]'>{errors.backupFrequency.message}</span>}
                </div>

                <div className='w-[20.1875rem] flex flex-col gap-[1rem]'>
                                <label className='textFormColor1'>Data Retention (Years)</label>
                                <input type="number" placeholder='5' className='inputMod pr-[1.5625rem]' {...register("dataRetention")} />
                                {errors.dataRetention && <span className='text-Error text-[1rem]'>{errors.dataRetention.message}</span>}
                            </div>
              </div>
              <div className='relative'>
                <Controller
                  name="exportFormat"
                  control={control}
                  render={({ field }) => (
                    <Dropdown
                      label="Default Export Format"
                      options={["CSV", "CSV1", "CSV2", "CSV3"]}
                      selected={selectedEf}
                      onSelect={(value) => {
                        setSelectedEf(value)
                        field.onChange(value)
                      }}
                      placeholder="CSV"
                    />
                  )}
                />
                {errors.exportFormat && <span className='text-Error text-[1rem] absolute bottom-[-2rem]'>{errors.exportFormat.message}</span>}
              </div>
            </div>

            <div className='flex between-center'>
              <div>
                <h4 className='textFormColor1'>Data Encryption at Rest</h4>
                <h4 className='textLimegray'>
                  Ensure all stored data is encrypted for maximum security.
                </h4>
              </div>
              <div onClick={() => setValue("enableEncryption", !enableEncryption)} className={`${enableEncryption ? ' bg-lemongreen' : ' bg-limegray'} w-[4.0625rem] h-[2.1875rem] rounded-full border relative flex items-center py-[3px]`}>
                <div className={`${enableEncryption ? 'translate-x-full' : 'translate-x-0 '} mx-[4px] absolute w-[1.8125rem] h-[1.8125rem] bg-white rounded-full transition-transform ease-in-out duration-300`}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

export default Page
