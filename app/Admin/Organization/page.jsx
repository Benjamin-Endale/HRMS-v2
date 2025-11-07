// app/Admin/Organization/page.jsx
import { auth } from '@/app/auth';
import { hrmsAPI } from '@/app/lib/api/client';
import OrganizationDetail from './OrganizationDetails/page';

export default async function OrganizationServerPage() {
  const session = await auth();
  const token = session?.accessToken;
  const tenantId = session?.user?.tenantId;
console.log("TenantId:", tenantId);


  const org = await hrmsAPI.getOrganizationsByTenantId(tenantId,token)

  console.log("Organization: ",org)
  // No need for 'use client' here, this is server-side
  return <OrganizationDetail org={org || []} token={token} tenantId={tenantId} />;
}
