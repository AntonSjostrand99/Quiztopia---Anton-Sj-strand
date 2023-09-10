import { QuizzesRes, GetQuiz } from "../interfaces";
import Quiz from "../Quiz";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import mapboxgl, { Map as MapGl } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiYW50ZWJyb3IiLCJhIjoiY2xsd2JpMXE1MDVmcjNxczZvaHhsOGdjNCJ9.WCn-lmpxDZ0jD83zHMyetg';
console.log(mapboxgl.accessToken);

// Skapa en funktionell React-komponent kallad ShowQuizzes.
function ShowQuizzes() {
    const mapContainer = useRef(null); // Referens till kartcontainer-elementet.
    const mapRef = useRef<MapGl | null>(null); // Referens till kartan.
    // Tillstånd för latitud, longitud och zoomnivå.
    const [lat, setLat] = useState<number>(57.7);
    const [lng, setLng] = useState<number>(11.89);
    const [zoom, setZoom] = useState<number>(10);
    // Tillstånd för att lagra quiz-data.
    const [quizzes, setQuizzes] = useState<QuizzesRes[]>([]);
    // Använd useEffect för att köra kod när komponenten har renderats.
    useEffect(() => {
        if (mapRef.current || !mapContainer.current) return; // Om kartan redan är skapad eller kartcontainer-elementet inte finns, returnera.
        // Skapa en ny Mapbox-karta och koppla den till kartcontainer-elementet.
        mapRef.current = new MapGl({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom
        });
        const map: MapGl = mapRef.current;
        // Lyssna på kartans 'move' händelse för att uppdatera latitud, longitud och zoom.
        map.on('move', () => {
            interface Position {
                lng: number;
                lat: number;
            }
            const position: Position = map.getCenter();
            setLat(Number(position.lat.toFixed(4)));
            setLng(Number(position.lng.toFixed(4)));
            setZoom(map.getZoom());
        });
    }, [lat, lng, zoom]); // Uppdatera kartan när latitud, longitud eller zoom ändras.

    // Funktion för att hämta quiz från en API.
    async function handleGetQuizzes() {
        const url = 'https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/quiz';
        const settings = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
        const response = await fetch(url, settings);
        const data: GetQuiz = await response.json();
        console.log('data', data);

        if (data.quizzes) {
            setQuizzes(data.quizzes);
        }
    }
    // Använd React Router's navigate hook för att gå tillbaka till en annan sida.
    const navigate = useNavigate();
    function naviBack() {
        navigate('/navigation');
    }
    // Skapa en lista av Quiz-komponenter baserat på quiz-data.
    const QuizElem = quizzes.map((quiz, index) => {
        return <Quiz quiz={quiz} key={index} map={mapRef.current} />;
    });
    return (
        <section className='showQuizzes'>
            <header className="showQuizzes_header">
                <h1 className="showQuizzes_header-h1">Quiztopia</h1>
                <h4 className="showQuizzes_header-h4">Hämta Quiz</h4>
                <button onClick={naviBack}>Gå tillbaka</button>
            </header>
            <section className='showQuizzes_header-section'>
                <button className="showQuizzes_header-section-btn" onClick={handleGetQuizzes}>Hämta alla quiz</button>
                {QuizElem}
            </section>
            <div ref={mapContainer} className="map-container" />
        </section>
    );
}

export default ShowQuizzes;