import React from 'react'

const SubsItemTable = ({email,deleteEmail,date,mongoId}) => {

     const BlogDate = new Date(date || Date.now());

  return (
    <tr className='bg-white border-b text-left'>
      <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
        {email?email:"No Email"}
      </th>
      {/* Date */}
      <td className="px-6 py-4 hidden sm:block">
        {BlogDate.toDateString()}
      </td>

      {/* Action */}
      <td onClick={()=>deleteEmail(mongoId)} className="px-6 py-4 cursor-pointer text-red-500 font-bold">
        X
      </td>
    </tr>
  )
}

export default SubsItemTable
