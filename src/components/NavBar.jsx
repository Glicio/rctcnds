import React from 'react'
import './NavBar.css'
import { Link } from 'react-router-dom'


export default function NavBar(props){
    return(
        <div className='nav-bar'>
            <span>Links úteis e classificação de folhas</span>
            <div className="buttons-div">
                <Link to='/'>Certidões</Link>
                <Link to='/folha'>Folha</Link>
            </div>
        </div>
    )
}