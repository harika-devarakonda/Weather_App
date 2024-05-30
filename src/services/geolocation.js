

const api_key='c0cfb6f72a389202f354f9cc265cba2e';

 export const getCitySuggestions = async (query) => {
    if (!query) return [];
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${query.q}&lat=${query.lat}&lon=${query.lon}&&limit=5&appid=${api_key}`;
    
    const response = await fetch(url);
    
    const data = await response.json();
  return data;
 }
