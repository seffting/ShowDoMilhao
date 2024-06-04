let rodada_em_andamento = true; // variável global

document.getElementById("botaoParar").addEventListener("click", function() {
  // Quando o botão de parar for clicado a partida se encerra tornando a condição do loop falsa
  rodada_em_andamento = false;
});

