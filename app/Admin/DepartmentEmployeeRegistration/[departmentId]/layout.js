// app/Admin/AssignDepartment/[departmentId]/layout.
'use client'
import { AdminFormProvider } from '@/app/Store/AdminFormContext';

export default function CreateOrganizationLayout({ children     }) {

  
  return <AdminFormProvider >{children}</AdminFormProvider> ;
}
