
const api_key='c0cfb6f72a389202f354f9cc265cba2e';

const fetchWeatherAlerts = async (latitude, longitude) => {
    const response = await fetch(`https://api.weathertrigger.com/v1/alerts?latitude="17"&longitude="78"&key=c0cfb6f72a389202f354f9cc265cba2e`);
    const data = await response.json();
    console.log(data)
    return data.alerts; // Assuming alerts are directly in the 'alerts' property
  };

//   `https://api.weathertrigger.com/v1/alerts?latitude=${latitude}&longitude=${longitude}&key=${apiKey}

// https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/E%20Doylestown%20WI?unitGroup=us&key=YOUR_API_KEY&contentType=json&include=current,alerts