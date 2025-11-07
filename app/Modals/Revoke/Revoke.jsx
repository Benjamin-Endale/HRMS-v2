import React from 'react';
import { logout } from '@/app/lib/actions/auth';
export default function  Revoke({Header , Parag ,  onNavigate , confirmation,onConfirm ,color,fontColor}) {

  return (
    <div className=' flex-col center-center gap-[4rem] px-[3rem] py-[2.875rem] font-semibold'>
      <div className='center-center flex-col gap-[10px]'>
        <h4 className='textFormColor'>{Header}</h4>
        <p className='textLimegray'>{Parag}</p>
      </div>
      <div className='flex gap-5 w-full'>
        <div  className='rounded-[10px] border border-formColor center-center bg-black w-[14.375rem] text-formColor h-[3.4375rem]'>
            <button onClick={onNavigate}   className='w-full h-full  cursor-pointer'>Cancel</button>
        </div>
        <div  className={`rounded-[10px]  center-center ${color} w-[14.375rem]  text-formColor h-[3.4375rem]`}>
            <button onClick={onConfirm}   className={`w-full h-full  cursor-pointer ${fontColor}`}>{confirmation}</button>
        </div>
      </div>
    </div>
  );
}
