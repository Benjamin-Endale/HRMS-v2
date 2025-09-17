import React, { useState } from 'react';
import { Dropdown } from '@/app/Components/DropDown';
import NumberInput from '@/app/Components/NumberInput';

export default function ApplyLeave({ onClose }) {
  const [selectedLeave, setSelectedLeave] = useState('');


  return (
    <div className='px-[3rem] py-[2.875rem] space-y-[3.125rem] font-semibold'>
      {/* Header */}
      <div className='flex justify-between'>
        <div>
          <h1 className='textFormColor'>Leave Request</h1>
          <h4 className='text-limegray'>Add leave request for admin</h4>
        </div>
        <button onClick={onClose} className='rounded-full center-center cursor-pointer'>
            <img src="/image/Icon/Action/CloseCircle.png" alt="" />
        </button>
      </div>

      {/* Form */}
      <form className='flex flex-col gap-[2.75rem]'>
        {/* Dropdowns */}
        <div className='flex  w-full gap-[1.125rem]'>
            <div className='w-[15.5625rem] space-y-[2.125rem]'>
                {/* Starting Date  */}
                <div className='flex flex-col gap-[1rem]'>
                    <label htmlFor="firstName" className='text-formColor'>Starting Date</label>
                    <input type="date"   className='inputMod pr-[1.5625rem]'/>
                </div>
                {/* Duration */}
                <div className='flex flex-col gap-[1rem]'>
                    <label htmlFor="firstName" className='text-formColor'>Duration</label>
                    <input type="number" placeholder='Duration'  className='inputMod pr-[1.5625rem]'/>
                </div>
            </div>
            <div className='w-[15.5625rem] space-y-[2.125rem]'>
                {/* End DAte  */}
                <div className='flex flex-col gap-[1rem]'>
                    <label htmlFor="firstName" className='text-formColor'>Ending Date</label>
                    <input type="date"   className='inputMod pr-[1.5625rem]'/>
                </div>
                <div>
                    <Dropdown
                    label="Leave Type"
                    options={['Engineering', 'Marketing', 'Finance']}
                    selected={selectedLeave}
                    onSelect={setSelectedLeave}
                    placeholder="Annual"
                    />
                </div>
            </div>

        </div>
        <div className="flex flex-col gap-[1rem]">
          <label className="text-formColor">Reason</label>
          <textarea
            placeholder="Provide specific reason"
            className="text-formColor bg-inputBack rounded-[10px] placeholder-input pt-[0.59375rem] pl-[1.1875rem] resize-none h-[4.75rem]"
          />
        </div>
        {/* Submit Button */}
        <div className='w-full h-[3.4375rem] mt-[0.5rem]'>
          <button
            type="submit"
            className='w-full h-full bg-lemongreen rounded-[10px] cursor-pointer'
          >
            Submit 
          </button>
        </div>
      </form>
    </div>
  );
}
