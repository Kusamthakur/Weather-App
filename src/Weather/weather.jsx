import React, { useState } from 'react'
import moment from 'moment-timezone';
import './weather.css'
import img1 from '../images/img1.webp'
import Cube from '../Cube/Cube.jsx'

const Weather = () => {
   

    const [time, settime] = useState("")
    const [data, setdata] = useState("")
    const [weather, setweather] = useState("")
    const[CurrentTime,setCurrentTime] = useState("")


    setInterval(() => {
        settime(new Date().toLocaleTimeString())
    }, 1000);
     
    const WD = {
        baseurl: "https://api.openweathermap.org/data/2.5/",
        key: "fdfda5dc0ec59e155ef8da86a2ead650"

    }

    
    const fxn = (e) => {
        if (e.key === "Enter") {
            fetch(`${WD.baseurl}weather?q=${data}&appid=${WD.key}&units=metric`)
                .then(res => res.json())
                .then(wd => {console.log(wd)
                    setweather(wd)
                    setdata("")
                fetchCurrentTime(wd.coord.lat, wd.coord.lon);
                })          
        }
    }
    const fetchCurrentTime = (lat, lon) => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WD.key}`)
            .then(res => res.json())
            .then(data => {
                const timezoneOffsetSeconds = data.timezone; 
                const timezoneName = moment.tz.guess(true); 
                const currentTime = moment.tz(timezoneName).utcOffset(timezoneOffsetSeconds / 60).format('hh:mm:ss A'); 
                setCurrentTime(currentTime);
            })
            
    
        }


    
    return (
        <div>
            <div className="container">
                <nav>
                    <ul>
                        <li> <input className='input' type="text" placeholder='Enter of your city' value={data} onChange={(e) => { setdata(e.target.value) }}
                            onKeyPress={fxn} /> </li>
                        <li className='time' >{time}</li>
                        
                        

                    </ul>
                </nav>

{(typeof weather.sys != "undefined")?
    (<div className="data-container">
                    <div className='location'>
                        {weather.name},{weather.sys.country}
                        <li className='othertime'> {CurrentTime} </li>
                        
                    </div>

                    <div className='temp'>
                        <img src={img1} className='img1' alt="" />
                        <p>{weather.main.temp}°C , {weather.weather[0].description}</p>
                        Wind speed : {weather.wind.speed}

                        
                    </div>
                </div>):(<div className="mycontainer"><Cube/></div>)}
            </div>


        </div>
    )}


  export default Weather ;
