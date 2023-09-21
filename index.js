//A função criarCartas serve para criar as cartas do jogo, como o próprio nome já diz. Dentro dela há a função criarElemento, que cria um elemento de acordo com a tag e a classe que for passada nos parâmetros. Depois de criar a carta, a frente e o verso são inseridos dentro dela e a carta é retornada.
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
    const frutas = ['laranja','laranja', 'cereja','cereja', 'pêssego','pêssego', 'maçã','maçã', 'melancia','melancia', 'banana','banana', 'côco', 'côco', 'morango', 'morango', 'cenoura', 'cenoura', 'pera', 'pera']
    const container = document.querySelector('.container')

    const carregarGradeAux = ([a,...b])=>{
        if(b.length==0){
            const carta = criarCartas(a)
           return container.appendChild(carta)
        }else{
            const carta = criarCartas(a)
            container.appendChild(carta)
            return carregarGradeAux(b)
        }
    }
    carregarGradeAux(frutas)
}
carregarGrade()
const cartas = document.querySelectorAll(".carta")


//
const virarCarta = (cartas,i = 0) => {
    if(i<cartas.length){
        cartas[i].addEventListener('click', ()=>{
            cartas[i].classList.toggle('virarCarta')
        })
        return virarCarta(cartas, i+1)
    }
}
virarCarta(cartas)