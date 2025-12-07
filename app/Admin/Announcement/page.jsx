// app/Admin/Employees/page.jsx
import { auth } from '@/app/auth';
import { hrmsAPI } from '@/app/lib/api/client';
import Announce from './AnnouncementView/page';

export default async function EmployeesServerPage({params}) {
    const { departmentId } = params;
  const session = await auth();
  const token = session?.accessToken;
  const tenantId = session?.user?.tenantId;

  const Announcement = await hrmsAPI.getAnnouncementByTenantID(tenantId);
  console.log("🧾 Announcement fetched from backend:", Announcement);
  // console.log("what up whats ip ",departmentId)

  return <Announce  Announcement={Announcement} token={token} tenantId={tenantId}   />;
}
