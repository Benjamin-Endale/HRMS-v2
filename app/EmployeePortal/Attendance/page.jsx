// app/Admin/Employees/page.jsx
import { auth } from '@/app/auth';
import { hrmsAPI } from '@/app/lib/api/client';
import Attendance from './AttendanceView/page';

export default async function EmployeesServerPage() {
  const session = await auth();
  const token = session?.accessToken;
  const tenantId = session?.user?.tenantId;
  const userId = session?.user?.id
 
  const userIdData = {
    userId:userId
  }

  console.log("🧾 AttendanceDetail fetched from backend:", userId);
  const AttendanceDetail = await hrmsAPI.getAttendance(userId,token)
  console.log("🧾 AttendanceDetail fetched from backend:", AttendanceDetail);


  
  return <Attendance userIdData={userIdData || []} AttendanceDetail={AttendanceDetail || []} token={token} /> ;

}
