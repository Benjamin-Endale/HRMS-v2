'use client'

import React, { useState, useEffect } from 'react'
import { Dropdown } from '@/app/Components/DropDown'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller } from 'react-hook-form'
import { toPascal } from '@/app/lib/utils/toPascal';
import { hrmsAPI } from '@/app/lib/api/client'

import Successful from '@/app/Modals/Successfully/Successful'
import ModalContainerSuccessful from '@/app/Modals/Successfully/ModalContainerSuccessful'

const orgSettingSchema = z.object({
  sSOProvider: z.string().optional(),
  sessionTimerOut: z.union([z.string(), z.number()]).refine(val => val !== "", { message: "Session Timer is required" }),
  backupFrequency: z.string().nonempty("Backup Frequency is required"),
  dataRetentionYears: z.union([z.string(), z.number()]).refine(val => val !== "", { message: "Data Retention is required" }),
  defaultExportFormat: z.string().nonempty("Default Export Format is required"),
  enableSSO: z.boolean(),
  requireTwoFactorAuth: z.boolean(),
  dataEncryptionAtRest: z.boolean(),
  pushNotifications: z.boolean(),
  emailNotifications: z.boolean(),
  criticalAlertsOnly: z.boolean(),
}).superRefine((data, ctx) => {
  if (data.enableSSO && (!data.sSOProvider || data.sSOProvider.trim() === "")) {
    ctx.addIssue({
      path: ["sSOProvider"],
      message: "SSO Provider is required when SSO is enabled",
      code: z.ZodIssueCode.custom,
    })
  }
})

// Default values for when there are no permanent settings
const defaultSettings = {
  sSOProvider: '',
  sessionTimerOut: 60,
  backupFrequency: 'Daily',
  dataRetentionYears: 5,
  defaultExportFormat: 'CSV',
  enableSSO: false,
  requireTwoFactorAuth: true,
  dataEncryptionAtRest: false,
  emailNotifications: false,
  pushNotifications: false,
  criticalAlertsOnly: false,
}

