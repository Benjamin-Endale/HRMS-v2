// app/Admin/EmployeeView/[employeeID]/page.jsx
import { auth } from '@/app/auth';
import { hrmsAPI } from '@/app/lib/api/client';
import Interview from './interviewView/page';

export default async function EmployeesServerPage( ) {
 
 

  const session = await auth();
  const token = session?.accessToken;
  console.log(session)
  const tenantId = session?.user.tenantId
 

  const jobs  = await hrmsAPI.getJobs(tenantId,token)
  const Applicants = await hrmsAPI.getApplicant(tenantId, token);
  console.log("🧾 Data fetched from backend:", Applicants);

  return <Interview  jobs={jobs} Applicants={Applicants || []}  />;
}
  