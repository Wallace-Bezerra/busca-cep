import './src/Sass/style.scss'
import gsap from "gsap";
import IMask from 'imask';

const inputCep = document.querySelector(".input-cep");
const btnBuscar = document.querySelector(".search");
const inputs = document.querySelectorAll(".input-get input");

const inputMask = IMask(inputCep, {
    mask: '00000-000',
    lazy: true
})

btnBuscar.addEventListener("click", (event) => {
    event.preventDefault();
    console.log(inputCep.value);
    if (inputCep.value !== "") {
        buscarCEP(inputCep.value);
    }
    else {
        inputCep.setAttribute("placeholder", "DIGITE UM CEP!");
    }

})
inputCep.addEventListener("keypress", (event) => {

    if (event.key === "Enter" && event.currentTarget.value != "") {
        console.log(event.key);
        event.preventDefault();
        buscarCEP(inputCep.value);
    }
    if (event.key === "Enter" && event.currentTarget.value === "") {
        event.preventDefault();
        inputCep.setAttribute("placeholder", "DIGITE UM CEP!");
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
            clearInput();
            inputCep.setAttribute("placeholder", "NÃO ACHAMOS!");
        }
        else {
            exibirDados(data);
            clearInput();
            inputCep.setAttribute("placeholder", "00000-000");
        }

    }
    catch (error) {
        console.log(error);
        clearInput();
        inputCep.setAttribute("placeholder", "NÃO ACHAMOS!");
    }
}

function exibirDados(json) {
    inputs.forEach((item) => {
        item.value = json[item.getAttribute("id")].toLocaleUpperCase();

    });
    getTopo(json);
    const endereco = json.cep
    const mapa = document.querySelector(".mapa a");

    mapa.href = `https://www.google.com/maps/search/${endereco}`

    const card = document.querySelector(".card")

    card.dataset.animation = "fadeIn";
    card.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    })
}

function clearInput() {
    inputMask.value = "";
}

let tl = gsap.timeline()

tl.fromTo(".logo",
    { y: -50, opacity: 0 },
    { y: 0, opacity: 1, ease: "power4.out", duration: .7 });

tl.fromTo(".title",
    { x: -80, opacity: 0 },
    { x: 0, duration: .7, ease: "power1.out", opacity: 1 }), '-=0.5';

tl.fromTo("form",
    { y: -60, opacity: 0 },
    { y: 0, duration: .7, ease: "power1.out", opacity: 1 }, '-=0.5');

tl.fromTo("#linkedin img",
    { y: -50, opacity: 0 },
    { y: 0, opacity: 1, ease: "power", duration: .7 }, '-=0.5');

tl.fromTo("#github img",
    { y: -50, opacity: 0 },
    { y: 0, opacity: 1, ease: "power", duration: .8 }, '-=0.5');



