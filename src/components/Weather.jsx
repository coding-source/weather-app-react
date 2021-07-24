import axios from 'axios'
import React,{ useState }from 'react';



const Weather = () => {

const [city, setCity] = useState("delhi")
const [temp,setTemp] = useState("");
const [min,setMin] = useState("");
const [max,setMax] = useState("");
const [description,setDescription] = useState("");
const [icon,setIcon] = useState("");
const [showMyComponent,setShowMyComponent] = useState(false);

const [country, setCountry] = useState("INDIA")
const getWeatherData = async(city, country) => {
    await axios({
     method: 'GET',
     url: `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=e3ed8685c4c932d190e7b529e4326c13`

    }).then((res) => {
   console.log(res.data);
   setTemp(res.data.main.temp -273.15);
   setIcon(res.data.weather[0].icon);
    setMin(res.data.main.temp_min -273.15);
     setMax(res.data.main.temp_max -273.15);
      setDescription(res.data.weather[0].description);
       setCountry(res.data.sys.country);
       setShowMyComponent(true);
 }).catch((err) => {
    console.log(err);
 })

}




    return(
<div className="container my-4">
<input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Cityname" className="mx-1 p-1" />
<input type="text" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Country" className="mx-2 p-1" />
<button onClick={() => getWeatherData(city,country)} className="btn btn-primary" style={{backgroundColor:"#51456a", fontWeight:"bold", fontSize:"20",border:0}}>get weather</button>
{showMyComponent ?(
<div className="data_container p-4 m-y5">
    <h1>{city}, {country}</h1>
    <div className="my-2">
        <img src={` http://openweathermap.org/img/wn/${icon}@2x.png`} alt="weather-icon" style={{width:200, height:200}} />
    </div>
    {temp ? <h1>{Math.floor(temp)}°C</h1> :null }
    <h4 className="my-4">Min:<span>{Math.floor(min)}°C</span> <span className="mx-3"> | </span> Max:<span>{Math.floor(max)}°C</span>
    </h4>
    <h1>{description}</h1>
    <h4 className="my-4">Date: {new Date().toLocaleDateString()}</h4>
</div>): null }

</div>


    );
};

export default Weather