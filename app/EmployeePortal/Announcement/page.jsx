
// app/Admin/Employees/page.jsx
import { auth } from '@/app/auth';
import { hrmsAPI } from '@/app/lib/api/client';
import Announce from './AnnouncementDetail/page';

export default async function EmployeesServerPage() {
  const session = await auth();
  const token = session?.accessToken;
  const tenantId = session?.user?.tenantId;
  const userId = session?.user?.id
 


 
  const AnnounceDetail = await hrmsAPI.getAnnouncementByUserID(userId,token)
 
    console.log("AnnounceDetail: " ,AnnounceDetail)

  
  return <Announce   AnnounceDetail={AnnounceDetail || []} token={token} /> ;

}
