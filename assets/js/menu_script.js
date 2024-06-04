document.getElementById("botaoJogar").addEventListener("click", function() {
  iniciarPartida(); // funcao de iniciar partida da task gerenciar partida
});

document.getElementById("botaoHistorico").addEventListener("click", function() {
  mostrarHistorico(); // mapeia o click do botão de histórico
});

document.getElementById("botaoEstatisticas").addEventListener("click", function() {
  mostrarEstatisticas(); // mapeia o click do botão de estatísticas
});