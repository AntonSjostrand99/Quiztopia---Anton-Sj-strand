import { Dispatch } from "react";


// funktion som används för att hantera skapandet av en quiz.
async function handleCreatequiz(setShowInput, quizname) {
    // Definiera API:ets URL och hämta JWT-token från lokal lagring.
    const url = 'https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/quiz';
    const token = localStorage.getItem("token");
    
    // Logga JWT-token för att felsöka.
    console.log('JWT-token: ', token);

    // Konfigurera fetch-förfrågan för att skapa en quiz.
    const settings = {
        method: 'POST',
        body: JSON.stringify({
            name: quizname
        }),
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };
    
    // Skicka förfrågan till API:et och vänta på svar.
    const response = await fetch(url, settings);
    const data = await response.json();
    
    // Visa input-komponenten efter att quizet har skapats.
    setShowInput(true);

    // Hämta quizId från svar och spara det i lokal lagring.
    let quizId = data.quizId;

    if (data.quizId === undefined) {
        console.log('QuizId är undefined');
    }
    localStorage.setItem('quizId', quizId);

    // Om skapandet av quizet inte gick igenom, logga in igen.
    if (data.success === false) {
        console.log('Inloggning krävs igen');
    }
}

export { handleCreatequiz };