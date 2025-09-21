import SuperAdminBody from "../Components/SuperAdminBody";
import MainBody from "../Components/mainBody";
import EmployeePortal from "../Components/EmployeePortal";
import HeaderPortal from "../Components/HeaderPortal";
import Header from "../Components/Header";

export const ROLE_LAYOUTS = {
  SuperAdmin: { body: SuperAdminBody, header: Header },
  HR: { body: MainBody, header: Header },
  Employee: { body: EmployeePortal, header: HeaderPortal },
};
