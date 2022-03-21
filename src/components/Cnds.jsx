import React, { useState } from 'react'

import {ReactComponent as Caixa} from '../static/imgs/caixa.svg'
import {ReactComponent as Arapiraca} from '../static/imgs/arapiraca.svg'
import { CSSTransition } from 'react-transition-group'

import estadual from '../static/imgs/brasao_alagoas-463630d216.png'
import maceio from '../static/imgs/maceio.png'
import tst from '../static/imgs/tst.png'
import receita from '../static/imgs/receita_federal.png'

const NavLink = (props) => {
    //Link: url do link
    //imgsrc: opcional, imagem que aparece do lado do link
    //nome: Descrição do link
    //pode-se passar um componente SVG como child do NavLink para ele ser renderizado como o logo do link
    return (
        <>
            <a href={props.link} className="btn" target='_blank' rel='noreferrer'>
                {props.imgsrc ? <img src={props.imgsrc} alt="" className="logo"/> : ""} {props.children}{props.nome}
            </a>
        </>
    )
}


const PJ = (props) => {
    return(
        <>
            <div className="links" id='pj' style={{display: props.display}}>
                <h3 className="titulo3">Pessoa Jurídica</h3>
                <NavLink link="http://contribuinte.sefaz.al.gov.br/certidao/" imgsrc={estadual} nome="Estadual: Alagoas"/>
                <NavLink link="https://consulta-crf.caixa.gov.br/consultacrf/pages/consultaEmpregador.jsf" imgsrc={null} nome="FGTS"><Caixa className='logo'/></NavLink>
                <NavLink link="https://cndt-certidao.tst.jus.br/inicio.faces" imgsrc={tst} nome="Trabalhista"/>
                <NavLink link="https://semecmaceio.com/?opcao=certidoes" imgsrc={maceio} nome="Maceió"/>
                <NavLink link="https://arapiraca.abaco.com.br/eagata/portal/" imgsrc={null} nome="Arapiraca"><Arapiraca className='logo'/></NavLink>
                <div className=''>
                    <h3 className='titulo3'>Receita Federal</h3>
                    
                    <div className='sub-menu'>
                        <NavLink link="https://servicos.receita.fazenda.gov.br/Servicos/certidaointernet/PJ/Emitir" imgsrc={receita} nome="Emitir nova certidão"></NavLink>
                        <NavLink link="https://servicos.receita.fazenda.gov.br/Servicos/CertidaoInternet/PJ/Consultar" imgsrc={receita} nome="Emitir segunda via"></NavLink>
                    </div>
                    <div className='sub-menu'>
                        <NavLink link="http://servicos.receita.fazenda.gov.br/Servicos/cnpjreva/cnpjreva_solicitacao.asp"
                        imgsrc={receita}
                        nome="Comprovante de Situação Cadastral"
                        ></NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}

const PF = (props) => {
    return(
        <>
            <div className="links" id='pf' style={{display: props.display}}>
                <h3 className="titulo3">Pessoa Física</h3>
                <NavLink link="http://contribuinte.sefaz.al.gov.br/certidao/" imgsrc={estadual} nome="Estadual: Alagoas"/>
                <NavLink link="https://cndt-certidao.tst.jus.br/inicio.faces" imgsrc={tst} nome="Trabalhista"/>
                <NavLink link="https://solucoes.receita.fazenda.gov.br/Servicos/certidaointernet/PF/Emitir" imgsrc={receita} nome="Emitir nova certidão"></NavLink>
            </div>
        </>
    )
}




export default function Cnds(props){
    
    const [pfstatus, setPfstatus] = useState(false);
    const [pjstatus, setPjstatus] = useState(false);


    function handleClick(e){
        if(e.target.id === 'pj-btn'){
            setPjstatus(!pjstatus)
        }
        if(e.target.id === 'pf-btn'){
            setPfstatus(!pfstatus)
        }
        
    }

    return (
    <>
        <div className="container">
            <h1 className="titulo">Certidões</h1>
            <div className="menus">
                <button className='btn' onClick={(e) => handleClick(e)} id='pf-btn'>Pessoa Física</button>
                <button className='btn' onClick={(e) => handleClick(e)} id='pj-btn'>Pessoa Jurídica</button>
            </div>
            <CSSTransition 
                in={pfstatus}
                timeout={300}
                classNames="menu"
                unmountOnExit>
                <PF/>
            </CSSTransition>

            <CSSTransition 
                in={pjstatus}
                timeout={300}
                classNames="menu"
                unmountOnExit>
                <PJ/> 
            </CSSTransition>

        </div>
    </>
    )
}