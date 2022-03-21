import {React, useEffect, useMemo, useState} from 'react'
import { useTable } from 'react-table/dist/react-table.development'




const FAKE_DATA = [  
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


const EditableCell = ({value: initialValue, index: { index }, id: { id }, updateData}) => {

    const [value, setValue] = useState(initialValue)

    useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    const onChange = (e) => {
        setValue(e.taget.value)
    }

    const onBlur = () =>{
        updateData(initialValue, row, column)
    }
    

    return <input value={value} onChange={onChange} onBlur={onblur}/>

}

const column = useMemo([
    {
        columns: [
            {
                accessor: 'tipo',
                Header: 'Tipo'
            },
            {
                accessor: 'valor',
                Header: 'Valor'
            },
        ]
    },
    {cell: EditableCell}
], [])

const tableHooks = (hooks) => {
    hooks.visibleColumns.push((column) => [
        ...column,
        {
            id: 'options',
            Header: 'Opções',
            Cell: ({row}) => {
                <button onClick={() => {
                alert(`Remover`) 
                console.log(row)}}>Remover</button>
            }
        }
    ])
}

const Table = () =>{
  const  {
    headers,
    getTableProps,
    getTableBodyProps,
    rows,
    prepareRow, } = useTable({columns: column, data: FAKE_DATA})

  return(
      <>
        <table className='tabela'{...getTableProps()}>
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
                    //console.log(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => {           
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
      </>
  )
} 


export default  function Tabela () {
    
}