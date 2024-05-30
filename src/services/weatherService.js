import { DateTime } from "luxon";

const API_Key='c0cfb6f72a389202f354f9cc265cba2e';
const BASE_URL = "https://api.openweathermap.org/data/2.5"; // weather



// https://api.openweathermap.org/data/2.5/onecall?lat=48.8534&lon=2.3488&exclude=current,minutely,hourly,alerts&appid=1fa9ff4126d95b8db54f3897a208e91c&units=metric

const getWeatherData = (infoType, searchParams) => {

  const url = new URL(BASE_URL + "/" + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: API_Key });

  return fetch(url).then((res) => res.json());
};

const formatCurrentWeather = (data) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
  } = data;

  const { main: details, icon } = weather[0];

  return {
    lat,
    lon,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    dt,
    country,
    sunrise,
    sunset,
    details,
    icon,
    speed,
  };
};

const formatForecastWeather = (data) => {
  let { city:{timezone} } = data;
  const dailyData = data.list.filter((item, index, arr) => {
    return index === 0 || item.dt_txt.split(' ')[0] !== arr[index - 1].dt_txt.split(' ')[0];
  });
  
  const hourlyData = data.list;
  return { timezone , dailyData, hourlyData};
};

const formatAQIindes=(data) =>{
const {main:{aqi},
    components:{
        pm10
    }
}=data.list[0]

return {aqi, pm10}
}

const getFormattedWeatherData = async (searchParams) => {
  const formattedCurrentWeather = await getWeatherData(
    "weather",
    searchParams
  ).then(formatCurrentWeather);
  const { lat, lon } = formattedCurrentWeather;

  const formattedForecastWeather = await getWeatherData("forecast", {
    lat,
    lon,
    units: searchParams.units,
  }).then(formatForecastWeather);

const aqiIndex = await getWeatherData("air_pollution",{
    lat,
    lon
}).then(formatAQIindes);


  return { ...formattedCurrentWeather, ...formattedForecastWeather ,...aqiIndex };

};


const formatToLocalTime = (
  secs,
  zone,
  format = "cccc, dd MMM yyyy' | Local time: 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconUrlFromCode = (code) =>
  `http://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeatherData;
export {formatToLocalTime , iconUrlFromCode};