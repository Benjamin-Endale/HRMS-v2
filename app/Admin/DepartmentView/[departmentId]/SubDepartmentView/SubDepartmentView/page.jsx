'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AddDep from '@/app/Modals/AddDep/AddDep'
import ModalContainerDep from '@/app/Modals/AddDep/ModalContainerDep'
import { useRouter } from 'next/navigation'

const Page = ({subDepartments}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenDep, setIsOpenDep] = useState(false)
  const [page, setPage] = useState(1)
  const router = useRouter()

 

  // Pagination setup: 4 cards per page
  const perPage = 8
  const totalPages = Math.ceil(subDepartments.length / perPage)
  const startIndex = (page - 1) * perPage
  
  
  if(subDepartments.message === 'No sub-departments found for this main department.'){
    return         <div className='flex-col center-center   h-175 m-auto'>
                    <h4 className='text-Error'>No Sub Department</h4>
                    <h4 className='text-lemongreen font-bold cursor-pointer' onClick={()=>router.back()}>Back</h4>
                  </div>
  }
    const currentDepartments = subDepartments.slice(startIndex, startIndex + perPage)

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
 
        {/* Main container */}
        <div className='space-y-[1.4375rem] pb-[7rem]'>
          <div className='between-center mb-[4.0625rem]'>
            <div className='flex items-center gap-[0.9375rem]'>
                <img onClick={() => router.back()} className='cursor-pointer' src="/image/Icon/ArrowLeft.png" alt="Back" />
                <h1 className='textWhite'>Sub Department List</h1>
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
                  <div key={dep.subDepartmentName} className='relative organizationCard'>
                    <button className='flex flex-col gap-[3.75rem] cursor-pointer'>
                        <div className='flex flex-col items-start'>
                          <h1 className='textWhite'>{dep.subDepartmentName}</h1>
                          <h4 className='text-limegray'>Under: {dep.parentDepartmentName}</h4>
                        </div>
                        <div className='rounded-[2.0625rem] w-[9rem] h-[2.8125rem] bg-[rgba(190,229,50,0.05)] center-center'>
                          <h4 className='text-lemongreen text-sm'>
                            Sub Department
                          </h4>
                        </div>
                    </button>
                  </div>
                )) }
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page
