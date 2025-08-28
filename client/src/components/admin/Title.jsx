import React from 'react'

export default function Title({text1,text2}) {
  return (
  <>
  <h1 className='font-medium text-2xl'>
    {text1} <span className='text-red-500 underline'>{text2}</span>

  </h1>
  </>
  )
}
