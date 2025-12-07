// app/Admin/AssignDepartment/[departmentId]/layout.js
import SubNavigation from '@/app/SubNavigation'

export default function AssignDepartmentLayout({ children, params }) {
  // params is automatically available in layout
  const { departmentId } = params;
  
  return (
    <div>
      {/* This SubNavigation shows on ALL pages in this folder */}
      <SubNavigation 
        readPath='/Admin/AssignDepartment/Uncategorized' 
        departmentId={departmentId} 
      />
      
      {/* 'children' is the actual page content (Uncategorized or Categorized) */}
      {children}
    </div>
  )
}