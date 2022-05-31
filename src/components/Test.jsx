import React, { useState } from "react";
import Alert from "./Alert";


const AlertTest = () => {
  const [msg, setMsg] = useState("");
  const [type, setType] = useState("error");
  const [alerts, setAlerts] = useState([]);


  const addAlert = () => {
    setAlerts(old => [...old,{message: msg, type: type, id: (old.length && old.length > 0) ? old.length : 0}])
  }

  return (
    <div className="test">
      <Alert alerts={alerts} setAlerts={setAlerts}/>
      <label htmlFor="msg">Message:</label>
      <input
        type="text"
        name="msg"
        id="msg"
        value={msg}
        onChange={(e) => {
          setMsg(e.target.value);
        }}
      />
      <select name="type" id="type" value={type} onChange={(e) => {setType(e.target.value)}}>
        <option value="error">Erro</option>
        <option value="info">Info</option>
        <option value="succes">Sucesso</option>
      </select>
      <button onClick={addAlert}>Testar Alerta</button>
    </div>
  );
};
export default function Test() {
  return <div className="test"><AlertTest/></div>;
}
