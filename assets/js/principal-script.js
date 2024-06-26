import { perguntas } from "../../data/perguntas.js";
import { adicionarRegistro } from "./estatistica_historico_script.js";

const botaoDicaCartas = document.getElementById('botaoAjuda1');
const botaoDicaConvidados = document.getElementById("botaoAjuda2");
const botaoAbrirPublico = document.getElementById('botaoAjuda3');
const botaoPuloUm = document.getElementById("botaoPulo1");
const botaoPuloDois = document.getElementById("botaoPulo2");
const botaoPuloTres = document.getElementById("botaoPulo3");
let numDicas = null;
let numPulos = null;
let conferirResultado = 'Perdeu';
let premioAtual;
let acertarFormatado, pararFormatado, errarFormatado;

const arrayCerteza = [];
const arrayResposta = [];
let rodada = null;
let emJogo = true;
let tempoJogo = 0; 
let intervalo;

const telaMenu = document.getElementById("containerConteudo");
const telaRodadas = document.getElementById("secaoTelaRodadas");
telaRodadas.style.display = "none";

document.getElementById("botaoJogar").addEventListener("click", function () {
  botaoDicaCartas.disabled = false;
  botaoDicaConvidados.disabled = false;
  botaoAbrirPublico.disabled = false;
  numDicas = 0;
  numPulos = 0;
  telaMenu.style.display = "none";
  rodada = 1;
  telaRodadas.style.display = "";
  tempoJogo = 0;
  const audioAbertura = document.getElementById("audioAbertura");
  audioAbertura.pause();
  audioAbertura.currentTime = 0; // Reseta o áudio para o início
  iniciaRelogio();
  tornarBotoesHabilitado();
  comecaRodada();
  setTimeout(function() {
    audioPerguntar()
}, 1000);
});

document.getElementById("botaoHistorico").addEventListener("click", function () {
  window.location.href = "../pages/historico.html";
});

document.getElementById("botaoEstatisticas").addEventListener("click", function () {
  window.location.href = "../pages/estatisticas.html";
});

//Lógica questões
let nrPerguntaAtual;
let pergunta;
let nrsPerguntasUsadas = [];

function comecaRodada() {
  arrayCerteza.length = 0;
  arrayResposta.length = 0;
  pergunta = carregaQuestao();
  mostraElementos(pergunta);
  calculaPremio();
}

function mostraElementos(pergunta) { // Mostra os elementos na tela
  let espaco = document.getElementById("questao");

  let elmtPergunta = document.getElementById("textoPergunta");
  elmtPergunta.innerHTML = pergunta["pergunta"];

  for (var i = 0; i < 4; i++) {
    let elmtResposta = document.getElementById(i);
    elmtResposta.innerHTML = pergunta["escolha" + (i + 1)];
    elmtResposta.addEventListener('click', confereResposta)
  }
}

function carregaQuestao() { // Pega uma questão da lista
  do {
    nrPerguntaAtual = Math.floor(Math.random() * perguntas.length);
  } while (!valido(nrPerguntaAtual))
  nrsPerguntasUsadas.push(nrPerguntaAtual);
  let pergunta = perguntas[nrPerguntaAtual];
  // console.log(nrsPerguntasUsadas);

  return pergunta;
}

function confereResposta() {
  // Validação de conferir a resposta.
  let acertou = pergunta["resposta"]-1 == this.id;
  console.log(acertou)

  habilitarRespostas();

  if (acertou) {
    premioAtual = acertarFormatado;
    if (rodada < 16) {     
      rodada++;
      audioAcertou();
      comecaRodada();
      const pegaPontuacao = document.getElementById("pontuacao"+rodada)
      pegaPontuacao.style.color = "#cb9f2f"
    } else {
      conferirResultado = "Venceu";
      audioVenceu();
      encerrarJogo();
    }
  } else {
    audioErrou()
    setTimeout(function() {
    premioAtual = errarFormatado;
    conferirResultado = "Perdeu"
    emJogo = false;
    encerrarJogo();
  }, 2000);
  }
}

