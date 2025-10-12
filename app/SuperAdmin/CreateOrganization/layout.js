// /SuperAdmin/CreateOrganization/layout.js
'use client'
import { AdminFormProvider } from '@/app/Store/AdminFormContext';

export default function CreateOrganizationLayout({ children }) {
  return <AdminFormProvider>{children}</AdminFormProvider>;
}
