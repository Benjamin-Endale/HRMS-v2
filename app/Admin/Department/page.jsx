'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AddDep from '@/app/Modals/AddDep/AddDep'
import ModalContainerDep from '@/app/Modals/AddDep/ModalContainerDep'
import { useRouter } from 'next/navigation'

const Page = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenDep, setIsOpenDep] = useState(false)
  const [page, setPage] = useState(1)
  const router = useRouter()

  const departments = [
    { deptName: 'Engineering', Head: 'Benjamin Endale', EmpLength: '324' },
    { deptName: 'Marketing', Head: 'Bereket Daniel', EmpLength: '234' },
    { deptName: 'Finance', Head: 'Kaleb Saifu', EmpLength: '200' },
    { deptName: 'Sales', Head: 'Salem Mesfin', EmpLength: '150' },
    { deptName: 'Human Resources', Head: 'Shalom Mesfin', EmpLength: '120' },
    { deptName: 'Operations', Head: 'Mikiyas Tesfaye', EmpLength: '210' },
    { deptName: 'Design', Head: 'Saron Mulu', EmpLength: '115' },
    { deptName: 'Customer Support', Head: 'Daniel Alemu', EmpLength: '180' },
  ]

  // Pagination setup: 4 cards per page
  const perPage = 8
  const totalPages = Math.ceil(departments.length / perPage)
  const startIndex = (page - 1) * perPage
  const currentDepartments = departments.slice(startIndex, startIndex + perPage)

  // Slide animation direction
  const [direction, setDirection] = useState(0)

  const nextPage = () => {
    if (page < totalPages) {
      setDirection(1)
      setPage((prev) => prev + 1)
    }
  }

  const prevPage = () => {
    if (page > 1) {
      setDirection(-1)
      setPage((prev) => prev - 1)
    }
  }

  return (
    <>
      <div className='space-y-[4.0625rem] font-semibold overflow-hidden'>
        {/* Header */}
        <div className='flex items-center justify-between pl-[5.125rem] pr-[3.4375rem] h-[12.1875rem] rounded-2xl bg-[rgba(190,229,50,0.05)]'>
          <div className='flex items-center gap-[1.6875rem]'>
            <div className="border-4 border-white bg-center bg-[url(/image/OrganizationCircle.png)] w-[7.40625rem] h-[7.4375rem] rounded-[7.410625rem]"></div>
            <div>
              <h1 className='text-white text-xl'>Onyx Technology Inc.</h1>
              <h4 className='textLimegray'>Technology Solution Company</h4>
            </div>
          </div>

          <div className='flex gap-[1.375rem]'>
            <div className='w-[14.875rem] h-[3.4375rem] bg-lemongreen rounded-[0.625rem]'>
              <button
                type='button'
                onClick={() => setIsOpen(true)}
                className='cursor-pointer w-full h-full rounded-[0.625rem] flex items-center justify-center gap-[10px]'
              >
                <img src="/svg/SvgImage/PlusSign.svg" alt="" />
                <span>Add Department</span>
              </button>
              <ModalContainerDep open={isOpen}>
                <AddDep onClose={() => setIsOpen(false)} />
              </ModalContainerDep>
            </div>
          </div>
        </div>

        {/* Main container */}
        <div className='space-y-[1.4375rem] pb-[7rem]'>
          <div className='between-center'>
            <div>
              <h1 className='text-white'>Department Overview ({departments.length})</h1>
            </div>

            {/* Pagination Controls */}
            <div className='flex gap-[1.5625rem] items-center'>
              <button
                onClick={prevPage}
                disabled={page === 1}
                className='text-limegray cursor-pointer disabled:opacity-40'
              >
                Back
              </button>

              <div className='flex gap-[10px]'>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setDirection(i + 1 > page ? 1 : -1)
                      setPage(i + 1)
                    }}
                    className={`w-[42px] h-[41px] rounded-[7px] border ${
                      page === i + 1
                        ? 'bg-lemongreen text-black border-none'
                        : 'border-limegray text-limegray'
                    }`}
                  >
                    <h1>{i + 1}</h1>
                  </button>
                ))}
              </div>

              <button
                onClick={nextPage}
                disabled={page === totalPages}
                className='text-limegray cursor-pointer disabled:opacity-40'
              >
                Next
              </button>
            </div>
          </div>

          {/* Department Cards with Slide Animation */}
          <div className='relative w-full overflow-hidden h-auto'>
            <AnimatePresence mode='wait' custom={direction}>
              <motion.div
                key={page}
                custom={direction}
                variants={{
                  enter: (dir) => ({
                    x: dir > 0 ? 1000 : -1000,
                    opacity: 0,
                  }),
                  center: {
                    x: 0,
                    opacity: 1,
                  },
                  exit: (dir) => ({
                    x: dir > 0 ? -1000 : 1000,
                    opacity: 0,
                  }),
                }}
                initial='enter'
                animate='center'
                exit='exit'
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className='grid grid-cols-4 gap-[2.75rem]'
              >
                {currentDepartments.map((dep) => (
                  <div key={dep.deptName} className='relative organizationCard'>
                    <button className='flex flex-col gap-[3.75rem] cursor-pointer' onClick={()=>router.push("./DepartmentView")}>
                        <div className='flex flex-col items-start'>
                          <h1 className='textWhite'>{dep.deptName}</h1>
                          <h4 className='text-limegray'>Head: {dep.Head}</h4>
                        </div>
                        <div className='rounded-[2.0625rem] w-[9rem] h-[2.8125rem] bg-[rgba(190,229,50,0.05)] center-center'>
                          <h4 className='text-lemongreen text-sm'>
                            {dep.EmpLength} employees
                          </h4>
                        </div>
                    </button>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page
