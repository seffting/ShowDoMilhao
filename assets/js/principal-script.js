import { perguntas } from "../../data/perguntas.js";

const telaRodadas = document.getElementById("secaoTelaRodadas");
telaRodadas.style.display = "none";

document.getElementById("botaoJogar").addEventListener("click", function () {
  const telaMenu = document.getElementById("containerConteudo");
  telaMenu.style.display = "none";
  telaRodadas.style.display = "";
  comecaRodada();
});

document.getElementById("botaoHistorico").addEventListener("click", function () {
  mostrarHistorico(); // mapeia o click do botão de histórico
});

document.getElementById("botaoEstatisticas").addEventListener("click", function () {
  mostrarEstatisticas(); // mapeia o click do botão de estatísticas
});

//Lógica questões
// comecaRodada();
let nrPerguntaAtual;
let pergunta;
let nrsPerguntasUsadas = [];

function comecaRodada() { // Placeholder de sequência da rodada
  pergunta = carregaQuestao();
  mostraElementos(pergunta);
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
  return acertou;
}

function valido(nrPerguntaAtual) { // Confere se a pergunta não foi usada ainda
  return !nrsPerguntasUsadas.includes(nrPerguntaAtual)
    && nrsPerguntasUsadas.length < perguntas.length;
}

//pulos

let pulos = 3;

const botoesPulo = document.getElementById("pulos");

botoesPulo.childNodes.forEach(botao => {
  botao.addEventListener('click', pular)
})

function pular() {
  pulos--;
  tornarBotaoCinza(this); // Passa o próprio botão como argumento
}

function tornarBotaoCinza(botao) {
  // desativa o botão de pulo clicado
  botao.style.backgroundColor = "lightgray";
  botao.style.color = "black";
  botao.disabled = true;
  comecaRodada();
}

// leitura dos 3 botões de pulo
document.getElementById("botaoPulo1").addEventListener("click", pular);
document.getElementById("botaoPulo2").addEventListener("click", pular);
document.getElementById("botaoPulo3").addEventListener("click", pular);

//Dicas --------------------------------------------------------

//Pegando os elementos do html
const dicaCartas = document.getElementById('mostrarDicaCartas');
const divCartas = document.getElementById('cartas');
const botaoDicaCartas = document.getElementById('botaoAjuda1');
let cartaClicada = true;
const cartas = []

//Responsável por chamar a tela e dispor ela sobre os elementos
//OBS.: substituir pelo addEventListener do click do botão
botaoDicaCartas.addEventListener('click', mostrarDicaCartas);

function mostrarDicaCartas() {
  dicaCartas.style.display = "block";
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

//Armazena o valor da posição do array sorteado
const imagemSorteada = sortearImagem();

//Retorna o valor correspondente de perguntas a serem excluídas

const retornaValorImagem = () => {

  return imagens[imagemSorteada].valor;
}

//Responsável pelo evento de mostrar as cartas aleatoriamente com base no valor sorteado
divCartas.childNodes.forEach(carta => {
  carta.childNodes.forEach(cartaImg => {
    cartaImg.addEventListener('click', () => {
      if (cartaClicada) {
        if (cartaImg.src.endsWith("/verso-carta.png")) {
          cartaImg.src = imagens[imagemSorteada].caminho;
        } else {
          cartaImg.src = "imagem1.jpg";
        }
        cartaClicada = false;
      }
    })
  })
});

//Responsável por permitir fechar a tela
const botaoFecharCartas = document.getElementById('buttonFecharCartas');

botaoFecharCartas.addEventListener('click', () => {
  dicaCartas.style.display = "none";
})


// Dica convidados
const rodada = 1; // PLACEHOLDER
const rodadaFinal = 16;
const chanceMax = 90;
const chanceMin = 70;
const respostaCerta = 1; // PLACEHOLDER
const arrayCerteza = [];
const arrayResposta = [];

const imagensConvidados = [
  { caminho: '/assets/img/usuario1.svg' },
  { caminho: '/assets/img/usuario2.png' },
  { caminho: '/assets/img/usuario3.png' }
]

criarConvidados();

function criarConvidados() {

  for (let index = 0; index < 3; index++) {
  }
  ajudaConvidados();
}

function atualizarBarraPorcentagem(porcentagem) {
  const barraPorcentagem = document.getElementById("barras");

  barraPorcentagem.style.width = porcentagem + "%";
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
    resposta = respostaCerta;
    certeza = calcularCerteza(chanceAtual, true);
  } else { // caso seja sorteado a resposta ser incorreta
    let respostas = [1, 2, 3, 4];
    const indexRespostaCerta = respostas.indexOf(respostaCerta);
    // remover a resposta certa do array
    respostas.splice(indexRespostaCerta, 1);

    // sorteia uma resposta incorreta
    resposta = respostas[Math.floor(Math.random() * respostas.length)];
    certeza = calcularCerteza(chanceAtual, false);
  }

  arrayCerteza.push(certeza);
  arrayResposta.push(resposta);
  console.log(arrayCerteza)
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
const dicaConvidados = document.getElementById('mostrarDicaConvidados');

botaoFecharConvidados.addEventListener('click', () => {
  dicaConvidados.style.display = "none";
})



//Dica do público
function ajudaPublico() {
  qtPessoas = 16;
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
  for (let i = 0; i < qtPessoas; i++) {
      let resposta = chutePublico(chanceAtual);
      respostasIndividuais[i] = resposta;
      const indexResposta = respostas.indexOf(resposta);
      chutes[indexResposta]++;
  }

  return respostasIndividuais;
}

function calcularPorcentagens() {
  let porcentagens = [0, 0, 0, 0];

  for (let i = 0; i < 4; i++) {
      porcentagens[i] = Math.round(chutes[i] / qtPessoas * 100);
  }

  return porcentagens;
}

function chutePublico(chanceAtual) {
  const numSorteado = Math.floor(Math.random() * 100) + 1;
  let resposta;

  if (chanceAtual >= numSorteado) { // caso seja sorteado a resposta ser correta
      resposta = respostaCerta;
  } else { // caso seja sorteado a resposta ser incorreta
      let respostas = [1, 2, 3, 4];
      const indexRespostaCerta = respostas.indexOf(respostaCerta);
      // remover a resposta certa do array
      respostas.splice(indexRespostaCerta, 1);

      // sorteia uma resposta incorreta
      resposta = respostas[Math.floor(Math.random() * respostas.length)];
  }

  return resposta;
}

// Botão parar

let premioAtual = 4500; // Placeholder para a pontuação atual do usuário, que ele ganha ao parar 

botaoParar.addEventListener("click", confirmaSaida);
botaoNao.addEventListener("click", fechaDialogoSair);
botaoSim.addEventListener("click", sairJogo);

function confirmaSaida() {
    let dialogoSair = document.getElementById("dialogoSair");
    let campoTextoDialogo =  document.getElementById("textoDialogoSair");
    campoTextoDialogo.innerHTML = 
    `<span>Se sair, irá ficar com </span>
    <div class="circulo">
      <span class="iconeCifraoParar">R$</span>
    </div>
    <span>${premioAtual}.\nTem certeza de que quer sair?</span>`;
    dialogoSair.showModal();
}

function sairJogo () {
    fechaDialogoSair();
}

function fechaDialogoSair () {
    let dialogoSair = document.getElementById("dialogoSair");
    dialogoSair.close();
}