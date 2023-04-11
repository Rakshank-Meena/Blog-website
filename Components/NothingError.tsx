import React from 'react'

const NothingError = (props:{text:String}) => {
  return (
    <div className='min-h-[60vh] capitalize  w-full flex justify-center items-center'>
      <div className='text-4xl w-fit '>
        {props.text}
      </div>
    </div>
  )
}

export default NothingError
