import React, { useState, useMemo, useEffect, useRef } from 'react'
import { useTable } from 'react-table/dist/react-table.development'
import './folha.css'


const TIPOS_VALIDOS = ['01','10','33','37','42','43','44','99']


const EditableCell = ({value: valorInicial, row: {index}, column: {id}, updateData}) => {
    //console.log(`Criando célula na posição: Linha: ${index.index}, Coluna: ${id}`);
    //console.log(id)
    const [valor, setValor] = useState(valorInicial)

    useEffect(() => {
        setValor(valorInicial)
    }, [valorInicial])
    
    const onChange = (e) => {
        setValor(e.target.value)
    }
    
    const onBlur = () =>{
        updateData(valor, index, id)
    }

    const getTipo = () => {
        return id === 'valor' ? 'number' : 'text'
    }
    return <input className='tabela-input' onBlur={onBlur} value={valor} onChange={onChange} type={getTipo()}/>;
}

const validarTipos = (tipo) => {
    return TIPOS_VALIDOS.includes(tipo)
}

const ValoresForm = (props) => {
    
    const tipoInput = useRef(null)
    const valorInput = useRef(null)
    const [tipo,setTipo] = useState("")
    const [valor,setValor] = useState("")

    const onClick = () =>{
        
        props.addData(
            {
                tipo: tipo,
                valor: valor,
            }
        )
        setTipo("")
        setValor("")
        tipoInput.current.focus()
    }

    const onChange = (e) => {
        if(e.target.name === 'tipo'){
            if(e.target.value.length < 2){
                setTipo(e.target.value)
            }
            if(e.target.value.length >= 2 && !validarTipos(e.target.value)){
                alert("valor inválido")
                setTipo("")
            }else if(e.target.value.length >= 2 && validarTipos(e.target.value)){
                setTipo(e.target.value) 
                valorInput.current.focus()
            } 
        }
        if(e.target.name === 'valor'){
            setValor(e.target.value)
        }
    }
    
    return(
        <>
            <form className='form' onSubmit={(e) => {e.preventDefault()}}>
                <div className="form-item">
                    <label htmlFor="tipo">Tipo:</label>
                    <input className='form-input' ref={tipoInput} autoComplete='off' type="text" name='tipo' id='tipo' value={tipo} onChange={(e) => {onChange(e)}}/>
                </div>
                <div className="form-item">
                    <label htmlFor="valor">Valor:</label>
                    <input className='form-input' ref={valorInput} autoComplete='off' type="number" name='valor' id='valor' value={valor} onChange={(e) => {onChange(e)}}/>
                </div>
                <button className='btn' onClick={(e) => onClick(e)}>Adicionar</button>
            </form>
        </>
    )
}


const InputTable = (props) => {
    
    const updateData = props.updateData
    const remover = props.remover
    const columns = useMemo(() => [
        {
            Header: 'Tipo',
            accessor: 'tipo',
        },
        {
            Header: 'Valor',
            accessor: 'valor',
        },
    ],[])

    const [tableData, setTableData] = useState(props.data)

    useEffect(() => {
        setTableData(old => props.data)
    }, [props.data])
    const tableInstance = useTable({columns, data: tableData, defaultColumn: {Cell: EditableCell}, updateData})
    const {
        headers,
        getTableProps,
        getTableBodyProps,
        rows,
        prepareRow,
      } = tableInstance
    
    return (
        <>
            <table className='tabela'{...getTableProps()}>
            <thead>
                <tr>
                {headers.map((column => {
                        return <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                    }))}
                    <th>Opções</th>
                </tr>
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                    prepareRow(row)
                    //console.log(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                                
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                            <td key={row.index} className="opt-td"><button className='opt-btn' onClick={() => {remover(row.index)}}>ⓧ</button></td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        </>
    )
}


export default function Folha(){

    const [data, setData] = useState([])
    function remover(index){    

        const result = data.filter((item, i) => {
            return index !== i
        })

        setData(result)
    }

    function updateData(valor, rowIndex, columnId){
        setData(old => old.map((row, index) => {
            if(index === rowIndex){
                return {...old[rowIndex],[columnId]: parseFloat(valor)}
            }
            return row
        })

        )
    }

    function addData({tipo, valor}){
        // Adiciona um valor à tabela 
        setData(old => {
            return [...old, {tipo: tipo, valor: valor}]
        })
    }    

    function getFolhaInfo(){
        let total = {}
        data.forEach((item) => {
            !total[item.tipo] ? total[item.tipo] = item.valor : total[item.tipo] = total[item.tipo]+item.valor
        })
        console.log(total)
    }


    return (
    <>

        <div className="container-grid">
            <div className="input-div">
                <ValoresForm addData={addData} ></ValoresForm>
                <InputTable
                data={data}
                remover={remover}
                updateData={updateData}/>
            </div>
        </div>
    </>)
}