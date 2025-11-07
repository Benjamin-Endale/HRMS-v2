
// app/Admin/Employees/page.jsx
import { auth } from '@/app/auth';
import { hrmsAPI } from '@/app/lib/api/client';
import Attendance from './AttendanceVIew/page';

export default async function EmployeesServerPage() {
  const session = await auth();
  const token = session?.accessToken;
  const tenantId = session?.user?.tenantId;
  const userId = session?.user?.id
 


 
  const AttendanceDetail = await hrmsAPI.getAttendancbyTenant(tenantId,token)
 
console.log("employee: " ,AttendanceDetail)

  
  return <Attendance   AttendanceDetail={AttendanceDetail || []} token={token} /> ;

}
