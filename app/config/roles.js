import SuperAdminBody from "../Components/SuperAdminBody";
import getter from "../Components/getter";
import EmployeePortal from "../Components/EmployeePortal";
import HeaderPortal from "../Components/HeaderPortal";
import Header from "../Components/Header";
import MainBody from "../Components/mainBody";
import OrganizationMainBody from "../Components/organizationBody";
import HeaderOrg from "../Components/HeaderOrg";

export const getRoleLayout = (role, readPath) => {
  if (role === "SystemAdmin" && readPath.includes("Admin/OrganizationPages")) {
    return { body: OrganizationMainBody, header: HeaderOrg };
  }

  const ROLE_LAYOUTS = {
    SuperAdmin: { body: SuperAdminBody, header: Header },
    HR: { body: MainBody, header: Header },
    SystemAdmin: { body: MainBody, header: Header },
    Employee: { body: EmployeePortal, header: HeaderPortal },
  };

  return ROLE_LAYOUTS[role] || { body: MainBody, header: Header };
};
