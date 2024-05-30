import React from 'react'

export default function TopButtons(params) {
    const Cities = [
        {
            id:1,
            Cityname:'Hyderabad'
        },
        {
            id:2,
            Cityname:'New Delhi'
        },
        {
            id:3,
            Cityname:'Chennai'
        },
    ]

  return (
    <div className='flex items-center justify-around my-6'>
        {Cities.map((item)=>
        <button className='text-white' key={item.id} 
        onClick={()=>params.setquery({q:item.Cityname})}>{item.Cityname}</button>
        )}
    </div>
  )
}