function valido(nrPerguntaAtual) { // Confere se a pergunta não foi usada ainda
  return !nrsPerguntasUsadas.includes(nrPerguntaAtual)
    && nrsPerguntasUsadas.length < perguntas.length;
}

//pulos

function pular() {
  numPulos++;
  tornarBotaoCinza(this); // Passa o próprio botão como argumento
}

function tornarBotaoCinza(botao) {
  // desativa o botão de pulo clicado
  botao.style.backgroundColor = "lightgray";
  botao.style.color = "gray";
  botao.disabled = true;
  comecaRodada();
}

function tornarBotoesHabilitado(){

  botaoPuloUm.disabled = false;
  botaoPuloDois.disabled = false;
  botaoPuloTres.disabled = false;

  botaoPuloUm.addEventListener('click', pular);
  botaoPuloDois.addEventListener('click', pular);
  botaoPuloTres.addEventListener('click', pular);

  botaoPuloUm.style.backgroundColor = "";
  botaoPuloDois.style.backgroundColor = "";
  botaoPuloTres.style.backgroundColor = "";

  botaoPuloUm.style.color = "";
  botaoPuloDois.style.color = "";
  botaoPuloTres.style.color = "";
}

//Dicas --------------------------------------------------------

//Pegando os elementos do html
const dicaCartas = document.getElementById('mostrarDicaCartas');
const divCartas = document.getElementById('cartas');
let imagemSorteada;
let cartaClicada = true;


//Responsável por chamar a tela e dispor ela sobre os elementos
//OBS.: substituir pelo addEventListener do click do botão
botaoDicaCartas.addEventListener('click', mostrarDicaCartas);

function mostrarDicaCartas() {
  dicaCartas.style.display = "block";
  imagemSorteada = sortearImagem();
  criarCartas();
}

//Cria as cartas 
function criarCartas() {

  while (divCartas.firstChild) {
    divCartas.removeChild(divCartas.firstChild);
  }

  for (let index = 0; index <= 3; index++) {
    const novaCarta = document.createElement('div');
    novaCarta.id = index;
    novaCarta.style.width = "150px";
    novaCarta.style.height = "235px";
    novaCarta.style.borderRadius = "1em";
    novaCarta.style.background = "rgba(0,0,0, 0.3)";
    novaCarta.style.display = "flex";
    novaCarta.style.justifyContent = "center";
    novaCarta.style.alignItems = "center"
    const imgCarta = document.createElement('img');
    imgCarta.src = "/assets/img/verso-carta.png";
    imgCarta.style.width = "130px";
    imgCarta.style.height = "210px";
    novaCarta.appendChild(imgCarta);
    console.log(novaCarta.childNodes);
    divCartas.appendChild(novaCarta);

    //Responsável pelo evento de mostrar as cartas aleatoriamente com base no valor sorteado
    imgCarta.addEventListener('click', () => {
      if (cartaClicada) {
        if (imgCarta.src.endsWith("verso-carta.png")) {
          numDicas++;
          imgCarta.src = imagens[imagemSorteada].caminho;
          botaoDicaCartas.disabled = true;
          botaoDicaCartas.style.backgroundColor = "lightgray";
          botaoDicaCartas.style.color = "gray";
          removerRespostasErradas();
        } 
          cartaClicada = false;
      }
    });
  }
}

//Armazena as imagens e as respectivas quantidades de respostas a serem excluídas
const imagens = [
  { caminho: '../assets/img/carta-rei.jpg', valor: 0 },
  { caminho: '../assets/img/carta-ás.jfif', valor: 1 },
  { caminho: '../assets/img/carta-dois.png', valor: 2 },
  { caminho: '../assets/img/carta-tres.png', valor: 3 }
]

//Responsável por sortear uma imagem correspondente à sua posição no array de objetos 'imagens'
const sortearImagem = () => {
  const min = Math.ceil(0);
  const max = Math.floor(3);
  return Math.floor(Math.random() * (max - min) + min);
}

