//A função 'criarCartas' serve para criar as cartas do jogo, como o próprio nome já diz. Dentro dela há a função 'criarElemento', que cria um elemento de acordo com a tag e a classe que for passada nos parâmetros. Depois de criar a carta, a frente e o verso são inseridos dentro dela e a carta é retornada.

const frutas = [
  "côco",
  "cereja",
  "pêssego",
  "maçã",
  "melancia",
  "banana",
  "limão",
  "morango",
  "pepino",
  "pera",
]

const criarCartas = (fruta) => {
  const criarElemento = (tag, classe) => {
    const elemento = document.createElement(tag)
    elemento.className = classe
    return elemento
  }
  const carta = criarElemento("div", "carta")
  const frente = criarElemento("div", "frente face")
  const verso = criarElemento("div", "verso face")

  frente.style.backgroundImage = `url('./imagens/${fruta}.png')`
  frente.style.backgroundPosition = "center"
  carta.appendChild(frente)
  carta.appendChild(verso)

  return carta
}

//A função 'carregarGrade' serve para criar a grade de cartas de acordo com a quantidade de frutas definidas para o jogo. Primeiramente, é criada uma lista com 10 frutas e logo abaixo há uma função recursiva para duplicar os elementos da lista, pois necessitamos dos pares. A função 'carregarGradeAux' percorre os elementos da lista recursivamente, criando uma carta para cada elemento.
const carregarGrade = () => {
  const duplica = [...frutas, ...frutas]

  const container = document.querySelector(".container")

  const carregarGradeAux = ([a, ...b]) => {
    if (b.length == 0) {
      const carta = criarCartas(a)
      return container.appendChild(carta)
    } else {
      const carta = criarCartas(a)
      container.appendChild(carta)
      return carregarGradeAux(b)
    }
  }
  carregarGradeAux(duplica.sort(() => Math.random() - 0.5))
}
carregarGrade()

//A função 'virarCarta' adiciona um evento de click para cada elemento com a classe 'carta', sempre que houver um click ela irá receber uma classe que irá rotacionar ela

const cartasViradas = []

const cartas = document.querySelectorAll(".carta")

const virarCarta = (carta) => {
  const contemClasse = carta.classList.contains("virarCarta")
  
  if (!contemClasse && cartasViradas.length < 2) {
    carta.classList.add("virarCarta")
    cartasViradas.push(carta)
  }
  if (cartasViradas.length === 2) {
    const jogoPause = (cartas,i=0) => (ordem) => {
      if(i<cartas.length){
        cartas[i].style.pointerEvents = ordem
        return jogoPause(cartas,i+1)(ordem)
      }
    }
    jogoPause(cartas)('none')

    const escolhas =[cartasViradas[0],cartasViradas[1]]
    const frentes = [escolhas[0].querySelector('.frente'),escolhas[1].querySelector('.frente')]
    const versos = [escolhas[0].querySelector('.verso'),escolhas[1].querySelector('.verso')]
    const frutaUrl1 = getComputedStyle(frentes[0]).getPropertyValue('background-image')
    const frutaUrl2 = getComputedStyle(frentes[1]).getPropertyValue('background-image')
    cartasViradas.length = 0

    setTimeout(()=>{
      escolhas[0].classList.remove('virarCarta')
      escolhas[1].classList.remove('virarCarta')

      if(frutaUrl1===frutaUrl2){
        const igualdades = document.querySelectorAll('.cartas-iguais')
        if(igualdades.length+2 === 20 ){
          window.alert('voa mlk')
          window.location.reload()
        }
        escolhas[0].classList.add('cartas-iguais')
        escolhas[1].classList.add('cartas-iguais')
        versos[0].style.display = 'none'
        versos[1].style.display = 'none'
      } 

      jogoPause(cartas)('all')
    },700)
  } else if (contemClasse) {
    carta.classList.remove("virarCarta")
    const index = cartasViradas.indexOf(carta)
    cartasViradas.splice(index, 1)
  }
}


const virarCartaAux = (cartas, i = 0) => {
  if (i < cartas.length) {
    cartas[i].addEventListener("click", () => {
      virarCarta(cartas[i])
    })
    return virarCartaAux(cartas, i + 1)
  }
}
virarCartaAux(cartas)

function comecarTempo(duracao, display) {
  var tempo = duracao,
    segundos
  setInterval(() => {
    segundos = parseInt(tempo % 60, 10)
    segundos = segundos < 10 ? `0` + segundos + `s` : segundos + `s`
    display.textContent = segundos
    if (--tempo < 0) {
      tempo = duracao
    }
  }, 1000)
}

window.onload = function () {
  var duracao = 10
  var display = document.querySelector(".tempo")
  comecarTempo(duracao, display)
}
