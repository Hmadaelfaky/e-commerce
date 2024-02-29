import React from 'react'
import img from '../../src/assests/error.svg'

export default function NotFound() {
  return (
    <div className='py-4 text-center'>
      <img src={img} alt="Error!!" className='w-50' />
    </div>
  )
}
