import React , {useState} from 'react'
import { Dropdown } from '@/app/Components/DropDown'

const AddDep = ({ onClose }) => {
    const [selectedIndustry, setSelectedIndustry] = useState('')
  return (
    <div className='px-[3rem] py-[2.875rem]  space-y-[3.125rem] font-semibold w-full  ' >
        <div className='flex justify-between'>
            <div className=''>
                <h1 className='textFormColor'>Create New Organziation</h1>
                <h4 className='text-limegray'>Create a new organization and add its basic Info.</h4>
            </div>
            <button onClick={onClose} className='rounded-full center-center cursor-pointer'>
                <img src="/image/Icon/Action/CloseCircle.png" alt="" />
            </button>
        </div>
        <form action="" className='flex flex-col gap-[2.375rem]'>
          <div className=' w-full flex gap-[1.125rem]'>
            <div className='flex flex-col gap-[2.375rem] w-full '>
              {/* Department Name */}
                <div className='flex flex-col w-full gap-[1rem]'>
                    <label htmlFor="" className='textFormColor1'>Department Name</label>
                    <input type="text" placeholder='ex. Marketing' className='inputMod pr-[1.5625rem] ' />
                </div>
                {/* Department Head */}
                <div className='flex flex-col w-full gap-[1rem]'>
                    <label htmlFor="" className='textFormColor1'>Department Head</label>
                    <input type="text" placeholder='ex. ORG200' className='inputMod pr-[1.5625rem] ' />
                </div>
                {/* Initial Employee Count  */}
                <div className='flex flex-col w-full gap-[1rem]'>
                    <label htmlFor="" className='textFormColor1'>Initial Employee Count </label>
                    <input type="text" placeholder='ex. domain.com' className='inputMod pr-[1.5625rem] ' />
                </div>
                {/* Department Description */}
              <div className='flex flex-col gap-[1rem]'>
                <label htmlFor="" className='text-formColor'>Department Description </label>
                <textarea name="" id=""  placeholder='Enter department description ..'  className='text-formColor bg-inputBack rounded-[10px] placeholder-input pt-[0.59375rem] pl-[1.1875rem] resize-none  h-[5.5rem]'></textarea>
              </div>
            </div>
          </div>
          <div className='w-full h-[3.4375rem] mt-[0.5rem]'>
              <button type="submit" onClick={()=>navigate('/')} className='w-full h-full bg-lemongreen rounded-[10px] cursor-pointer'>Create Department</button>
          </div>
        </form>
    </div>
  )
}

export default AddDep