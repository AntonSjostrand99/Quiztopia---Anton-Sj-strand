import React from 'react';
import { useNavigate } from 'react-router-dom';
function Navigation() {
    const navigate = useNavigate();
    function naviCreate() {
        navigate('/createquiz')
    }
    function naviShow() {
        navigate('/showquizzes')
    }
    function naviLogin() {
        navigate('/')
    }
    return (
        <section className='naviPage'>
            <header className='naviHeader'>
            <h1 className='naviHeader_h1'>Quiztopia</h1>
            <button className='btnNavi' onClick={naviLogin} >Gå tillbaka</button>
            </header>
            <section className='naviPage_section'>
            <button className='btnNavi' onClick={naviCreate}>Skapa ett Quiz</button>
           <button className='btnNavi' onClick={naviShow}>Hämta alla Quiz</button>
       </section>

        </section>


       
    )
}

export default Navigation