// app/Admin/EmployeeView/[employeeID]/page.jsx
import { auth } from '@/app/auth';
import { hrmsAPI } from '@/app/lib/api/client';
import Dashboardview from './DashboardView/page';

export default async function EmployeesServerPage() {


  const session = await auth();
  const token = session?.accessToken;
  const tenantId = session?.user.tenantId

  const employees = await hrmsAPI.getEmployeesTenant(tenantId, token);
  console.log("🧾 Data fetched from backend:", employees);

  return <Dashboardview employees={employees || []} />;
}
