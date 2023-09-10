import mapboxgl from "mapbox-gl";
import { Position } from "./interfaces";

type ReactSetState<T> = React.Dispatch<React.SetStateAction<T>>



// Funktionen getPosition tar två parametrar: map och setPosition.
// map är en Mapbox GL-karta och setPosition är en funktion för att uppdatera en React-state med positionen.
function getPosition(map: mapboxgl.Map, setPosition: ReactSetState<Position | null>) {
  // Kolla om geolokalisering stöds i webbläsaren.
  if ('geolocation' in navigator) {
      // Använd navigator.geolocation.getCurrentPosition för att hämta användarens nuvarande position.
      navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
          // Extrahera latitud och longitud från den erhållna positionen.
          const coords: GeolocationCoordinates = position.coords;

          // Uppdatera React-state med den erhållna positionen.
          setPosition({ latitude: coords.latitude, longitude: coords.longitude })

          // Flytta kartans center till den erhållna positionen.
          map.setCenter([coords.longitude, coords.latitude]);

          // Logga positionen och coords till konsolen för felsökning.
          // console.log(coords);
          // console.log(position);

      }, error => {
          // Hantera eventuella fel vid att hämta positionen.
          console.log('position error', error);
          setPosition(null)
      })
  }
}

// Exportera funktionen getPosition så att den kan användas i andra delar av din kod.
export { getPosition }