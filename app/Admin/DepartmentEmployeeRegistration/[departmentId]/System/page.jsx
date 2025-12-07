// app/Admin/EmployeeRegistration/page.jsx
import System from '@/app/Admin/EmployeeRegistration/System/SystemUi/Page';
import { auth } from '@/app/auth';

export default async function Page({params}) {
  const session = await auth(); 
  const tenantId = session?.user?.tenantId;
  const {departmentId} = params

  console.log(departmentId)
  
  return <System tenantId={tenantId} departmentId={departmentId} />;
}



