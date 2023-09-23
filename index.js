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

//A função 'criarCartas' serve para criar as cartas do jogo, como o próprio nome já diz. Dentro dela há a função 'criarElemento', que cria um elemento de acordo com a tag e a classe que for passada nos parâmetros. Depois de criar a carta, a frente e o verso são inseridos dentro dela e a carta é retornada.
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


const cartas = document.querySelectorAll(".carta")
const cartasViradas = []

//A função 'virarCartaAux' funciona como um 'forEach', que para cada carta, adiciona um evento de click que chama a função 'virarCarta'.
const virarCartaAux = (cartas, i = 0) => {
  if (i < cartas.length) {
    cartas[i].addEventListener("click", () => {
      virarCarta(cartas[i])
    })
    return virarCartaAux(cartas, i + 1)
  }
}
virarCartaAux(cartas)

//A função 'virarCarta' é a que faz o jogo funcionar em cada grade de cartas, ela possui uma série de outras funções e condicionais que serão explicadas a seguir.
const virarCarta = (carta) => {
  const possuiClasse = (elemento, classe) => elemento.classList.contains(classe) //Checa se um elemento possui uma classe.
  const adicionarClasse = (elemento, classe) => elemento.classList.add(classe) //Adiciona classe para o elemento.
  const removerClasse = (elemento, classe) => elemento.classList.remove(classe) //Remove classe de um elemento.
  const puxarElemento = (elemPai, elemFilho) => elemPai.querySelector(elemFilho) //Puxa algum elemento para ser utilizado.
  const puxarUrl = (elemento) => getComputedStyle(elemento).getPropertyValue("background-image")//Guarda a url da imagem de um elemento
  //A função 'pausarClick' foi implementada para que os jogadores não consigam clicar em várias cartas em pouco tempo, evitando possíveis trapaças. Além disso, ela chama a si mesmo recursivamente, alterando o evento de click para cada carta.
  const pausarClick = (cartas, ordem, i = 0) => {
    if (i < cartas.length) {
      cartas[i].style.pointerEvents = ordem
      return pausarClick(cartas, ordem, i + 1)
    }
  }
  //Se a carta que entrar na função como parâmetro já tiver a classe 'cartas-iguais', significa que ela já teve seu par resolvido, portanto, ela não pode ser virada novamente.
  if (possuiClasse(carta, "cartas-iguais")) return

  //Se a carta ainda não foi virada, ou seja, não possui a classe 'virar-carta' e a quantidade de cartas viradas for menor que dois, ela receberá a classe e será adicionada na lista de cartas viradas.
  else if (!possuiClasse(carta, "virar-carta") && cartasViradas.length < 2) {
    adicionarClasse(carta, "virar-carta")
    cartasViradas.push(carta)

    //Caso já existam duas cartas viradas, temos que checar se as cartas escolhidas são iguais ou não.
    if (cartasViradas.length === 2) {
      const escolhas = [cartasViradas[0], cartasViradas[1]]//Aqui vão ficar as cartas que o jogador escolheu.
      const frentes = [
        puxarElemento(escolhas[0], ".frente"),
        puxarElemento(escolhas[1], ".frente"),
      ] //Aqui vão ficar as frentes das cartas que o jogador escolheu.
      const versos = [
        escolhas[0].querySelector(".verso"),
        escolhas[1].querySelector(".verso"),
      ] //Aqui vão ficar os versos das cartas que o jogador escolheu.
      const urlFrutas = [puxarUrl(frentes[0]), puxarUrl(frentes[1])] //Essa lista vai guardar a url das imagens de cada frente.
      cartasViradas.length = 0 //Após a escolha de duas cartas, o número de viradas tem que voltar à zero.
      pausarClick(cartas, "none") //O clicks devem ser pausados na escolha de duas cartas.

      // O 'setTimeout' define um atraso, tudo o que estiver dentro de seu escopo só será executado após 0.7 segundos. Está sendo utilizado para que dê tempo de o jogador ver as cartas que escolheu antes de serem viradas novamente.
      setTimeout(() => {
        //Ambas as cartas irão perder a classe de virada e serão escondidas novamente,...
        removerClasse(escolhas[0], "virar-carta")
        removerClasse(escolhas[1], "virar-carta")
        //mas caso as frutas sejam iguais, elas receberão a classe de 'cartas-iguais', que as deixará transparentes e travadas.
        if (urlFrutas[0] === urlFrutas[1]) {
          escolhas[0].classList.add("cartas-iguais")
          escolhas[1].classList.add("cartas-iguais")
          versos[0].style.display = "none"
          versos[1].style.display = "none"
        }
        const igualdades = document.querySelectorAll(".cartas-iguais") //Lista de pares que foram resolvidos.
          //Se a quantidade de pares resolvidos condizer com a quantidade de cartas no jogo, então houve uma vitória.
        if (igualdades.length === 20) {
          window.alert("voa mlk")
          window.location.reload()
        }
        pausarClick(cartas, "all")//Retorna o evento de click nas cartas.
      }, 700)
    }
  }
}



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
