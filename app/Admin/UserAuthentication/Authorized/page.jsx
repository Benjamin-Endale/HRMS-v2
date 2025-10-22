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
import AuthorizedUi from './AuthorizedUI/page';

export default async function EmployeesServerPage() {
  const session = await auth();
  const token = session?.accessToken;
  const tenantId = session?.user?.tenantId;

  // Fetch users and employees
  const users = await hrmsAPI.getUser(tenantId, token);
  console.log("🧾 Users fetched from backend:", users);

  const employees = await hrmsAPI.getEmployeesTenant(tenantId, token);
  console.log("🧾 Employees fetched from backend:", employees);

  // Merge employeeCode into users
  const usersPayload = users.map(user => {
    const employee = employees.find(emp => emp.employeeID === user.employeeID || emp.email === user.email);
    return {
      ...user,
      employeeCode: employee?.employeeCode || null // attach employeeCode if found
    };
  });

  console.log("🧾 Users with employeeCode:", usersPayload);

  return <AuthorizedUi users={usersPayload || []} token={token} />;
}
