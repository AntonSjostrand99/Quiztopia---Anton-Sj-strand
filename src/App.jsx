import './App.css'

import LoginPage from './views/Login'
import CreateQuiz from './views/CreateQuiz'
import Navigation from './views/Navigate'
import ShowQuizzes from './views/ShowQuiz'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'



function App() {



  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />
    },
    {
      path: "/navigation",
      element: <Navigation />
    },
    {
      path: "/createquiz",
      element: <CreateQuiz />
    },
    {
      path: "/showquizzes",
      element: <ShowQuizzes />
    },
    
    
  ])
  

  return (
    <div className='App'>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
