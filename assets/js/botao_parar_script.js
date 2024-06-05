let rodada_em_andamento = true; // variável global
let premioAtual = 4500; // placeholder 

botaoParar.addEventListener("click", confirmaSaida);
botaoNao.addEventListener("click", fechaDialogoSair);
botaoSim.addEventListener("click", sairJogo);

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
