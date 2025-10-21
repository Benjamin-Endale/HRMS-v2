// app/Admin/Employees/page.jsx
import { auth } from '@/app/auth';
import { hrmsAPI } from '@/app/lib/api/client';
import EmployeesPage from './EmployeeCall/EmployeesPage';

export default async function EmployeesServerPage() {
  const session = await auth();
  const token = session?.accessToken;
  const tenantId = session?.user?.tenantId;

  const employees = await hrmsAPI.getEmployeesTenant(tenantId, token);
  console.log("🧾 Employees fetched from backend:", employees);

  return <EmployeesPage employees={employees || []} /> ;

}
