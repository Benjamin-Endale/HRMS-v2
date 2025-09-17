"use client"
import {  logout } from '../lib/actions/auth'
export const SignOutButton = ({session}) => {
    return(
        <div onClick={()=>logout()} className='flex items-center justify-between'>     
            <div className='w-[138px]'>
                <span  className='text-accountColor font-medium'>Welcome,{session?.user?.name}</span>
            </div>
            <div className='border rounded-full flex p-[15px] items-center justify-center bg-black'>
              <img src="/svg/HeaderSvg/ProfileIcon.svg" alt="ProfileIcon" />
            </div>
        </div>
    )
}  