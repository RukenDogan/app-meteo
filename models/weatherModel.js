import { OPENWEATHER_API_KEY } from '@env';

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Fonction pour obtenir la météo d'une ville
// La ville est fournie sous forme de chaîne de caractères
// Par exemple, pour Paris, on peut utiliser 'Paris' ou 'Paris,fr'
export const getWeather = async (city) => {
  const url = `${BASE_URL}?q=${city}&appid=${OPENWEATHER_API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

// Fonction pour obtenir la météo par coordonnées géographiques
// Les coordonnées sont fournies sous forme de latitude et longitude
export const getWeatherByCoords = async (lat, lon) => {
  const url = `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

// Fonction pour obtenir la météo par ID
// L'ID est un identifiant unique pour une ville dans l'API OpenWeatherMap
export const getWeatherById = async (id) => {
  const url = `${BASE_URL}?id=${id}&appid=${OPENWEATHER_API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const getForecastByCoords = async (lat, lon) => {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}