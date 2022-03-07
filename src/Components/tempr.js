import React, { useEffect, useState } from 'react'
import WeatherCard from './WeatherCard';
import "./style.css"
function Tempr() {
    const[SearchValue, setSearchValue] = useState("Butwal");
    const[tempInfo, setTempInfo] =useState("{}");

    const getWeatherInfo = async() =>{ 
        try{
         let url =`http://api.openweathermap.org/data/2.5/weather?q=${SearchValue}&units=metric&appid=94860b4646a2ddfcd9edffe396a75cbe`;
         const res =await fetch(url);
         const data =await res.json();

         const { temp , humidity , pressure} = data.main;
         const {main:weathermood} = data.weather[0];
         const {name} = data;
         const {speed} = data.wind;
         const{country, sunset} = data.sys;

         const myNewWeatherInfo = {
             temp,
             humidity,
             pressure,
             weathermood,
             name,
             speed, 
             country,
             sunset,
         };
                 setTempInfo(myNewWeatherInfo); 
          }catch(error){
         console.log(error)
        }
    };
    useEffect(() => {
        getWeatherInfo();
    }, []);
  return (
    <>
     <div className="wrap">
         <div className="search">
             <input 
             type="search"
             placeholder='search...'
             autoFocus
             id='search'
             className='searchTerm'
             value={SearchValue}
             onChange={(e) => setSearchValue(e.target.value)}
             />
             <button className='searchButton' type='button'
              onClick={getWeatherInfo}>Search</button>
         </div>
     </div>
     {/* tempr card */}
    <WeatherCard tempInfo ={tempInfo}/>
    </>
  )
}

export default Tempr

