import React, { useState, useMemo, useEffect, useRef } from 'react'
import { useTable } from 'react-table/dist/react-table.development'
import './folha.css'


const TIPOS_VALIDOS = ['01','10','33','37','42','43','44','99']

const isValidTipo = (tipo) =>{
    if(TIPOS_VALIDOS.includes(tipo)){
        return true;
    }
    return false;
}

const InputForm = ({ addEntrada, removeEntrada}) =>{

    const [tipo, setTipo] = useState("");
    const [valor, setValor] = useState("");

    const valorInput = useRef(null);
    const tipoInput = useRef(null);



    const handleTipoInput = (e) => {
        if(e.target.value.length >= 2 && !isValidTipo(e.target.value)){
            setTipo("");
            alert("Tipo inválido!")
        }else{
            setTipo(old => e.target.value);
        }

        if (e.target.value.length >= 2 && isValidTipo(e.target.value)){
            valorInput.current.focus();
        }
    }

    const handleValueInput = (e) => {
        setValor(old => e.target.value)
    }
    return(
        <form className='input-form' onSubmit={(e) => {e.preventDefault()}}>
            <div className="form-item">
                <label htmlFor="tipo">Tipo:</label>
                <input ref={tipoInput} type="text" name="tipo" id="tipo" value={tipo} onChange={(e) => {handleTipoInput(e)}}/>
            </div>
            <div className="form-item">
                <label htmlFor="tipo">Valor:</label>
                <input ref={valorInput} type="number" name="valor" id="valor" value={valor} onChange={(e) => {handleValueInput(e)}}/>
            </div>
            <button onClick={(e) => {
                addEntrada({tipo: tipo, valor: valor});
                setValor("");
                setTipo("");
                tipoInput.current.focus();
            }}>Adicionar</button>
        </form>
    )
}

const InputsTable = ({entradas, removeEntrada, updateEntrada}) => {

    const InputTableForm = ({item, index}) => {
        const [row, setRow] = useState(item)

        const handleTipoInput = (e) => {
            
            if(e.target.value.length >= 2 && isValidTipo(e.target.value)){
                setRow(old => {
                    return {tipo: e.target.value, valor: old.valor}
                })
                return
            }else if(e.target.value.length >= 2){
                setRow(old => 
                    item
                )
                alert("Valor Inválido!")
                return
            }
            setRow(old => {
                return {tipo: e.target.value, valor: old.valor}
            })

        }
        const handleValorInput = (e) => {
            setRow(old => {
                return {tipo: old.tipo, valor: e.target.value}
            })
        }
        const update = () => {
            if(row.valor && isValidTipo(row.tipo)){
                updateEntrada(index, {tipo:row.tipo, valor: row.valor})
            }else{
                setRow(old => item)
            }
            
        }
        const getColor = () => {
            if(index % 2 === 0){
                return "#343434"
            }
            return "#545454"
        }
        return (
        <tr key={index} style={{backgroundColor: getColor()}}>
            <td>
                <input type="text" 
                name="tipo" 
                id="tipo" 
                value={row.tipo} 
                onChange={(e) => {handleTipoInput(e)}} 
                onBlur={(e) =>{
                    update();
                }}/>
            </td>
            <td>
                <input type="number" name="valor" id="valor" 
                value={row.valor} 
                onChange={(e) => {handleValorInput(e)}}
                onBlur={(e) => {update();}}
                />
            </td>
            <td><button onClick={(e) => {removeEntrada(index)}}>Remover</button></td>
        </tr>
        )
    }
    return (
        <table className='inputs-table'>
            <thead>
                <tr>
                    <th>Tipo</th>
                    <th>Valor</th>
                    <th>Opções</th>
                </tr>
            </thead>
            <tbody>
                {entradas.length >= 0 && entradas.map((row, index) => {
                    return (
                        <InputTableForm key={index} item={row} index={index} removeEntrada={removeEntrada} updateEntrada={updateEntrada}/>
                    )
                })}
            </tbody>
        </table>
    )
}

export default function Folha(){
    const [entradas, setEntradas] = useState([])

    const addEntrada = (valores) => {
        setEntradas(old => {
            return [...old,valores]
        })
    }

    const getEntradaTotal = () => {
        let res = {}
        let resArr = []
        entradas.forEach((curr) => {
            if(res[curr.tipo]){
                res[curr.tipo] = res[curr.tipo]+parseFloat(curr.valor);
            }else{
                res[curr.tipo] = parseFloat( curr.valor )
            }
        })
        
        for(let item in res){
            resArr.push({tipo: item, valor: res[item]})
        }
        return resArr;
    }

    const removeEntrada = (index) => {
        setEntradas(old => {return old.filter((curr, i) => { if(i === index){return false} return true})})
    }

    const updateEntrada = (index, newValue) => {
        setEntradas(old => {return old.map((curr, currIndex) => {
            if(index === currIndex){
                return newValue;
            }
            return curr;
        })})
    }

    return(
        <>
        {entradas && getEntradaTotal().map(curr => {
            return <div>{curr.tipo} | {curr.valor}</div>
        })}
        <InputForm removeEntrada={removeEntrada} addEntrada={addEntrada} updateEntrada={updateEntrada}/>
        <InputsTable entradas={entradas} removeEntrada={removeEntrada} updateEntrada={updateEntrada}/>
        </>
    )
}