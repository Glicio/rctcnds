import React, { useState } from 'react'



let data = [
    {tipo: "01", valor: 399.10},
    {tipo: "10", valor: 962.70},
    {tipo: "01", valor: 1000.00},
    {tipo: "33", valor: 777.18},
]



export default function Folha(props){
    const [tableData, setTableData] = useState(data)
    
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
        <table>
            <thead>
                <tr>
                    <th>TIPO</th>
                    <th>VALOR</th>
                </tr>
            </thead>
            <tbody>
                {tableData.map((item, index) => { return (
                    <tr key={index}>
                        <td>{item.tipo}</td>
                        <td>{item.valor}</td>
                        <td><button onClick={() => remover(index)}>Remover</button></td>
                    </tr>
                )})}
            </tbody>
        </table>
    </>)
}