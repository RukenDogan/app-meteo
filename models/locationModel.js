import * as Location from 'expo-location';

export async function getDeviceLocation() {
  // Demande la permission à l'utilisateur
  let { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== 'granted') {
    throw new Error('Permission to access location was denied');
  }

  // Récupère la position GPS
  const location = await Location.getCurrentPositionAsync({});
  return location.coords; // { latitude: ..., longitude: ... }
}
