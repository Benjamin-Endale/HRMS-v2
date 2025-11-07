import React from 'react'

const UserAuth = ({readPath}) => {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.3327 11.9168C18.3327 16.5001 15.1243 18.7918 11.311 20.1209C11.1113 20.1886 10.8944 20.1853 10.6968 20.1118C6.87435 18.7918 3.66602 16.5001 3.66602 11.9168V5.50009C3.66602 5.25697 3.76259 5.02381 3.9345 4.85191C4.10641 4.68 4.33957 4.58342 4.58268 4.58342C6.41602 4.58342 8.70768 3.48342 10.3027 2.09009C10.4969 1.92417 10.7439 1.83301 10.9993 1.83301C11.2548 1.83301 11.5018 1.92417 11.696 2.09009C13.3002 3.49259 15.5827 4.58342 17.416 4.58342C17.6591 4.58342 17.8923 4.68 18.0642 4.85191C18.2361 5.02381 18.3327 5.25697 18.3327 5.50009V11.9168Z" stroke={readPath === 'Admin/UserAuthentication' || readPath === 'Admin/UserAuthentication/Authorized' || readPath === 'Admin/UserAuthentication/All' ||readPath === 'Admin/OrganizationPages/UserAuthentication' || readPath === 'Admin/OrganizationPages/UserAuthentication/Authorized' || readPath === 'Admin/OrganizationPages/UserAuthentication/All'    ? 'white' : '#5D6150'} strokeWidth="1.375" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>

  )
}

export default UserAuth