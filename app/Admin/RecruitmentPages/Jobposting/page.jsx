// app/Admin/Employees/page.jsx
import { auth } from '@/app/auth';
import { hrmsAPI } from '@/app/lib/api/client';
import Job from './JobView/page';

export default async function EmployeesServerPage() {
  const session = await auth();
  const token = session?.accessToken;
  const tenantId = session?.user?.tenantId;

  const jobs  = await hrmsAPI.getJobs(tenantId,token)
console.log(jobs)
  return <Job jobs={jobs} token={token} tenantId={tenantId} /> ;

}
