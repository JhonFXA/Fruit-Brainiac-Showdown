const usernameBox = document.querySelector('.usernames')
const inputP1 = document.getElementById('username-P1')
const inputP2 = document.getElementById('username-P2')
const partida = document.querySelector('#botao-partida')


//Função para voltar quando se clica nos botões JOGAR, TUTORIAL OU CRÉDITOS.
const botaoVoltar = () =>{
    partida.classList.remove('botao-partida-liberado')
    partida.classList.add('botao-partida')
    usernameBox.classList.add('invisibilidade')
    inputP1.value = ''
    inputP2.value = ''
}
//Função "botao jogar" serve para levar à uma tela onde os jogadores poderão escolher seus nicknames e, assim, poder jogar.
const botaoJogar = () => {
    usernameBox.classList.remove('invisibilidade')
    inputP1.value = ''
    inputP2.value = ''
}



//Verifica quanto caracteres foram escritos pelos usuários com a finalidade de habilitar o botão para iniciar a partida.

const verificarTamanhoUsername = () =>{
    if(inputP1.value.length>0 && inputP2.value.length>0){
        partida.classList.remove('botao-partida')
        partida.classList.add('botao-partida-liberado')   
    }else {
        partida.classList.remove('botao-partida-liberado')
        partida.classList.add('botao-partida')
    }
}
//Adiciona um evento de clique para o botão de partida.
partida.addEventListener('click',()=>{
    //Caso alguns dos jogadores coloquem 'espaço' no imput, o jogo mostra que não é permitido o uso desse caratér.
    if(inputP1.value.includes(' ') || inputP2.value.includes(' ')){
        window.alert('NÃO É PERMITIDO O USO DE ESPAÇO')
    }
    //Caso os jogadores tiverem os imputs validados, o botão 'partida' irá redirecioná-los para o jogo.  
    else {
        const usernameP1 = inputP1.value
        const usernameP2 = inputP2.value
        localStorage.setItem('usernameP1', usernameP1)
        localStorage.setItem('usernameP2', usernameP2)
        window.location.href = 'partida.html'
    }
})

//Essa função é executada ao clicar no botão de créditos, adiciona e remove as classes responsáveis por mostrar a caixa de créditos ao jogador
const botaoCreditos = () => {
    const fundo = document.querySelector(".fundo-preto")
    const creditos = document.querySelector(".creditos")
    if(!fundo.classList.contains("ativado")){
        fundo.classList.add("ativado")
        creditos.classList.add("creditos-ativado")
    } else {
        fundo.classList.remove("ativado")
        creditos.classList.remove("creditos-ativado")
    }
}

//Essa função é responsável por redirecionar o jogador ao vídeo de tutorial que está postado no Youtube.
const botaoTutorial = () => {
    window.open("https://www.youtube.com/watch?v=m1NtYoHpq6U","_blank")
}