// app/Admin/Employees/page.jsx
import { auth } from '@/app/auth';
import { hrmsAPI } from '@/app/lib/api/client';
import Core from './CoreView/page';

export default async function EmployeesServerPage() {
  const session = await auth();
  const token = session?.accessToken;
  const tenantId = session?.user?.tenantId;
 
 

  return <Core  token={token} tenantId={tenantId} /> ;

}
