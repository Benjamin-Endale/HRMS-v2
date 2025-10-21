// app/Admin/EmployeeRegistration/page.jsx
import System from '@/app/Admin/EmployeeRegistration/System/SystemUi/Page';
import { auth } from '@/app/auth';

export default async function Page() {
  const session = await auth(); 
  const tenantId = session?.user?.tenantId;
  
  
  return <System tenantId={tenantId} />;
}



