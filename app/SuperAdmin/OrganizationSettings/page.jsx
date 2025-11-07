// app/Admin/Employees/page.jsx
import { auth } from '@/app/auth';
import { hrmsAPI } from '@/app/lib/api/client';
import OrgSettings from './OrganzationSettings/OrgSettings';

export default async function EmployeesServerPage() {
  const session = await auth();
  const token = session?.accessToken;

  let permSettings = {};

  try {
    permSettings = await hrmsAPI.getPermanentSettings(token);
    console.log("🧾 Org fetched from backend:", permSettings);
  } catch (error) {
    // Be very specific about which error to catch
    if (error.message && error.message.includes('No permanent settings found')) {
      console.log("ℹ️ No existing settings found, using defaults");
      permSettings = {};
    } else {
      // For other errors, you might want to handle them differently
      console.error("Unexpected error fetching settings:", error);
      // Still use empty settings but log the error
      permSettings = {};
    }
  }

  return <OrgSettings permSettings={permSettings} token={token} />;
}