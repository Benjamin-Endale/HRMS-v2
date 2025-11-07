import React from 'react'
import SubNavigation from '@/app/SubNavigation'
const page = () => {
  return (
   <>
    <SubNavigation readPath="/TrainingPages/Feedback"/>
      <div className='flex flex-col gap-[2.1875rem] font-semibold'>
        <div className='flex flex-col'>
            <h1 className='textFormColor'>Training Feedback </h1>
            <h4 className='textLimegray'>Collect and analyze training program feedback</h4>
        </div>
        <table>
          <thead className='tableBordercolor'>
              <tr className='text-formColor'>
                  <th className='pb-[0.8125rem] pr-[14.9375rem]'>Employee</th>
                  <th className='pb-[0.8125rem] pr-[18.25rem]'>Program</th>
                  <th className='pb-[0.8125rem] pr-[46.125rem]'>Feedback</th>
              </tr>
          </thead>
          <tbody>
              <tr className=''>
                  <td className='pt-[2.3125rem]'>
                    <p className='text-limeLight '>John Smith</p>
                    <p className='text-limegray'>Senior Software Engineer</p>
                  </td>                   
                  <td className='pt-[2.3125rem] text-limegray'>Advanced React Development</td>
                  <td className='pt-[2.3125rem] textLimegray'>
                      John has been doing excellent work on the new architecture. His attention to detail and problem-solving skills are outstanding.John has been doing excellent work on the new architecture. His attention to detail and problem-solving skills are outstanding.
                  </td>                    
              </tr>
          </tbody>
        </table> 
      </div>   
    </>
  )
}

export default page