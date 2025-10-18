import React, {useState} from 'react'
import { Dropdown } from '@/app/Components/DropDown'

const AddAuth = ({onClose}) => {
      const [selectedRole, setSelectedRole] = useState()
  
  return (
    <div className='px-[3rem] py-[2.875rem] space-y-[3.125rem] font-semibold w-full'>
      {/* Header */}
      <div className='flex justify-between'>
        <div>
          <h1 className='textFormColor'>Authorized User </h1>
          <h4 className='text-limegray'>Create a new super administrator account</h4>
        </div>
        <button onClick={onClose} className='rounded-full center-center cursor-pointer'>
          <img src="/image/Icon/Action/CloseCircle.png" alt="close" />
        </button>
      </div>
      <div className='flex flex-col gap-[2.125rem]'>
        <div>
          <Dropdown
            label="Role"
            options={['HR', 'Employee', 'SystemAdmin']}
            selected={selectedRole}
            onSelect={setSelectedRole}
            placeholder="Select Role"
          />
        </div>
        <div className='flex flex-col  gap-[35px]'>
          <div className='flex flex-col gap-[1rem]'>
            <label className='text-formColor'>Password</label>
            <input
              type='password'
              placeholder='*************'
              className='inputMod'
            />
          </div>

          <div className='flex flex-col gap-[1rem]'>
            <label className='text-formColor'>Confirm Password</label>
            <input
              type='password'
              placeholder='*************'
              className='inputMod'
            />
          </div>
        </div>
        {/* Submit Button */}
        <div className='w-full h-[3.4375rem] mt-[0.5rem]'>
          <button
            type='submit'
            className='w-full h-full bg-lemongreen rounded-[10px] cursor-pointer'
          >
            Authorize
          </button>
        </div>
      </div>

    </div>
  )
}

export default AddAuth