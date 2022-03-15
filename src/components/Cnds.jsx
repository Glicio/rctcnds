import React, { useState } from 'react'

import {ReactComponent as Caixa} from '../static/imgs/caixa.svg'
import {ReactComponent as Arapiraca} from '../static/imgs/arapiraca.svg'

import estadual from '../static/imgs/brasao_alagoas-463630d216.png'
import maceio from '../static/imgs/maceio.png'
import tst from '../static/imgs/tst.png'
import receita from '../static/imgs/receita_federal.png'




const PJ = (props) => {
    return(
        <>
            <div className="links" id='pj' style={{display: props.display}}>
                <h3 className="titulo3">Pessoa Jurídica</h3>
                <a href="http://contribuinte.sefaz.al.gov.br/certidao/" className="btn" target='_blank' rel='noreferrer'>
                    <img src={estadual} alt="" className="logo" />Estadual: Alagoas
                </a>
                <a href="https://consulta-crf.caixa.gov.br/consultacrf/pages/consultaEmpregador.jsf" className="btn" target='_blank' rel='noreferrer'>
                    <Caixa className="logo"/>FGTS
                </a>
                <a href="https://cndt-certidao.tst.jus.br/inicio.faces" className="btn" target='_blank' rel='noreferrer'>
                    <img src={tst} alt="" className="logo" />Trabalhista
                </a>
                <a href="https://semecmaceio.com/?opcao=certidoes" className="btn" target='_blank' rel='noreferrer'>
                    <img src={maceio} alt="" className="logo" />Maceió
                </a>
                <a href="https://arapiraca.abaco.com.br/eagata/portal/" className="btn" target='_blank' rel='noreferrer'>
                    <Arapiraca className='logo'/>Arapiraca
                </a>
                <div className=''>
                    <h3 className='titulo3'>Receita Federal</h3>
                    
                    <div className='sub-menu'>
                        <a href="https://servicos.receita.fazenda.gov.br/Servicos/certidaointernet/PJ/Emitir" className="btn" target='_blank' rel='noreferrer'><img src={receita} alt="" className="logo" />Emitir Nova</a>
                        <a href="https://servicos.receita.fazenda.gov.br/Servicos/CertidaoInternet/PJ/Consultar" className="btn" target='_blank' rel='noreferrer'><img src={receita} alt="" className="logo" />Segunda Via</a>
                    </div>
                    <div className='sub-menu'>
                        <a href="http://servicos.receita.fazenda.gov.br/Servicos/cnpjreva/cnpjreva_solicitacao.asp" className="btn" target='_blank' rel='noreferrer'><img src={receita} alt="" className="logo" />Situação Cadastral</a>
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
                <a href="https://contribuinte.sefaz.al.gov.br/certidao/#/" className="btn" target='_blank' rel='noreferrer'>
                    <img src={estadual} alt="" className="logo" />Estadual: Alagoas
                </a>
                <a href="https://cndt-certidao.tst.jus.br/inicio.faces" className="btn" target='_blank' rel='noreferrer'>
                    <img src={tst} alt="" className="logo" />Trabalhista
                </a>
                <a href="http://solucoes.receita.fazenda.gov.br/Servicos/certidaointernet/PF/Emitir" className="btn" target='_blank' rel='noreferrer'>
                    <img src={receita} alt="" className="logo" />Federal
                </a>
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
            <PF display={pfstatus ? 'flex' : 'none'}/>
            <PJ display={pjstatus ? 'flex' : 'none'}/> 

        </div>
    </>
    )
}