// app/Admin/Organization/page.jsx
import { auth } from '@/app/auth';
import { hrmsAPI } from '@/app/lib/api/client';
import MainBody from '@/app/Components/mainBody';

export default async function OrganizationServerPage() {
  const session = await auth();
  const token = session?.accessToken;
  const tenantId = session?.user?.tenantId;

  // fetch all organizations for this tenant
  const org = await hrmsAPI.getOrganizations(token);

  console.log("Organization: ", org);

  return (
    <MainBody
      org={org || []}
      token={token}
      tenantId={tenantId}
      session={session}
    />
  );
}
