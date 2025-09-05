import React from 'react'


const page = () => {
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
          {/* firstsectionHeaderEnd */}

          {/* secondPartheader */}
          <div className='w-[14.875rem] h-[3.4375rem]  rounded-[0.625rem] bg-lemongreen'>
            <button type='button'  className='cursor-pointer w-full h-full rounded-[0.625rem] flex items-center justify-center gap-[10px]'>
              <img src="/svg/SvgImage/PlusSign.svg" alt="" />
              <span>Edit Organization</span>
            </button>
            
          </div>
          {/* secondPartheaderEnd */}
        </div>
        {/* themainContainer */}
        <div className=' space-y-[1.4375rem] pb-[7rem]'>
          <h1 className='text-white'>Department Overvire(5)</h1>
          
          {/* themainHolder */}
          <div className='w-full grid grid-cols-4 gap-[2.75rem]'>
              <div className='relative organizationCard'>
                <div className='flex flex-col gap-[3.75rem]'>
                  <div>
                    <h1 className='textWhite'>Engineering</h1>
                    <h4 className='text-limegray'>Head: Benjamin Endale</h4>
                  </div>
                  <div className='rounded-[2.0625rem] w-[9rem] h-[2.8125rem] bg-[rgba(190,229,50,0.05)] center-center'>
                    <h4 className='text-lemongreen text-sm'>324 employees</h4>
                  </div>
                </div>
              </div>
              <div className='organizationCard'>
                <div className='flex flex-col gap-[3.75rem]'>
                  <div>
                    <h1 className='textWhite'>Engineering</h1>
                    <h4 className='text-limegray'>Head: Benjamin Endale</h4>
                  </div>
                  <div className='rounded-[2.0625rem] w-[9rem] h-[2.8125rem] bg-[rgba(190,229,50,0.05)] center-center'>
                    <h4 className='text-lemongreen text-sm'>324 employees</h4>
                  </div>
                </div>
              </div>
              <div className='organizationCard'>
                <div className='flex flex-col gap-[3.75rem]'>
                  <div>
                    <h1 className='textWhite'>Engineering</h1>
                    <h4 className='text-limegray'>Head: Benjamin Endale</h4>
                  </div>
                  <div className='rounded-[2.0625rem] w-[9rem] h-[2.8125rem] bg-[rgba(190,229,50,0.05)] center-center'>
                    <h4 className='text-lemongreen text-sm'>324 employees</h4>
                  </div>
                </div>
              </div>
              <div className='organizationCard'>
                <div className='flex flex-col gap-[3.75rem]'>
                  <div>
                    <h1 className='textWhite'>Engineering</h1>
                    <h4 className='text-limegray'>Head: Benjamin Endale</h4>
                  </div>
                  <div className='rounded-[2.0625rem] w-[9rem] h-[2.8125rem] bg-[rgba(190,229,50,0.05)] center-center'>
                    <h4 className='text-lemongreen text-sm'>324 employees</h4>
                  </div>
                </div>
              </div>
                            <div className='organizationCard'>
                <div className='flex flex-col gap-[3.75rem]'>
                  <div>
                    <h1 className='textWhite'>Engineering</h1>
                    <h4 className='text-limegray'>Head: Benjamin Endale</h4>
                  </div>
                  <div className='rounded-[2.0625rem] w-[9rem] h-[2.8125rem] bg-[rgba(190,229,50,0.05)] center-center'>
                    <h4 className='text-lemongreen text-sm'>324 employees</h4>
                  </div>
                </div>
              </div>
              <div className='organizationCard1 '>
                <div className='flex-col center-center gap-[8px]'>
                  <img src="/svg/SvgImage/BigPlusSign.svg" alt="" />
                  <h4 className='text-limegray'>Add Department </h4>
                </div>
              </div>              
          </div>
        </div>
      </div>
    </>
  )
}

export default page