//Retorna o valor correspondente de perguntas a serem excluídas

const retornaValorImagem = () => {

  return imagens[imagemSorteada].valor;
}

function removerRespostasErradas(){
  let i = 0;
  let j = 0;
  while(i != retornaValorImagem()) {

    let elmtResposta = document.getElementById(j);
    
    if(pergunta["resposta"]-1 != elmtResposta.id){
      
      elmtResposta.removeEventListener('click', confereResposta);
      elmtResposta.style.opacity = "0.5";
      i++
    } 
    j++;
  }
}

//Responsável por permitir fechar a tela
const botaoFecharCartas = document.getElementById('buttonFecharCartas');
botaoFecharCartas.addEventListener('click', () => {
  dicaCartas.style.display = "none";
})

// Dica convidados
const rodadaFinal = 16;
const chanceMax = 90;
const chanceMin = 70;

const dicaConvidados = document.getElementById('mostrarDicaConvidados');

botaoDicaConvidados.addEventListener('click', mostrarDicaConvidados);

function mostrarDicaConvidados() {
  numDicas++;
  dicaConvidados.style.display = "block";
  ajudaConvidados();
  botaoDicaConvidados.disabled = true;
  botaoDicaConvidados.style.backgroundColor = "lightgray";
  botaoDicaConvidados.style.color = "gray";
}

// ajudaConvidados();
function ajudaConvidados() {
  // calcular quanto cada rodada influencia na chance
  const variacaoChance = (chanceMax - chanceMin) / (rodadaFinal - 1);
  // calcular chance atual
  const chanceAtual = chanceMax - variacaoChance * (rodada - 1);

  for (let i = 0; i < 3; i++) {
    chuteConvidado(chanceAtual);
  }
  mostrarBarraProgresso();
}

function chuteConvidado(chanceAtual) {
  const numSorteado = Math.floor(Math.random() * 100) + 1;
  let resposta;
  let certeza;
  if (chanceAtual >= numSorteado) { // caso seja sorteado a resposta ser correta
    resposta = pergunta["resposta"];
    certeza = calcularCerteza(chanceAtual, true);
  } else { // caso seja sorteado a resposta ser incorreta
    let respostas = [1, 2, 3, 4];
    const indexRespostaCerta = respostas.indexOf(pergunta["resposta"]);
    // remover a resposta certa do array
    respostas.splice(indexRespostaCerta, 1);

    // sorteia uma resposta incorreta
    resposta = respostas[Math.floor(Math.random() * respostas.length)];
    certeza = calcularCerteza(chanceAtual, false);
  }

  arrayCerteza.push(certeza);
  arrayResposta.push(resposta);
  console.log(arrayCerteza);
}

function mostrarBarraProgresso() {
  for (let index = 0; index < arrayCerteza.length; index++) {
    const barraPorcentagem = document.getElementById(`progresso${index}`);
    const numeroResposta = document.getElementById(`voto${index}`);
    const numeroPorcentagem = document.getElementById(`porcentagem${index}`);

    numeroResposta.innerHTML = arrayResposta[index];
    barraPorcentagem.style.width = arrayCerteza[index] + "%";
    numeroPorcentagem.innerHTML = arrayCerteza[index] + "%";
  }
}

