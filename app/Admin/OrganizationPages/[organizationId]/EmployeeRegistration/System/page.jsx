// app/Admin/EmployeeRegistration/page.jsx
import System from '@/app/Admin/EmployeeRegistration/System/SystemUi/Page';
import { auth } from '@/app/auth';


export default async function Page({params}) {
  const session = await auth(); 
  const tenantId = session?.user?.tenantId;
  const resolvedParams = await params; // await it
  const { organizationId } = resolvedParams;



  return <System tenantId={tenantId} organizationId = {organizationId} />;
}



