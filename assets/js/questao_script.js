import { perguntas } from "../../data/perguntas.js"

window.onload = () => comecaRodada();
let nrPerguntaAtual;
let pergunta;
let nrsPerguntasUsadas = [];

function comecaRodada() { // Placeholder de sequência da rodada
    pergunta = carregaQuestao();
    mostraElementos(pergunta);
}

function mostraElementos(pergunta) { // Mostra os elementos na tela
    let espaco = document.getElementById("questao");

    let elmtPergunta = document.createElement("div");
    elmtPergunta.innerHTML = pergunta["pergunta"];
    elmtPergunta.className = "pergunta";
    espaco.appendChild(elmtPergunta);

    for (var i = 0; i<4; i++){
        let elmtResposta = document.createElement("div");
        elmtResposta.innerHTML = pergunta["escolha"+(i+1)];
        elmtResposta.className = "escolha";
        elmtResposta.id=i+1
        espaco.appendChild(elmtResposta);

        elmtResposta.addEventListener("click", confereResposta);
    }
}

function carregaQuestao () { // Pega uma questão da lista
    do {
        nrPerguntaAtual = Math.floor(Math.random() * perguntas.length);
    } while (!valido(nrPerguntaAtual))
    nrsPerguntasUsadas.push(nrPerguntaAtual);
    let pergunta = perguntas[nrPerguntaAtual];
    // console.log(nrsPerguntasUsadas);

    return pergunta;
}

function confereResposta(){  // Validação de conferir a resposta.
    let acertou = pergunta["resposta"] == this.id;
    console.log(acertou);
    return acertou;
}

function valido (nrPerguntaAtual) { // Confere se a pergunta não foi usada ainda
    return !nrsPerguntasUsadas.includes(nrPerguntaAtual) 
    && nrsPerguntasUsadas.length<perguntas.length;
}