// app/Admin/Organization/page.jsx
import { auth } from '@/app/auth';
import { hrmsAPI } from '@/app/lib/api/client';
import DepartmentDetails from './DepartmentDetails/page';

export default async function OrganizationServerPage({ params }) {
  const session = await auth();
  const token = session?.accessToken;
  const tenantId = session?.user?.tenantId;
  console.log("TenantId:", tenantId);


  const resolvedParams = await params; // await it
  const { departmentId } = resolvedParams;



  const org = await hrmsAPI.getOrganizationsByTenantId(tenantId,token)
  const dep = await hrmsAPI.getDepartmentbyDepartmentID(departmentId,token)
  const employees = await hrmsAPI.getEmployeesTenant(tenantId, token);
  


    console.log("Salems Dep: " ,dep)
    console.log("salems Dep: " , employees)
  return <DepartmentDetails dep={dep} departmentId={departmentId} tenantId={tenantId} employees={employees} />;
}
