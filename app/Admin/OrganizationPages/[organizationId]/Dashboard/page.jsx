// app/Admin/EmployeeView/[employeeID]/page.jsx
import { auth } from '@/app/auth';
import { hrmsAPI } from '@/app/lib/api/client';
import Dashboardview from './DashboardView/page';

export default async function EmployeesServerPage({params}) {


  const session = await auth();
  const token = session?.accessToken;
  const tenantId = session?.user.tenantId
  const resolvedParams = await params; // await it
  const { organizationId } = resolvedParams;
  const employees = await hrmsAPI.getEmployeesTenantandOrganization(tenantId,organizationId, token);
  console.log("🧾 Data fetched from backend:", employees);

  return <Dashboardview employees={employees || []} />;
}
