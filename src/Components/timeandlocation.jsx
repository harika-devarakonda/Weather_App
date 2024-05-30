import React from 'react';
import {formatToLocalTime} from '../services/weatherService.js';

export default function Timeandlocation({weather:{dt,name,timezone,country}}) {

  return (
    <div>
        <div className='flex flex-row items-center justify-center my-6'>
            <p className='text-white font-extralight' >
            {formatToLocalTime(dt)}
            </p>
        </div>
        <div className='flex flex-row items-center justify-center m-1'>
            <p className='text-white text-3xl'>
               {name},{country}
            </p>
        </div>
    </div>
  )
}
