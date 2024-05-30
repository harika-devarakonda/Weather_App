import React, { useState, useEffect } from 'react';
import SearchResultmatch from './searchResult.jsx';
import {getCitySuggestions} from '../services/geolocation.js';
import { toast } from 'react-toastify';

export default function Input({setquery, units, setUnits}) {
  const [city, setCity] = useState(""); 
  const [result, setResult]=useState([]);
  const [query,setQuery]=useState({});
 
  useEffect(() => {
    if (city.trim() === "") {
      setResult([]);
      return;
    }
    const fetchApi = async () => {
      try {
        const data = await getCitySuggestions({ q: city });
        setResult(data);
      } catch (error) {
        setResult([]);
      }
    };

    fetchApi();
  }, [city]);
  
  const handleSearchClick=()=>{
    if(city !==""){
      setquery(query);
      setResult([]);


    }
  }

  const handleLocationClick=() =>{
    toast.info('Fetching user location.')
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position=>{  
        toast.success('Location fetched')
        let lat=position.coords.latitude;
        let lon= position.coords.longitude;
        setquery({
          lat,lon
        })
      })
    }
  }

  const handleUnitChange= (e)=>{
let selecteduntis=e.target.name

    if(units !== selecteduntis){
      setUnits(selecteduntis);
    }
  }
  return (
    <>
    <div className='flex flex-row justify-between my-2'>
        <div className='flex flex-row w-3/4 justify-center items-center space-x-2'>
            <input
            value={city}
          onChange={(e)=>setCity(e.currentTarget.value)} type='text' 
          onKeyDown={(e) => {
            if (e.key === "Enter"){
              handleSearchClick();
            }
            }}
            placeholder='search..'
            className='text-lg font-light w-3/4 shadow-xl focus:outline-none capitalize py-1 pl-9 placeholder:Capitalize rounded-md' />            
        <span><button className="bi bi-search text-white cursor-pointer mt-1 ml-1 transition ease-out hover:scale-125" onClick={handleSearchClick}></button></span>
        <span><button className="bi bi-geo-alt-fill text-white cursor-pointer mr-2 ml-3 hover:scale-125" onClick={handleLocationClick}></button></span>
        </div>
        <div>
        </div>
        <div className='flex flex-row w-1/4 items-center justify-center'>
            <button className='text-white text-xl mr-1 transition ease-out hover:scale-125 font-light'onClick={handleUnitChange} name='metric'>&#176;C</button>
            <p className='text-white m-1'>|</p>
            <button className='text-white text-xl ml-1 transition ease-out hover:scale-125 font-light'onClick={handleUnitChange} name='imperial'>&#176;F</button>
            
        </div>
    </div>
    {result.length > 0 && (
        <div className='flex flex-col w-1/2 mt-1 ml-10 p-1 rounded-md text-yellow capitalize bg-white result'>
          <SearchResultmatch  result={result} setResult ={setResult} setCity={setCity} setQuery={setQuery} />
        </div>
      )}
      
    </>
  )
}