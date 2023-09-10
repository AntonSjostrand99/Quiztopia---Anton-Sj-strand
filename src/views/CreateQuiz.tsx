
import { useState, useRef, useEffect } from "react"
import { handleCreatequiz } from "../HandleCreatedQuiz";
import { Position, QuestionRes, QuizResQuestions } from '../interfaces';
import { useNavigate } from 'react-router';
import mapboxgl, { Map as MapGl } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import React from "react";



mapboxgl.accessToken = 'pk.eyJ1IjoiYW50ZWJyb3IiLCJhIjoiY2xsd2JpMXE1MDVmcjNxczZvaHhsOGdjNCJ9.WCn-lmpxDZ0jD83zHMyetg' 
console.log(mapboxgl.accessToken);


function CreateQuiz() {
    const [showInput, setShowInput] = useState<boolean>(false)
    const [quizName, setQuizName] = useState<string>('')
    const [question, setQuestion] = useState<string>('')
    const [answer, setAnswer] = useState<string>('')
    const [position, setPosition] = useState<Position | null>(null)
    const mapContainer = useRef(null)
    const mapRef = useRef<MapGl | null>(null)
    const [lat, setLat] = useState<number>(57.7)
    const [lng, setLng] = useState<number>(11.89)
    const [zoom, setZoom] = useState<number>(10)
    const [lngQuestion, setLngQuestion] = useState<number>()
    const [latQuestion, setLatQuestion] = useState<number>()
    const [addedQuestions, setAddedQuestions] = useState<QuizResQuestions[]>([])
    
    
    
    useEffect(() => {
        
        
        if( mapRef.current || !mapContainer.current ) return
        // Skapa en karta när komponenten renderas.
        mapRef.current = new MapGl({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom
        });
        
        const map: MapGl = mapRef.current
        
        map.on('move', () => {
            interface Position {
                lng: number;
                lat: number;
            }
              // Uppdatera latitud, longitud och zoom-nivå baserat på kartans position.
            const position: Position = map.getCenter()
            setLat(Number(position.lat.toFixed(4)))
            setLng(Number(position.lng.toFixed(4)))
            setZoom(map.getZoom());
            
            
        })
        map.on('click',(e)=>{
             // Hantera klickhändelsen på kartan.
            //console.log('Tryck på kartan', e)
            const marker = new mapboxgl.Marker()
            .setLngLat([e.lngLat.lng, e.lngLat.lat])
            .addTo(map);
            const lngLat = marker.getLngLat()
            setLngQuestion(e.lngLat.lng)
            setLatQuestion( e.lngLat.lat)
            
            
            
        })
        
    }, [lat, lng, zoom])
    
    const navigate = useNavigate();
    function naviBack() {

        navigate('/navigation')
    }
    // En asynkron funktion för att hantera att lägga till en fråga i quizzet.
    async function handleAddQuestion() {
        
        const quizId = localStorage.getItem('quizId')
        console.log(quizId);
            // Ange URL till API-tjänsten för att lägga till en fråga.
        const url ='https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/quiz/question'
          // Hämta JWT-token från webbläsarens lokal lagring.
        const token: string = localStorage.getItem('token') || ""
        //console.log('JWTtoken: ', token)
        
        const settings = {
            method: 'POST',
            body: JSON.stringify({
                name: quizId,
                question: question,
                answer: answer,
                location: {
                    longitude: lng,
                    latitude: lat,
                }
            }),
            
            headers: { 'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`},
        }
        
        const response = await fetch(url, settings)
        const data: QuestionRes = await response.json()
       // console.log(data);

        // Uppdatera state-variabeln addedQuestions med den nya frågan.
        setAddedQuestions([ 
            ...addedQuestions,
            {
                answer: answer,
                location: {
                    latitude: lat,
                    longitude: lng,
                },
                question: question,
            }
        ])
    }
    
    
    return(
        <section className='createPage'>
            <header className="createPage_header">
             <h1 className="createPage_header-h1">Quiztopia</h1>
             <h3 className="createPage_header-h3">Skapa ditt quiz</h3>
             <button onClick={naviBack}>Gå tillbaka</button>
            </header>
        <section className="createPage_section">
        <input className='create_input' type='text' placeholder='Namn på quiz' value={quizName} onChange={event => setQuizName(event.target.value)} />   
        <button  className="create_input-btn" onClick={() => handleCreatequiz(setShowInput, quizName )}>Skapa quiz</button>
        { showInput && (
            <div className="create_inputs">
            <input className='create_input' placeholder='Fråga'
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            />
            <input className='create_input' placeholder='Svar'
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            />
            <button className="create_input-btn-2" onClick={handleAddQuestion}>Lägg till fråga</button>
            <div>
                {
                 
                    addedQuestions.map(q => (
                        <div key={q.question}>{q.question} {q.answer} </div>
                    ))
                }
            </div>
            </div>
            
            )} 
            
            <h4 className="placeOut">Placera ut din markören på kartan </h4>
            <div ref={mapContainer} className="map-container" />
            </section>
            </section>
            )
            
}
        
        export default CreateQuiz