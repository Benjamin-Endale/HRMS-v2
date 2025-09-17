'use client';

import { usePathname } from 'next/navigation';
import MainBody from './Components/mainBody';
import Header from './Components/Header';
import SuperAdminBody from './Components/SuperAdminBody';
import HeaderPortal from './Components/HeaderPortal';
import EmployeePortal from './Components/EmployeePortal';


export default function ClientWrapper({ children , session  }) {
const pathname = usePathname() || '/'; // fallback for SSR
const readPath = pathname === '/' ? 'SuperAdmin/AllOrganization' : pathname.replace('/', '');

  return (
    <div className='flex gap-[4.4375rem]'>
      <SuperAdminBody  readPath={readPath} session={session}  />
      <div className='flex flex-col flex-1 gap-[4.25rem]'>
        <div className='flex pt-[3.5rem]'>
          <Header readPath={readPath} session={session} /> 
        </div>
        <div className='w-[calc(100%-2.75rem)]'>
          {children}
        </div>
      </div>
    </div>
  );
}

