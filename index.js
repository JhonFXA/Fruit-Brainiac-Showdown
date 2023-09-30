const containerUm = document.querySelector(".container1")
const containerDois = document.querySelector(".container2")
const pontosP1 = document.getElementById('pontosP1')
const pontosP2 = document.getElementById('pontosP2')
const boxHabilidades = document.querySelectorAll(".box-habilidades")
const botoesP1 = boxHabilidades[0].querySelectorAll(".botao")
const botoesP2 = boxHabilidades[1].querySelectorAll(".botao")
const tempoP1 = document.getElementById('tempoP1')
const tempoP2 = document.getElementById('tempoP2')


const cartasViradas = []
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

const carregarGrade = (container) => {
  const duplica = [...frutas, ...frutas]
  const carregarGradeAux = ([a, ...b]) => {
    const carta = criarCartas(a)
    if (b.length == 0) {
      return container.appendChild(carta)
    } else {
      container.appendChild(carta)
      return carregarGradeAux(b)
    }
  }
  carregarGradeAux(duplica.sort(() => Math.random() - 0.2))
}
carregarGrade(containerUm)
carregarGrade(containerDois)

const cartas = document.querySelectorAll(".carta")
const cartas1 = containerUm.querySelectorAll(".carta")
const cartas2 = containerDois.querySelectorAll(".carta")

const primeiraJogada = (cartas, i = 0) => {
  if (i < cartas.length) {
    cartas[i].classList.add("pode-virar")
    return primeiraJogada(cartas, i + 1)
  }
}
primeiraJogada(cartas1)

const possuiClasse = (elemento, classe) => elemento.classList.contains(classe) //Checa se um elemento possui uma classe.
const adicionarClasse = (elemento, classe) => elemento.classList.add(classe) //Adiciona classe para o elemento.
const removerClasse = (elemento, classe) => elemento.classList.remove(classe) //Remove classe de um elemento.
//A função 'pausarClick' foi implementada para que os jogadores não consigam clicar em várias cartas em pouco tempo, evitando possíveis trapaças. Além disso, ela chama a si mesmo recursivamente, alterando o evento de click para cada carta.
const pausarClick = (cartas, ordem, i = 0) => {
  if (i < cartas.length) {
    cartas[i].style.pointerEvents = ordem
    return pausarClick(cartas, ordem, i + 1)
  }
}

const existeAtivado = ([a,...b]) => {
  if(a === undefined) return false
  else if(a.classList.contains('ativado')) return true
  return existeAtivado(b)
}

const removerClassePraCada = ([a, ...b], classe) => {
  if (a) {
    a.classList.remove(classe);
    removerClassePraCada(b, classe);
  }
}

const verificarPontosP1 = () =>{
  if(!existeAtivado(botoesP1)){
    if(pontosP1.innerHTML > 1 && !possuiClasse(botoesP1[0],"ativado")){
      adicionarClasse(botoesP1[0],"botao-piscante-P1")
    }
    if(pontosP1.innerHTML > 2 && !possuiClasse(botoesP1[1],"ativado")){
      adicionarClasse(botoesP1[1],"botao-piscante-P1")
    }
    if(pontosP1.innerHTML > 3 && !possuiClasse(botoesP1[2],"ativado")){
      adicionarClasse(botoesP1[2],"botao-piscante-P1")
    }
    if(pontosP1.innerHTML > 4 && !possuiClasse(botoesP1[3],"ativado")){
      adicionarClasse(botoesP1[3],"botao-piscante-P1")
    }
  }
}

const verificarPontosP2 = () =>{
  if(!existeAtivado(botoesP2)){
    if(pontosP2.innerHTML > 1 && !possuiClasse(botoesP2[0],"ativado")){
      adicionarClasse(botoesP2[0],"botao-piscante-P2")
    }
    if(pontosP2.innerHTML > 2 && !possuiClasse(botoesP2[1],"ativado")){
      adicionarClasse(botoesP2[1],"botao-piscante-P2")
    }
    if(pontosP2.innerHTML > 3 && !possuiClasse(botoesP2[2],"ativado")){
      adicionarClasse(botoesP2[2],"botao-piscante-P2")
    }
    if(pontosP2.innerHTML > 4 && !possuiClasse(botoesP2[3],"ativado")){
      adicionarClasse(botoesP2[3],"botao-piscante-P2")
    }
  }
}



const contagemP1 = (numero) => {
  const contador = document.getElementById("tempoP1")
  if (numero === 0) {
    adicionarClasse(containerDois, "elemento-piscante")
    containerUm.style.opacity = 0.4
    containerDois.style.opacity = 1
    setTimeout(() => {
      removerClasse(containerDois, "elemento-piscante")
      permitirVirada(cartas2)
      contagemP2(10)
    }, 2000)
    negarVirada(cartas1)
    contador.innerHTML = "0"
    if (cartasViradas.length == 1) {
      removerClasse(cartasViradas[0], "virar-carta")
      cartasViradas.length = 0
    }
    removerClassePraCada(botoesP1,'ativado')
    removerClassePraCada(botoesP1,'botao-piscante-P1')
  } else {
    verificarPontosP1()
    contador.innerHTML = numero
    setTimeout(() => {
      contagemP1(numero - 1)
    }, 1000)
  }
}

const contagemP2 = (numero) => {
  const contador = document.getElementById("tempoP2")
  if (numero === 0) {

    adicionarClasse(containerUm, "elemento-piscante")
      containerDois.style.opacity = 0.4
      containerUm.style.opacity = 1
      setTimeout(() => {
        removerClasse(containerUm, "elemento-piscante")
        permitirVirada(cartas1)
        contagemP1(10)
      }, 2000)
      negarVirada(cartas2)
      contador.innerHTML = "0"
      if (cartasViradas.length == 1) {
        removerClasse(cartasViradas[0], "virar-carta")
        cartasViradas.length = 0
      }
      removerClassePraCada(botoesP2,'ativado')
      removerClassePraCada(botoesP2,'botao-piscante-P2')
    } else {
    verificarPontosP2()
    contador.innerHTML = numero
    setTimeout(() => {
      contagemP2(numero - 1)
    }, 1000)
  }
}

