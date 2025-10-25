

// app/Admin/Employees/page.jsx
import { auth } from '@/app/auth';
import { hrmsAPI } from '@/app/lib/api/client';
import OrgSettings from './OrganzationSettings/OrgSettings';

export default async function EmployeesServerPage() {
  const session = await auth();
  const token = session?.accessToken;

  const permSettings = await hrmsAPI.getPermanentSettings(token);
   console.log("🧾Org fetched from backend:", permSettings);


  return <OrgSettings permSettings={permSettings || {}} token={token} />;
}
