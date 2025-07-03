import { API_URL, API_KEY } from '../config';


const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Fonction pour obtenir la météo d'une ville
export const getWeather = async (city) => { 
    const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=fr`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
};

// Fonction pour obtenir la météo par coordonnées géographiques
// Les coordonnées sont fournies sous forme de latitude et longitude
export const getWeatherByCoords = async (lat, lon) => {
    const url = `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=fr`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
};

// Fonction pour obtenir la météo par ID
// L'ID est un identifiant unique pour une ville dans l'API OpenWeatherMap
export const getWeatherById = async (id) => {
    const url = `${BASE_URL}?id=${id}&appid=${API_KEY}&units=metric&lang=fr`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
};

export const getForecastByCoords = async (lat, lon) => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=fr`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}