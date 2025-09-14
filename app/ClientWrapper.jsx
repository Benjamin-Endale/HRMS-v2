'use client';

import { usePathname } from 'next/navigation';
import MainBody from './Components/mainBody';
import Header from './Components/Header';
import SuperAdminBody from './Components/SuperAdminBody';
import HeaderPortal from './Components/HeaderPortal';
import EmployeePortal from './Components/EmployeePortal';



export default function ClientWrapper({ children }) {
  const pathname = usePathname();
  const readPath = pathname === '/' ? 'EmployeePortal/Dashboard' : pathname.replace('/', '');
  console.log(readPath)
  return (
    <div className='flex gap-[4.4375rem]'>
      <EmployeePortal  readPath={readPath} />
      <div className='flex flex-col flex-1 gap-[4.25rem]'>
        <div className='flex pt-[3.5rem]'>
          <HeaderPortal readPath={readPath} />
        </div>
        <div className='w-[calc(100%-2.75rem)]'>
          {children}
        </div>
      </div>
    </div>
  );
}