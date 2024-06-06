
let emJogo = true; // variável global

document.getElementById("botaoParar").addEventListener("click", function() {
  // Quando o botão de parar for clicado a partida se encerra tornando a condição do loop falsa
  emJogo = false;
});

function confirmaSaida() {
    let dialogoSair = document.getElementById("dialogoSair");
    let campoTextoDialogo =  document.getElementById("textoDialogoSair");
    campoTextoDialogo.innerHTML = 
    `<span>Se sair, irá ficar com </span>
    <div class="circulo">
      <span class="iconeCifrao">R$</span>
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
