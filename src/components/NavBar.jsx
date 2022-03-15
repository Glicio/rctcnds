import React from 'react'
import './NavBar.css'
import { Link } from 'react-router-dom'
import {ReactComponent as Certidao} from '../static/imgs/certidao.svg'
import {ReactComponent as Folha} from '../static/imgs/folha.svg'


export default function NavBar(props){
    return(
        <div className='nav-bar'>
            <span>Links úteis e classificação de folhas</span>
            <div className="btn-div">
                <Link to='/' className='btn'><Certidao className='icon'/> Certidões</Link>
                <Link to='/folha' className='btn'><Folha className='icon'/>Folha</Link>
            </div>
        </div>
    )
}