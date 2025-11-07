// app/Admin/Employees/page.jsx
import { auth } from '@/app/auth';
import { hrmsAPI } from '@/app/lib/api/client';
import LeaveMang from './LeaveManegmentView/page'

export default async function EmployeesServerPage() {
  const session = await auth();
  const token = session?.accessToken;
  const tenantId = session?.user?.tenantId;

  const leaves = await hrmsAPI.getLeaveByTenantId(tenantId, token);
  console.log("🧾 Employees fetched from backend:", leaves);

  return <LeaveMang leaves={leaves || []} token={token}/> ;

}
