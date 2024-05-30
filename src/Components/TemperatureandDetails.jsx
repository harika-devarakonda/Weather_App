import React, { useEffect, useState } from 'react';
import {iconUrlFromCode, formatToLocalTime} from '../services/weatherService.js';

export default function TemperatureandDetails({weather:{timezone,icon,temp,temp_max,temp_min,pm10,sunrise,sunset,speed,humidity,feels_like,details}, units}) {
  const [unit , setUnit]=useState(" ");

  useEffect(()=>{
  
setTimeout(()=>{
    if(units==='metric'){
      setUnit("C")
    }else{
      setUnit("F")
    }
  
  },1000)

    
  },[units])
  
  return (
    <div>

  <div className='flex items-center justify-center py-4'>
        <p className='text-white text-lg font-extralight'>{details}</p>
    </div>

    <div className='flex items-center justify-between text-white py-2'>
       <img src={iconUrlFromCode(icon)} style={{width:"100px",height:"100px"}}></img>
        <p className='text-5xl'>{temp.toFixed()}&#1760;<span className='text-4xl ml-2'>{unit}</span></p>
        <div className='flex flex-col items-left justify-left'>
        <p><span className='bi bi-thermometer-sun  text-lg mr-1 px-1'></span>Feels Like  <span className='text-l font-bold text-orange-300'>{feels_like.toFixed()} &#1760;</span></p>
        <p><span className='bi bi-moisture text-lg mr-1 px-1'></span>Humidity  <span className='text-l font-bold text-orange-300'>{humidity.toFixed()}%</span></p>
        <p><span className='bi bi-wind text-lg mr-1 px-1'></span>Wind <span className='text-l font-bold text-orange-300'>{speed.toFixed()}km/h;</span></p>

    </div>
    </div>

    <div className='flex flex-row items-center justify-between text-white py-2'>
        <p><span className='bi bi-sun text-l mr-1 py-1'></span>Rise: {formatToLocalTime(sunrise).slice(-(8,8))}</p>
        <p className='text-orange-300 font-bold '>|</p>
        <p><span className='bi bi-brightness-alt-low text-2xl mr-1'></span>Set: {formatToLocalTime(sunset).slice(-(8,8))}</p>
                <p className='text-orange-300 font-bold '>|</p>


        <p><span className='bi bi-wind mr-1'></span>Airquality: {pm10.toFixed()} PM<sub>10</sub></p>
                <p className='text-orange-300 font-bold '>|</p>



        <p><span className='bi bi-thermometer-high mr-1'></span>High: {temp_max.toFixed()} &#176;</p>
                        <p className='text-orange-300 font-bold '>|</p>

        <p> <span className='bi bi-thermometer-low mr-1'></span>Low: {temp_min.toFixed()} &#176;</p>
                
    </div>

    </div>

  )
}
