
//  Position beskriver en plats med latitud och longitud.
export interface Position {
	latitude: number;
	longitude: number;
}

//  GetQuiz används för att representera svaret från en förfrågan om en quiz.
export interface GetQuiz {
	quizzes: QuizzesRes[]; // En array av QuizzesRes-objekt
	success: boolean; // En flagga som indikerar om förfrågan var framgångsrik eller inte
}

//  QuizzesRes beskriver information om en quiz.
export interface QuizzesRes {
	questions: QuizResQuestions[]; // En array av frågor
	quizId: string; // Unikt identifierare för quizen
	userId: string; // Användarens ID
	username: string; // Användarnamn
}

// QuizResQuestions beskriver information om en fråga i en quiz.
export interface QuizResQuestions {
	answer: string; // Svaret på frågan
	location: {
		latitude: number;
		longitude: number;
	}; // Platsen där frågan är relaterad till, med latitud och longitud
	question: string; // Själva frågan
}

//  QuizRes används för att representera svaret från en förfrågan om en enskild quiz.
export interface QuizRes {
    success: boolean; // En flagga som indikerar om förfrågan var framgångsrik eller inte
    quizId: string; // Unikt identifierare för quizen
}

//  QuestionRes används för att representera svaret från en förfrågan om en enskild fråga.
export interface QuestionRes {
	success: boolean; // En flagga som indikerar om förfrågan var framgångsrik eller inte
	error: string; // Meddelande om det uppstår ett fel
}

//  QuestionsResponse används för att representera svaret från en förfrågan om frågor.
export interface QuestionsResponse {
	quiz: QuestionsResQuiz; // En QuestionsResQuiz-objekt som innehåller information om frågorna
}

// QuestionsResQuiz beskriver information om frågorna i en quiz.
export interface QuestionsResQuiz {
	Attributes: QuestionsAttributes; // Attribut för frågorna
}

// QuestionsAttributes beskriver attributen för frågorna i en quiz.
export interface QuestionsAttributes {
	questions: AttributesQuestions[]; // En array av frågor
    quizId: string; // Unikt identifierare för quizen
    userId: string; // Användarens ID
    username: string; // Användarnamn
}

// AttributesQuestions beskriver information om en fråga i en quiz.
interface AttributesQuestions {
    answear: string; // Svaret på frågan
    location: QuestionsResLocation; // Platsen där frågan är relaterad till, med latitud och longitud
    question: string; // Själva frågan
}

// QuestionsResLocation beskriver en plats med latitud och longitud.
interface QuestionsResLocation {
    latitude: string; // Latitud som en sträng
    longitude: string; // Longitud som en sträng
}