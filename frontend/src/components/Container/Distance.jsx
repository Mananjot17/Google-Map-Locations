import React from 'react'

function Distance({origin, destination, distance}) {
  return (
    <div className='border border-gray-300 rounded-xl max-w-md'>
        <div className='text-black text-xl flex justify-between bg-white px-6 py-3 rounded-tl-xl rounded-tr-xl'>
            <span className='font-bold'>Distance</span>
            <span className='text-blue-600 font-bold'>{distance}</span>
        </div>
        <div className='py-2 px-3 mb-5 text-black'>
            <p>The distance between <span className='font-bold'>{origin}</span> and <span className='font-bold'>{destination}</span> via the selected route is <span className='font-bold'>{distance}</span></p>
        </div>

    </div>
  )
}

export default Distance