import { getDeviceLocation } from '../models/locationModel';
import { getWeatherByCoords, getForecastByCoords } from '../models/weatherModel';

export async function loadWeatherData() {
  const coords = await getDeviceLocation();
  const currentWeather = await getWeatherByCoords(coords.latitude, coords.longitude);
  const forecast = await getForecastByCoords(coords.latitude, coords.longitude);
  return { currentWeather, forecast };
}
