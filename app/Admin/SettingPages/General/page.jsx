'use client'

import React,{useState} from 'react'
import SubNavigation from '@/app/SubNavigation'
import { Dropdown } from '@/app//Components/DropDown';

import Successful from '@/app/Modals/Successfully/Successful'
import ModalContainerSuccessful from '@/app/Modals/Successfully/ModalContainerSuccessful'
const page = () => {
    const [isTimeZone , setIsTimeZone] = useState('')
    const [isDay , setIsDay] = useState('')
    const [primaryColor1, setPrimaryColor1] = useState('#ff0000'); // first color picker
    const [primaryColor2, setPrimaryColor2] = useState('#ff0000'); // second color picker
  const [edit, setEdit] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
    const [isClicked, setIsClicked] = useState({
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
    Sunday: false,
    });

    const handleDayClick = (day) => {
    setIsClicked((prev) => ({
        ...prev,
        [day]: !prev[day], // toggle only that day
    }));
    };
  const onSubmit =  async (data) => {
    try{
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


  return (
    <>

    <SubNavigation readPath= '/Admin/SettingPages/General'/>
    <div className='font-semibold mt-[3rem]'>
        <form onSubmit={onSubmit} action="">
            <div className='flex gap-[2.5rem]'>
                <div className='w-[23.5rem] space-y-[2.125rem]'>
                    {/* Tenant Name */}
                    <div className='flex flex-col gap-[1rem] relative'>
                        <label className='text-formColor'>Tenant Name *</label>
                        <input type="text" placeholder='Enter Tenant Name' className='inputMod' />
                    </div>
                    <div>
                        <Dropdown
                        label="Time Zone"
                        options={["GMT", "AMT", "EST"]}
                        selected= {isTimeZone}
                        onSelect={setIsTimeZone}
                        placeholder="Select Time Zone"
                        />
                    </div>
                    {/* Certification */}
                    <div className='flex flex-col gap-[1rem] relative'>
                        <label className='text-formColor'>Logo</label>
                        <label className='inputModfile cursor-pointer border-none'>
                            <img src='/image/Icon/File.png' alt='' />
                            <span className='text-limeLight'>Upload Image</span>
                            <input type='file' className='hidden' />
                        </label>
                    </div>
                    {/* Secondery Color */}
                    <div className='flex flex-col gap-[1rem] relative'>
                        <label className='text-formColor'>Secondary Color </label>
                        <div className='inputMod flex items-center gap-[0.875rem]'>
                            <input type="color" 
                                value={primaryColor2}
                                onChange={(e) => setPrimaryColor2(e.target.value)}/>
                            <span className='text-formColor'>{primaryColor2.toUpperCase()}</span>
                        </div>
                    </div>
                  {/* Save / Reset Buttons */}
                  <div className='mt-[5rem] w-full'>
                    {edit ? (
                      <div className='w-full h-[3.4375rem] flex gap-[2.5625rem]'>
                        <button
                          type="button"
                          onClick={() => {
                            reset(permSettings)
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
                          Save All
                        </button>
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
                  </div>
                </div>
                <div className='w-[23.5rem] space-y-[2.125rem]'>
                    {/* Domain  */}
                    <div className='flex flex-col gap-[1rem] w-[23.5rem] relative'>
                        <label className='text-formColor'>Domain *</label>
                        <input type="text" placeholder='domain.com' className='inputMod' />
                    </div>
                    <div className='relative '>
                        <div>
                            <Dropdown
                            label="Work per week"
                            options={["1 Day", "2 Day", "3 Day" , "4 Day" , "5 Day" , "6 Day"]}
                            selected= {isDay}
                            onSelect={setIsDay}
                            placeholder="Select Day"
                            />
                        </div>
                        <div className='pl-[2.0625rem] pt-[1.5625rem] pb-[1.5625rem] absolute right-[-25.8125rem] top-[2.1875rem] w-[23.5rem] h-[25.6rem] bg-[rgba(29,32,21,1)] border rounded-[10px] border-limeLight'>
                            <ul className='space-y-[2.0625rem]'>
                                <li onClick={()=>handleDayClick('Monday')} className={`flex items-center gap-[1.375rem] cursor-pointer`}>
                                    <div   className={`${isClicked.Monday ? 'bg-lemongreen' : 'bg-[rgba(93,97,80,1)]'} w-[21px] h-[21px] rounded-[5px] `}></div>
                                    <span className='text-formColor'>Monday</span>
                                </li>
                                <li onClick={()=>handleDayClick('Tuesday')} className='flex items-center gap-[1.375rem]'>
                                    <div   className={`${isClicked.Tuesday ? 'bg-lemongreen' : 'bg-[rgba(93,97,80,1)]'} w-[21px] h-[21px] rounded-[5px] `}></div>
                                    <span className='text-formColor'>Tuesday </span>
                                </li>
                                <li onClick={()=>handleDayClick('Wednesday')} className='flex items-center gap-[1.375rem]'>
                                    <div   className={`${isClicked.Wednesday ? 'bg-lemongreen' : 'bg-[rgba(93,97,80,1)]'} w-[21px] h-[21px] rounded-[5px] `}></div>
                                    <span className='text-formColor'>Wednesday</span>
                                </li>
                                <li onClick={()=>handleDayClick('Thursday')} className='flex items-center gap-[1.375rem]'>
                                    <div   className={`${isClicked.Thursday ? 'bg-lemongreen' : 'bg-[rgba(93,97,80,1)]'} w-[21px] h-[21px] rounded-[5px] `}></div>
                                    <span className='text-formColor'>Thursday </span>
                                </li>
                                <li onClick={()=>handleDayClick('Friday')} className='flex items-center gap-[1.375rem]'>
                                    <div   className={`${isClicked.Friday ? 'bg-lemongreen' : 'bg-[rgba(93,97,80,1)]'} w-[21px] h-[21px] rounded-[5px] `}></div>
                                    <span className='text-formColor'>Friday</span>
                                </li>
                                <li onClick={()=>handleDayClick('Saturday')} className='flex items-center gap-[1.375rem]'>
                                    <div   className={`${isClicked.Saturday ? 'bg-lemongreen' : 'bg-[rgba(93,97,80,1)]'} w-[21px] h-[21px] rounded-[5px] `}></div>
                                    <span className='text-formColor'>Saturday</span>
                                </li>
                                <li onClick={()=>handleDayClick('Sunday')} className='flex items-center gap-[1.375rem]'>
                                    <div   className={`${isClicked.Sunday ? 'bg-lemongreen' : 'bg-[rgba(93,97,80,1)]'} w-[21px] h-[21px] rounded-[5px] `}></div>
                                    <span className='text-formColor'>Sunday</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/* Primary Color */}
                    <div className='flex flex-col gap-[1rem] relative'>
                        <label className='text-formColor'>Primary Color </label>
                        <div className='inputMod flex items-center gap-[0.875rem]'>
                            <input type="color" 
                                value={primaryColor1}
                                onChange={(e) => setPrimaryColor1(e.target.value)}/>
                            <span className='text-formColor'>{primaryColor1.toUpperCase()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
    </>
  )
}

export default page