function calcularCerteza(chanceAtual, respostaCerta) {
  // sorteia um indice para saber se o convidado tem certeza, duvida ou não sabe
  const indiceCerteza = Math.floor((Math.random() * 100) + 1);
  const certezaAlta = chanceAtual;
  const certezaMedia = (100 - certezaAlta)/2 + certezaAlta;
  let porcentagemCerteza;

  /*
      As faixas de certeza são
      0 - Chance Atual
      Chance Atual - (Metade da distância restante até 100, divido por 2)
      (Metade da distância restante até 100, divido por 2) - 100
  */
  if (respostaCerta) {
      if (certezaAlta >= indiceCerteza) { // tem certeza
          porcentagemCerteza = Math.floor(Math.random() * 21) + 80;
      } else if (certezaMedia >= indiceCerteza) { // duvida
          porcentagemCerteza = Math.floor(Math.random() * 61) + 20;
      } else { // não sabe
          porcentagemCerteza = Math.floor(Math.random() * 21);
      }
  }
  // Caso a resposta seja incorreta, a chance de ter certeza é menor
  else {
      if (certezaAlta >= indiceCerteza) {
          porcentagemCerteza = Math.floor(Math.random() * 21); // não sabe
      } else if (certezaMedia >= indiceCerteza) {
          porcentagemCerteza = Math.floor(Math.random() * 61) + 20; // duvida
      } else {
          porcentagemCerteza = Math.floor(Math.random() * 21) + 80; // tem certeza
      }
  }

  return porcentagemCerteza;
}

const botaoFecharConvidados = document.getElementById('buttonFecharConvidados');

botaoFecharConvidados.addEventListener('click', () => {
  dicaConvidados.style.display = "none";
})



//Dica do público

botaoAbrirPublico.addEventListener('click', () => {
  dicaPublico.style.display = "block";
  botaoAbrirPublico.disabled = true;
  botaoAbrirPublico.style.backgroundColor = "lightgray";
  botaoAbrirPublico.style.color = "gray";
  ajudaPublico();
});

let chutes = [0, 0, 0, 0];
function ajudaPublico() {
  numDicas++;
  chutes = [0, 0, 0, 0];
  let respostasIndividuais = coletarRespostas();
  let porcentagens = calcularPorcentagens();
}

function coletarRespostas() {
  // calcular quanto cada rodada influencia na chance
  const variacaoChance = (chanceMax - chanceMin) / (rodadaFinal - 1);
  // calcular chance atual
  const chanceAtual = chanceMax - variacaoChance * (rodada - 1);
  const respostas = [1, 2, 3, 4];
  let respostasIndividuais = [];

  // Pegar chute de cada pessoa do público
  for (let i = 0; i < 16; i++) {
      let resposta = chutePublico(chanceAtual);
      respostasIndividuais[i] = resposta;
      const indexResposta = respostas.indexOf(resposta);
      chutes[indexResposta]++;
  }
  console.log(respostasIndividuais);
  for (let index = 0; index < respostasIndividuais.length; index++) {
    const alocarRespostas = document.getElementById(`convidadoResposta${index}`);
    alocarRespostas.innerHTML = respostasIndividuais[index];
  }
}

function calcularPorcentagens() {
  let porcentagens = [0, 0, 0, 0];

  for (let i = 0; i < 4; i++) {
      porcentagens[i] = Math.round(chutes[i] / 16 * 100);
  }

  for (let index = 0; index < porcentagens.length; index++) {
    const barraPorcentagem = document.getElementById(`progressoPublico${index}`);
    const numeroPorcentagem = document.getElementById(`porcentagemPublico${index}`);

    barraPorcentagem.style.width = porcentagens[index] + "%";
    numeroPorcentagem.innerHTML = porcentagens[index] + "%";
  }
}

function chutePublico(chanceAtual) {
  const numSorteado = Math.floor(Math.random() * 100) + 1;
  let resposta;

  if (chanceAtual >= numSorteado) { // caso seja sorteado a resposta ser correta
      resposta = pergunta["resposta"];
  } else { // caso seja sorteado a resposta ser incorreta
      let respostas = [1, 2, 3, 4];
      const indexRespostaCerta = respostas.indexOf(pergunta["resposta"]);
      // remover a resposta certa do array
      respostas.splice(indexRespostaCerta, 1);

      // sorteia uma resposta incorreta
      resposta = respostas[Math.floor(Math.random() * respostas.length)];
  }

  return resposta;
}

//Responsável por permitir fechar a tela
const botaoFecharPublico = document.getElementById('buttonFecharPublico');
const dicaPublico = document.getElementById('mostrarDicasPublico');
botaoFecharPublico.addEventListener('click', () => {
  dicaPublico.style.display = "none";
})


