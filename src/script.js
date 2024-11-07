
//forma simples:

// let editarHTML = document.querySelector('h1');
// editarHTML.innerHTML = "Desafio do Numero secreto:";

// let editarP = document.querySelector('p');
// editarP.innerHTML = "Escolhe um numero de 1 a 10:";

//Nas boas práticas, criar um modelo com as funções e os parametros que serão trocados
let listaNumeroSecreto = [];  
let numeroMaximo = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;


function editarTodoHTML(tag, texto) {
    let campoAlteracao = document.querySelector(tag);
    campoAlteracao.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}


//puxar a função ---- adicionar a tag, texto
function exibirAMensagemInicial(){
editarTodoHTML(`h1`, `Jogo do Número secreto:`);
editarTodoHTML(`p`, `Escolha um numero de 1 a 10: `);
}
exibirAMensagemInicial();



function verificarChute() {
    console.log(numeroSecreto);

    let chute = document.querySelector(`input`).value;
    let palavraTentativa = tentativas > 1 ? `tentativas` : `tentativa`;

    if (chute == numeroSecreto) {
        editarTodoHTML(`h1`, `Parabéns!`);
        editarTodoHTML(`p`, `você acertou o número secreto em ${tentativas} ${palavraTentativa}`);
        document.getElementById('reiniciar').removeAttribute(`disabled`);
    } else if (chute > numeroSecreto) {
        editarTodoHTML(`p`, `O numero secreto é menor`);
    } else {
        editarTodoHTML(`P`, `O numero secreto é maior`);
    } tentativas++
    limparInput();
}


function gerarNumeroAleatorio() {
    let numeroEscolhido =  parseInt(Math.random() * numeroMaximo + 1);
    let quantidadeDeElementosDaLista = listaNumeroSecreto.length;
    if (quantidadeDeElementosDaLista == numeroMaximo){
        listaNumeroSecreto = [];
    }
    
    if (listaNumeroSecreto.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaNumeroSecreto.push(numeroEscolhido);
        console.log(listaNumeroSecreto);
        return numeroEscolhido;
    }
}

function limparInput() {
    chute = document.querySelector(`input`);
    chute.value = ``;
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparInput();
    tentativas = 1;
    exibirAMensagemInicial();
    document.getElementById('reiniciar').setAttribute(`disabled`, true);
}