import React, { useState, useEffect, useRef } from "react";
import "./folha.css";

const TIPOS_VALIDOS = ["01", "10", "33", "37", "42", "43", "44", "99"];

const isValidTipo = (tipo) => {
  if (TIPOS_VALIDOS.includes(tipo)) {
    return true;
  }
  return false;
};

const InputForm = ({ addEntrada, removeEntrada }) => {
  const [tipo, setTipo] = useState("");
  const [valor, setValor] = useState("");

  const valorInput = useRef(null);
  const tipoInput = useRef(null);

  const handleTipoInput = (e) => {
      if(isNaN(e.target.value)) return alert("Tipo inválido!")
    if (e.target.value.length >= 2 && !isValidTipo(e.target.value)) {
      setTipo("");
      alert("Tipo inválido!");
    } else {
      setTipo((old) => e.target.value);
    }

    if (e.target.value.length >= 2 && isValidTipo(e.target.value)) {
      valorInput.current.focus();
    }
  };

  const handleValueInput = (e) => {
    setValor((old) => e.target.value);
  };
  return (
    <form
      className="input-form"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div className="form-item">
        <label htmlFor="tipo">Tipo:</label>
        <input
          ref={tipoInput}
          type="text"
          name="tipo"
          id="tipo"
          value={tipo}
          onChange={(e) => {
            handleTipoInput(e);
          }}
        />
      </div>
      <div className="form-item">
        <label htmlFor="tipo">Valor:</label>
        <input
          ref={valorInput}
          type="number"
          name="valor"
          id="valor"
          value={valor}
          onChange={(e) => {
            handleValueInput(e);
          }}
        />
      </div>
      <button
        onClick={(e) => {
          addEntrada({ tipo: tipo, valor: valor });
          setValor("");
          setTipo("");
          tipoInput.current.focus();
        }}
      >
        Adicionar
      </button>
    </form>
  );
};

const InputsTable = ({ entradas, removeEntrada, updateEntrada }) => {
  const InputTableForm = ({ item, index }) => {
    const [row, setRow] = useState(item);

    const handleTipoInput = (e) => {
      if (e.target.value.length >= 2 && isValidTipo(e.target.value)) {
        setRow((old) => {
          return { tipo: e.target.value, valor: old.valor };
        });
        return;
      } else if (e.target.value.length >= 2) {
        setRow((old) => item);
        alert("Valor Inválido!");
        return;
      }
      setRow((old) => {
        return { tipo: e.target.value, valor: old.valor };
      });
    };
    const handleValorInput = (e) => {
      setRow((old) => {
        return { tipo: old.tipo, valor: e.target.value };
      });
    };
    const update = () => {
      if (row.valor && isValidTipo(row.tipo)) {
        updateEntrada(index, { tipo: row.tipo, valor: row.valor });
      } else {
        setRow((old) => item);
      }
    };
    const getColor = () => {
      if (index % 2 === 0) {
        return "#343434";
      }
      return "#545454";
    };
    return (
      <tr key={index} style={{ backgroundColor: getColor() }}>
        <td>
          <input
            type="text"
            name="tipo"
            id="tipo"
            value={row.tipo}
            onChange={(e) => {
              handleTipoInput(e);
            }}
            onBlur={(e) => {
              update();
            }}
          />
        </td>
        <td>
          <input
            type="number"
            name="valor"
            id="valor"
            value={row.valor}
            onChange={(e) => {
              handleValorInput(e);
            }}
            onBlur={(e) => {
              update();
            }}
          />
        </td>
        <td>
          <button
            onClick={(e) => {
              removeEntrada(index);
            }}
          >
            Remover
          </button>
        </td>
      </tr>
    );
  };
  return (
    <table className="inputs-table">
      <thead>
        <tr>
          <th>Tipo</th>
          <th>Valor</th>
          <th>Opções</th>
        </tr>
      </thead>
      <tbody>
        {entradas.length >= 0 &&
          entradas.map((row, index) => {
            return (
              <InputTableForm
                key={index}
                item={row}
                index={index}
                removeEntrada={removeEntrada}
                updateEntrada={updateEntrada}
              />
            );
          })}
      </tbody>
    </table>
  );
};

