//Pegando os elementos do html
const dicaCartas = document.getElementById('mostrar-dica-cartas');
const divCartas = document.getElementById('cartas');
let cartaClicada = true;
const cartas = []

//Responsável por chamar a tela e dispor ela sobre os elementos
//OBS.: substituir pelo addEventListener do click do botão
mostrarDicaCartas();
function mostrarDicaCartas() {
  dicaCartas.style.display = "block";
  criarCartas();
}

//Cria as cartas 
function criarCartas() {

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
  { caminho: '/assets/img/carta-rei.jpg', valor: 0 },
  { caminho: '/assets/img/carta-ás.jfif', valor: 1 },
  { caminho: '/assets/img/carta-dois.png', valor: 2 },
  { caminho: '/assets/img/carta-tres.png', valor: 3 }
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
        if (cartaImg.src.endsWith("verso-carta.png")) {
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
const botaoFechar = document.getElementById('button-fechar');

botaoFechar.addEventListener('click', () => {
  dicaCartas.style.display = "none";
})