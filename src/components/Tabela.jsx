import React, { useState, useMemo } from 'react'
import { useTable } from 'react-table/dist/react-table.development'



const EditableCell = (data) => {

    const [value, setValue] = useState( data.value )
    //console.log("DATA: ",data);


    const onChange = (event) =>{
        setValue(old => event.target.value)
    }
    return <input type="text" value={value} onChange={onChange} />
}



export default function Table(){

    function remover() {

    }


    const ColumnsHook = (hooks) => {
        console.log(hooks.visibleColumns);
        hooks.visibleColumns.push((c) => [...c, {
            id: 'options',
            Header: 'Opções',
            Cell: ({row}) => {
                return <button onClick={() => {remover(row.index)}}>Remover</button>
            }
        }])
    }

    const FAKE_DATA = [
        {tipo: "01", valor: 399.10},
        {tipo: "10", valor: 962.70},
        {tipo: "01", valor: 1000.00},
        {tipo: "33", valor: 777.18},
    ]

    const [data, setData] = useState(FAKE_DATA)
 
    const columns = useMemo(() => [
        {
            Header: 'Tipo',
            accessor: 'tipo',
            Cell: EditableCell
        },
        {
            Header: 'Valor',
            accessor: 'valor',
        },
    ],[])

    const tableInstance = useTable({data: data, columns: columns}, ColumnsHook)

    const { headerGroups, rows, getHeaderGroupProps, getTableProps, getTableBodyProps, prepareRow} = tableInstance


    return (<>
        <table className='tabela' {...getTableProps()}>

            <thead>
                {headerGroups.map(headerGroup => {
                    return (
                        <tr { ...headerGroup.getHeaderGroupProps()}>
                            
                                {headerGroup.headers.map(header => {
                                    return(
                                    <th {...header.getHeaderProps()}>
                                        {header.render('Header')}
                                    </th>)
                                })}

                        </tr>
                    )
                })}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                    prepareRow(row)
                    return (<tr {...row.getRowProps()}>
                        {row.cells.map(cell => {
                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                        })}
                    </tr>)  
                })}
            </tbody>
        </table>
    </>)
}