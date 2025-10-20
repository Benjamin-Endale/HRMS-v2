// app/Admin/Employees/page.jsx
import { auth } from '@/app/auth';
import { hrmsAPI } from '@/app/lib/api/client';
import Allpage from './AllUi/Allpage';

export default async function EmployeesServerPage() {
  const session = await auth();
  const token = session?.accessToken;
  const tenantId = session?.user?.tenantId;

  const employees = await hrmsAPI.getEmployees(tenantId, token);
  console.log("🧾 Employees fetched from backend:", employees);

  return <Allpage employees={employees || []} token={token} tenantId={tenantId} />;
}
