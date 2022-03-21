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

    function pushTestData(){
        // const result = tableData
        // result.push({tipo: '44',valor: Math.floor(Math.random()*100)})
        // console.log(result);
        setTableData(old => {
            return [...old, {tipo: '44',valor: Math.floor(Math.random()*100)}]
        })
    }

    function reduceValor(){
        const total = tableData.reduce((total,item) => {
            console.log(item);
            return total + item.valor
        }, 0)
        alert(total)
    }
    

    function totalReducer(){
        let total = {}
        tableData.forEach((item) => {
            !total[item.tipo] ? total[item.tipo] = item.valor : total[item.tipo] = total[item.tipo]+item.valor
        })
        console.log(total)
    }

    return (
    <>
        <h1>Folha</h1>
        <button onClick={pushTestData}>Adicionar</button>
        <button onClick={totalReducer}>Contar</button>
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