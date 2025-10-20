import React  from 'react'
import { auth } from '@/app/auth';
import { hrmsAPI } from '@/app/lib/api/client';



const handleState = (status) => {
  switch (status) {
    case "Active": return "text-lemongreen";  
    case "Suspend": return "text-Error";  
  }
};





export default async function Page () {
  const session = await auth();
  const token = session?.accessToken;

  if (!token) {
    console.error("No access token available. User might not be logged in.");
    return <div>Please login to see organizations</div>;
  }

  let employees = [];
  let organizations = [];
  let tenants = [];



  try {
    // 1️⃣ Fetch all Tenants
    tenants = await hrmsAPI.getTenant(token);
    console.log("tenants response: " , tenants)
    employees = await hrmsAPI.getEmployees(token)

    try {
      organizations = await hrmsAPI.getOrganizations(token);
    } catch (error) {
      console.error("Failed to fetch organizations:", error);
      organizations = [];
    }

  const tenantsWithAdmins = await Promise.all(
    tenants.map(async (tenant) => {
      try {
        const systemAdmin = await hrmsAPI.getTenantSystemAdmin(tenant.id, token);
        console.log(systemAdmin)
        return { ...tenant, admin: systemAdmin }; // attach as "admin"
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
      console.log("Employees: " , data)// now returns {count}
      return { ...tenant, employeesCount: data.count }; // attach as employeesCount
    } catch (error) {
      console.error(`Failed to fetch employees for ${tenant.name}:`, error);
      return { ...tenant, employeesCount: 0 };
    }
  })
);



  tenants = tenantsWithAdminsAndEmployees;
  console.log(tenants)

  } catch (err) {
    console.error("Failed to fetch Tenants:", err);
    tenants = [];
  }

  if (tenants.length === 0) {
    console.log("No Tenants found yet.");
  }
  


return (
    // mainContainer
    <div className='font-semibold flex flex-col gap-[3.875rem]'>
      {/* dashHeader */}
      <div className='flex gap-[2rem]'>
        <div className='carDash1 bg-[url(/image/imageDashcard1.png)]'>
          <div className='h-full between flex-col'>
            <div className='flex justify-between'>
              <div>
                <img src="/image/Icon/ProfileIcon.png" alt="" />
              </div>
              <div className='border-none  rounded-full center-center  bg-white w-[49px] h-[49px]'>
                <img src="/image/Icon/ArrowRightIcon.png" alt="" />
              </div>
            </div>
            <div className='flex flex-col'>
              <span className='text-5xl'>{tenants.length}</span>
              <span>Total Tenants</span>
            </div>
          </div>
        </div>
        <div className='carDash1 bg-[rgba(190,229,50,0.05)]'>
          <div className='h-full between flex-col'>
            <div className='flex justify-between'>
              <div>
                <img src="/image/Icon/TimeIcon.png" alt="" />
              </div>
              <div className='border-none  rounded-full center-center bg-white w-[49px] h-[49px]'>
                <img src="/image/Icon/ArrowRightIcon.png" alt="" />
              </div>
            </div>
            <div className='flex flex-col'>
              <span className='text-5xl text-formColor'>{employees.length}</span>
              <span className='text-formColor'>Total Employees</span>
            </div>
          </div>
        </div>
        <div className='carDash1 bg-[rgba(190,229,50,0.05)]'>
          <div className='h-full between flex-col'>
            <div className='flex justify-between'>
              <div>
                <img src="/image/Icon/TimeIcon.png" alt="" />
              </div>
              <div className='border-none  rounded-full center-center bg-white w-[49px] h-[49px]'>
                <img src="/image/Icon/ArrowRightIcon.png" alt="" />
              </div>
            </div>
            <div className='flex flex-col'>
              <span className='text-5xl text-formColor'>{organizations.length}</span>
              <span className='text-formColor'>Total Organization</span>
            </div>
          </div>
        </div>
      </div>


      {/* SecondSection */}
      <div className='flex flex-col gap-[2.0625rem]'>
        {/* AddTenantsection */}
        <div className='between'>
          <div className='flex flex-col'>
            <h1 className='textWhite'>Organization List</h1>
            <h4 className='textLimegray'>A list of all Tenants in your platform</h4>
          </div>
          <div>
            <button type="button" className='cursor-pointer '>
              <div className='center-center w-[13.125rem] h-[3.125rem] rounded-[0.625rem] gap-[0.625rem] bg-lemongreen'>
                <img src="/svg/SvgImage/PlusSign.svg" alt="" />
                <span className='text-black'>Add Tenants</span>
              </div>
            </button>
          </div>
        </div>
        {/* MainSectionContainer */}
        <div className='space-y-[3.0625rem]'>
          {/* SearchArea */}
          <div className='flex gap-[2.125rem]'>
            <div className='w-[71.9375rem] h-[3.4375rem]  flex items-center gap-[1.1875rem] bg-[#1D2015] rounded-[0.625rem] px-[1.4375rem] '>
              <img src="/image/Icon/SearchIcon.png" alt="" />
              <input type="search" placeholder="Search employee by name,email or ID" className='placeholder-input text-white  w-full h-full outline-0' name="" id="" />
            </div>

            {/* filter */}
            <div className='w-[18.125rem] h-[3.4375rem]  between-center  rounded-[0.625rem] bg-[#151812] gap-[4.6875rem] px-[1.5625rem]'>
              <div className='flex items-center gap-[0.625rem]'>
                <img src="/svg/SvgImage/Filter.svg" alt="" />
                <span className='text-white'>All Status</span>
              </div>
              <img src="/image/Icon/ArrowDown.png" alt="" />
            </div>
          </div>

          {/* listContentArea */}
          <div className='pb-[2.1875rem]'>
            <table className='w-full  '>
              <thead className=' text-formColor border-b border-limegray'>
                <tr>
                  <th className='pr-[14.75rem] pb-[0.8125rem]'>Tenants</th>
                  <th className='pr-[16.125rem] pb-[0.8125rem]'>Admin</th>
                  <th className='pr-[10.875rem] pb-[0.8125rem]'>Employees</th>
                  <th className='pr-[11.75rem] pb-[0.8125rem]'>Status</th>
                  <th className='pr-[6.5rem] pb-[0.8125rem]'>Created</th>
                  <th className='pr-[8.9375rem] pb-[0.8125rem]'>Action</th>
                </tr>
              </thead>
              <tbody >
                {tenants.map((tenant)=> (
                  <tr key={tenant.id}>
                    <td className='pt-[2.1875rem]'>
                      <div className='flex items-center gap-[0.9375rem]'>
                        <div className='w-[2.4375rem] h-[2.4375rem] bg-lemongreen rounded-full '></div>
                        <div>
                          <h1 className='text-limeLight'>{tenant.name}</h1>
                          <h4 className='textLimegray'>{tenant.domain}</h4>
                        </div>
                      </div>
                    </td>
                    <td className='pt-[2.1875rem]'>
                      <div>
                        <h1 className='text-limeLight'>{tenant.admin?.fullName || '-'}</h1>
                        <h4 className='textLimegray'>{tenant.admin?.email || '-'}</h4>
                      </div>
                    </td>
                    <td className='pt-[2.1875rem] '>
                      <div className='flex gap-[0.4375rem]'>
                        <img src="/image/Icon/Action/users.png" alt="" />
                        <span className='text-limegray'>{tenant.employeesCount || 0}</span>
                      </div>
                    </td>
                    <td className='pt-[2.1875rem]'>
                      <span className={`bg-[rgba(190,229,50,0.05)] px-[20px] py-[8px] rounded-full ${handleState(tenant.status)} `}>{tenant.status}</span>
                    </td>
                    <td className='pt-[2.1875rem]'>
                      <div>
                        <h4 className='text-limegray'>{new Date(tenant.createdAt).toLocaleDateString()}</h4>
                      </div>
                    </td>
                    <td className='flex items-center gap-[2.5625rem] pt-[2.1875rem]'>
                      <button type="button" className='cursor-pointer'>
                        <img src="/image/Icon/Action/eye.png" alt="" />
                      </button>
                      <button type="button" className='cursor-pointer'>
                        <img src="/image/Icon/Action/Pen.png" alt="" />
                      </button>
                      <button type="button" className='cursor-pointer'>
                        <img src="/image/Icon/Action/banOff.png" alt="" />
                      </button>
                    </td>
                  </tr>

                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

