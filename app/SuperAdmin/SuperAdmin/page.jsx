import { hrmsAPI } from "@/app/lib/api/client";
import { auth } from "@/app/auth";
import Super from "@/app/Components/SuperTable"
export default async function page() {
  const session = await auth();

  let admins = [];
  try {
    admins = await hrmsAPI.getuserAdmins({
      headers: { Authorization: `Bearer ${session?.accessToken}` },
    });
  } catch (err) {
    console.error("Failed to fetch superadmins:", err);
  }

  // ✅ Pass data as props to client component
  return <Super admins={admins} />;
}