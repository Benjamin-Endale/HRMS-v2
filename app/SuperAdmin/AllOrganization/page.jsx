import React  from 'react'
import { auth } from '@/app/auth';
import { hrmsAPI } from '@/app/lib/api/client';



const handleState = (status) => {
  switch (status) {
    case "Active":
      return "text-lemongreen";  
    case "Trial":
      return "text-yellowCust";  
    case "Suspend":
      return "text-Error";  
  }
};






export default async function Page () {
  const session = await auth();
  const token = session?.accessToken;

  if (!token) {
    console.error("No access token available. User might not be logged in.");
    return <div>Please login to see organizations</div>;
  }

  let organizations = [];
  try {
    organizations = await hrmsAPI.getOrganizations(token);
  } catch (err) {
    console.error("Failed to fetch organizations:", err);
    organizations = [];
  }

  if (organizations.length === 0) {
    console.log("No organizations found yet.");
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
              <span className='text-5xl'>{organizations.length}</span>
              <span>Total Organization</span>
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
              <span className='text-5xl text-formColor'>1230</span>
              <span className='text-formColor'>Total Organization</span>
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
              <span className='text-5xl text-formColor'>1230</span>
              <span className='text-formColor'>Total Organization</span>
            </div>
          </div>
        </div>
      </div>


      {/* SecondSection */}
      <div className='flex flex-col gap-[2.0625rem]'>
        {/* AddOrganizationSection */}
        <div className='between'>
          <div className='flex flex-col'>
            <h1 className='textWhite'>Organization List</h1>
            <h4 className='textLimegray'>A list of all organizations in your platform</h4>
          </div>
          <div>
            <button type="button" className='cursor-pointer '>
              <div className='center-center w-[13.125rem] h-[3.125rem] rounded-[0.625rem] gap-[0.625rem] bg-lemongreen'>
                <img src="/svg/SvgImage/PlusSign.svg" alt="" />
                <span className='text-black'>Add Organizations</span>
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
                  <th className='pr-[14.75rem] pb-[0.8125rem]'>Organization</th>
                  <th className='pr-[16.125rem] pb-[0.8125rem]'>Admin</th>
                  <th className='pr-[10.875rem] pb-[0.8125rem]'>Employees</th>
                  <th className='pr-[11.75rem] pb-[0.8125rem]'>Status</th>
                  <th className='pr-[6.5rem] pb-[0.8125rem]'>Created</th>
                  <th className='pr-[8.9375rem] pb-[0.8125rem]'>Action</th>
                </tr>
              </thead>
              <tbody >
                {organizations.map((org)=> (
                  <tr key={org.id}>
                    <td className='pt-[2.1875rem]'>
                      <div className='flex items-center gap-[0.9375rem]'>
                        <div className='w-[2.4375rem] h-[2.4375rem] bg-lemongreen rounded-full '></div>
                        <div>
                          <h1 className='text-limeLight'>{org.name}</h1>
                          <h4 className='textLimegray'>{org.domain}</h4>
                        </div>
                      </div>
                    </td>
                    <td className='pt-[2.1875rem]'>
                      <div>
                        <h1 className='text-limeLight'>{org.adminFirstName}</h1>
                        <h4 className='textLimegray'>{org.adminEmail}</h4>
                      </div>
                    </td>
                    <td className='pt-[2.1875rem] '>
                      <div className='flex gap-[0.4375rem]'>
                        <img src="/image/Icon/Action/users.png" alt="" />
                        <span className='text-limegray'>{org.EmployeeManagment}</span>
                      </div>
                    </td>
                    <td className='pt-[2.1875rem]'>
                      <span className={`bg-[rgba(190,229,50,0.05)] px-[20px] py-[8px] rounded-full ${handleState(org.status)} `}></span>
                    </td>
                    <td className='pt-[2.1875rem]'>
                      <div>
                        <h4 className='text-limegray'>{new Date(org.createdAt).toLocaleDateString()}</h4>
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

