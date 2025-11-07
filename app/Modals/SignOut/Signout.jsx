import React from 'react';
import { logout } from '@/app/lib/actions/auth';

export default function Signout({ onClose }) {


  return (
    <div className=' flex-col center-center gap-4 px-[3rem] py-[2.875rem] font-semibold'>
      <h4 className='text-formColor'>Are You sure?</h4>
      <div className='flex gap-5'>
        <div  className='rounded-[10px] border border-limegray center-center bg-black w-[9.375rem] text-formColor h-[3.4375rem]'>
            <button onClick={onClose}  className='w-full h-full  cursor-pointer'>Cancel</button>
        </div>
        <div  className='rounded-[10px] center-center bg-lemongreen w-[9.375rem] text-black h-[3.4375rem]'>
            <button onClick={()=>logout()}  className='w-full h-full cursor-pointer'>Sign Out</button>
        </div>

      </div>
    </div>
  );
}
