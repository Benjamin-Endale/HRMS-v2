"use client";
import React from "react";
import SubNavigation from '@/app/SubNavigation'

const Page = () => {
  return (
    // <div className="space-y-[2.5rem]">
    //   {/* Top Search & Filter */}
    //   <div className="flex items-center gap-[2.125rem]">
    //     {/* Search */}
    //     <div className="w-[71.9375rem] h-[3.4375rem] flex items-center gap-[1.1875rem] bg-[#1D2015] rounded-[0.625rem] px-[1.4375rem]">
    //       <img src="/image/Icon/SearchIcon.png" alt="search" />
    //       <input
    //         type="search"
    //         placeholder="Search program"
    //         className="placeholder-input text-white w-full h-full outline-0 bg-transparent"
    //       />
    //     </div>

    //     {/* Filter */}
    //     <div className="w-[18.125rem] h-[3.4375rem] flex items-center justify-between px-[1.5rem] rounded-[0.625rem] bg-[#151812] cursor-pointer">
    //       <div className="flex items-center gap-[0.625rem]">
    //         <img src="/svg/SvgImage/Filter.svg" alt="filter" />
    //         <span className="text-white">All Category</span>
    //       </div>
    //       <img src="/image/Icon/ArrowDown.png" alt="arrow" />
    //     </div>
    //   </div>

    //   {/* Table */}
    //   <table className="w-full text-left">
    //     <thead className="border-b border-[#2C2C2C] text-formColor">
    //       <tr>
    //         <th className="pb-[0.8125rem]">Course Name</th>
    //         <th className="pb-[0.8125rem]">Instructor</th>
    //         <th className="pb-[0.8125rem]">Duration</th>
    //         <th className="pb-[0.8125rem]">Level</th>
    //         <th className="pb-[0.8125rem]">Category</th>
    //         <th className="pb-[0.8125rem]">Action</th>
    //       </tr>
    //     </thead>

    //     <tbody>
    //       {/* Row 1 */}
    //       <tr className="text-limegray border-b border-[#2C2C2C]">
    //         <td className="pt-[2.3125rem]">
    //           <p className="font-semibold">React Hooks Deep Dive</p>
    //           <p className="text-sm">Feb 01, 2024</p>
    //         </td>

    //         <td className="pt-[2.3125rem] flex items-center gap-[0.5rem]">
    //           <img src="/image/Icon/Instructor.png" alt="instructor" />
    //           <span>John Smith</span>
    //         </td>

    //         <td className="pt-[2.3125rem] flex items-center gap-[0.5rem]">
    //           <img src="/image/Icon/Clock.png" alt="duration" />
    //           <span>20 Hour</span>
    //         </td>

    //         <td className="pt-[2.3125rem]">
    //           <span className="px-[1rem] py-[0.25rem] rounded-[2.0625rem] bg-[#FF6B6B] text-white text-sm">
    //             Advance
    //           </span>
    //         </td>

    //         <td className="pt-[2.3125rem]">
    //           <span className="text-sm">Technical</span>
    //         </td>

    //         <td className="pt-[2.3125rem] flex gap-[0.75rem]">
    //           <button className="w-[7rem] h-[2.5rem] rounded-[2.0625rem] bg-[#2C2C2C] text-white">
    //             View
    //           </button>
    //           <button className="w-[7rem] h-[2.5rem] rounded-[2.0625rem] bg-lemongreen text-black font-semibold">
    //             Register
    //           </button>
    //         </td>
    //       </tr>

    //       {/* Row 2 (duplicate for example) */}
    //       <tr className="text-limegray">
    //         <td className="pt-[2.3125rem]">
    //           <p className="font-semibold">React Hooks Deep Dive</p>
    //           <p className="text-sm">Feb 01, 2024</p>
    //         </td>

    //         <td className="pt-[2.3125rem] flex items-center gap-[0.5rem]">
    //           <img src="/image/Icon/Instructor.png" alt="instructor" />
    //           <span>John Smith</span>
    //         </td>

    //         <td className="pt-[2.3125rem] flex items-center gap-[0.5rem]">
    //           <img src="/image/Icon/Clock.png" alt="duration" />
    //           <span>20 Hour</span>
    //         </td>

    //         <td className="pt-[2.3125rem]">
    //           <span className="px-[1rem] py-[0.25rem] rounded-[2.0625rem] bg-[#FF6B6B] text-white text-sm">
    //             Advance
    //           </span>
    //         </td>

    //         <td className="pt-[2.3125rem]">
    //           <span className="text-sm">Technical</span>
    //         </td>

    //         <td className="pt-[2.3125rem] flex gap-[0.75rem]">
    //           <button className="w-[7rem] h-[2.5rem] rounded-[2.0625rem] bg-[#2C2C2C] text-white">
    //             View
    //           </button>
    //           <button className="w-[7rem] h-[2.5rem] rounded-[2.0625rem] bg-lemongreen text-black font-semibold">
    //             Register
    //           </button>
    //         </td>
    //       </tr>
    //     </tbody>
    //   </table>o
    // </div>
    <>
        <SubNavigation readPath="/UserAuthorization/AuthAll"/>

    <div className="flex items-center gap-[2.125rem]">
        {/* Search */}
        <div className="w-[71.9375rem] h-[3.4375rem] flex items-center gap-[1.1875rem] bg-[#1D2015] rounded-[0.625rem] px-[1.4375rem]">
          <img src="/image/Icon/SearchIcon.png" alt="search" />
          <input
            type="search"
            placeholder="Search program"
            className="placeholder-input text-white w-full h-full outline-0 bg-transparent"
          />
        </div>

        {/* Filter */}
        <div className="w-[18.125rem] h-[3.4375rem] flex items-center justify-between px-[1.5rem] rounded-[0.625rem] bg-[#151812] cursor-pointer">
          <div className="flex items-center gap-[0.625rem]">
            <img src="/svg/SvgImage/Filter.svg" alt="filter" />
            <span className="text-white"> Category</span>
          </div>
          <img src="/image/Icon/ArrowDown.png" alt="arrow" />
        </div>
      </div>     
        <div className="flex gap-[2.5625rem] pt-[3.5625rem]">
          <div className="flex flex-col gap-[5.8125rem]   w-[21.4375rem]  h-[21rem] border border-limegray rounded-[2.0625rem] " >
          <div className="flex justify-between  pl-[1.875rem] pt-[2.1875rem]">
            <div>
            <h1 className="textFormColor">React Hooks Deep Dive</h1>
            <p className="text-limegray">Feb 01, 2024 </p>
            <p className="text-limegray">  Comprehensive course covering advanced React patterns, hooks, and performance optimization </p>
          </div>
<button type="button" className='cursor-pointer'>
                  <img src="/image/Icon/Action/Trash.png" alt="" />
                </button>             {/* <ProgressDashPerformance percentage={per.percentage} low={'bg-[#E3694A]'} high={'bg-[#BEE532]'} medium={'bg-[#F7AB1E]'}/> */}
          </div>
            <div className=" px-[1.875rem]"> 
                <div className="flex justify-between"><p className="text-white text-[0.9375rem]">Progress</p>
                <p className="textLimelight ">34%</p>
                </div>
              </div>
        </div>
  <div className="flex flex-col gap-[5.8125rem]  w-[21.4375rem]  h-[21rem] border border-limegray rounded-[2.0625rem] " >
          <div className="flex justify-between  px-[1.875rem] pt-[2.1875rem]">
            <div>
            <h1 className="textFormColor">React Hooks Deep Dive</h1>
            <p className="text-limegray">Feb 01, 2024 </p>
            <p className="text-limegray">  Comprehensive course covering advanced React patterns, hooks, and performance optimization </p>
          </div>
          <div className="flex items-center"><img src="/image/Icon/Action/Trash.png" alt="" /></div>
             {/* <ProgressDashPerformance percentage={per.percentage} low={'bg-[#E3694A]'} high={'bg-[#BEE532]'} medium={'bg-[#F7AB1E]'}/> */}
              
          </div>
          <div className="px-[1.875rem]"> 
                <div className="flex justify-between"><p className="text-white text-[0.9375rem]">Progress</p>
                <p className="textLimelight ">34%</p>
                </div>
              </div>
        </div>
        </div> 
      </>
  );
};

export default Page;
