"use client"
import React, {useState} from 'react'
import ModalContainerSignOut from '../Modals/SignOut/ModalContainerSignOut'
import Signout from '../Modals/SignOut/Signout'
export const SignOutButton = ({session}) => {
    const [isOpen, setisOpen] = useState(false)
    return(
        <>
        <div  onClick={()=>setisOpen(true)} className='flex items-center cursor-pointer gap-[20px] justify-end-safe'>     
            <div className=''>
                <span  className='text-accountColor font-semibold'>Welcome, {session?.user?.name}</span>
            </div>
            <div className='border rounded-full flex p-[15px] items-center justify-center bg-black'>
              <img src="/svg/HeaderSvg/ProfileIcon.svg" alt="ProfileIcon" />
            </div>
        </div>
            <ModalContainerSignOut  open={isOpen}>
                <Signout onClose={() => setisOpen(false)} />
            </ModalContainerSignOut>
        </>
    )
}  
