import React, { useState, useMemo } from 'react'
import { useTable } from 'react-table/dist/react-table.development'



const data = [  
    {
        tipo: "01", valor: 399.10
    },
    {
        tipo: "10", valor: 962.70
    },
    {
        tipo: "01", valor: 1000.00
    },
    {
        tipo: "33", valor: 777.18
    },
]



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
        {
            Header:'Opções',
            accessor:'opt'
        },
    ],[])

    const editableCell= ({value: valorInicial, row: index, column: id}) => {
        return <input value={valorInicial}/>;
    }

    const [tableData, setTableData] = useState(data)
    const tableInstance = useTable({columns,data: tableData, defaultColumn: {Cell: editableCell}})
    const {
        headers,
        getTableProps,
        getTableBodyProps,
        rows,
        prepareRow,
      } = tableInstance
    
    function remover(index){    
        let result = []
        for(let i = 0; i < tableData.length; i++){
            if(index !== i){
                result.push(tableData[i])
            }
        }
        setTableData(result)
    }

    


    return (
    <>
        <h1>Folha</h1>
        <table {...getTableProps()}>
            <thead>
                <tr>
                {headers.map((column => {
                        return <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                    }))}
                </tr>
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                                
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                            <td key={row.index}><button onClick={() => {remover(row.index)}}>Remover</button></td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </>)
}
