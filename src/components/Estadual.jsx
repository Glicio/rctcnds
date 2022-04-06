import { useState } from "react"
import "../static/Estadual.css"


const data = require("../static/estadual.json")

const estados = data.itens.map(cnd => {
    return {id: cnd.estado, name: cnd.name}
})

export default function Estadual(){
    const [estado, setEstado] = useState("AL")



    const DropDown = () =>{
        return(
            <>
                 <select name="estado" id="estado" value={estado} onChange={(e) => {setEstado(old => e.target.value)}}>
                    {estados.map(es => {
                        return <option key={es.id} value={es.id}>{es.id}</option>
                    })}
                 </select>
            </>
        )
    }

    return (
    <div className="estadual-div">
        
        <DropDown></DropDown>

        {data.itens.map(cnd => {
            if(estado === cnd.estado){
                return  <a key={cnd.estado} id={cnd.estado} href={cnd.link} className="btn" target='_blank' rel='noreferrer'>
                            {<img key={"img:"+cnd.estado} src={cnd.img_url} alt="" className="logo"/>} {cnd.name}
                        </a>
            }else{
                return null
            }
        })}
    </div>
    )
}