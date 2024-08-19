import './App.css';
import UilReact from '@iconscout/react-unicons/icons/uil-react'
import TopButtons from './components/TopButtons';
import Inputs from './components/Inputs';
import TimeAndLocations from './components/TimeAndLocations';
import TemperatureAndDetails from './components/TemperatureAndDetails';
import Forecast from './components/Forecast';
import getFormattedWeatherData from './services/weatherService';
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function App() {
    const [query, setQuery] = useState({ q: "bangkok" });
    const [units, setUnits] = useState("metric");
    const [weather, setWeather] = useState(null);
  
    useEffect(() => {
      const fetchWeather = async () => {
        const message = query.q ? query.q : "current location.";
    
        toast.info("Fetching weather for " + message);
    
        try {
          const data = await getFormattedWeatherData({ ...query, units });
          toast.success(
            `ค้นหา ${data.name}, ${data.country} สำเร็จ`
          );
    
          setWeather(data);
        } catch (error) {
          toast.error("ไม่พบสถานที่ โปรดลองใหม่อีกครั้ง!!!");
        }
      };
    
      fetchWeather();
    }, [query, units]);
    

  

  const formatBackground = () => {
    if (!weather) return "from-cyan-700 to-blue-700";
    const threshold = units === "metric" ? 20 : 60;
    if (weather.temp <= threshold) return "from-cyan-700 to-blue-700";

    return "from-yellow-700 to-orange-700";
  };



  return (
    <div className={`container mx-auto mt-4 py-5 bg-gradient-to-br h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}>
      <TopButtons setQuery={setQuery} />
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />

      {weather && (
        <div>
          <TimeAndLocations weather={weather} />
          <TemperatureAndDetails weather={weather} />

          <Forecast title="พยากรณ์รายชั่วโมง" items={weather.hourly} />
          <Forecast title="พยากรณ์รายวัน" items={weather.daily} />
        </div>
      )}

      <ToastContainer autoClose={2000} theme="colored" newestOnTop={true} />
    </div>
  );
}

export default App;