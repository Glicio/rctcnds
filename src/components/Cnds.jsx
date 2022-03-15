import React, { useState } from 'react'



const PJ = (props) => {
    return(
        <>
            <div className="links" id='pj' style={{display: props.display}}>
                <h3 className="titulo3">Pessoa Jurídica</h3>
                <a href="http://contribuinte.sefaz.al.gov.br/certidao/" className="btn" target='_blank' rel='noreferrer'>Estadual</a>
                <a href="https://consulta-crf.caixa.gov.br/consultacrf/pages/consultaEmpregador.jsf" className="btn" target='_blank' rel='noreferrer'>FGTS</a>
                <a href="https://cndt-certidao.tst.jus.br/inicio.faces" className="btn" target='_blank' rel='noreferrer'>Trabalhista</a>
                <a href="https://semecmaceio.com/?opcao=certidoes" className="btn" target='_blank' rel='noreferrer'>Maceió</a>
                <a href="https://arapiraca.abaco.com.br/eagata/portal/" className="btn" target='_blank' rel='noreferrer'>Arapiraca</a>
                <div>
                    <h3 className='titulo3'>Receita Federal</h3>
                    <div className='sub-menu'>
                        <a href="https://servicos.receita.fazenda.gov.br/Servicos/certidaointernet/PJ/Emitir" className="btn" target='_blank' rel='noreferrer'>Emitir Nova</a>
                        <a href="https://servicos.receita.fazenda.gov.br/Servicos/CertidaoInternet/PJ/Consultar" className="btn" target='_blank' rel='noreferrer'>Segunda Via</a>
                    </div>
                    <div className='sub-menu'>
                        <a href="http://servicos.receita.fazenda.gov.br/Servicos/cnpjreva/cnpjreva_solicitacao.asp" className="btn" target='_blank' rel='noreferrer'>Situação Cadastral</a>
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
                <a href="https://contribuinte.sefaz.al.gov.br/certidao/#/" className="btn" target='_blank' rel='noreferrer'>Estadual: Alagoas</a>
                <a href="https://cndt-certidao.tst.jus.br/inicio.faces" className="btn" target='_blank' rel='noreferrer'>Trabalhista</a>
                <a href="http://solucoes.receita.fazenda.gov.br/Servicos/certidaointernet/PF/Emitir" className="btn" target='_blank' rel='noreferrer'>Federal</a>
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