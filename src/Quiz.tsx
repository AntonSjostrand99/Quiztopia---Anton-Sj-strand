import React from "react"
import { QuizzesRes } from "./interfaces"
import mapboxgl, { Map as MapGl } from 'mapbox-gl';


// Skapa ett interface Question för att beskriva strukturen av en fråga
interface Question {
    answer: string,
    location: {
        latitude: number,
        longitude: number
    },
    question: string
}

// Skapa ett interface QuizProps för att beskriva egenskaperna som Quiz-komponenten tar emot
interface QuizProps {
    quiz: QuizzesRes;
    map: mapboxgl.Map | null;
}

// Skapa ett interface Quiz som beskriver strukturen av ett quiz-objekt
interface Quiz {
    quiz: {
        questions: Question[]
    }
}



// Skapa en funktionell komponent kallad Quiz som tar emot props av typen QuizProps
function Quiz(props: QuizProps) {
    const quiz = props.quiz; // Deklarera en variabel quiz och tilldela den värdet från props.quiz

    // Funktion som hämtar quiz-data när knappen klickas
    async function handleChosenQuiz() {
        // Skapa URL för att hämta quiz-data från en API
        const url = `https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/quiz/${quiz.userId}/${quiz.quizId}`;
        
        // Konfigurera inställningar för HTTP-anropet
        const settings = {
            method: 'GET', // Använd GET-metoden
            headers: { 'Content-Type': 'application/json' } // Ange HTTP-headers
        }
        
        // Utför HTTP-anropet till URL med de angivna inställningarna
        const response = await fetch(url, settings);
        
        // Hämta data som svar på HTTP-anropet och konvertera den till ett objekt av typen Quiz
        const data: Quiz = await response.json();
        console.log(data);

        // Hämta frågorna från quiz-objektet
        const questions: Question[] = data.quiz.questions;
        
        // Iterera över varje fråga och skapa en marker (kartmarkör) på kartan 
        questions.forEach(question => {
           if (!props.map) {
                return; // Om kartan inte finns, gå ur loopen
           }
            const marker = new mapboxgl.Marker()
             marker.setLngLat([question.location.longitude, question.location.latitude])
             marker.addTo(props.map) // Lägg till markören på kartan
             marker.setPopup(new mapboxgl.Popup().setHTML(`<h1>Fråga: ${question.question} Svar: ${question.answer}</h1>`))
             
        });
    }

    return(
        <article className="quiz">
            <h2 className="quizName">Quiznamn: {quiz.quizId}</h2>
            <p className="quizBy">Skapad av: {quiz.username}</p>
            <button className="btnQuiz" onClick={handleChosenQuiz}>Välj quiz</button>

        </article>
    )
}

export default Quiz