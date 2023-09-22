//A função 'criarCartas' serve para criar as cartas do jogo, como o próprio nome já diz. Dentro dela há a função 'criarElemento', que cria um elemento de acordo com a tag e a classe que for passada nos parâmetros. Depois de criar a carta, a frente e o verso são inseridos dentro dela e a carta é retornada.

const frutas = ['côco','cereja','pêssego','maçã','melancia','banana','limão','morango','pepino','pera']

const criarCartas = (fruta) => {
    const criarElemento = (tag,classe) => {
        const elemento = document.createElement(tag)
        elemento.className = classe
        return elemento
    }
    const carta = criarElemento('div','carta')
    const frente = criarElemento('div','frente face')
    const verso = criarElemento('div','verso face')
    
    
    frente.style.backgroundImage = `url('./imagens/${fruta}.png')`
    frente.style.backgroundPosition = 'center'
    carta.appendChild(frente)
    carta.appendChild(verso)



    return carta;
}

//A função 'carregarGrade' serve para criar a grade de cartas de acordo com a quantidade de frutas definidas para o jogo. Primeiramente, é criada uma lista com 10 frutas e logo abaixo há uma função recursiva para duplicar os elementos da lista, pois necessitamos dos pares. A função 'carregarGradeAux' percorre os elementos da lista recursivamente, criando uma carta para cada elemento.
const carregarGrade = () => {
    const duplica = [...frutas, ...frutas]

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
    carregarGradeAux(duplica.sort( () => Math.random() - 0.5))
}
carregarGrade()

//A função 'virarCarta' adiciona um evento de click para cada elemento com a classe 'carta', sempre que houver um click ela irá receber uma classe que irá rotacionar ela
const cartas = document.querySelectorAll(".carta")
const virarCarta = (cartas,i = 0) => {
    if(i<cartas.length){
        cartas[i].addEventListener('click', ()=>{
            cartas[i].classList.toggle('virarCarta')
        })
        return virarCarta(cartas, i+1)
    }
}
virarCarta(cartas)