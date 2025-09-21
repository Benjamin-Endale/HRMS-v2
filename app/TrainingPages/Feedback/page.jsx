import React from 'react'
import SubNavigation from '@/app/SubNavigation'
const page = () => {
  return (
   <>
    <SubNavigation readPath="/TrainingPages/Feedback"/>
      <div className='flex flex-col gap-[2.1875rem] '>
                          <div className='flex flex-col'>
                              <h1 className='textFormColor'>Training Feedback </h1>
                              <h4 className='textLimegray'>Collect and analyze training program feedback</h4>
                          </div>
                          <table>
            <thead className='tableBordercolor'>
                <tr className='text-formColor'>
                    <th className='pb-[0.8125rem] pr-[24rem]'>Employee</th>
                    <th className='pb-[0.8125rem] pr-[16.6875rem]'>Program</th>
                    <th className='pb-[0.8125rem] pr-[13.75rem]'>Feedback</th>
                </tr>
            </thead>
            <tbody>
                <tr className='text-limegray'>
                    <td className='pt-[2.3125rem]'>
                      <p className='font-semibold'>John Smith</p>
                      <p>Senior Software Engineer</p>
                    </td>                   
                    <td className='pt-[2.3125rem]'>Advanced React Development</td>
                    <td className='pt-[2.3125rem]'>
                        John has been doing excellent work on the new architecture. His attention to detail and problem-solving skills are outstanding.John has been doing excellent work on the new architecture. His attention to detail and problem-solving skills are outstanding.
                    </td>                    
                </tr>
            </tbody>
                <tbody>
                <tr className='text-limegray'>
                    <td className='pt-[2.3125rem]'>
                      <p className='font-semibold'>John Smith</p>
                      <p>Senior Software Engineer</p>
                    </td>                   
                    <td className='pt-[2.3125rem]'>Advanced React Development</td>
                    <td className='pt-[2.3125rem]'>
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