'use client';

import { usePathname, useRouter } from 'next/navigation';
import { ROLE_LAYOUTS } from './config/roles';
import { useEffect } from 'react';
import { hrmsAPI } from './lib/api/client';
export default function ClientWrapper({ children, session }) {
    const router = useRouter();
    const pathname = usePathname() || '/';
    
    // Safely get role with fallbacks
    const role = session?.user?.role;
    const requiresOtp = session?.requiresOtp;
    const otpVerified = session?.otpVerified;

    const defaultPaths = {
      SuperAdmin: 'SuperAdmin/AllOrganization',
      HR: 'Admin/Dashboard',
      Employee: 'EmployeePortal/Dashboard',
      SystemAdmin: 'Admin/Dashboard'
    };

    // Redirect to OTP page if OTP is required but not verified
    useEffect(() => {
        if (requiresOtp && !otpVerified && !pathname.startsWith('/Login/VerifyOtp')) {
            router.push(`/Login/VerifyOtp?username=${session?.user?.id || session?.user?.email}`);
        }
    }, [requiresOtp, otpVerified, pathname, router, session]);
    
    // Show loading state or redirect if no role (OTP not completed)
    
    if (requiresOtp) {
        if (pathname.startsWith('/Login/VerifyOtp')) {
            // Allow access to OTP page
            return <div>{children}</div>;
        }
        return <div>Redirecting to OTP verification...</div>;
    }
    // Check if role is available and valid
    if (!role || !ROLE_LAYOUTS[role]) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div>Loading application...</div>
            </div>
        );
    }

    // Handle unauthorized page separately
    if (pathname.startsWith('/Unauthorized')) {
        return <div className='bg-black'>{children}</div>;
    }

            useEffect(() => {
            const token = localStorage.getItem('accessToken');
            if (!token || !session?.user?.id || (session.requiresOtp && !session.otpVerified)) return;

            const updateLastLogin = async () => {
                try {
                await hrmsAPI.touchLogin(session.user.id);
                } catch (err) {
                console.error('Failed to update last login:', err);
                }
            };
            updateLastLogin();
            }, [session?.user?.id, session?.requiresOtp, session?.otpVerified]);


    const readPath = pathname === '/' ? defaultPaths[role] : pathname.replace('/', '');
    const Layout = ROLE_LAYOUTS[role];
    const BodyComponent = Layout.body;
    const HeaderComponent = Layout.header;

    return (
        <div className='flex gap-[4.4375rem] bg-[url(/image/backdash.png)] bg-no-repeat bg-center bg-cover'>
            <BodyComponent readPath={readPath} session={session} />
            <div className='flex flex-col flex-1 gap-[4.25rem]'>
                <div className='flex pt-[3.5rem]'>
                    <HeaderComponent readPath={readPath} session={session} />
                </div>
                <div className='w-[calc(100%-2.75rem)]'>
                    {children}
                </div>
            </div>
        </div>
    );
}