// Botão parar
// Placeholder para a pontuação atual do usuário, que ele ganha ao parar 
botaoParar.addEventListener("click", confirmaSaida);
botaoNao.addEventListener("click", fechaDialogoSair);
botaoSim.addEventListener("click", sairJogo);

function confirmaSaida() {
  audioParou();
  premioAtual = pararFormatado; 
  conferirResultado = "Parou";
  const fundoParar = document.getElementById("containerDireita");
  fundoParar.style.opacity = "15%";
  let dialogoSair = document.getElementById("dialogoSair");
  let campoTextoDialogo =  document.getElementById("textoDialogoSair");
  campoTextoDialogo.innerHTML = 
  `<div id="frase1">
      <span>Se sair, irá ficar com </span>
        <div class="circulo">
        <span class="iconeCifrao">R$</span>
        </div>
        <span>${premioAtual}.</span>
    </div>
    <div id="frase2">\nTem certeza de que quer sair?</div>`;
  dialogoSair.showModal();
}

function sairJogo () {
    fechaDialogoSair();
    encerrarJogo();
}

function fechaDialogoSair () {
    const fundoParar = document.getElementById("containerDireita");
    fundoParar.style.opacity = "100%";
    let dialogoSair = document.getElementById("dialogoSair");
    dialogoSair.close();
}

const botaoFinalPartida = document.getElementById('botaoSairFinalPartida');
botaoFinalPartida.addEventListener('click', ()=> {
  const telaFimPartida = document.getElementById("fimJogo");
  telaFimPartida.style.display = "none";
  telaMenu.style.display = "";
});

// -------------NECESSÁRIO PASSAR UMA VARIÁVEL "RODADA" COMO ARGUMENTO, QUE SERÁ A CONTABILIZADORA DOS NÍVEIS 1 A 16 DO JOGO.-------------

const valorErrar = document.getElementById("valorErrar");
const valorParar = document.getElementById("valorParar");
const valorAcertar = document.getElementById("valorAcertar");


    // -------------PARA USAR OS VALORES RETORNADOS > premiosFormatados.acertarFormatado | premiosFormatados.pararFormatado | premiosFormatados.errarFormatado------------

    // -------------FUNÇÃO QUE RETORNA OS VALORES A CADA RODADA-------------
function calculaPremio() {// adicionar parametro para função do lucas

    const valoresAcertar = [1, 2, 3, 4, 5, 10, 20, 30, 40, 50, 100, 200, 300, 400, 500, 1];
    let acertar, errar, parar;
        acertar = valoresAcertar[rodada - 1];

        if (rodada === 1) {
            parar = 0.5;
            errar = 0;
        } else {
            parar = valoresAcertar[rodada - 2];
            errar = parar / 2;
        }

        formataValores(acertar, parar, errar, rodada);

}


    // -------------FUNÇÃO QUE FORMATA OS VALORES + MILHAR OU MILHÃO EM STRING-------------
function formataValores(acertar, parar, errar, rodada){

    if(rodada === 1){
        acertarFormatado = `${acertar} MIL`
        pararFormatado = `500`
        errarFormatado = `0`

    } else if(rodada === 2){
        acertarFormatado = `${acertar} MIL`
        pararFormatado = `${parar} MIL`
        errarFormatado = `500`
    } else if(rodada === 16){
        acertarFormatado = `${acertar} MILHÃO`
        pararFormatado = `${parar} MIL`
        errarFormatado = `${errar} MIL`
    } else{
        acertarFormatado = `${acertar} MIL`
        pararFormatado = `${parar} MIL`
        errarFormatado = `${errar} MIL`
    }

    valorErrar.innerHTML = errarFormatado;
    valorParar.innerHTML = pararFormatado;
    valorAcertar.innerHTML = acertarFormatado;
}

