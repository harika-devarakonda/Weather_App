import TopButtons from './TopButtons.jsx';
import Input from './Input.jsx';
import Timeandlocation from './timeandlocation.jsx';
import TemperatureandDetails from'./TemperatureandDetails.jsx';
import Forecaste from './Forecaste.jsx';
import getFormattedWeatherData from '../services/weatherService.js';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import OpenLayersMap from './openlayers.jsx';
import WeatherAlerts from './WeatherAlerts.jsx';

import 'react-toastify/dist/ReactToastify.css';


export default function Weatherapp(){
const [query , setQuery]=useState({q:"hyderabad",lat:'',lon:''});
const [units, setUnits]=useState('metric');
const [weather , setwather]=useState(null);
useEffect(()=>{
 
    const fetchApi = async() =>{
        const message=query.q ? query.q: "Requested Location.";
        toast.info("Fetching data for "+message.charAt(0).toUpperCase()+message.slice(1).toLowerCase())

   await getFormattedWeatherData({...query,units}).then(data=>{
    toast.success(`Successfully Fetched weather for  ${data.name},${data.country}.`)
    setwather(data)
   }
   )
        }
fetchApi();

},[query,units])


const formatBackground=() =>{
    if(!weather){
        return 'from-cyan-500 to-blue-500'
    
    }
    if(units==='metric'){
       if(weather.temp >= 32 && weather.temp < 50){
        return 'from-yellow-700 to-orange-700'

    }
    else{
            return 'from-cyan-500 to-blue-500'
        }
}
if(units==='imperial'){
    if(weather.temp >= 90 && weather.temp < 122){
     return 'from-yellow-700 to-orange-700'


 }
 else{
       
     return 'from-cyan-500 to-blue-500'

     }
}

}
    return(
        <div className='grid grid-rows-1 grid-flow-col gap-4 mt-1'>
<div className='col-span-1'>

        <div className={`mx-auto px-5 py-5 max-w-screen-md bg-gradient-to-r mr-0 h-fit shadow-2 rounded-md xl shadow-orange-250 ${formatBackground()}`}>
<TopButtons setquery={setQuery}/>
<Input setquery={setQuery} units={units} setUnits={setUnits}/>
{weather && 
<div>
    <Timeandlocation weather={weather} />
<TemperatureandDetails  weather={weather} units={units} />
<Forecaste weather={weather}  />
</div>
}
        </div>
        </div>
      
        <div className='col-span-3 mr-5 rounded-md'>
        <OpenLayersMap weather={weather}/>
        {weather && 
        <WeatherAlerts weather={weather} units={units}/>
}
<ToastContainer autoClose={3000} theme="colored" newestOnTop={true} position="bottom-right" />

        </div>
     


</div>


    )
}