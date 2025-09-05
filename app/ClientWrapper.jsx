'use client';

import { usePathname } from 'next/navigation';
import MainBody from './Components/mainBody';
import Header from './Components/Header';



export default function ClientWrapper({ children }) {
  const pathname = usePathname();
  const readPath = pathname === '/' ? 'Dashboard' : pathname.replace('/', '');
  console.log(readPath)
  return (
    <div className='flex gap-[4.4375rem]'>
      <MainBody  readPath={readPath} />
      <div className='flex flex-col flex-1 gap-[4.25rem]'>
        <div className='flex pt-[3.5rem]'>
          <Header readPath={readPath} />
        </div>
        <div className='w-[calc(100%-2.75rem)]'>
          {children}
        </div>
      </div>
    </div>
  );
}