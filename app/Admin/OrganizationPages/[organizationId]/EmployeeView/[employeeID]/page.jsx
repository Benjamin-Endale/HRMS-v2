// app/Admin/EmployeeView/[employeeID]/page.jsx
import { auth } from '@/app/auth';
import { hrmsAPI } from '@/app/lib/api/client';
import EmployeesDetail from './EmployeeDetail/EmployeeDetail';

export default async function EmployeesServerPage({ params }) {
  // Make sure params is awaited properly
  const resolvedParams = await params; // await it
  const { employeeID } = resolvedParams;


  if (!employeeID) {
    throw new Error("Employee ID is missing in the URL");
  }

  const session = await auth();
  const token = session?.accessToken;

  const employees = await hrmsAPI.getEmployeeById(employeeID, token);
  console.log("🧾 Data fetched from backend:", employees);

  return <EmployeesDetail employees={employees || []} />;
}
