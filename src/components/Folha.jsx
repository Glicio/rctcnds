import React, { useState, useMemo, useEffect } from 'react'
import { useTable } from 'react-table/dist/react-table.development'


let data = [
    {tipo: "01", valor: 399.10},
    {tipo: "10", valor: 962.70},
    {tipo: "01", valor: 1000.00},
    {tipo: "33", valor: 777.18},
]

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



const ValoresForm = (props) => {
    

    const [tipo,setTipo] = useState("")
    const [valor,setValor] = useState(0)

    const onClick = () =>{
        props.addData(
            {
                tipo: tipo,
                valor: valor,
            }
        )
        setTipo("")
        setValor(0)
    }

    const onChange = (e) => {
        if(e.target.name === 'tipo'){
            setTipo(e.target.value)
        }
        if(e.target.name === 'valor'){
            setValor(e.target.value)
        }
    }
    
    return(
        <>
            <form onSubmit={(e) => {e.preventDefault()}}>
                <div className="form-item">
                    <label htmlFor="tipo">Tipo:</label>
                    <input type="text" name='tipo' id='tipo' value={tipo} onChange={(e) => {onChange(e)}}/>
                </div>
                <div className="form-item">
                    <label htmlFor="valor">Valor:</label>
                    <input type="number" name='valor' id='valor' value={valor} onChange={(e) => {onChange(e)}}/>
                </div>
                <button className='btn' onClick={(e) => onClick(e)}>Adicionar</button>
            </form>
        </>
    )
}



export default function Folha(props){

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

    const [tableData, setTableData] = useState(data)
    const tableInstance = useTable({columns, data: tableData, defaultColumn: {Cell: EditableCell}, updateData})
    const {
        headers,
        getTableProps,
        getTableBodyProps,
        rows,
        prepareRow,
      } = tableInstance
    
    function remover(index){    

        const result = tableData.filter((item, i) => {
            return index !== i
        })

        setTableData(result)
    }

    function updateData(valor, rowIndex, columnId){
        setTableData(old => old.map((row, index) => {
            if(index === rowIndex){
                return {...old[rowIndex],[columnId]: parseFloat(valor)}
            }
            return row
        })

        )
    }

    function addData({tipo, valor}){
        // Adiciona um valor à tabela 
        setTableData(old => {
            return [...old, {tipo: tipo, valor: valor}]
        })
    }    

    function getFolhaInfo(){
        let total = {}
        tableData.forEach((item) => {
            !total[item.tipo] ? total[item.tipo] = item.valor : total[item.tipo] = total[item.tipo]+item.valor
        })
        console.log(total)
    }

    return (
    <>
        <h1>Folha</h1>
        <ValoresForm addData={addData}></ValoresForm>
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
    </>)
}