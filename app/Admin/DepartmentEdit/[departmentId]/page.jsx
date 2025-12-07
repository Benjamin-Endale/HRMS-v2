// app/Admin/EmployeeView/[employeeID]/page.jsx
import { auth } from '@/app/auth';
import { hrmsAPI } from '@/app/lib/api/client';
import AddNewEmployee from './AddNewemployee/page';

export default async function EmployeesServerPage({ params }) {
  // Make sure params is awaited properly
  const resolvedParams = await params; // await it
  const { departmentId } = resolvedParams;


  if (!departmentId) {
    throw new Error("department id is missing in the URL");
  }

  const session = await auth();
  const token = session?.accessToken;

  const department = await hrmsAPI.getDepartmentbyDepartmentID(departmentId, token);
  console.log("🧾 department fetched from backend:", department);

  return <AddNewEmployee employees={department || []} />;
}
  