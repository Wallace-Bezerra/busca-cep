import './src/Sass/style.scss'
import IMask from 'imask';

const inputCep = document.querySelector(".input-cep");
const btnBuscar = document.querySelector(".search");
const inputs = document.querySelectorAll(".input-get input");

const inputMask = IMask(inputCep, {
    mask: '00000-000'
})


btnBuscar.addEventListener("click", (event) => {
    event.preventDefault();
    console.log(inputCep.value);
    buscarCEP(inputCep.value);

})
inputCep.addEventListener("keypress", (event) => {

    if (event.key === "Enter" && event.currentTarget.value != "") {
        console.log(event.key);
        event.preventDefault();
        buscarCEP(inputCep.value);
    }
    if (event.key === "Enter" && event.currentTarget.value === "") {
        event.preventDefault();
        alert("Insira um cep valido!")
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
        console.log(response);
        const data = await response.json();
        if (data.erro) {
            alert("CEP não existe!");
        }
        else {
            exibirDados(data);
        }

    }
    catch (error) {
        console.log(error);
        alert(error);
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
    const card = document.querySelector(".card")

    card.dataset.animation = "fadeIn";
    card.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    })
}