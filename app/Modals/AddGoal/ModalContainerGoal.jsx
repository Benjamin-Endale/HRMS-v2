import React from 'react'
import reactDom from 'react-dom'

export default function ModalContainerJob({open,children}) {
    if(!open){return null}
  return reactDom.createPortal(
    <>
        <div className="absolute inset-0 bg-[rgba(44,45,39,0.12)] backdrop-blur-[3px] " />
        <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[2rem] w-[38.5625rem] scrollBarDash overflow-y-auto  h-[43.9375rem] bg-[#0D0F11]'>
            <div>{children}</div>
        </div>
    </>,
    document.getElementById('addModal')
  )
}
