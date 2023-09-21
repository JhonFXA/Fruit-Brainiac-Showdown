
const criarCartas = () => {
    const criarElemento = (tag,classe) => {
        const elemento = document.createElement(tag)
        elemento.className = classe
        return elemento
    }
    const carta = criarElemento('div','carta')
    const frente = criarElemento('div','frente face')
    const verso = criarElemento('div','verso face')
    
    carta.appendChild(frente)
    carta.appendChild(verso)
    return carta;
}

const carregarGrade = () => {
    const frutas = ['laranja','cereja','cajú','maçã','banana','côco','morango']
    const container = document.querySelector('.container')
    frutas.forEach(fruta => {
        const carta = criarCartas()
        container.appendChild(carta)
    })
}
carregarGrade()
const cartas= document.querySelectorAll(".carta")

const virarCarta = (cartas,i = 0) => {
    if(i<cartas.length){
        cartas[i].addEventListener('click', ()=>{
            cartas[i].classList.toggle('virarCarta')
        })
        return virarCarta(cartas, i+1)
    }
}
virarCarta(cartas)