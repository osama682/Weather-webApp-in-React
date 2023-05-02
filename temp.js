// https://api.openweathermap.org/data/2.5/weather?q=jhelum&appid=13b59e0388fc4a769031d60c75402847

import React, { useState, useEffect } from "react";
import "./style.css";
import Weathercard from "./weathercard";

const Temp = () => {
  const [searchValue, setSearchValue] = useState("jhelum");
  const [tempInfo, setTempInfo] = useState({});

  const getWeatherInfo = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=13b59e0388fc4a769031d60c75402847`;
      let res = await fetch(url);
      let data = await res.json();
      const { temp, pressure, humidity } = data.main;
      const { name } = data;

      const { main: weathermood } = data.weather[0];
      const { speed } = data.wind;
      const { country, sunset } = data.sys;
      

      const timezoneUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=13b59e0388fc4a769031d60c75402847`;
      const timezoneRes = await fetch(timezoneUrl);
      const timezoneData = await timezoneRes.json();
      const { timezone } = timezoneData;


      const myNewWeatherInfo = {
        temp,
        pressure,
        humidity,
        name,
        weathermood,
        speed,
        country,
        sunset,
        timezone,
      };

    

      setTempInfo(myNewWeatherInfo);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWeatherInfo();
  });


 




  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="searchTerm"
            type="search"
            placeholder="search..."
            id="search"
            autoFocus
          />
          <button
            className="searchButton"
            type="button"
            onClick={getWeatherInfo}
          >
            Search
          </button>
        </div>
      </div>

      <Weathercard tempInfo={tempInfo} />
    </>
  );
};

export default Temp;
