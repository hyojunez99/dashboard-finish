import axios from "axios";
import { useEffect, useState } from "react";

const Weather = () => {
  const KEY = "3a9340324a223326c5a3ab260bbc3496";
  //상태관리
  const [weather, setWeather] = useState(null);
  const [iconUrl, setIconUrl] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const fetchWeather = async (lat, lon) => {
    try {
      // 에러는 없고 읽기 시작
      setError("");
      setLoading(true);
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${KEY}&units=metric&lang=kr`;
      const res = await axios.get(URL);
      setWeather(res.data);
      // 아이콘 가져오기
      const iconCode = res.data.weather[0].icon;
      const ICON = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
      setIconUrl(ICON);
    } catch (err) {
      setError("날씨 정보를 가져올 수 없습니다." + err.message);
    } finally {
      setLoading(false);
    }
  };
  // 컴포넌트 실행 시 딱 한 번 실행
  useEffect(() => {
    const options = {
      enableHighAccuracy: true, // 가능한 정확하게
      timeout: 5000, // 5초 안에 못가져오면 에러
      maximunAge: 0, //캐시된 위치를 쓰지 않기
    };
    if ("geolocation" in navigator) {
      // 위치정보 사용 가능
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // 날씨API 호출
          fetchWeather(latitude, longitude);
        },
        (err) => {
          setError("위치 정보를 가져올 수 없습니다" + err.message);
        },
        options
      );
    } else {
      //위치정보 사용 불가능
      setError("이 브라우저에서는 위치 정보 사용이 불가능합니다");
    }
  }, []);
  return (
    <div id="weather-page">
      {loading && <p className="loading">날씨 정보를 가져오는 중...</p>}
      {error && <p className="error">{error}</p>}
      {!weather && <p>위치 정보를 기다리는 중...</p>}
      {weather && (
        <div className="weather">
          <div className="top">
          {iconUrl && (
            <img src={iconUrl} alt={weather.weather[0].description} />
          )}
          <div className="title">
          <p>{weather.main.temp}℃</p>
          <p>{weather.name}</p>
        </div>
        </div>
          <p>{weather.weather[0].description}</p>
          <p>체감온도 : {weather.main.feels_like}℃</p>

        </div>
      )}
    </div>
  );
};

export default Weather;
