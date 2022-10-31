import './src/Sass/style.scss'

const inputCep = document.querySelector(".input-cep");
const btnBuscar = document.querySelector(".search");
const inputs = document.querySelectorAll(".input-get input");


btnBuscar.addEventListener("click", (event) => {
    event.preventDefault();
    console.log(inputCep.value);
    buscarCEP(inputCep.value);

})
inputCep.addEventListener("keypress", (event) => {

    if (event.key === "Enter" && event.currentTarget.value != "") {
        event.preventDefault();
        buscarCEP(inputCep.value);
    }


})
function getTopo(json) {
    const cep = document.querySelector(".top p:first-child")
    const estado = document.querySelector(".top p:last-child")
    cep.innerText = `CEP: ${json.cep}`;
    estado.innerText = json.localidade;
}

async function buscarCEP(cep) {
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        exibirDados(data);
    }
    catch (error) {
        console.log(error);
    }
}

function exibirDados(json) {
    inputs.forEach((item) => {
        item.value = json[item.getAttribute("id")].toLocaleUpperCase();

    });
    getTopo(json);
    const endereco = json.cep
    const mapa = document.querySelector(".mapa a");

    mapa.href = `https://www.google.com/maps/place/${endereco}`
}