const OrgSettings = ({ permSettings }) => {
  const router = useRouter()
  const [edit, setEdit] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  // Safe settings - use provided permSettings or fall back to defaults
  const safeSettings = permSettings && Object.keys(permSettings).length > 0 ? permSettings : defaultSettings

  const { register, handleSubmit, control, setValue, watch, reset, formState: { errors } } = useForm({
    resolver: zodResolver(orgSettingSchema),
    defaultValues: safeSettings
  })

  // Reset form when safeSettings changes
  useEffect(() => {
    reset(safeSettings)
  }, [safeSettings, reset])

  console.log("Current form errors:", errors)

  const onSubmit = async (data) => {
    try {
      if (!data.enableSSO) {
        data.sSOProvider = null
      }
      console.log("✅ Submitted Data:", data)
      const pascalSettings = toPascal(data);
      console.log("✅ Submitted Data Pascal:", pascalSettings)

      const settings = await hrmsAPI.createPermanentSettings(pascalSettings);
      reset(data)
      setEdit(false);
      setIsOpen(true);
    } catch (err) {
      console.error('Submission Error:', err);
      alert('Error: ' + (err.message || JSON.stringify(err)));
    }
  }

  // Watch toggles
  const enableSSO = watch("enableSSO")
  const requireTwoFactorAuth = watch("requireTwoFactorAuth")
  const dataEncryptionAtRest = watch("dataEncryptionAtRest")
  const emailNotifications = watch("emailNotifications")
  const pushNotifications = watch("pushNotifications")
  const criticalAlertsOnly = watch("criticalAlertsOnly")

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
                <div className={`${!edit ? 'opacity-50 pointer-events-none select-none' : ''}`}>
                  <h1 className="text-formColor">Enable Single Sign-On (SSO)</h1>
                  <h4 className="text-limegray">Allow users to login with SSO providers</h4>
                </div>
                <div onClick={() => edit && setValue("enableSSO", !enableSSO)} className={`${enableSSO ? ' bg-lemongreen' : ' bg-limegray'} ${!edit ? "bg-lemongreen opacity-50 pointer-events-none select-none": ''} w-[4.0625rem] h-[2.1875rem] rounded-full border relative flex items-center py-[3px] cursor-pointer`}>
                  <div className={`${enableSSO ? 'translate-x-full' : 'translate-x-0 '} mx-[4px] absolute w-[1.8125rem] h-[1.8125rem] bg-white rounded-full transition-transform ease-in-out duration-300`}></div>
                </div>
              </div>

              {/* SSO PROVIDER */}
              <div className={`relative transition-all ${!enableSSO || !edit ? 'opacity-50 pointer-events-none select-none' : ''}`}>
                <Controller
                  name="sSOProvider"
                  control={control}
                  render={({ field }) => (
                    <Dropdown
                      label="SSO Provider"
                      options={["Google Workspace", "Okta", "OneLogin", "Microsoft", "Entra ID", "Auth0", "JumpCloud"]}
                      selected={field.value}
                      onSelect={field.onChange}
                      placeholder="Google Workshop"
                    />
                  )}
                />
                {errors.sSOProvider && <span className='text-Error text-[1rem] absolute bottom-[-2rem]'>{errors.sSOProvider.message}</span>}
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
                        <div className={`${!edit ? 'opacity-50 pointer-events-none select-none' : ''}`}>
                          <h1 className="text-formColor">Email Notifications</h1>
                          <h4 className="text-limegray">Send system alerts and updates via email.</h4>
                        </div>
                        <div onClick={() => edit && setValue("emailNotifications", !emailNotifications)} className={`${emailNotifications ? ' bg-lemongreen' : ' bg-limegray'} ${!edit ? "bg-lemongreen opacity-50 pointer-events-none select-none": ''} w-[4.0625rem] h-[2.1875rem] rounded-full border relative flex items-center py-[3px] cursor-pointer`}>
                          <div className={`${emailNotifications ? 'translate-x-full' : 'translate-x-0 '} mx-[4px] absolute w-[1.8125rem] h-[1.8125rem] bg-white rounded-full transition-transform ease-in-out duration-300`}></div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className={`${!edit ? 'opacity-50 pointer-events-none select-none' : ''}`}>
                          <h1 className="text-formColor">Push Notifications</h1>
                          <h4 className="text-limegray">Enable in-app push notifications for real-time updates.</h4>
                        </div>
                        <div onClick={() => edit && setValue("pushNotifications", !pushNotifications)} className={`${pushNotifications ? ' bg-lemongreen' : ' bg-limegray'} ${!edit ? "bg-lemongreen opacity-50 pointer-events-none select-none": ''} w-[4.0625rem] h-[2.1875rem] rounded-full border relative flex items-center py-[3px] cursor-pointer`}>
                          <div className={`${pushNotifications ? 'translate-x-full' : 'translate-x-0 '} mx-[4px] absolute w-[1.8125rem] h-[1.8125rem] bg-white rounded-full transition-transform ease-in-out duration-300`}></div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className={`${!edit ? 'opacity-50 pointer-events-none select-none' : ''}`}>
                          <h1 className="text-formColor">Critical Alerts Only</h1>
                          <h4 className="text-limegray">Only send notifications for high-priority system events.</h4>
                        </div>
                        <div onClick={() => edit && setValue("criticalAlertsOnly", !criticalAlertsOnly)} className={`${criticalAlertsOnly ? ' bg-lemongreen' : ' bg-limegray'} ${!edit ? "bg-lemongreen opacity-50 pointer-events-none select-none": ''} w-[4.0625rem] h-[2.1875rem] rounded-full border relative flex items-center py-[3px] cursor-pointer`}>
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
                            reset(safeSettings)
                            setEdit(true)
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
              <div className={`${!edit ? 'opacity-50 pointer-events-none select-none' : ''}`}>
                <h1 className="text-formColor flex items-center gap-2">
                  Require Two-Factor Authentication
                  <span className="text-lemongreen text-sm font-medium bg-limegray/10 px-2 py-1 rounded-md">Default</span>
                </h1>
                <h4 className='textLimegray'>Require 2FA for all admin users.</h4>
              </div>
              <div  className={`${!edit ? "bg-lemongreen opacity-50 pointer-events-none select-none": ''}bg-lemongreen w-[4.0625rem] h-[2.1875rem] rounded-full border relative flex items-center py-[3px]`}>
                <div className='translate-x-full mx-[4px] absolute w-[1.8125rem] h-[1.8125rem] bg-white rounded-full transition-transform ease-in-out duration-300'></div>
              </div>
            </div>

            <div className='flex gap-[2.1875rem]'>
              <div className={`relative  w-full transition-all ${!edit ? 'opacity-50 pointer-events-none select-none ' : ''}`}>
                <Controller
                  name="sessionTimerOut"
                  control={control}
                  render={({ field }) => (
                    <Dropdown
                      label="Session Timeout (minutes)"
                      options={["60", "120", "20", "30"]}
                      selected={field.value}
                      onSelect={field.onChange}
                      placeholder="60"
                      disabled={!edit}
                    />
                  )}
                />
                {errors.sessionTimerOut && <span className='text-Error text-[1rem] absolute bottom-[-2rem]'>{errors.sessionTimerOut.message}</span>}
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
                <div className={`relative  w-[20.1875rem] transition-all ${!edit ? 'opacity-50 pointer-events-none select-none ' : ''}`}>
                  <Controller
                    name="backupFrequency"
                    control={control}
                    render={({ field }) => (
                      <Dropdown
                        label="Backup Frequency"
                        options={["Daily", "Weekly", "Month", "Year"]}
                        selected={field.value}
                        onSelect={field.onChange}
                        placeholder="Daily"
                        disabled={!edit}
                      />
                    )}
                  />
                  {errors.backupFrequency && <span className='text-Error text-[1rem] absolute bottom-[-2rem]'>{errors.backupFrequency.message}</span>}
                </div>

                <div className={`w-[20.1875rem] flex flex-col gap-[1rem] ${!edit ? 'opacity-50 pointer-events-none select-none' : ''}`}>
                  <label className='textFormColor1'>Data Retention (Years)</label>
                  <input type="number" placeholder='5' className='inputMod pr-[1.5625rem]' {...register("dataRetentionYears")} />
                  {errors.dataRetentionYears && <span className='text-Error text-[1rem]'>{errors.dataRetentionYears.message}</span>}
                </div>
              </div>

              <div className={`relative  w-full transition-all ${!edit ? 'opacity-50 pointer-events-none select-none ' : ''}`}>
                <Controller
                  name="defaultExportFormat"
                  control={control}
                  render={({ field }) => (
                    <Dropdown
                      label="Default Export Format"
                      options={["CSV", "CSV1", "CSV2", "CSV3"]}
                      selected={field.value}
                      onSelect={field.onChange}
                      placeholder="CSV"
                      disabled={!edit}
                    />
                  )}
                />
                {errors.defaultExportFormat && <span className='text-Error text-[1rem] absolute bottom-[-2rem]'>{errors.defaultExportFormat.message}</span>}
              </div>
            </div>

            <div className='flex between-center'>
              <div className={`w-[20.1875rem] flex flex-col gap-[1rem] ${!edit ? 'opacity-50 pointer-events-none select-none' : ''}`}>
                <h4 className='textFormColor1'>Data Encryption at Rest</h4>
                <h4 className='textLimegray'>
                  Ensure all stored data is encrypted for maximum security.
                </h4>
              </div>
              <div onClick={() => edit && setValue("dataEncryptionAtRest", !dataEncryptionAtRest)} className={`${dataEncryptionAtRest ? ' bg-lemongreen' : ' bg-limegray'} ${!edit ? "bg-lemongreen opacity-50 pointer-events-none select-none": ''} w-[4.0625rem] h-[2.1875rem] rounded-full border relative flex items-center py-[3px] cursor-pointer`}>
                <div className={`${dataEncryptionAtRest ? 'translate-x-full' : 'translate-x-0 '} mx-[4px] absolute w-[1.8125rem] h-[1.8125rem] bg-white rounded-full transition-transform ease-in-out duration-300`}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {isOpen && (
        <ModalContainerSuccessful open={isOpen}>
          <Successful
            Header="Successfully Created"
            Parag="Settings Successfully Added"
            onNavigate={() => {
              setIsOpen(false);
            }}
            confirmation="Okay"
          />
        </ModalContainerSuccessful>
      )}
    </form>
  )
}

export default OrgSettings