const TotalTable = ({ entradas, getEntradaTotal }) => {
  const [total, setTotal] = useState(getEntradaTotal(entradas));
  useEffect(() => {
    setTotal(getEntradaTotal(entradas));
  }, [entradas, getEntradaTotal]);

  const getFormattedValor = (valor) => {
    valor = valor.toFixed(2);
    return valor;
  };

  return (
    <table className="inputs-table">
      <thead>
        <tr>
          <th>Tipo:</th>
          <th>Valor Total:</th>
        </tr>
      </thead>
      <tbody>
        {total.length > 0 &&
          total.map((curr, index) => {
            return (
              <tr key={index}>
                <td>{curr.tipo}</td>
                <td>R$ {getFormattedValor(curr.valor)}</td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

const DescontosForm = ({ descontos, setDescontos }) => {
  const handleChange = (e) => {
    setDescontos((old) => {
      return { ...old, [e.target.name]: e.target.value };
    });
  };
  return (
    <form
      action=""
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className="descontos-form"
    >
      <span>Descontos</span>
      <div className="form-item">
        <label htmlFor="RPPS">RPPS</label>
        <input
          type="number"
          name="rpps"
          id="rpps"
          value={descontos.rpps}
          onChange={handleChange}
        />
      </div>
      <div className="form-item">
        <label htmlFor="INSS">INSS</label>
        <input
          type="number"
          name="inss"
          id="inss"
          value={descontos.inss}
          onChange={handleChange}
        />
      </div>
      <div className="form-item">
        <label htmlFor="IRRF">IRRF</label>
        <input
          type="number"
          name="irrf"
          id="irrf"
          value={descontos.irrf}
          onChange={handleChange}
        />
      </div>
      <div className="form-item">
        <label htmlFor="PENSÃO ALIMENTÍCIA">PENSÃO ALIMENTÍCIA</label>
        <input
          type="number"
          name="pAlimenticia"
          id="pAlimenticia"
          value={descontos.pAlimenticia}
          onChange={handleChange}
        />
      </div>
      <div className="form-item">
        <label htmlFor="SINTEAL">SINTEAL</label>
        <input
          type="number"
          name="sinteal"
          id="sinteal"
          value={descontos.sinteal}
          onChange={handleChange}
        />
      </div>
      <div className="form-item">
        <label htmlFor="SINDACS">SINDACS</label>
        <input
          type="number"
          name="sindacs"
          id="sindacs"
          value={descontos.sindacs}
          onChange={handleChange}
        />
      </div>
      <div className="form-item">
        <label htmlFor="SINDPREV">SINDPREV</label>
        <input
          type="number"
          name="sindprev"
          id="sindprev"
          value={descontos.sindprev}
          onChange={handleChange}
        />
      </div>
      <div className="form-item">
        <label htmlFor="CONSIGNADO CAIXA">CONSIGNADO CAIXA</label>
        <input
          type="number"
          name="consigcaixa"
          id="consigcaixa"
          value={descontos.consigcaixa}
          onChange={handleChange}
        />
      </div>
      <div className="form-item">
        <label htmlFor="CONSIGNADO POLICARD">CONSIGNADO POLICARD</label>
        <input
          type="number"
          name="consigpolicard"
          id="consigpolicard"
          value={descontos.consigpolicard}
          onChange={handleChange}
        />
      </div>
    </form>
  );
};

export default function Folha() {
  const [entradas, setEntradas] = useState([]);
  const [descontos, setDescontos] = useState({
    rpps: "",
    inss: "",
    irrf: "",
    pAlimenticia: "",
    sindprev: "",
    sinteal: "",
    sindacs: "",
    consigcaixa: "",
    consigpolicard: ""  
  });

  const addEntrada = (valores) => {
    setEntradas((old) => {
      return [...old, valores];
    });
  };

  const getEntradaTotal = (entradas) => {
    let res = {};
    let resArr = [];
    entradas.forEach((curr) => {
      if (res[curr.tipo]) {
        res[curr.tipo] = res[curr.tipo] + parseFloat(curr.valor);
      } else {
        res[curr.tipo] = parseFloat(curr.valor);
      }
    });

    for (let item in res) {
      resArr.push({ tipo: item, valor: res[item] });
    }
    return resArr;
  };

  const removeEntrada = (index) => {
    setEntradas((old) => {
      return old.filter((curr, i) => {
        if (i === index) {
          return false;
        }
        return true;
      });
    });
  };

  const updateEntrada = (index, newValue) => {
    setEntradas((old) => {
      return old.map((curr, currIndex) => {
        if (index === currIndex) {
          return newValue;
        }
        return curr;
      });
    });
  };

  return (
    <>
      <div className="component">
        <InputForm
          removeEntrada={removeEntrada}
          addEntrada={addEntrada}
          updateEntrada={updateEntrada}
        />
        <InputsTable
          entradas={entradas}
          removeEntrada={removeEntrada}
          updateEntrada={updateEntrada}
        />
        <TotalTable entradas={entradas} getEntradaTotal={getEntradaTotal} />
      </div>
      <div className="component">
        <DescontosForm descontos={descontos} setDescontos={setDescontos} />
      </div>
    </>
  );
}
