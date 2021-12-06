import React from 'react';
import '../styles/pages/landing.css';
import logoImg from '../images/Logo.svg'
import {FiArrowRight} from 'react-icons/fi';
import { Link } from 'react-router-dom'

function Landing(){
return(
    <div id="page-landing">
     <div className="content-wrapper">
     <img src={logoImg} alt="Hope" /> 
      <main>
        <h1>Encontre a sua luz no fim do túnel</h1>
        <p>Conecte-se com pessoas que podem te ajudar</p>
        <div className="location">
        <strong>
          Belo Horizonte
        </strong>
        <span>Minas Gerais</span>
      </div>
      </main>
     <Link to="/login" className="enter-app">
       <FiArrowRight size={30} color="rgba(0, 0, 0, 0.6" />
     </Link>
     </div>
      

      </div>
)
}

export default Landing;