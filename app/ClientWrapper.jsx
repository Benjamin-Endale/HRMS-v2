'use client';

import { usePathname, useRouter } from 'next/navigation';
import { getRoleLayout } from './config/roles';
import { useEffect, useState } from 'react';
import { hrmsAPI } from './lib/api/client';
import MainBody from './Components/mainBody';
import Header from './Components/Header';

export default function ClientWrapper({ children, session }) {
  const router = useRouter();
  const pathname = usePathname() || '/';
 
  const role = session?.user?.role;
  const requiresOtp = session?.requiresOtp;
  const otpVerified = session?.otpVerified;

  const [modules, setModules] = useState(null);

  const defaultPaths = {
    SuperAdmin: 'SuperAdmin/AllOrganization',
    HR: 'Admin/Dashboard',
    Employee: 'EmployeePortal/Dashboard',
    SystemAdmin: 'Admin/Dashboard',
  };

  // ✅ Always run all hooks
  useEffect(() => {
    if (requiresOtp && !otpVerified && !pathname.startsWith('/Login/VerifyOtp')) {
      router.push(`/Login/VerifyOtp?username=${session?.user?.id || session?.user?.email}`);
    }
  }, [requiresOtp, otpVerified, pathname, router, session]);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token || !session?.user?.id || (requiresOtp && !otpVerified)) return;

    const updateLastLogin = async () => {
      try {
        await hrmsAPI.touchLogin(session.user.id);
      } catch (err) {
        console.error('Failed to update last login:', err);
      }
    };
    updateLastLogin();
  }, [session?.user?.id, requiresOtp, otpVerified]);

  useEffect(() => {
    if (!session?.user?.tenantId || !session.accessToken) return;
    if (!['SystemAdmin', 'HR'].includes(session.user.role)) return;

    const fetchModules = async () => {
      try {
        const res = await hrmsAPI.getTenantModule(session.user.tenantId, session.accessToken);
        setModules(res || {});
      } catch (err) {
        console.error('Failed to fetch tenant modules:', err);
        setModules({});
      }
    };

    fetchModules();
  }, [session?.user?.tenantId, session?.user?.role, session?.accessToken]);


  
useEffect(() => {
  if (!['SystemAdmin', 'HR'].includes(role)) return;

  // 🚨 Wait until modules is loaded (not null)
  if (modules === null) return;

  const pathModuleMap = {
    '/Admin/Employees': 'employeeManagement',
    '/Admin/LeaveManagment': 'leaveManagement',
    '/Admin/Attendance': 'attendanceTracking',
    '/Admin/RecruitmentPages/Jobposting': 'recruitment',
    '/Admin/PerformancePages/Overview': 'performanceManagement',
    '/Admin/TrainingPages/OverviewTraining': 'trainingDevelopment',
  };

  const moduleKey = Object.entries(pathModuleMap).find(([path]) =>
    pathname.startsWith(path)
  )?.[1];

  // 🚨 Only redirect if we actually have modules loaded and access is denied
  if (moduleKey && modules && !modules[moduleKey]) {
    router.push('/Unauthorized');
  }
}, [pathname, modules, router, role]);


if (modules === null && ['SystemAdmin', 'HR'].includes(role)) {
  return <div className='h-screen bg-black text-lemongreen text-xl center-center'>
            <h1>Loading....</h1>
        </div>;
}


  // ✅ Compute layout parts after hooks
  const uuidRegex = /\/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/g;
  const cleanPath = pathname === '/' ? defaultPaths[role] : pathname.replace('/', '');
  const readPath = cleanPath.replace(uuidRegex, '');
  const { body: BodyComponent, header: HeaderComponent } = getRoleLayout(role, readPath);

  console.log(readPath);

  // ✅ Conditional rendering happens here — not early returns
  if (pathname.startsWith('/Unauthorized')) {
    return <div className="bg-black">{children}</div>;
  }

  if (requiresOtp && !otpVerified) {
    if (pathname.startsWith('/Login/VerifyOtp')) {
      return <div>{children}</div>;
    }
    return <div>Redirecting to OTP verification...</div>;
  }

 
  return (
    <div className="flex gap-[4.4375rem] bg-[url(/image/backdash.png)] bg-no-repeat bg-center bg-cover">
      <BodyComponent readPath={readPath} session={session} modules={modules} />
      <div className="flex flex-col flex-1 gap-[4.25rem]">
        <div className="flex pt-[3.5rem]">
          <HeaderComponent readPath={readPath} session={session} modules={modules} />
        </div>
        <div className="w-[calc(100%-2.75rem)]">{children}</div>
      </div>
    </div>
  );
}
