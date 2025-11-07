

'use client'
import React , {useState} from 'react'
import AddOrg from '@/app/Modals/AddOrg/AddOrg'
import ModalContainerOrg from '@/app/Modals/AddOrg/ModalContainerOrg'
import ModalContainerDep from '@/app/Modals/AddDep/ModalContainerDep'
import AddDep from '@/app/Modals/AddDep/AddDep'
import { useSearchFilter } from '@/app/Components/useSearchFilter';
import { useRouter } from 'next/navigation'
const page = ({tenantId, org}) => {
  const [isOpen,setisOpen] = useState(false)
  const router = useRouter()
  const { searchTerm, setSearchTerm, filteredItems: filteredOrgs } = useSearchFilter(org, [
    "name",
    "orgCode",
  ]);
  return (
    <>
    {/* theMaincontainer */}
      <div className='space-y-[4.0625rem] font-semibold'>
        {/* theHeadersection */}
        <div className='flex items-center justify-between pl-[5.125rem] pr-[3.4375rem] h-[12.1875rem]  rounded-2xl bg-[rgba(190,229,50,0.05)]'>
          {/* firstsectionHeader */}
          <div className='flex items-center gap-[1.6875rem]'>
            <div className="border-4 border-white bg-center bg-[url(/image/OrganizationCircle.png)]  w-[7.40625rem] h-[7.4375rem]  rounded-[7.410625rem]"></div>
              <div>
                <h1 className='text-white text-xl'>Onyx Technology Inc.</h1>
                <h4 className='textLimegray'>Technology Solution Company</h4>
              </div>
          </div>
          {/* secondPartheader */}
          <div className='flex gap-[1.375rem]'>
            <div className='w-[14.875rem] h-[3.4375rem] bg-lemongreen rounded-[0.625rem]'>
              
              <button type='button' onClick={()=>setisOpen(true)} className='cursor-pointer w-full h-full rounded-[0.625rem] flex items-center justify-center gap-[10px]'>
                <img src="/svg/SvgImage/PlusSign.svg" alt="" />
                <span>Add Organization</span>
              </button>            
                {/* Modal */}
                <ModalContainerOrg  open={isOpen}>
                    <AddOrg tenantId={tenantId} onClose={() => setisOpen(false)} />
                </ModalContainerOrg>
            </div>
          </div>
          {/* secondPartheaderEnd */}
        </div>
        {/* themainContainer */}
        <div className='space-y-[3.0625rem]'>
          <div className='space-y-[2.375rem]'>
            <div className='space-y-[0.5rem]'>
              <h1 className='text-white'>Organization Overview(5)</h1>
              <h4 className='textLimegray'>A list of all organization  in your tenants</h4>
            </div>
            <div className=' h-[3.4375rem] flex items-center gap-[1.1875rem] bg-[#1D2015] rounded-[0.625rem] px-[1.4375rem]'>
              <img src="/image/Icon/SearchIcon.png" alt="" />
              <input
              
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}

                placeholder="Search employee by name,email or ID"
                className='placeholder-input text-white w-full h-full outline-0'
              />
            </div>
          </div>
          <div className='h-[31.25rem] overflow-y-auto scrollBarDash'>
            <table className='w-full text-left'>
              <thead className='text-white border-b border-limegray'>
                <tr className='text-nowrap'>
                  <th className='pb-[0.8125rem] pr-[5.375rem]'>Organization Name</th>
                  <th className='pb-[0.8125rem] pr-[5.4375rem]'>Organization Code</th>
                  <th className='pb-[0.8125rem] pr-[8.875rem]'>Domain</th>
                  <th className='pb-[0.8125rem] pr-[8.875rem]'>Industry</th>
                  <th className='pb-[0.8125rem] pr-[10.375rem]'>Location</th>
                  <th className='pb-[0.8125rem] pr-[6.875rem]'>Company Logo </th>
                  <th className='pb-[0.8125rem] pr-[8.25rem]'>Action</th>
                </tr>
              </thead>
              <tbody className='text-input '>
                {filteredOrgs && filteredOrgs.length > 0 ? (filteredOrgs.map((org) => (
                    <tr key={org.orgCode} className=''>
                    <td className='pt-[2.3125rem]  text-limeLight'>{org.name}</td>
                    <td className='pt-[2.3125rem]  text-limegray'> {org.orgCode}</td>
                    <td className='pt-[2.3125rem] pr-[10px] text-limegray'> {org.domain}</td>
                    <td className='pt-[2.3125rem]  text-limegray'> {org.industry}</td>
                    <td className='pt-[2.3125rem]  text-limegray'> {org.location}</td>
                    <td className='pt-[2.3125rem]  text-lemongreen'>View</td>
                    <td className='flex items-center gap-[2.5625rem] pt-[2.1875rem]'>
                        <button className='cursor-pointer' onClick={() => router.push(`/Admin/OrganizationView`)}>
                        <img src="/image/Icon/Action/eye.png" alt="" />
                        </button>
                        <button className='cursor-pointer' onClick={() => router.push(`/Admin/EmployeeEdit/${emp.employeeID}`)}>
                        <img src="/image/Icon/Action/pen.png" alt="" />
                        </button>
                        <button>
                        <img src="/image/Icon/Action/Trash.png" alt="" />
                        </button>
                    </td>
                    </tr>
                ))
            ) : (
                <tr><td colSpan="7" className="pt-[2rem] text-center text-Error">No Organizations found</td></tr>
            )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default page