let pulos = 3;

function pular() {
  pulos--;
  tornarBotaoCinza(this); // Passa o próprio botão como argumento
  // Adicione aqui a função para pular para a próxima rodada
}

function tornarBotaoCinza(botao) {
  botao.style.backgroundColor = "lightgray";
  botao.style.color = "black";
  botao.disabled = true;
}

document.getElementById("botaoPulo1").addEventListener("click", pular);
document.getElementById("botaoPulo2").addEventListener("click", pular);
document.getElementById("botaoPulo3").addEventListener("click", pular);
