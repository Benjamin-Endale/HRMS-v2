// app/Admin/EmployeeView/[employeeID]/page.jsx
import { auth } from '@/app/auth';
import { hrmsAPI } from '@/app/lib/api/client';
import Shortlist from './ShortListView/page';

export default async function EmployeesServerPage( ) {
 
 

  const session = await auth();
  const token = session?.accessToken;
  
  const tenantId = session?.user.tenantId
 
  const users = await hrmsAPI.getUser(tenantId, token);
  console.log("🧾 Users fetched from backend:", users);
  
  const jobs  = await hrmsAPI.getJobs(tenantId,token)
  const ShortlIst = await hrmsAPI.getShortList(tenantId, token);
  console.log("🧾 Data fetched from backend:", ShortlIst);

  return <Shortlist users={users} jobs={jobs} ShortlIst={ShortlIst || []}  />;
}
  