function encerrarJogo() {
  telaFimJogo();
  let dataAtual = new Date();
  let anoAtual = dataAtual.getFullYear();
  let mesAtual = dataAtual.getMonth()+1;
  let diaAtual = dataAtual.getDay();
  console.log(dataAtual.toUTCString())
  adicionarRegistro(numDicas, numPulos, premioAtual, rodada-1, conferirResultado, atualizaTempoTela(tempoJogo), (`${diaAtual}/${mesAtual}/${anoAtual}`));
  botaoDicaCartas.style.backgroundColor = "";
  botaoDicaCartas.style.color = "";
  botaoDicaConvidados.style.backgroundColor = "";
  botaoDicaConvidados.style.color = "";
  botaoAbrirPublico.style.backgroundColor = "";
  botaoAbrirPublico.style.color = "";
  cartaClicada = true;
  tempoJogo = 0;
  document.getElementById("relogioTempoJogo").innerHTML = atualizaTempoTela(tempoJogo);
  resetarCoresPontuacao();  
  habilitarRespostas();
  paraRelogio();
}

function habilitarRespostas(){
  for (var i = 0; i < 4; i++) {
    let elmtResposta = document.getElementById(i);
    elmtResposta.innerHTML = pergunta["escolha" + (i + 1)];
    elmtResposta.style.backgroundColor = "#211B15";
    elmtResposta.style.opacity = 1;
    elmtResposta.addEventListener('click', confereResposta)
  }
}

function telaFimJogo() {
  const telaFimPartida = document.getElementById("fimJogo");
  telaFimPartida.style.display = "block";
  telaRodadas.style.display = "none";

  const resultadoPremio = document.getElementById('resultadoPremio');
  resultadoPremio.innerHTML = premioAtual;

  const tempoFinal = document.getElementById('tempo');
  tempoFinal.innerHTML = atualizaTempoTela(tempoJogo);
}

//Relógio
function cicloRelogio() {
    tempoJogo++;
    document.getElementById("relogioTempoJogo").innerHTML = atualizaTempoTela(tempoJogo);
}

function atualizaTempoTela (tempo) { // Transforma o tempo de jogo em horário na tela

    let horas = Math.floor(tempo/3600);
    let minutos = Math.floor((tempo - (horas * 3600)) / 60);
    let segundos = tempo - (horas * 3600) - (minutos * 60);

    if (validoHorario(horas, minutos, segundos)){
        horas = horas < 10 ? ("0" + horas) : horas;
        minutos = minutos < 10 ? ("0" + minutos) : minutos;
        segundos = segundos < 10 ? ("0" + segundos) : segundos;
    
        return horas+':'+minutos+':'+segundos;
    } else {
        paraRelogio();
    }
}

function validoHorario (horas, minutos, segundos) { // Confere se o tempo vai até 23:59:59
    return (horas<=23 && minutos<=59 && segundos<=59);
}


function iniciaRelogio(){ // Seta o intervalo de iteração do ciclo do relógio (1s)
    intervalo = setInterval(cicloRelogio, 1000);
}


function paraRelogio(){ // Para o ciclo do relógio e retorna o tempo de jogo em milissegundos
    clearInterval(intervalo);
    return tempoJogo;
}

function resetarCoresPontuacao(){
  for(let i=2;i<=16;i++){
    let resetaCor = document.getElementById("pontuacao"+i)
    resetaCor.style.color = "white"
  }
}

function audioPerguntar(){
  const somPerguntar = document.getElementById("audioPerguntar");
  somPerguntar.currentTime = 0;
  somPerguntar.play();
}

function audioAcertou(){
  const somAcertou = document.getElementById("audioAcertou");
  somAcertou.currentTime = 0;
  somAcertou.play();
}

function audioErrou(){
  const somErrou = document.getElementById("audioErrou");
  somErrou.currentTime = 0;
  somErrou.play();
}

function audioParou(){
  const somParou = document.getElementById("audioParou");
  somParou.currentTime = 0;
  somParou.play();
}

function audioVenceu(){
  const somVenceu = document.getElementById("audioVenceu");
  somVenceu.currentTime = 0;
  somVenceu.play();
}

