
import React, { useEffect, useState } from 'react';


export default function WeatherAlerts({weather,units}) {
    const [airindication ,setAirindication]=useState("");
    const [unit, setUnits]=useState('');
    const [bgcolor, setbgcolor]=useState('');
    
    useEffect(()=>{
        setTimeout(()=>{
        if(units==='metric'){
            setUnits('C')
        }else{
            setUnits('F')
        }
    },2000)
        if(weather){
            if(weather.aqi==1){
                setAirindication('Good');
               setbgcolor('from-green-400');
            }else if(weather.aqi==2){
                setAirindication('Fair');
                setbgcolor('from-yellow-400')
            }
            else if(weather.aqi==3){
                setAirindication('Moderate');
                setbgcolor('from-orange-400')
            }
            else if(weather.aqi==4){
                setAirindication('Poor');
    
                setbgcolor('from-red-400')
            } 
            else if(weather.aqi==5){
                setAirindication('Very Poor');
                setbgcolor('from-red-900');
            }
        
        }
    },[units,weather])
 
       

  return(
    <div>
     <div className='bg-gradient-to-r from-yellow-700 bg-slate-500 px-5 py-5 mt-5 text-white transition ease-in-out hover:scale-90 rounded-md'>
        <p><span className='font-bold'>{weather.details}</span></p>
        <p>The low will be <span className='font-bold'>{weather.temp_min.toFixed()} &#176;{unit} </span></p>
     </div>
     <div className={`bg-gradient-to-r ${bgcolor} to-slate-500 px-5 py-5 mt-5 text-red transition ease-in-out text-white hover:scale-90 rounded-md text-center`}>
        <h1 className='text-left font-extrabold'>Air Quality:</h1>
        <h3 className='font-bold '>{airindication}</h3>
        
     </div>
    </div>
  )
}