contagemP1(10)

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
  if (carta.classList.contains("pode-virar")) {
    const puxarElemento = (elemPai, identificador) =>
    elemPai.querySelector(identificador) //Puxa algum elemento para ser utilizado.
    const puxarUrl = (elemento) =>
    getComputedStyle(elemento).getPropertyValue("background-image") //Guarda a url da imagem de um elemento
    
    
    //Se a carta que entrar na função como parâmetro já tiver a classe 'cartas-iguais', significa que ela já teve seu par resolvido, portanto, ela não pode ser virada novamente.
    if (possuiClasse(carta, "cartas-iguais")) return
    //Se a carta ainda não foi virada, ou seja, não possui a classe 'virar-carta' e a quantidade de cartas viradas for menor que dois, ela receberá a classe e será adicionada na lista de cartas viradas.
    else if (!possuiClasse(carta, "virar-carta") && cartasViradas.length < 2) {
      adicionarClasse(carta, "virar-carta")
      cartasViradas.push(carta)
      
      //Caso já existam duas cartas viradas, temos que checar se as cartas escolhidas são iguais ou não.
      if (cartasViradas.length === 2) {
        const escolhas = [cartasViradas[0], cartasViradas[1]] //Aqui vão ficar as cartas que o jogador escolheu.
        
        //Aqui vão ficar as frentes das cartas que o jogador escolheu.
        const frentes = [
          puxarElemento(escolhas[0], ".frente"),
          puxarElemento(escolhas[1], ".frente"),
        ]
        
        //Aqui vão ficar os versos das cartas que o jogador escolheu.
        const versos = [
          puxarElemento(escolhas[0], ".verso"),
          puxarElemento(escolhas[1], ".verso"),
        ]
        
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
            escolhas[0].classList.remove("pode-virar")
            escolhas[1].classList.remove("pode-virar")
            adicionarClasse(escolhas[0], "cartas-iguais")
            adicionarClasse(escolhas[1], "cartas-iguais")
            versos[0].style.display = "none"
            versos[1].style.display = "none"
            
            
            const igualdadesP2 = containerDois.querySelectorAll(".cartas-iguais")
            const igualdadesP1 = containerUm.querySelectorAll(".cartas-iguais")
            
            const contadorP1 = document.getElementById('tempoP1')
            const contadorP2 = document.getElementById('tempoP2')
            
            if(contadorP1.innerHTML==0){
              pontosP2.innerHTML ++
            }
            if(contadorP2.innerHTML==0){
              pontosP1.innerHTML ++
            }
            if (igualdadesP1.length == 20) {
              window.alert("Jogador 1 venceu")
              window.location.reload()
            }
            if (igualdadesP2.length == 20) {
              window.alert("Jogador 2 venceu")
              window.location.reload()
            }
          }
          
          pausarClick(cartas, "all") //Retorna o evento de click nas cartas.
        }, 700)
      }
    }
  }
}

const permitirVirada = (cartas, i = 0) => {
  if (i < cartas.length) {
    adicionarClasse(cartas[i], "pode-virar")
    return permitirVirada(cartas, i + 1)
  }
}

const negarVirada = (cartas, i = 0) => {
  if (i < cartas.length) {
    removerClasse(cartas[i], "pode-virar")
    return negarVirada(cartas, i + 1)
  }
}

const repetirRodadaP1 = () => {
  if(pontosP1.innerHTML>1){
  pontosP1.innerHTML -= 2
  removerClassePraCada(botoesP1,'botao-piscante-P1')
  adicionarClasse(botoesP1[0],"ativado")
 }
}

const botao2 = () => {
  if(pontosP1.innerHTML>2){
  pontosP1.innerHTML -= 3
  removerClassePraCada(botoesP1,'botao-piscante-P1')
  adicionarClasse(botoesP1[1],"ativado")
   }  
}

const botao3 = () => {
  if(pontosP1.innerHTML>3){
  pontosP1.innerHTML -= 4
  removerClassePraCada(botoesP1,'botao-piscante-P1')
  adicionarClasse(botoesP1[2],"ativado")
  }
}
const botao4 = () => {
  if(pontosP1.innerHTML>4){
    pontosP1.innerHTML -= 5
    removerClassePraCada(botoesP1,'botao-piscante-P1')
    adicionarClasse(botoesP1[3],"ativado")
    }
}

const repetirRodadaP2 = () => {
  if(pontosP2.innerHTML>1){
  pontosP2.innerHTML -= 2
  removerClassePraCada(botoesP2,'botao-piscante-P2')
  adicionarClasse(botoesP2[0],"ativado")
 }
}

const botao2P2 = () => {
  if(pontosP2.innerHTML>2){
    pontosP2.innerHTML -= 3
    removerClassePraCada(botoesP2,'botao-piscante-P2')
    adicionarClasse(botoesP2[1],"ativado")
    }
}

const botao3P2 = () => {
  if(pontosP2.innerHTML>3){
    pontosP2.innerHTML -= 4
    removerClassePraCada(botoesP1,'botao-piscante-P2')
    adicionarClasse(botoesP2[2],"ativado")
    }
}

const botao4P2 = () => {
  if(pontosP2.innerHTML>4){
    pontosP2.innerHTML -= 5
    removerClassePraCada(botoesP2,'botao-piscante-P2')
    adicionarClasse(botoesP2[3],"ativado")
    }
}

