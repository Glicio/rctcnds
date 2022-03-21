const a = {nome: 'Glicio', idade: 23}
const { nome } = a

console.log(nome);

const print = ({ nome }) => {
    console.log(nome);
}

print(a)