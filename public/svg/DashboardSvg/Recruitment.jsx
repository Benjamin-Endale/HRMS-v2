import React from 'react'

const Recruitment = ({readPath}) => {
  return (
    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg" stroke={readPath === 'Recruitment' || readPath === 'jobposting' || readPath === 'candidates' || readPath === 'interviews'? 'white' : '#5D6150'} strokeWidth="1.5">
        <path d="M10.5 8.75C12.433 8.75 14 7.183 14 5.25C14 3.317 12.433 1.75 10.5 1.75C8.567 1.75 7 3.317 7 5.25C7 7.183 8.567 8.75 10.5 8.75Z" />
        <path d="M14.875 19.25C16.808 19.25 18.375 17.683 18.375 15.75C18.375 13.817 16.808 12.25 14.875 12.25C12.942 12.25 11.375 13.817 11.375 15.75C11.375 17.683 12.942 19.25 14.875 19.25Z" />
        <path d="M13.7082 15.75L14.4375 16.625L16.0416 14.9722"  strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12.25 18.2301C11.6955 18.3243 11.1081 18.375 10.5 18.375C7.11726 18.375 4.375 16.808 4.375 14.875C4.375 12.942 7.11726 11.375 10.5 11.375C11.9993 11.375 13.3728 11.6828 14.4375 12.1939" />
    </svg>  
    )
}

export default Recruitment