// app/Admin/Organization/page.jsx
import { auth } from '@/app/auth';
import { hrmsAPI } from '@/app/lib/api/client';
import Approved from './Approved/page';

export default async function OrganizationServerPage() {
  const session = await auth();
  const token = session?.accessToken;
  const tenantId = session?.user?.tenantId;
   const userId = session?.user?.id

 
 
  const leaveType = await hrmsAPI.getLeaveTypeByTenantID(tenantId,token)
  const leaves = await hrmsAPI.getEmployeeLeaves(userId,token)
console.log("Leave Type: ", leaveType)

console.log("Leave Type: ", userId)
console.log("Leave Type: ", leaves)
 
    
  return <Approved  leaves={leaves || []}  leaveType={leaveType || []} tenantId={tenantId} userId={userId} token={token} />;
}
