import React from 'react';
import '../styles/tailwind.css';
import {iconUrlFromCode, formatToLocalTime} from '../services/weatherService.js';


export default function Forecaste({weather:{dailyData, hourlyData},timezone}) {
  
  return (
    <div>
<div className='flex items-center justify-start'>
    <p className='text-white uppercase font-bold'>Hourly Forecast</p>
</div>
<hr className='mt-2'/>

<div className='flex flex-row items-center justify-between text-white py-2'>
    {hourlyData.splice(0,5).map(item=>
    <div className='flex flex-col'>
    <p>{formatToLocalTime(item.dt,timezone,"ccc dd | hh:mm a")}</p>
    <p><img src={iconUrlFromCode(item.weather[0].icon)} style={{width:"50px", height:"50px"}}/></p>

    <p className='px-2 font-medium'>{(item.main.temp).toFixed()} &#1760;</p>
    </div>
    )}
</div>


<div className='flex items-center justify-start'>
    <p className='text-white uppercase font-bold'>6 Days Forecast</p>
</div>
<hr className='mt-2'/>

<div className='flex flex-row items-center justify-between text-white py-2'>
        {
            dailyData.map(item=>
    <div className='flex flex-col'> 
             <p>{formatToLocalTime(item.dt,timezone,'ccc | dd')}</p>
             <p><img src={iconUrlFromCode(item.weather[0].icon)} style={{width:"50px", height:"50px"}}/></p>
             <p className='px-2 font-medium'>{(item.main.temp).toFixed()} &#1760;</p>
             </div> 
        )}
</div>

    </div>
  )
}