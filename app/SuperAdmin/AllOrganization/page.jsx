import React from 'react'
import { auth } from '@/app/auth';
import { hrmsAPI } from '@/app/lib/api/client';

const handleState = (status) => {
  switch (status) {
    case "Active": return "text-lemongreen";  
    case "Suspend": return "text-Error";  
    default: return "text-gray-400"; // Default case
  }
};

export default async function Page() {
  const session = await auth();
  const token = session?.accessToken;

  if (!token) {
    console.error("No access token available. User might not be logged in.");
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Authentication Required</h1>
          <p className="text-gray-400">Please login to see organizations</p>
        </div>
      </div>
    );
  }

  // Initialize with empty arrays
  let employees = [];
  let organizations = [];
  let tenants = [];

  try {
    // 1️⃣ Fetch all Tenants with error handling
    try {
      tenants = await hrmsAPI.getTenant(token);
      console.log("tenants response: ", tenants);
    } catch (tenantError) {
      console.error("Failed to fetch tenants:", tenantError);
      tenants = []; // Ensure it's always an array
    }

    // 2️⃣ Fetch Employees with error handling
    try {
      employees = await hrmsAPI.getEmployees(token);
    } catch (employeeError) {
      console.error("Failed to fetch employees:", employeeError);
      employees = []; // Ensure it's always an array
    }

    // 3️⃣ Fetch Organizations with error handling
    try {
      organizations = await hrmsAPI.getOrganizations(token);
    } catch (orgError) {
      console.error("Failed to fetch organizations:", orgError);
      organizations = []; // Ensure it's always an array
    }

    // 4️⃣ Process tenants only if we have tenants
    if (tenants && tenants.length > 0) {
      const tenantsWithAdmins = await Promise.all(
        tenants.map(async (tenant) => {
          try {
            const systemAdmin = await hrmsAPI.getTenantSystemAdmin(tenant.id, token);
            console.log(systemAdmin);
            return { ...tenant, admin: systemAdmin };
          } catch (error) {
            console.error(`Failed to fetch admin for ${tenant.name}:`, error);
            return { ...tenant, admin: null };
          }
        })
      );

      const tenantsWithAdminsAndEmployees = await Promise.all(
        tenantsWithAdmins.map(async (tenant) => {
          try {
            const data = await hrmsAPI.getTenantEmployees(tenant.id, token);
            console.log("Employees: ", data);
            return { 
              ...tenant, 
              employeesCount: data?.count || 0 
            };
          } catch (error) {
            console.error(`Failed to fetch employees for ${tenant.name}:`, error);
            return { ...tenant, employeesCount: 0 };
          }
        })
      );

      tenants = tenantsWithAdminsAndEmployees;
    }

  } catch (err) {
    console.error("Unexpected error in main try block:", err);
    // Keep the empty arrays as fallback
  }

  // Safe array checks
  const safeTenants = Array.isArray(tenants) ? tenants : [];
  const safeEmployees = Array.isArray(employees) ? employees : [];
  const safeOrganizations = Array.isArray(organizations) ? organizations : [];

  console.log("Final data:", {
    tenants: safeTenants.length,
    employees: safeEmployees.length,
    organizations: safeOrganizations.length
  });

  // Empty state component
  const EmptyState = ({ title, description }) => (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="mb-4 text-gray-400">
      </div>
      <h3 className="text-lg font-semibold text-limeLight mb-2">{title}</h3>
      <p className="text-accountColor max-w-md">{description}</p>
    </div>
  );

  return (
    <div className='font-semibold flex flex-col gap-[3.875rem]'>
      {/* Dashboard Header Cards */}
      <div className='flex gap-[2rem]'>
        {/* Tenants Card */}
        <div className='carDash1 bg-[url(/image/imageDashcard1.png)]'>
          <div className='h-full between flex-col'>
            <div className='flex justify-between'>
              <div>
                <img src="/image/Icon/ProfileIcon.png" alt="Tenants" />
              </div>
              <div className='border-none rounded-full center-center bg-white w-[49px] h-[49px]'>
                <img src="/image/Icon/ArrowRightIcon.png" alt="View" />
              </div>
            </div>
            <div className='flex flex-col'>
              <span className='text-5xl'>{safeTenants.length}</span>
              <span>Total Tenants</span>
            </div>
          </div>
        </div>

        {/* Employees Card */}
        <div className='carDash1 bg-[rgba(190,229,50,0.05)]'>
          <div className='h-full between flex-col'>
            <div className='flex justify-between'>
              <div>
                <img src="/image/Icon/TimeIcon.png" alt="Employees" />
              </div>
              <div className='border-none rounded-full center-center bg-white w-[49px] h-[49px]'>
                <img src="/image/Icon/ArrowRightIcon.png" alt="View" />
              </div>
            </div>
            <div className='flex flex-col'>
              <span className='text-5xl text-formColor'>{safeEmployees.length}</span>
              <span className='text-formColor'>Total Employees</span>
            </div>
          </div>
        </div>

        {/* Organizations Card */}
        <div className='carDash1 bg-[rgba(190,229,50,0.05)]'>
          <div className='h-full between flex-col'>
            <div className='flex justify-between'>
              <div>
                <img src="/image/Icon/TimeIcon.png" alt="Organizations" />
              </div>
              <div className='border-none rounded-full center-center bg-white w-[49px] h-[49px]'>
                <img src="/image/Icon/ArrowRightIcon.png" alt="View" />
              </div>
            </div>
            <div className='flex flex-col'>
              <span className='text-5xl text-formColor'>{safeOrganizations.length}</span>
              <span className='text-formColor'>Total Organization</span>
            </div>
          </div>
        </div>
      </div>

      {/* Organization List Section */}
      <div className='flex flex-col gap-[2.0625rem]'>
        {/* Header with Add Tenant Button */}
        <div className='between'>
          <div className='flex flex-col'>
            <h1 className='textWhite'>Organization List</h1>
            <h4 className='textLimegray'>A list of all Tenants in your platform</h4>
          </div>
          <div>
            <button type="button" className='cursor-pointer'>
              <div className='center-center w-[13.125rem] h-[3.125rem] rounded-[0.625rem] gap-[0.625rem] bg-lemongreen'>
                <img src="/svg/SvgImage/PlusSign.svg" alt="Add" />
                <span className='text-black'>Add Tenants</span>
              </div>
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className='space-y-[3.0625rem]'>
          {/* Search and Filter - Only show if we have data */}
          {(safeTenants.length > 0) && (
            <div className='flex gap-[2.125rem]'>
              <div className='w-[71.9375rem] h-[3.4375rem] flex items-center gap-[1.1875rem] bg-[#1D2015] rounded-[0.625rem] px-[1.4375rem]'>
                <img src="/image/Icon/SearchIcon.png" alt="Search" />
                <input 
                  type="search" 
                  placeholder="Search tenant by name, email or ID" 
                  className='placeholder-input text-white w-full h-full outline-0 bg-transparent' 
                />
              </div>

              <div className='w-[18.125rem] h-[3.4375rem] between-center rounded-[0.625rem] bg-[#151812] gap-[4.6875rem] px-[1.5625rem]'>
                <div className='flex items-center gap-[0.625rem]'>
                  <img src="/svg/SvgImage/Filter.svg" alt="Filter" />
                  <span className='text-white'>All Status</span>
                </div>
                <img src="/image/Icon/ArrowDown.png" alt="Dropdown" />
              </div>
            </div>
          )}

          {/* Content Area */}
          <div className='pb-[2.1875rem]'>
            {safeTenants.length > 0 ? (
              <table className='w-full'>
                <thead className='text-formColor border-b border-limegray'>
                  <tr>
                    <th className='pr-[14.75rem] pb-[0.8125rem]'>Tenants</th>
                    <th className='pr-[16.125rem] pb-[0.8125rem]'>Admin</th>
                    <th className='pr-[10.875rem] pb-[0.8125rem]'>Employees</th>
                    <th className='pr-[11.75rem] pb-[0.8125rem]'>Status</th>
                    <th className='pr-[6.5rem] pb-[0.8125rem]'>Created</th>
                    <th className='pr-[8.9375rem] pb-[0.8125rem]'>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {safeTenants.map((tenant) => (
                    <tr key={tenant.id}>
                      <td className='pt-[2.1875rem]'>
                        <div className='flex items-center gap-[0.9375rem]'>
                          <div className='w-[2.4375rem] h-[2.4375rem] bg-lemongreen rounded-full'></div>
                          <div>
                            <h1 className='text-limeLight'>{tenant.name || 'Unnamed Tenant'}</h1>
                            <h4 className='textLimegray'>{tenant.domain || 'No domain'}</h4>
                          </div>
                        </div>
                      </td>
                      <td className='pt-[2.1875rem]'>
                        <div>
                          <h1 className='text-limeLight'>{tenant.admin?.fullName || 'No Admin'}</h1>
                          <h4 className='textLimegray'>{tenant.admin?.email || 'No email'}</h4>
                        </div>
                      </td>
                      <td className='pt-[2.1875rem]'>
                        <div className='flex gap-[0.4375rem]'>
                          <img src="/image/Icon/Action/users.png" alt="Employees" />
                          <span className='text-limegray'>{tenant.employeesCount || 0}</span>
                        </div>
                      </td>
                      <td className='pt-[2.1875rem]'>
                        <span className={`bg-[rgba(190,229,50,0.05)] px-[20px] py-[8px] rounded-full ${handleState(tenant.status)}`}>
                          {tenant.status || 'Unknown'}
                        </span>
                      </td>
                      <td className='pt-[2.1875rem]'>
                        <div>
                          <h4 className='text-limegray'>
                            {tenant.createdAt ? new Date(tenant.createdAt).toLocaleDateString() : 'No date'}
                          </h4>
                        </div>
                      </td>
                      <td className='flex items-center gap-[2.5625rem] pt-[2.1875rem]'>
                        <button type="button" className='cursor-pointer'>
                          <img src="/image/Icon/Action/eye.png" alt="View" />
                        </button>
                        <button type="button" className='cursor-pointer'>
                          <img src="/image/Icon/Action/Pen.png" alt="Edit" />
                        </button>
                        <button type="button" className='cursor-pointer'>
                          <img src="/image/Icon/Action/banOff.png" alt="Suspend" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <EmptyState
                title="No Tenants Found"
                description="There are no tenants in your platform yet. Start by adding your first tenant."
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}