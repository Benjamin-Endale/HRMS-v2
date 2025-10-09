import React from 'react'

const Organization = ({readPath}) => {
  return (
     <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg" stroke={readPath === 'Admin/Organization' || readPath === 'SuperAdmin/CreateOrganization/CreateTenant' ? 'white' : '#5D6150'} strokeWidth="1.3125">
        <path d="M19.25 19.25H1.75"  strokeLinecap="round"/>
        <path d="M14.875 19.25V5.25C14.875 3.60008 14.875 2.77512 14.3624 2.26257C13.8498 1.75 13.0249 1.75 11.375 1.75H9.625C7.97508 1.75 7.15012 1.75 6.63757 2.26257C6.125 2.77512 6.125 3.60008 6.125 5.25V19.25" />
        <path d="M18.375 19.25V10.0625C18.375 8.83356 18.375 8.21915 18.08 7.77775C17.9524 7.58667 17.7883 7.42261 17.5972 7.29493C17.1559 7 16.5414 7 15.3125 7" />
        <path d="M2.625 19.25V10.0625C2.625 8.83356 2.625 8.21915 2.91993 7.77775C3.04761 7.58667 3.21167 7.42261 3.40275 7.29493C3.84415 7 4.4586 7 5.6875 7" />
        <path d="M10.5 19.25V16.625"  strokeLinecap="round"/>
        <path d="M8.75 4.375H12.25"  strokeLinecap="round"/>
        <path d="M8.75 7H12.25"  strokeLinecap="round"/>
        <path d="M8.75 9.625H12.25"  strokeLinecap="round"/>
        <path d="M8.75 12.25H12.25"  strokeLinecap="round"/>
</svg>
  )
}

export default Organization