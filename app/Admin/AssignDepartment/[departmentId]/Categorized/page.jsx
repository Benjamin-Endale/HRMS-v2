// // app/Admin/Employees/page.jsx
// import { auth } from '@/app/auth';
// import { hrmsAPI } from '@/app/lib/api/client';
// import AuthorizedUi from './AuthorizedUI/page';

// export default async function EmployeesServerPage() {
//   const session = await auth();
//   const token = session?.accessToken;
//   const tenantId = session?.user?.tenantId;

//   const users = await hrmsAPI.getUser(tenantId, token);
//   console.log("🧾 Users fetched from backend:", users);

//     const employees = await hrmsAPI.getEmployees(tenantId, token);
//   console.log("🧾 Employees fetched from backend:", employees);


//   return <AuthorizedUi users={users  || []} token={token}  />;
// }

// app/Admin/Employees/page.jsx
import { auth } from '@/app/auth';
import { hrmsAPI } from '@/app/lib/api/client';
import Categorized from './CategorizedUI/page';

export default async function EmployeesServerPage({params}) {
  const session = await auth();
  const token = session?.accessToken;
  const tenantId = session?.user?.tenantId;

   const resolvedParams = await params; // await it
  const { departmentId } = resolvedParams;


  const employeesDepartment = await hrmsAPI.getEmployeesBydepartment(departmentId, token);
  console.log("🧾 HAHAHHAHAH fetched from backend:", employeesDepartment);

  const subDepartments = await hrmsAPI.getSubDepartment(departmentId, token);
  console.log("🧾 Data fetched from backend:", subDepartments);

  return <Categorized subDepartments={subDepartments || []} employeesDepartment={employeesDepartment || []} token={token} />;
}
