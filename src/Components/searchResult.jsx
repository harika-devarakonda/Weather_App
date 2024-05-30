import React, { useState } from 'react'

export default function SearchResultmatch({result,setResult, setQuery,setCity}) {
   function handleCityChange(item){

  setCity(item.name);

  setQuery({
    q:item.name,
    lat:item.lat,
    lon:item.lon
  })
  setResult([]);
    }
  

  return (
    <>


    <div>
        <ul>
        {
        result.map((item,index) =>
       
      
        <li key={index} onClick={()=>handleCityChange(item)}>{item.name},{item.country}</li>)
}
</ul>
        </div>

    </>

  )
}
