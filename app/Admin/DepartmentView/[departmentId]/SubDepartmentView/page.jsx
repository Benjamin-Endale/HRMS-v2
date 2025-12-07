// app/Admin/EmployeeView/[employeeID]/page.jsx
import { auth } from '@/app/auth';
import { hrmsAPI } from '@/app/lib/api/client';
import SubDepartment from './SubDepartmentView/page';

export default async function EmployeesServerPage({ params }) {
  // Make sure params is awaited properly
  const resolvedParams = await params; // await it
  const { departmentId } = resolvedParams;


 

  const session = await auth();
  const token = session?.accessToken;

  const subDepartments = await hrmsAPI.getSubDepartment(departmentId, token);
  console.log("🧾 Data fetched from backend:", subDepartments);

  return <SubDepartment subDepartments={subDepartments || []} />;
}
  