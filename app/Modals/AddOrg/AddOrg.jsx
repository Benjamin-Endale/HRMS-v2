import React , {useState} from 'react'
import { Dropdown } from '@/app/Components/DropDown'

const AddOrg = ({ onClose }) => {
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
              {/* Organization Name */}
                <div className='flex flex-col w-full gap-[1rem]'>
                    <label htmlFor="" className='textFormColor1'>Organization Name</label>
                    <input type="text" placeholder='ex. Marketing' className='inputMod pr-[1.5625rem] ' />
                </div>
                {/* Organization Code */}
                <div className='flex flex-col w-full gap-[1rem]'>
                    <label htmlFor="" className='textFormColor1'>Organization Code</label>
                    <input type="text" placeholder='ex. ORG200' className='inputMod pr-[1.5625rem] ' />
                </div>
                {/* Domain */}
                <div className='flex flex-col w-full gap-[1rem]'>
                    <label htmlFor="" className='textFormColor1'>Domain</label>
                    <input type="text" placeholder='ex. domain.com' className='inputMod pr-[1.5625rem] ' />
                </div>
                <div>
                    <Dropdown
                        label="Industry"
                        options={['Engineering', 'Marketing' , 'Finance']}
                        selected={selectedIndustry}
                        onSelect={setSelectedIndustry}
                        placeholder="Select Industry"
                        className=''
                    />
                </div>
                {/* Location */}
                <div className='flex flex-col w-full gap-[1rem]'>
                    <label htmlFor="" className='textFormColor1'>Location</label>
                    <input type="text" placeholder='enter location' className='inputMod pr-[1.5625rem] ' />
                </div>

                <div className='flex flex-col gap-[1rem]'>
                    <label htmlFor="Resume" className='text-formColor'>Upload Company Logo </label>
                    <label htmlFor="Resume" className='inputModfile cursor-pointer'>
                        <img src="/image/Icon/File.png" alt="" />
                        <span className='text-limeLight'>Upload Cv</span>
                    </label>
                    <input type="file"  id='Resume' className='hidden w-full h-full'/>
                </div>
            </div>
          </div>
          <div className='w-full h-[3.4375rem] mt-[0.5rem]'>
              <button type="submit" onClick={()=>navigate('/')} className='w-full h-full bg-lemongreen rounded-[10px] cursor-pointer'>Create Organization</button>
          </div>
        </form>
    </div>
  )
}

export default AddOrg