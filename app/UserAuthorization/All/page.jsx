import react from 'react';
import SubNavigation from '@/app/SubNavigation'
const page = () => {
  return (
    <>
     <SubNavigation readPath="/UserAuthorization/All"/>
    <div className='mt-[2.75rem]'>
      <div className='flex items-center gap-[2.125rem]'>
          <div className='w-[71.9375rem] h-[3.4375rem]  flex items-center gap-[1.1875rem] bg-[#1D2015] rounded-[0.625rem] px-[1.4375rem] '>
            <img src="/image/Icon/SearchIcon.png" alt="" />
            <input type="search" placeholder="Search employee by name,email or ID" className='placeholder-input text-white  w-full h-full outline-0' name="" id="" />
          </div>
          <div className='w-[18.125rem] h-[3.4375rem]  flex items-center justify-center rounded-[0.625rem] bg-[#151812] gap-[4.6875rem]'>
            <div className='flex items-center gap-[0.625rem]'>
              <img src="/svg/SvgImage/Filter.svg" alt="" />
              <span className='text-white'>All Department</span>
            </div>
            <img src="/imgae/Icon/ArrowDown.png" alt="" />
          </div>
      </div>
    </div>
     <div className='h-[31.25rem]  overflow-y-auto scrollBarDash mt-[5.3125rem]'>
        <table className='w-full text-left'>
           <thead className='text-white border-b border-limegray'>
            <tr>
              <th className='pb-[0.8125rem] pr-[4.3125rem]'>Employee ID</th>
              <th className='pb-[0.8125rem] pr-[6.75rem]'>Employee Name</th>
              <th className='pb-[0.8125rem] pr-[4.75rem] '>Department</th>
              <th className='pb-[0.8125rem] pr-[14.875rem] '>Email</th>
              <th className='pb-[0.8125rem] pr-[13.5rem]'>Position</th>
              <th className='pb-[0.8125rem] pr-[10.125rem]'>Role</th>
              <th className='pb-[0.8125rem] '>Action</th>
            </tr>
          </thead>
          <tbody className='textLimeGray1'>
            <tr>
              <td className='pt-[2.25rem]'>EMP002</td>
              <td className='pt-[2.25rem]'>Benjamin Endale</td>
              <td className='pt-[2.25rem]'>Engineering</td>
              <td className='pt-[2.25rem]'>Benjaminendale@gmail.com</td>
              <td className='pt-[2.25rem] max-w-[150px] whitespace-normal break-words'>Senior Software Developer</td>
              <td className='pt-[2.25rem]'>--</td>
              <td className='flex items-center gap-[2.5625rem] pt-[2.25rem]'>  
              <div className='flex items-center border rounded-full  border-[#303030] gap-[0.375rem] px-[12px] py-[6px]'>
                    <img src="/image/Icon/Action/Right.png" alt="" />
                    <span className='text-lemongreen text-sm'>Accept</span>
                  </div>              
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
};
export default page;