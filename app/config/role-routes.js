const roleRoutes = {
  HR: "/Admin/Dashboard",
  SuperAdmin: "/SuperAdmin/AllOrganization",
  Employee: "/EmployeePortal/Dashboard",
};

await signIn("credentials", {
  redirect: true,
  callbackUrl: roleRoutes[role] || "/",
});
