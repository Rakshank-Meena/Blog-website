import React from 'react'

const LazyLoader = () => {
    const arr = [1, 2, 3]
    return (

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 w-full mx-auto lg:w-[62rem] p-10 '>
            {arr.map((item: any, i: number) => {
                return (
                    <div key={`lazy${i}`} className="bg-neutral1 shadow-xl rounded-xl p-6  h-32 w-full lg:h-52 animate-pulse">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4 lg:h-28 h-3/5 w-full bg-neutral2 rounded-lg "><span></span></h2>
                        <div className="flex justify-between items-center h-1/5 w-full bg-neutral2 rounded-lg">
                            <div className="flex justify-between items-center ">
                                <div className="flex items-center">
                                    <span className="text-gray-600 text-sm mr-2 capitalize"></span>
                                    <span className="text-gray-800 text-sm"></span>
                                </div>
                            </div>
                            <div className="text-blue-500  my-auto hover:text-blue-600"></div>
                        </div>
                    </div>
                )
            })}

        </div>
    )
}

export default LazyLoader
