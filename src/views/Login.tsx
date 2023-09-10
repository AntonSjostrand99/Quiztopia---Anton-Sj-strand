
import React from "react"; // Importera React-biblioteket
import { useState } from "react"; // Importera useState-hook från React
import { useNavigate } from 'react-router'; // Importera useNavigate-hook från React Router
import './Style.css'; // Importera CSS-stilar

// Skapa en funktionell komponent kallad LoginPage
function LoginPage() {
    const navigate = useNavigate(); // Använd useNavigate-hook för att navigera mellan sidor
    const [username, setUsername] = useState<string>(''); // Tillståndsvariabel för användarnamn
    const [password, setPassword] = useState<string>(''); // Tillståndsvariabel för lösenord
    const [message, setMessage] = useState<string>(''); // Tillståndsvariabel för meddelanden

    // Skapa ett gränssnitt för API-svar för att hantera användarskapande
    interface ApiResponse {
        success: boolean;
        message?: string;
    }

    // Funktion för att skapa en användare när "Skapa Konto"-knappen klickas på
    async function handleCreateUser() {
        const url = 'https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/auth/signup'; // API-endpunkt för användarskapande

        const settings = {
            method: 'POST', // Använd POST-metoden för att skicka data till servern
            body: JSON.stringify({
                username: username,
                password: password
            })
        }

        const response = await fetch(url, settings); // Gör ett HTTP-anrop med angivna inställningar
        const data: ApiResponse = await response.json(); // Konvertera svar till JSON-format

        // Kontrollera om användaren skapades framgångsrikt eller inte
        if (data.success) {
            setMessage('Användaren skapades');
            setUsername('');
            setPassword('');
        } else {
            setMessage('Kunde inte skapa användare');
        }
    }

    // Skapat för inloggningssvar
    interface ApiSignUp {
        success: boolean;
        message?: string;
        token?: string;
    }

    // Funktion för att logga in när "Logga in"-knappen klickas på
    async function handleLogIn() {
        const url = 'https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/auth/login'; // API-endpunkt för inloggning

        const settings = {
            method: 'POST', // Använd POST-metoden för att skicka data till servern
            headers: { 'Content-Type': 'application/json' }, // Ange HTTP-headers
            body: JSON.stringify({
                username: username,
                password: password
            })
        }

        const response = await fetch(url, settings); // Gör ett HTTP-anrop med angivna inställningar
        const data: ApiSignUp = await response.json(); // Konvertera svar till JSON-format

        // Spara användarens token i webbläsarens lokal lagring
        localStorage.setItem("token", data.token || '');

        // Kontrollera om inloggningen lyckades eller inte
        if (data.success) {
            navigate('/navigation'); // Navigera till en annan sida vid lyckad inloggning
        } else {
            setMessage('Kunde inte logga in.');
        }
    }

   
    return (
        <section className='loginPage'>
            <header className="loginPage_header">
                <h1 className="loginPage_header-h1">Quiztopia</h1>
                <h4 className="loginPage_header-h4">Logga in eller skapa konto</h4>
            </header>
            <section className='loginPage_section'>
             <section className='loginPage_input'>
                    <input className='inputs' type="text" placeholder='Användarnamn' value={username}
                    onChange={event => setUsername(event.target.value)} />
                    <input className='inputs' type="text" placeholder='Lösenord' value={password}
                    onChange={event => setPassword(event.target.value)} />
                </section>
                {/* Knappar för att skapa konto och logga in */}
                <section className='loginPage_buttons'>
                    <button className="btnLogin" onClick={handleCreateUser}>Skapa Konto</button>
                    <button className="btnLogin" onClick={handleLogIn}>Logga in</button>
                </section>
                {/* Visa eventuella meddelanden för användaren */}
                <p> {message} </p>
            </section>
        </section>
    )
}

export default LoginPage; 