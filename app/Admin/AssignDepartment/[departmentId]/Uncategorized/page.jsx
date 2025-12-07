// app/Admin/Employees/page.jsx
import { auth } from '@/app/auth';
import { hrmsAPI } from '@/app/lib/api/client';
import Uncategorized from './UncategorizedUi/UncategorizedPage';

export default async function EmployeesServerPage({params}) {
    const { departmentId } = params;
  const session = await auth();
  const token = session?.accessToken;
  const tenantId = session?.user?.tenantId;

  const employees = await hrmsAPI.getEmployeesbyNoDep(tenantId, token);
  console.log("🧾 Employees fetched from backend:", employees);
  console.log("what up whats ip ",departmentId)

  return <Uncategorized employees={employees || []} token={token} tenantId={tenantId} departmentId={departmentId} />;
}
