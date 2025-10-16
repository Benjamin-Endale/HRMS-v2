import React from 'react';
import { logout } from '@/app/lib/actions/auth';
import Router, { useRouter } from 'next/router';
export default function  Successful({ onClose , Header , Parag  }) {
  const router = useRouter()

  return (
    <div className=' flex-col center-center gap-[4rem] px-[3rem] py-[2.875rem] font-semibold'>
      <div className='center-center flex-col gap-[10px]'>
        <h4 className='textFormColor'>{Header}</h4>
        <p className='textLimegray'>{Parag}</p>
      </div>
      <div className='flex gap-5 w-full'>
        <div  className='rounded-[10px] border border-limegray center-center bg-lemongreen w-full  text-black h-[3.4375rem]'>
            <button onClick={onClose}   className='w-full h-full  cursor-pointer'>Ok</button>
        </div>
      </div>
    </div>
  );
}
