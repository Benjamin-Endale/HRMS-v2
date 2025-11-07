// app/Admin/Organization/page.jsx
import { auth } from '@/app/auth';
import { hrmsAPI } from '@/app/lib/api/client';
import DepartmentAdd from './DepartmentAdd/DepartmentAdd';

export default async function OrganizationServerPage() {
  const session = await auth();
  const token = session?.accessToken;
  const tenantId = session?.user?.tenantId;
  console.log("TenantId:", tenantId);


  const org = await hrmsAPI.getOrganizationsByTenantId(tenantId,token)
  const dep = await hrmsAPI.getDepartmentbyTenantId(tenantId,token)
  const employees = await hrmsAPI.getEmployeesTenant(tenantId, token);
  console.log("Organization: ",org)
    console.log("Organization: ",dep)


    
  return <DepartmentAdd org={org || []} dep={dep || []} employees={employees || []} token={token} tenantId={tenantId} />;
}
